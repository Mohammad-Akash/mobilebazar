-- ==============================================================================
-- Migration 038: Allow Viewing Sold & Expired Ads in Listing & In-App Chat
-- ==============================================================================
-- Fixes: "Phone Not Found (404)" when opening chat or viewing an ad that is marked as 'sold' or 'expired'.
-- 1. Updates "Ads select policy" so that:
--    - Active, Sold, and Expired ads can be read by public / buyers.
--    - Any participant of a conversation (buyer or seller) can always read the ad.
-- 2. Updates "Ad images select policy" to match the ads policy.
-- ==============================================================================

-- 1. Update Ads select policy
DROP POLICY IF EXISTS "Ads select policy" ON public.ads;

CREATE POLICY "Ads select policy" ON public.ads
    FOR SELECT
    USING (
        status IN ('active', 'sold', 'expired')
        OR seller_id = (SELECT auth.uid())
        OR public.is_staff()
        OR public.has_favorited(id)
        OR EXISTS (
            SELECT 1 FROM public.conversations c
            WHERE c.ad_id = ads.id
              AND (c.buyer_id = (SELECT auth.uid()) OR c.seller_id = (SELECT auth.uid()))
        )
    );

-- 2. Update Ad images select policy
DROP POLICY IF EXISTS "Ad images select policy" ON public.ad_images;

CREATE POLICY "Ad images select policy" ON public.ad_images
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.ads
            WHERE ads.id = ad_images.ad_id
              AND (
                  ads.status IN ('active', 'sold', 'expired')
                  OR ads.seller_id = (SELECT auth.uid())
                  OR public.is_staff()
                  OR public.has_favorited(ads.id)
                  OR EXISTS (
                      SELECT 1 FROM public.conversations c
                      WHERE c.ad_id = ads.id
                        AND (c.buyer_id = (SELECT auth.uid()) OR c.seller_id = (SELECT auth.uid()))
                  )
              )
        )
    );
