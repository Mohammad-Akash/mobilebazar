-- ==============================================================================
-- Migration 026: Admin Foundation (Phase 8)
-- 
-- 1. MFA helper (is_aal2) & staff guards (require_staff, require_admin)
-- 2. admin_actions table (append-only audit log + anti-tamper trigger)
-- 3. log_admin_action internal helper (SECURITY DEFINER)
-- 4. ad_moderation table (moderator removal reason shown to ad owners)
-- 5. profile_private: ban tracking columns (ban_reason, banned_at, banned_by)
-- 6. ad_flags: outcome tracking column ('confirmed', 'false_positive')
-- 7. Optimized partial indexes for moderation queues
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. MFA Helper & Privilege Guards
-- ------------------------------------------------------------------------------

-- Returns true if current session has verified an authenticator app (aal2)
CREATE OR REPLACE FUNCTION public.is_aal2()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN COALESCE((auth.jwt() ->> 'aal') = 'aal2', false);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_aal2() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_aal2() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_aal2() TO authenticated;

-- Enforces caller is active staff (moderator or admin) AND has aal2
CREATE OR REPLACE FUNCTION public.require_staff()
RETURNS VOID
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT (public.is_staff() AND public.is_aal2()) THEN
        RAISE EXCEPTION 'Access denied: staff privileges and MFA (AAL2) required'
            USING ERRCODE = 'MB403';
    END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.require_staff() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.require_staff() FROM anon;
GRANT EXECUTE ON FUNCTION public.require_staff() TO authenticated;

-- Enforces caller is active admin AND has aal2
CREATE OR REPLACE FUNCTION public.require_admin()
RETURNS VOID
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT (public.is_admin() AND public.is_aal2()) THEN
        RAISE EXCEPTION 'Access denied: administrator privileges and MFA (AAL2) required'
            USING ERRCODE = 'MB403';
    END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.require_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.require_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.require_admin() TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. admin_actions (Append-Only Audit Log)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.admin_actions (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_id    UUID NOT NULL REFERENCES public.profiles(id),
    action      TEXT NOT NULL,
    target_type TEXT NOT NULL CHECK (target_type IN ('ad', 'user', 'report', 'setting', 'term')),
    target_id   TEXT NOT NULL,
    reason      TEXT,
    metadata    JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS admin_actions_created_at_id_idx ON public.admin_actions (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS admin_actions_target_idx ON public.admin_actions (target_type, target_id);

-- RLS & Grants lockdown
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_actions FROM PUBLIC, anon, authenticated;

-- Anti-tamper trigger: Prohibits UPDATE or DELETE on admin_actions
CREATE OR REPLACE FUNCTION public.prevent_admin_actions_tampering()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION 'admin_actions is append-only: updates and deletes are strictly prohibited'
        USING ERRCODE = 'MB405';
END;
$$;

DROP TRIGGER IF EXISTS trg_no_update_delete_admin_actions ON public.admin_actions;
CREATE TRIGGER trg_no_update_delete_admin_actions
    BEFORE UPDATE OR DELETE ON public.admin_actions
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_admin_actions_tampering();

-- ------------------------------------------------------------------------------
-- 3. log_admin_action (Internal Logger)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.log_admin_action(
    p_action      TEXT,
    p_target_type TEXT,
    p_target_id   TEXT,
    p_reason      TEXT DEFAULT NULL,
    p_metadata    JSONB DEFAULT '{}'::jsonb
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_actor_id UUID;
    v_action_id BIGINT;
BEGIN
    v_actor_id := (SELECT auth.uid());
    IF v_actor_id IS NULL THEN
        RAISE EXCEPTION 'Unauthorized: actor must be authenticated' USING ERRCODE = 'MB401';
    END IF;

    INSERT INTO public.admin_actions (
        actor_id,
        action,
        target_type,
        target_id,
        reason,
        metadata,
        created_at
    ) VALUES (
        v_actor_id,
        p_action,
        p_target_type,
        p_target_id,
        p_reason,
        COALESCE(p_metadata, '{}'::jsonb),
        now()
    )
    RETURNING id INTO v_action_id;

    RETURN v_action_id;
END;
$$;

-- Internal definer function: never callable directly by client roles
REVOKE EXECUTE ON FUNCTION public.log_admin_action(TEXT, TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_admin_action(TEXT, TEXT, TEXT, TEXT, JSONB) FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_admin_action(TEXT, TEXT, TEXT, TEXT, JSONB) FROM authenticated;

-- ------------------------------------------------------------------------------
-- 4. ad_moderation (Owner Removal Notifications)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.ad_moderation (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id        UUID NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
    reason       TEXT NOT NULL,
    moderator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ad_moderation_ad_id_idx ON public.ad_moderation(ad_id);

ALTER TABLE public.ad_moderation ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.ad_moderation FROM PUBLIC, anon, authenticated;

-- Owner can read removal reasons for their own ads
DROP POLICY IF EXISTS ad_moderation_owner_select ON public.ad_moderation;
CREATE POLICY ad_moderation_owner_select ON public.ad_moderation
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.ads
        WHERE ads.id = ad_moderation.ad_id
          AND ads.seller_id = (SELECT auth.uid())
    )
);

GRANT SELECT ON public.ad_moderation TO authenticated;

-- ------------------------------------------------------------------------------
-- 5. profile_private (Ban Fields)
-- ------------------------------------------------------------------------------

ALTER TABLE public.profile_private
    ADD COLUMN IF NOT EXISTS ban_reason TEXT,
    ADD COLUMN IF NOT EXISTS banned_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS banned_by UUID REFERENCES public.profiles(id);

-- Ensure NO update/insert grant on ban fields for normal authenticated users
-- (profile_private only grants SELECT on public fields and UPDATE on phone/whatsapp)

-- ------------------------------------------------------------------------------
-- 6. ad_flags (Flag Outcome Field)
-- ------------------------------------------------------------------------------

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'ad_flags' 
          AND column_name = 'outcome'
    ) THEN
        ALTER TABLE public.ad_flags
            ADD COLUMN outcome TEXT CHECK (outcome IN ('confirmed', 'false_positive'));
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 7. High-Performance Queue Indexes
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS ads_under_review_queue_idx
    ON public.ads (created_at ASC)
    WHERE status = 'under_review';

CREATE INDEX IF NOT EXISTS reports_pending_ad_group_idx
    ON public.reports (ad_id, created_at ASC)
    WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS ad_flags_unresolved_queue_idx
    ON public.ad_flags (score DESC, created_at ASC)
    WHERE resolved_at IS NULL;

