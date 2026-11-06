-- ==============================================================================
-- Migration 024: Report Moderation — Auto-hide, delete_ad update, RLS refresh,
--                active_ads_view enhancement, and helper queries.
-- Prerequisites: Migration 023 must be committed first (ad_status 'under_review'
--               must already exist in the enum before this transaction runs).
-- ==============================================================================


-- =============================================================================
-- SECTION 1: Auto-hide trigger on reports table
-- =============================================================================
-- When a new report is inserted, count DISTINCT reporters for that ad.
-- If the count reaches (or exceeds) the 'auto_hide_report_threshold' setting
-- (default 3), flip the ad's status from 'active' → 'under_review'.
-- Only active ads are affected; sold/expired/deleted ads are left untouched.

CREATE OR REPLACE FUNCTION public.check_auto_hide_ad()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_pending_reporter_count INT;
    v_threshold              INT;
BEGIN
    -- Count unique reporters with pending reports against this ad
    SELECT COUNT(DISTINCT reporter_id)
    INTO   v_pending_reporter_count
    FROM   reports
    WHERE  ad_id  = NEW.ad_id
      AND  status = 'pending';

    -- Read threshold from app_settings (default: 3)
    v_threshold := public.get_setting_int('auto_hide_report_threshold', 3);

    IF v_pending_reporter_count >= v_threshold THEN
        -- Only hide the ad if it is currently active;
        -- never override sold, expired, deleted, or already-under_review status.
        UPDATE ads
        SET    status     = 'under_review',
               updated_at = now()
        WHERE  id     = NEW.ad_id
          AND  status = 'active';
    END IF;

    RETURN NEW;
END;
$$;

-- Lock down execution: only the trigger (running as the table owner) should call this
REVOKE EXECUTE ON FUNCTION public.check_auto_hide_ad() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_auto_hide_ad() FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_auto_hide_ad() FROM authenticated;

-- Attach the trigger (runs after every insert on reports)
DROP TRIGGER IF EXISTS trigger_auto_hide_reported_ad ON reports;
CREATE TRIGGER trigger_auto_hide_reported_ad
    AFTER INSERT ON reports
    FOR EACH ROW
    EXECUTE FUNCTION public.check_auto_hide_ad();


-- =============================================================================
-- SECTION 2: Update delete_ad function to allow deleting 'under_review' ads
-- =============================================================================
-- Original (migration 013): allowed 'active', 'sold', 'expired'.
-- Now also allows 'under_review' so a seller can remove a reported listing
-- without waiting for moderation.
-- Error messages follow the project convention: English / Roman Urdu mix.

CREATE OR REPLACE FUNCTION public.delete_ad(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status    ad_status;
BEGIN
    -- Fetch current owner and status
    SELECT seller_id, status
    INTO   v_seller_id, v_status
    FROM   ads
    WHERE  id = p_ad_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Ad nahi mila — Ad not found (id: %)', p_ad_id;
    END IF;

    -- Only the owner or staff may delete
    IF v_seller_id <> auth.uid() AND NOT public.is_staff() THEN
        RAISE EXCEPTION 'Permission denied — Yeh ad sirf owner ya staff delete kar sakta hai';
    END IF;

    -- Guard: must be in a deletable state
    -- 'under_review' is now also deletable (seller can remove reported listing)
    IF v_status NOT IN ('active', 'sold', 'expired', 'under_review') THEN
        RAISE EXCEPTION 'Ad delete nahi ho sakta — current status is "%" (must be active, sold, expired, or under_review)', v_status;
    END IF;

    -- Soft-delete: set status to 'deleted'
    UPDATE ads
    SET    status     = 'deleted',
           updated_at = now()
    WHERE  id = p_ad_id;

    -- Profile ads_count is maintained by the existing trigger;
    -- no manual decrement needed here.
END;
$$;

-- Restrict direct RPC invocation to authenticated users only
REVOKE EXECUTE ON FUNCTION public.delete_ad(UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.delete_ad(UUID) FROM anon;
GRANT  EXECUTE ON FUNCTION public.delete_ad(UUID) TO authenticated;


-- =============================================================================
-- SECTION 3: Refresh "Ads select policy" on ads table
-- =============================================================================
-- The existing policy already works correctly for 'under_review':
--   • status = 'active'           → visible to everyone
--   • seller_id = auth.uid()      → owner can always see their own ads
--                                   (covers under_review for the owner ✓)
--   • public.is_staff()           → staff can see everything
--   • public.has_favorited(id)    → users who favorited can still see it
-- Under_review ads are therefore invisible to the public (not active)
-- but remain visible to their owner and staff — exactly what we want.
-- We recreate the policy here to make the intent explicit and to keep
-- the migration history self-contained.

DROP POLICY IF EXISTS "Ads select policy" ON ads;
CREATE POLICY "Ads select policy" ON ads
    FOR SELECT
    USING (
        status = 'active'
        OR seller_id = (SELECT auth.uid())   -- owner sees all their own ads incl. under_review
        OR public.is_staff()                 -- staff sees everything
        OR public.has_favorited(id)          -- favorited ads stay visible to the user who liked them
    );


-- =============================================================================
-- SECTION 4: Recreate active_ads_view — add seller_is_phone_verified
-- =============================================================================
-- Added: p.is_phone_verified AS seller_is_phone_verified
-- (is_phone_verified was added to profiles in migration 021)
-- WHERE clause (status = 'active') already excludes 'under_review' ads ✓

CREATE OR REPLACE VIEW public.active_ads_view AS
SELECT
    a.id,
    a.seller_id,
    p.full_name                 AS seller_name,
    p.avatar_url                AS seller_avatar,
    p.is_phone_verified         AS seller_is_phone_verified,  -- NEW in migration 024
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
    b.id                        AS brand_id,
    b.name                      AS brand_name,
    b.slug                      AS brand_slug,
    m.id                        AS model_id,
    m.name                      AS model_name,
    m.slug                      AS model_slug,
    c.id                        AS city_id,
    c.name                      AS city_name,
    c.slug                      AS city_slug,
    ar.id                       AS area_id,
    ar.name                     AS area_name,
    ar.slug                     AS area_slug,
    img.storage_path            AS cover_image_path
FROM       ads          a
JOIN       profiles     p   ON a.seller_id  = p.id
JOIN       brands       b   ON a.brand_id   = b.id
JOIN       models       m   ON a.model_id   = m.id
JOIN       cities       c   ON a.city_id    = c.id
LEFT JOIN  areas        ar  ON a.area_id    = ar.id
LEFT JOIN  ad_images    img ON img.ad_id    = a.id AND img.position = 0
WHERE  a.status = 'active';


-- =============================================================================
-- SECTION 5: SQL helper queries (manual use until admin panel — Phase 8)
-- =============================================================================

-- View pending reports grouped by ad (sorted by most-reported first):
-- SELECT ad_id, COUNT(*) AS report_count, array_agg(reason) AS reasons
-- FROM   reports
-- WHERE  status = 'pending'
-- GROUP  BY ad_id
-- ORDER  BY report_count DESC;

-- Restore an under_review ad to active and mark its pending reports as reviewed:
-- UPDATE ads
-- SET    status = 'active', updated_at = now()
-- WHERE  id = '<ad-uuid>';
--
-- UPDATE reports
-- SET    status      = 'reviewed',
--        reviewed_at = now(),
--        reviewed_by = auth.uid()   -- run as staff user
-- WHERE  ad_id  = '<ad-uuid>'
--   AND  status = 'pending';


-- =============================================================================
-- SECTION 6: SQL TESTS (run manually or in a test transaction — ROLLBACK after)
-- =============================================================================

-- ── TEST 1: 3 reports on same ad → ad becomes 'under_review' ─────────────────
-- BEGIN;
--
-- -- Create a fresh active ad (use real UUIDs from your dev DB)
-- UPDATE ads SET status = 'active' WHERE id = '<test-ad-uuid>';
--
-- -- Simulate 3 distinct users reporting it
-- INSERT INTO reports (ad_id, reporter_id, reason) VALUES
--   ('<test-ad-uuid>', '<user-1-uuid>', 'spam'),
--   ('<test-ad-uuid>', '<user-2-uuid>', 'fraud'),
--   ('<test-ad-uuid>', '<user-3-uuid>', 'spam');
--
-- -- Verify: should be 'under_review'
-- SELECT id, status FROM ads WHERE id = '<test-ad-uuid>';
-- -- Expected: status = 'under_review'
--
-- ROLLBACK;

-- ── TEST 2: Owner can still see under_review ad (RLS) ────────────────────────
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "<seller-uuid>"}';
-- SELECT id, status FROM ads WHERE id = '<test-ad-uuid>';
-- -- Expected: 1 row returned (seller_id = auth.uid() covers it)

-- ── TEST 3: Public (anon) cannot see under_review ad ─────────────────────────
-- SET LOCAL role TO anon;
-- SELECT id, status FROM ads WHERE id = '<test-ad-uuid>';
-- -- Expected: 0 rows returned (status ≠ 'active', not owner, not staff)

-- ── TEST 4: delete_ad on under_review ad works ───────────────────────────────
-- BEGIN;
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "<seller-uuid>"}';
-- SELECT public.delete_ad('<test-ad-uuid>');
-- SELECT id, status FROM ads WHERE id = '<test-ad-uuid>';
-- -- Expected: status = 'deleted'
-- ROLLBACK;

-- ── TEST 5: renew_ad on under_review ad should FAIL ──────────────────────────
-- (renew_ad from migration 021 only allows 'expired' or 'sold')
-- BEGIN;
-- SET LOCAL role TO authenticated;
-- SET LOCAL request.jwt.claims TO '{"sub": "<seller-uuid>"}';
-- UPDATE ads SET status = 'under_review' WHERE id = '<test-ad-uuid>';
-- SELECT public.renew_ad('<test-ad-uuid>');
-- -- Expected: EXCEPTION — "... status must be expired or sold ..."
-- ROLLBACK;
