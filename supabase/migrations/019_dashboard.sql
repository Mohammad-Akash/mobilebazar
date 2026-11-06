-- ==============================================================================
-- Migration 019: Dashboard RPCs, replace_ad_images, renew_ad limit, favorites cap, pg_cron
-- Safe to re-run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. replace_ad_images(p_ad_id, p_paths text[])
-- Replaces all images of an ad in a single atomic transaction.
-- Guarantees 0-indexed positions without constraint conflicts.
-- Returns text[] of removed paths so storage files can be cleaned up.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.replace_ad_images(
    p_ad_id UUID,
    p_paths TEXT[]
)
RETURNS TEXT[]
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status ad_status;
    v_removed_paths TEXT[] := ARRAY[]::TEXT[];
    v_path TEXT;
    v_index INT := 0;
BEGIN
    -- 1. Authentication check
    IF (SELECT auth.uid()) IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;

    -- 2. Verify ad existence, ownership, status and ban
    SELECT seller_id, status INTO v_seller_id, v_status
    FROM public.ads WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_seller_id != (SELECT auth.uid()) THEN
        RAISE EXCEPTION 'You are not authorized to modify images for this ad';
    END IF;

    IF v_status != 'active' THEN
        RAISE EXCEPTION 'Only active ads can have their images modified';
    END IF;

    IF public.is_banned() THEN
        RAISE EXCEPTION 'Banned users cannot modify images';
    END IF;

    -- 3. Validate image count (1 to 8)
    IF p_paths IS NULL OR array_length(p_paths, 1) IS NULL OR array_length(p_paths, 1) < 1 THEN
        RAISE EXCEPTION 'An ad must have at least 1 image';
    END IF;

    IF array_length(p_paths, 1) > 8 THEN
        RAISE EXCEPTION 'Maximum 8 images allowed per ad';
    END IF;

    -- 4. Validate that all paths belong to caller's directory
    FOREACH v_path IN ARRAY p_paths LOOP
        IF v_path IS NULL OR trim(v_path) = '' THEN
            RAISE EXCEPTION 'Invalid empty image path';
        END IF;
        IF NOT (v_path LIKE ((SELECT auth.uid())::text || '/%')) THEN
            RAISE EXCEPTION 'Permission denied: image path must belong to your user directory';
        END IF;
    END LOOP;

    -- 5. Collect removed paths
    SELECT COALESCE(array_agg(storage_path), ARRAY[]::TEXT[])
    INTO v_removed_paths
    FROM public.ad_images
    WHERE ad_id = p_ad_id
      AND storage_path != ALL(p_paths);

    -- 6. Atomically delete old rows and insert new ones
    DELETE FROM public.ad_images WHERE ad_id = p_ad_id;

    FOREACH v_path IN ARRAY p_paths LOOP
        INSERT INTO public.ad_images (ad_id, storage_path, position)
        VALUES (p_ad_id, v_path, v_index);
        v_index := v_index + 1;
    END LOOP;

    RETURN v_removed_paths;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.replace_ad_images(UUID, TEXT[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.replace_ad_images(UUID, TEXT[]) TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. Enhanced renew_ad(p_ad_id) with 10 Active Ads Limit Enforcement
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.renew_ad(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status ad_status;
    v_active_count INT;
BEGIN
    IF public.is_banned() THEN
        RAISE EXCEPTION 'Banned users cannot renew ads';
    END IF;

    SELECT seller_id, status INTO v_seller_id, v_status
    FROM public.ads WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_seller_id != (SELECT auth.uid()) THEN
        RAISE EXCEPTION 'You are not authorized to renew this ad';
    END IF;

    IF v_status NOT IN ('expired', 'sold') THEN
        RAISE EXCEPTION 'Only expired or sold ads can be renewed. Deleted ads cannot be renewed.';
    END IF;

    -- Enforce Max 10 Active Ads limit on repost
    SELECT count(*) INTO v_active_count
    FROM public.ads
    WHERE seller_id = (SELECT auth.uid())
      AND status = 'active';

    IF v_active_count >= 10 THEN
        RAISE EXCEPTION 'User active ads limit exceeded: Maximum 10 active ads allowed. Please mark sold or delete an existing ad first.';
    END IF;

    UPDATE public.ads 
    SET status = 'active',
        published_at = now(),
        expires_at = now() + interval '30 days',
        sold_at = NULL,
        deleted_at = NULL,
        updated_at = now()
    WHERE id = p_ad_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.renew_ad(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_ad(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 3. get_my_ad_counts() RPC
-- Returns count of Active, Sold and Expired ads for the current user
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_my_ad_counts()
RETURNS TABLE (
    active_count BIGINT,
    sold_count BIGINT,
    expired_count BIGINT
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    SELECT 
        COUNT(*) FILTER (WHERE status = 'active') AS active_count,
        COUNT(*) FILTER (WHERE status = 'sold') AS sold_count,
        COUNT(*) FILTER (WHERE status = 'expired') AS expired_count
    FROM public.ads
    WHERE seller_id = (SELECT auth.uid());
$$;

GRANT EXECUTE ON FUNCTION public.get_my_ad_counts() TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. Dashboard Query Index: (seller_id, status, created_at DESC, id DESC)
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_ads_dashboard 
    ON public.ads (seller_id, status, created_at DESC, id DESC);

-- ------------------------------------------------------------------------------
-- 5. Favorites Cap: 200 Max per user
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_favorites_cap()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM public.favorites WHERE user_id = NEW.user_id) >= 200 THEN
        RAISE EXCEPTION 'Aap 200 se zyada ads favorite nahi kar sakte. Pehle purane favorites mein se kuch hatayein.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS trigger_check_favorites_cap ON public.favorites;
CREATE TRIGGER trigger_check_favorites_cap
    BEFORE INSERT ON public.favorites
    FOR EACH ROW
    EXECUTE FUNCTION public.check_favorites_cap();

-- ------------------------------------------------------------------------------
-- 6. pg_cron Scheduled Hourly Expiry
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
        -- Remove existing schedule if already registered
        PERFORM cron.unschedule('hourly-mark-expired-ads') 
        WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'hourly-mark-expired-ads');

        -- Schedule hourly at minute 0 (0 * * * *)
        PERFORM cron.schedule(
            'hourly-mark-expired-ads',
            '0 * * * *',
            'SELECT public.mark_expired_ads();'
        );
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'pg_cron extension requires superuser privileges in Supabase dashboard.';
END $$;

