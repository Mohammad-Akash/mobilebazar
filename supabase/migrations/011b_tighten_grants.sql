-- ==============================================================================
-- Migration 011b: Tighten Column-Level Grants (Reports, Images, Private, Favorites)
-- Safe to re-run
-- ==============================================================================

-- 1. Reports: User can only insert report details (cannot set status or reviewed_by)
REVOKE INSERT ON reports FROM authenticated;
GRANT INSERT (ad_id, reporter_id, reason, details) ON reports TO authenticated;

-- 2. Ad Images: User can only insert storage_path/position (cannot change ad_id on update)
REVOKE INSERT, UPDATE ON ad_images FROM authenticated;
GRANT INSERT (ad_id, storage_path, position) ON ad_images TO authenticated;
GRANT UPDATE (storage_path, position) ON ad_images TO authenticated;

-- 3. Ad Private: Restrict columns (ad_id cannot be altered)
REVOKE INSERT, UPDATE ON ad_private FROM authenticated;
GRANT INSERT (ad_id, imei) ON ad_private TO authenticated;
GRANT UPDATE (imei) ON ad_private TO authenticated;

-- 4. Favorites: Explicit column grant for insert
REVOKE INSERT ON favorites FROM authenticated;
GRANT INSERT (user_id, ad_id) ON favorites TO authenticated;

