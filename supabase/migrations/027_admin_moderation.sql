-- ==============================================================================
-- Migration 027: Admin & Moderator Action RPCs (Phase 8)
--
-- Moderation functions (require_staff / require_admin first):
--   1. admin_approve_ad(p_ad_id, p_note)
--   2. admin_remove_ad(p_ad_id, p_reason)
--   3. admin_dismiss_reports(p_ad_id, p_note)
--   4. admin_ban_user(p_user_id, p_reason)
--   5. admin_unban_user(p_user_id, p_reason)
--   6. admin_set_setting(p_key, p_value, p_reason)
--   7. admin_upsert_blocked_term(p_term, p_kind, p_reason)
--   8. admin_disable_blocked_term(p_id, p_reason)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. admin_approve_ad
-- Moves ad from 'under_review' → 'active'
-- Extends expiration if expired while under review
-- Dismisses linked pending reports and marks linked flags as 'false_positive'
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_approve_ad(
    p_ad_id UUID,
    p_note  TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_status     ad_status;
    v_expires_at TIMESTAMPTZ;
BEGIN
    PERFORM public.require_staff();

    IF p_ad_id IS NULL THEN
        RAISE EXCEPTION 'Ad ID is required' USING ERRCODE = 'MB400';
    END IF;

    -- Lock row for concurrency safety
    SELECT status, expires_at INTO v_status, v_expires_at
    FROM public.ads
    WHERE id = p_ad_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'Ad not found');
    END IF;

    IF v_status != 'under_review' THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'ALREADY_HANDLED',
            'message', 'Ad is not in under_review status (current status: ' || v_status || ')'
        );
    END IF;

    -- Update ad: return to active, ensure at least 30 days active validity
    UPDATE public.ads
    SET status     = 'active',
        updated_at = now(),
        expires_at = GREATEST(expires_at, now() + INTERVAL '30 days')
    WHERE id = p_ad_id;

    -- Dismiss all pending reports for this ad
    UPDATE public.reports
    SET status      = 'dismissed',
        resolved_by = (SELECT auth.uid()),
        resolved_at = now()
    WHERE ad_id = p_ad_id
      AND status = 'pending';

    -- Resolve flags as false positive
    UPDATE public.ad_flags
    SET outcome     = 'false_positive',
        resolved_by = (SELECT auth.uid()),
        resolved_at = now()
    WHERE ad_id = p_ad_id
      AND resolved_at IS NULL;

    -- Write audit log
    PERFORM public.log_admin_action(
        'approve_ad',
        'ad',
        p_ad_id::text,
        p_note,
        jsonb_build_object('previous_status', v_status)
    );

    RETURN jsonb_build_object('success', true, 'ad_id', p_ad_id, 'status', 'active');
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_approve_ad(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_approve_ad(UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_approve_ad(UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. admin_remove_ad
-- Moves ad from active/under_review/sold/expired → 'deleted'
-- Inserts explanation in ad_moderation table (visible to owner)
-- Marks pending reports as 'action_taken' and flags as 'confirmed'
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_remove_ad(
    p_ad_id  UUID,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_status    ad_status;
    v_seller_id UUID;
BEGIN
    PERFORM public.require_staff();

    IF p_ad_id IS NULL THEN
        RAISE EXCEPTION 'Ad ID is required' USING ERRCODE = 'MB400';
    END IF;

    IF length(trim(COALESCE(p_reason, ''))) < 5 THEN
        RAISE EXCEPTION 'A valid reason of at least 5 characters is required' USING ERRCODE = 'MB400';
    END IF;

    -- Lock row for concurrency safety
    SELECT status, seller_id INTO v_status, v_seller_id
    FROM public.ads
    WHERE id = p_ad_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'Ad not found');
    END IF;

    IF v_status = 'deleted' THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'ALREADY_HANDLED',
            'message', 'Ad has already been removed/deleted'
        );
    END IF;

    -- Update ad to deleted status
    UPDATE public.ads
    SET status     = 'deleted',
        deleted_at = now(),
        updated_at = now()
    WHERE id = p_ad_id;

    -- Insert owner explanation
    INSERT INTO public.ad_moderation (ad_id, reason, moderator_id)
    VALUES (p_ad_id, trim(p_reason), (SELECT auth.uid()));

    -- Mark pending reports as action_taken
    UPDATE public.reports
    SET status      = 'action_taken',
        resolved_by = (SELECT auth.uid()),
        resolved_at = now()
    WHERE ad_id = p_ad_id
      AND status = 'pending';

    -- Mark flags as confirmed
    UPDATE public.ad_flags
    SET outcome     = 'confirmed',
        resolved_by = (SELECT auth.uid()),
        resolved_at = now()
    WHERE ad_id = p_ad_id
      AND resolved_at IS NULL;

    -- Write audit log
    PERFORM public.log_admin_action(
        'remove_ad',
        'ad',
        p_ad_id::text,
        trim(p_reason),
        jsonb_build_object('previous_status', v_status, 'seller_id', v_seller_id)
    );

    RETURN jsonb_build_object('success', true, 'ad_id', p_ad_id, 'status', 'deleted');
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_remove_ad(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_remove_ad(UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_remove_ad(UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 3. admin_dismiss_reports
-- Marks pending reports for an ad as dismissed without altering the ad itself
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_dismiss_reports(
    p_ad_id UUID,
    p_note  TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_count INT;
BEGIN
    PERFORM public.require_staff();

    IF p_ad_id IS NULL THEN
        RAISE EXCEPTION 'Ad ID is required' USING ERRCODE = 'MB400';
    END IF;

    UPDATE public.reports
    SET status      = 'dismissed',
        resolved_by = (SELECT auth.uid()),
        resolved_at = now()
    WHERE ad_id = p_ad_id
      AND status = 'pending';

    GET DIAGNOSTICS v_count = ROW_COUNT;

    PERFORM public.log_admin_action(
        'dismiss_reports',
        'report',
        p_ad_id::text,
        p_note,
        jsonb_build_object('dismissed_count', v_count)
    );

    RETURN jsonb_build_object('success', true, 'ad_id', p_ad_id, 'dismissed_count', v_count);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_dismiss_reports(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_dismiss_reports(UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_dismiss_reports(UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. admin_ban_user
-- Admin only. In one single transaction:
--   - Sets profile_private.is_banned = true, ban_reason, banned_at, banned_by
--   - Cascades all active and under_review ads to 'deleted'
--   - Resolves all pending reports on user's ads as 'action_taken'
--   - Prohibits banning self or other moderators/admins
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_ban_user(
    p_user_id UUID,
    p_reason  TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_actor_id    UUID;
    v_target_role user_role;
    v_is_banned   BOOLEAN;
    v_ads_removed INT;
BEGIN
    PERFORM public.require_admin();

    v_actor_id := (SELECT auth.uid());

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID is required' USING ERRCODE = 'MB400';
    END IF;

    IF length(trim(COALESCE(p_reason, ''))) < 5 THEN
        RAISE EXCEPTION 'A valid ban reason of at least 5 characters is required' USING ERRCODE = 'MB400';
    END IF;

    -- Self-ban guard
    IF p_user_id = v_actor_id THEN
        RAISE EXCEPTION 'Security violation: you cannot ban yourself' USING ERRCODE = 'MB400';
    END IF;

    -- Lock target profile
    SELECT role, is_banned INTO v_target_role, v_is_banned
    FROM public.profile_private
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'User not found');
    END IF;

    -- Staff protection guard
    IF v_target_role IN ('admin', 'moderator') THEN
        RAISE EXCEPTION 'Security violation: cannot ban an administrator or moderator' USING ERRCODE = 'MB403';
    END IF;

    IF v_is_banned THEN
        RETURN jsonb_build_object('success', false, 'code', 'ALREADY_BANNED', 'message', 'User is already banned');
    END IF;

    -- 1. Update profile_private
    UPDATE public.profile_private
    SET is_banned  = true,
        ban_reason = trim(p_reason),
        banned_at  = now(),
        banned_by  = v_actor_id
    WHERE id = p_user_id;

    -- 2. Cascade delete all active & under_review ads
    UPDATE public.ads
    SET status     = 'deleted',
        deleted_at = now(),
        updated_at = now()
    WHERE seller_id = p_user_id
      AND status IN ('active', 'under_review');

    GET DIAGNOSTICS v_ads_removed = ROW_COUNT;

    -- 3. Resolve pending reports against the user's ads
    UPDATE public.reports
    SET status      = 'action_taken',
        resolved_by = v_actor_id,
        resolved_at = now()
    WHERE ad_id IN (SELECT id FROM public.ads WHERE seller_id = p_user_id)
      AND status = 'pending';

    -- 4. Audit Log
    PERFORM public.log_admin_action(
        'ban_user',
        'user',
        p_user_id::text,
        trim(p_reason),
        jsonb_build_object('ads_removed', v_ads_removed)
    );

    RETURN jsonb_build_object(
        'success', true,
        'user_id', p_user_id,
        'ads_removed', v_ads_removed
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_ban_user(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_ban_user(UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_ban_user(UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 5. admin_unban_user
-- Admin only. Re-enables account. Deleted ads stay deleted.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_unban_user(
    p_user_id UUID,
    p_reason  TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_is_banned BOOLEAN;
BEGIN
    PERFORM public.require_admin();

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID is required' USING ERRCODE = 'MB400';
    END IF;

    IF length(trim(COALESCE(p_reason, ''))) < 5 THEN
        RAISE EXCEPTION 'A valid reason of at least 5 characters is required' USING ERRCODE = 'MB400';
    END IF;

    SELECT is_banned INTO v_is_banned
    FROM public.profile_private
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'User not found');
    END IF;

    IF NOT v_is_banned THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_BANNED', 'message', 'User is not currently banned');
    END IF;

    UPDATE public.profile_private
    SET is_banned  = false,
        ban_reason = NULL,
        banned_at  = NULL,
        banned_by  = NULL
    WHERE id = p_user_id;

    PERFORM public.log_admin_action(
        'unban_user',
        'user',
        p_user_id::text,
        trim(p_reason)
    );

    RETURN jsonb_build_object('success', true, 'user_id', p_user_id);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_unban_user(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_unban_user(UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_unban_user(UUID, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 6. admin_set_setting
-- Admin only. Updates whitelisted app_settings key with strict type/range check
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_set_setting(
    p_key    TEXT,
    p_value  TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_old_val JSONB;
    v_new_val JSONB;
    v_int_val INT;
BEGIN
    PERFORM public.require_admin();

    IF length(trim(COALESCE(p_reason, ''))) < 5 THEN
        RAISE EXCEPTION 'A valid reason of at least 5 characters is required' USING ERRCODE = 'MB400';
    END IF;

    -- Whitelist validation
    CASE p_key
        WHEN 'auto_hide_report_threshold' THEN
            v_int_val := p_value::INT;
            IF v_int_val < 2 OR v_int_val > 10 THEN
                RAISE EXCEPTION 'auto_hide_report_threshold must be between 2 and 10' USING ERRCODE = 'MB400';
            END IF;
            v_new_val := to_jsonb(v_int_val);

        WHEN 'max_active_ads' THEN
            v_int_val := p_value::INT;
            IF v_int_val < 1 OR v_int_val > 50 THEN
                RAISE EXCEPTION 'max_active_ads must be between 1 and 50' USING ERRCODE = 'MB400';
            END IF;
            v_new_val := to_jsonb(v_int_val);

        WHEN 'spam_enforcement' THEN
            IF lower(trim(p_value)) NOT IN ('true', 'false') THEN
                RAISE EXCEPTION 'spam_enforcement must be "true" or "false"' USING ERRCODE = 'MB400';
            END IF;
            v_new_val := to_jsonb(lower(trim(p_value)) = 'true');

        WHEN 'spam_flag_score_threshold' THEN
            v_int_val := p_value::INT;
            IF v_int_val < 5 OR v_int_val > 100 THEN
                RAISE EXCEPTION 'spam_flag_score_threshold must be between 5 and 100' USING ERRCODE = 'MB400';
            END IF;
            v_new_val := to_jsonb(v_int_val);

        ELSE
            RAISE EXCEPTION 'Setting key "%" is not in the editable whitelist', p_key USING ERRCODE = 'MB400';
    END CASE;

    SELECT value INTO v_old_val FROM public.app_settings WHERE key = p_key;

    INSERT INTO public.app_settings (key, value)
    VALUES (p_key, v_new_val)
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value;

    PERFORM public.log_admin_action(
        'set_setting',
        'setting',
        p_key,
        trim(p_reason),
        jsonb_build_object('old_value', v_old_val, 'new_value', v_new_val)
    );

    RETURN jsonb_build_object(
        'success', true,
        'key', p_key,
        'old_value', v_old_val,
        'new_value', v_new_val
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_set_setting(TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_set_setting(TEXT, TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_set_setting(TEXT, TEXT, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 7. admin_upsert_blocked_term & admin_disable_blocked_term
-- Admin only.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_upsert_blocked_term(
    p_term   TEXT,
    p_kind   TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_term TEXT;
    v_id         UUID;
BEGIN
    PERFORM public.require_admin();

    v_clean_term := lower(trim(COALESCE(p_term, '')));
    IF length(v_clean_term) < 2 THEN
        RAISE EXCEPTION 'Term must be at least 2 characters' USING ERRCODE = 'MB400';
    END IF;

    IF p_kind NOT IN ('block', 'flag') THEN
        RAISE EXCEPTION 'Term kind must be "block" or "flag"' USING ERRCODE = 'MB400';
    END IF;

    INSERT INTO public.blocked_terms (term, kind, is_active)
    VALUES (v_clean_term, p_kind, true)
    ON CONFLICT (term) DO UPDATE
    SET kind      = EXCLUDED.kind,
        is_active = true
    RETURNING id INTO v_id;

    PERFORM public.log_admin_action(
        'upsert_term',
        'term',
        v_id::text,
        p_reason,
        jsonb_build_object('term', v_clean_term, 'kind', p_kind)
    );

    RETURN jsonb_build_object('success', true, 'id', v_id, 'term', v_clean_term, 'kind', p_kind);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_upsert_blocked_term(TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_upsert_blocked_term(TEXT, TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_upsert_blocked_term(TEXT, TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_disable_blocked_term(
    p_id     UUID,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_term TEXT;
BEGIN
    PERFORM public.require_admin();

    UPDATE public.blocked_terms
    SET is_active = false
    WHERE id = p_id
    RETURNING term INTO v_term;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'Term not found');
    END IF;

    PERFORM public.log_admin_action(
        'disable_term',
        'term',
        p_id::text,
        p_reason,
        jsonb_build_object('term', v_term)
    );

    RETURN jsonb_build_object('success', true, 'id', p_id, 'term', v_term);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_disable_blocked_term(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_disable_blocked_term(UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_disable_blocked_term(UUID, TEXT) TO authenticated;

