-- ==============================================================================
-- Migration 013: RLS Policies for Ads, Images, Private IMEI & Lifecycle RPCs
-- Safe to re-run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Helper Function: Check if user favorited an ad (Avoids RLS permission error for anon)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.has_favorited(p_ad_id UUID)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
BEGIN
    IF (SELECT auth.uid()) IS NULL THEN
        RETURN false;
    END IF;
    RETURN EXISTS (
        SELECT 1 FROM public.favorites
        WHERE ad_id = p_ad_id
          AND user_id = (SELECT auth.uid())
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.has_favorited(UUID) TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 2. RLS Policies: public.ads
-- ------------------------------------------------------------------------------

-- SELECT: Public sees active ads; Owner sees own in any status; Staff sees all; Users see ads in their favorites
DROP POLICY IF EXISTS "Ads select policy" ON ads;
CREATE POLICY "Ads select policy"
    ON ads
    FOR SELECT
    USING (
        status = 'active'
        OR seller_id = (SELECT auth.uid())
        OR public.is_staff()
        OR public.has_favorited(id)
    );

-- INSERT: Authenticated users can create an active ad for themselves (blocked if banned)
DROP POLICY IF EXISTS "Users can insert own ads" ON ads;
CREATE POLICY "Users can insert own ads"
    ON ads
    FOR INSERT
    WITH CHECK (
        seller_id = (SELECT auth.uid())
        AND NOT public.is_banned()
    );

-- UPDATE: Owner can only update their own ACTIVE ad (blocked if banned)
DROP POLICY IF EXISTS "Users can update own active ads" ON ads;
CREATE POLICY "Users can update own active ads"
    ON ads
    FOR UPDATE
    USING (
        seller_id = (SELECT auth.uid())
        AND status = 'active'
        AND NOT public.is_banned()
    )
    WITH CHECK (
        seller_id = (SELECT auth.uid())
        AND status = 'active'
    );

-- Note: No DELETE policy on ads (soft deletes are performed exclusively through RPC)

-- ------------------------------------------------------------------------------
-- 3. RLS Policies: public.ad_private (IMEI)
-- ------------------------------------------------------------------------------

-- SELECT: Only ad owner or staff can see IMEI
DROP POLICY IF EXISTS "Ad private select policy" ON ad_private;
CREATE POLICY "Ad private select policy"
    ON ad_private
    FOR SELECT
    USING (
        public.is_staff()
        OR EXISTS (
            SELECT 1 FROM ads 
            WHERE ads.id = ad_private.ad_id 
              AND ads.seller_id = (SELECT auth.uid())
        )
    );

-- INSERT: Owner can insert IMEI for their own ad
DROP POLICY IF EXISTS "Ad private insert policy" ON ad_private;
CREATE POLICY "Ad private insert policy"
    ON ad_private
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM ads 
            WHERE ads.id = ad_private.ad_id 
              AND ads.seller_id = (SELECT auth.uid())
              AND NOT public.is_banned()
        )
    );

-- UPDATE: Owner can update IMEI on their own ad
DROP POLICY IF EXISTS "Ad private update policy" ON ad_private;
CREATE POLICY "Ad private update policy"
    ON ad_private
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM ads 
            WHERE ads.id = ad_private.ad_id 
              AND ads.seller_id = (SELECT auth.uid())
              AND NOT public.is_banned()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM ads 
            WHERE ads.id = ad_private.ad_id 
              AND ads.seller_id = (SELECT auth.uid())
        )
    );

-- DELETE: Owner can delete private row
DROP POLICY IF EXISTS "Ad private delete policy" ON ad_private;
CREATE POLICY "Ad private delete policy"
    ON ad_private
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM ads 
            WHERE ads.id = ad_private.ad_id 
              AND ads.seller_id = (SELECT auth.uid())
        )
    );

-- ------------------------------------------------------------------------------
-- 4. RLS Policies: public.ad_images
-- ------------------------------------------------------------------------------

-- SELECT: Viewable if ad is active, user is owner, staff, or ad is in user's favorites
DROP POLICY IF EXISTS "Ad images select policy" ON ad_images;
CREATE POLICY "Ad images select policy"
    ON ad_images
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM ads
            WHERE ads.id = ad_images.ad_id
              AND (
                  ads.status = 'active'
                  OR ads.seller_id = (SELECT auth.uid())
                  OR public.is_staff()
                  OR public.has_favorited(ads.id)
              )
        )
    );

-- INSERT: Owner can insert image, must be active ad, and storage path must start with user's ID
DROP POLICY IF EXISTS "Ad images insert policy" ON ad_images;
CREATE POLICY "Ad images insert policy"
    ON ad_images
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM ads
            WHERE ads.id = ad_images.ad_id
              AND ads.seller_id = (SELECT auth.uid())
              AND ads.status = 'active'
              AND NOT public.is_banned()
        )
        AND storage_path LIKE ((SELECT auth.uid())::text || '/%')
    );

-- UPDATE: Owner can re-order position, path must belong to user
DROP POLICY IF EXISTS "Ad images update policy" ON ad_images;
CREATE POLICY "Ad images update policy"
    ON ad_images
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM ads
            WHERE ads.id = ad_images.ad_id
              AND ads.seller_id = (SELECT auth.uid())
              AND ads.status = 'active'
              AND NOT public.is_banned()
        )
    )
    WITH CHECK (
        storage_path LIKE ((SELECT auth.uid())::text || '/%')
    );

-- DELETE: Owner can delete image from their own ad
DROP POLICY IF EXISTS "Ad images delete policy" ON ad_images;
CREATE POLICY "Ad images delete policy"
    ON ad_images
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM ads
            WHERE ads.id = ad_images.ad_id
              AND ads.seller_id = (SELECT auth.uid())
              AND NOT public.is_banned()
        )
    );

-- ------------------------------------------------------------------------------
-- 5. Lifecycle RPC Functions (Mark Sold, Delete Ad, Renew Ad)
-- ------------------------------------------------------------------------------

-- Function 1: Mark ad as sold (Owner only, only if active)
CREATE OR REPLACE FUNCTION public.mark_ad_sold(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status ad_status;
BEGIN
    SELECT seller_id, status INTO v_seller_id, v_status
    FROM ads WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_seller_id != (SELECT auth.uid()) THEN
        RAISE EXCEPTION 'You are not authorized to mark this ad as sold';
    END IF;

    IF v_status != 'active' THEN
        RAISE EXCEPTION 'Only active ads can be marked as sold';
    END IF;

    UPDATE ads 
    SET status = 'sold',
        sold_at = now(),
        updated_at = now()
    WHERE id = p_ad_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.mark_ad_sold(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_ad_sold(UUID) TO authenticated;

-- Function 2: Soft delete ad (Owner only, from active, sold, or expired)
CREATE OR REPLACE FUNCTION public.delete_ad(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status ad_status;
BEGIN
    SELECT seller_id, status INTO v_seller_id, v_status
    FROM ads WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_seller_id != (SELECT auth.uid()) THEN
        RAISE EXCEPTION 'You are not authorized to delete this ad';
    END IF;

    IF v_status NOT IN ('active', 'sold', 'expired') THEN
        RAISE EXCEPTION 'Ad is already deleted or cannot be deleted';
    END IF;

    UPDATE ads 
    SET status = 'deleted',
        deleted_at = now(),
        updated_at = now()
    WHERE id = p_ad_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.delete_ad(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_ad(UUID) TO authenticated;

-- Function 3: Renew / Re-activate ad (Owner only, from expired or sold; NEVER deleted)
CREATE OR REPLACE FUNCTION public.renew_ad(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status ad_status;
BEGIN
    IF public.is_banned() THEN
        RAISE EXCEPTION 'Banned users cannot renew ads';
    END IF;

    SELECT seller_id, status INTO v_seller_id, v_status
    FROM ads WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_seller_id != (SELECT auth.uid()) THEN
        RAISE EXCEPTION 'You are not authorized to renew this ad';
    END IF;

    IF v_status NOT IN ('expired', 'sold') THEN
        RAISE EXCEPTION 'Only expired or sold ads can be renewed. Deleted ads cannot be renewed.';
    END IF;

    UPDATE ads 
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

