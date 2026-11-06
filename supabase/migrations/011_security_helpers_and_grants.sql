-- ==============================================================================
-- Migration 011: Security Helpers & Privilege Lockdown (Column-Level Grants)
-- Safe to re-run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Helper Functions (SECURITY DEFINER, STABLE, search_path = public)
-- ------------------------------------------------------------------------------

-- Check if current user is moderator or admin
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profile_private
        WHERE id = (SELECT auth.uid())
          AND role IN ('moderator', 'admin')
          AND is_banned = false
    );
END;
$$;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profile_private
        WHERE id = (SELECT auth.uid())
          AND role = 'admin'
          AND is_banned = false
    );
END;
$$;

-- Check if current user is banned
CREATE OR REPLACE FUNCTION is_banned()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN COALESCE(
        (SELECT is_banned FROM profile_private WHERE id = (SELECT auth.uid())),
        false
    );
END;
$$;

-- Allow anon and authenticated to execute helper functions (needed by RLS policies)
GRANT EXECUTE ON FUNCTION is_staff() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION is_banned() TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 2. Phone Squatting Fix: Unique only when phone is verified
-- ------------------------------------------------------------------------------
DROP INDEX IF EXISTS idx_profile_private_phone_unique;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_private_phone_verified_unique 
    ON profile_private(phone) 
    WHERE is_phone_verified = true;

-- ------------------------------------------------------------------------------
-- 3. REVOKE ALL Privileges on All Tables
-- ------------------------------------------------------------------------------
REVOKE ALL ON cities FROM anon, authenticated;
REVOKE ALL ON areas FROM anon, authenticated;
REVOKE ALL ON brands FROM anon, authenticated;
REVOKE ALL ON models FROM anon, authenticated;
REVOKE ALL ON profiles FROM anon, authenticated;
REVOKE ALL ON profile_private FROM anon, authenticated;
REVOKE ALL ON ads FROM anon, authenticated;
REVOKE ALL ON ad_private FROM anon, authenticated;
REVOKE ALL ON ad_images FROM anon, authenticated;
REVOKE ALL ON favorites FROM anon, authenticated;
REVOKE ALL ON reports FROM anon, authenticated;

-- ------------------------------------------------------------------------------
-- 4. Re-GRANT Strict Table & Column-Level Privileges
-- ------------------------------------------------------------------------------

-- Reference Tables: SELECT only for everyone
GRANT SELECT ON cities, areas, brands, models TO anon, authenticated;

-- Public Profiles: SELECT for everyone, UPDATE only on safe columns for authenticated
GRANT SELECT ON profiles TO anon, authenticated;
GRANT UPDATE (full_name, avatar_url, city_id) ON profiles TO authenticated;

-- Private Profiles: SELECT & UPDATE only on phone/whatsapp for authenticated
GRANT SELECT ON profile_private TO authenticated;
GRANT UPDATE (phone, whatsapp_number) ON profile_private TO authenticated;

-- Ads Table:
-- SELECT for everyone (filtered by RLS)
GRANT SELECT ON ads TO anon, authenticated;

-- Column-level INSERT: Only editable fields + seller_id (enforced by RLS to match auth.uid())
-- Note: id, status, is_featured, views_count, favorites_count, published_at, expires_at, etc. are NOT granted!
GRANT INSERT (
    seller_id,
    brand_id,
    model_id,
    city_id,
    area_id,
    title,
    description,
    price,
    is_negotiable,
    condition,
    pta_status,
    storage_gb,
    ram_gb,
    color,
    battery_health,
    has_box,
    has_accessories,
    warranty_type,
    warranty_months_remaining,
    contact_preference
) ON ads TO authenticated;

-- Column-level UPDATE: Only editable fields (seller_id, status, dates, counters CANNOT be updated directly)
GRANT UPDATE (
    brand_id,
    model_id,
    city_id,
    area_id,
    title,
    description,
    price,
    is_negotiable,
    condition,
    pta_status,
    storage_gb,
    ram_gb,
    color,
    battery_health,
    has_box,
    has_accessories,
    warranty_type,
    warranty_months_remaining,
    contact_preference
) ON ads TO authenticated;

-- Ad Private (IMEI): Full CRUD for authenticated (filtered by RLS to owner only)
GRANT SELECT, INSERT, UPDATE, DELETE ON ad_private TO authenticated;

-- Ad Images: SELECT for public, Full CRUD for authenticated (filtered by RLS to owner)
GRANT SELECT ON ad_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ad_images TO authenticated;

-- Favorites: SELECT, INSERT, DELETE for authenticated
GRANT SELECT, INSERT, DELETE ON favorites TO authenticated;

-- Reports: SELECT, INSERT for authenticated
GRANT SELECT, INSERT ON reports TO authenticated;

-- ------------------------------------------------------------------------------
-- 5. Secure Internal Functions (Prevent RPC execution via Supabase API)
-- ------------------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION check_ad_images_limit() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION update_ad_favorites_count() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION update_profile_ads_count() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION ads_generate_search_vector() FROM PUBLIC, anon, authenticated;

-- Allow RPC execution only where intended
GRANT EXECUTE ON FUNCTION increment_ad_views(UUID) TO anon, authenticated;

-- Background cron job only
REVOKE EXECUTE ON FUNCTION mark_expired_ads() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION mark_expired_ads() TO service_role;

