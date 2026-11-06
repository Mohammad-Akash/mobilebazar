-- ==============================================================================
-- Migration 014: RLS Policies for Favorites, Reports & Secure Active Ads View
-- Safe to re-run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. RLS Policies: public.favorites
-- ------------------------------------------------------------------------------

-- SELECT: User can view their own saved ads, staff can view for support
DROP POLICY IF EXISTS "Favorites select policy" ON favorites;
CREATE POLICY "Favorites select policy"
    ON favorites
    FOR SELECT
    USING (
        user_id = (SELECT auth.uid())
        OR public.is_staff()
    );

-- INSERT: User can only favorite active ads, cannot insert if banned
DROP POLICY IF EXISTS "Favorites insert policy" ON favorites;
CREATE POLICY "Favorites insert policy"
    ON favorites
    FOR INSERT
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND NOT public.is_banned()
        AND EXISTS (
            SELECT 1 FROM ads
            WHERE ads.id = favorites.ad_id
              AND ads.status = 'active'
        )
    );

-- DELETE: User can remove their own favorites
DROP POLICY IF EXISTS "Favorites delete policy" ON favorites;
CREATE POLICY "Favorites delete policy"
    ON favorites
    FOR DELETE
    USING (
        user_id = (SELECT auth.uid())
    );

-- ------------------------------------------------------------------------------
-- 2. RLS Policies: public.reports
-- ------------------------------------------------------------------------------

-- SELECT: Reporter can view their submitted reports, staff can view all reports
DROP POLICY IF EXISTS "Reports select policy" ON reports;
CREATE POLICY "Reports select policy"
    ON reports
    FOR SELECT
    USING (
        reporter_id = (SELECT auth.uid())
        OR public.is_staff()
    );

-- INSERT: Authenticated non-banned user can report active ads (cannot report own ad)
DROP POLICY IF EXISTS "Reports insert policy" ON reports;
CREATE POLICY "Reports insert policy"
    ON reports
    FOR INSERT
    WITH CHECK (
        reporter_id = (SELECT auth.uid())
        AND NOT public.is_banned()
        AND EXISTS (
            SELECT 1 FROM ads
            WHERE ads.id = reports.ad_id
              AND ads.status = 'active'
              AND ads.seller_id != (SELECT auth.uid())
        )
    );

-- Note: Normal users have no UPDATE or DELETE on reports (moderators review via RPC in Phase 8)

-- ------------------------------------------------------------------------------
-- 3. Recreate active_ads_view WITH (security_invoker = true)
-- ------------------------------------------------------------------------------
DROP VIEW IF EXISTS active_ads_view;

CREATE VIEW active_ads_view WITH (security_invoker = true) AS
SELECT 
    a.id,
    a.seller_id,
    p.full_name AS seller_name,
    p.avatar_url AS seller_avatar,
    a.title,
    a.description,
    a.price,
    a.is_negotiable,
    a.condition,
    a.pta_status,
    a.storage_gb,
    a.ram_gb,
    a.color,
    a.battery_health,
    a.has_box,
    a.has_accessories,
    a.warranty_type,
    a.warranty_months_remaining,
    a.contact_preference,
    a.status,
    a.is_featured,
    a.views_count,
    a.favorites_count,
    a.published_at,
    a.created_at,
    b.id AS brand_id,
    b.name AS brand_name,
    b.slug AS brand_slug,
    m.id AS model_id,
    m.name AS model_name,
    m.slug AS model_slug,
    c.id AS city_id,
    c.name AS city_name,
    c.slug AS city_slug,
    ar.id AS area_id,
    ar.name AS area_name,
    ar.slug AS area_slug,
    img.storage_path AS cover_image_path
FROM ads a
JOIN profiles p ON a.seller_id = p.id
JOIN brands b ON a.brand_id = b.id
JOIN models m ON a.model_id = m.id
JOIN cities c ON a.city_id = c.id
LEFT JOIN areas ar ON a.area_id = ar.id
LEFT JOIN ad_images img ON img.ad_id = a.id AND img.position = 0
WHERE a.status = 'active';

GRANT SELECT ON active_ads_view TO anon, authenticated;

