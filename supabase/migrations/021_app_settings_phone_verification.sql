-- ==============================================================================
-- Migration 021: app_settings + Phone Verification DB Layer
-- Includes:
--   1. app_settings table (all tunable limits)
--   2. Helper functions: get_setting_int(), get_setting_bool()
--   3. profiles.is_phone_verified public column
--   4. Auth trigger: auth.users → profile_private (phone sync + verified flag)
--   5. REVOKE UPDATE (phone) on profile_private (phone only via OTP now)
--   6. current_user_phone_verified() helper
--   7. ads INSERT policy update (requires verified phone)
--   8. get_seller_contact update (unverified seller = no contact)
--   9. ads expires_at default from app_settings
--  10. Backfill for existing verified users
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. app_settings Table
-- All tunable limits in one place — no redeployment needed to change them
-- RLS on, no direct access for anon or authenticated
-- Only SECURITY DEFINER functions can read this table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_settings (
    key   TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- No policies = no access for anyone except service_role + SECURITY DEFINER functions
REVOKE ALL ON public.app_settings FROM anon, authenticated;

-- Seed default settings (DO NOTHING if already set, so re-runs are safe)
INSERT INTO public.app_settings (key, value) VALUES
    ('ad_expiry_days',              '30'),
    ('max_active_ads',              '10'),
    ('max_ads_per_day',             '5'),
    ('min_report_account_age_days', '3'),
    ('max_reports_per_day',         '5'),
    ('auto_hide_report_threshold',  '3'),
    ('max_contact_reveals_per_day', '20'),
    ('renew_cooldown_hours',        '24'),
    ('spam_enforcement',            'false'),
    ('spam_flag_score_threshold',   '10'),
    ('spam_cheap_price_pct',        '40'),
    ('spam_min_samples',            '10'),
    ('spam_new_account_hours',      '24'),
    ('spam_expensive_threshold',    '80000')
ON CONFLICT (key) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 2. Helper Functions to Read app_settings
-- SECURITY DEFINER so triggers and policies can call them
-- NOT executable by anon or authenticated directly
-- ------------------------------------------------------------------------------

-- Integer setting with fallback default
CREATE OR REPLACE FUNCTION public.get_setting_int(p_key TEXT, p_default INT)
RETURNS INT
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
DECLARE
    v_val JSONB;
BEGIN
    SELECT value INTO v_val FROM public.app_settings WHERE key = p_key;
    IF v_val IS NULL THEN
        RETURN p_default;
    END IF;
    RETURN (v_val #>> '{}')::INT;
EXCEPTION
    WHEN OTHERS THEN
        RETURN p_default;
END;
$$;

-- Boolean setting with fallback default
CREATE OR REPLACE FUNCTION public.get_setting_bool(p_key TEXT, p_default BOOLEAN)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
DECLARE
    v_val JSONB;
BEGIN
    SELECT value INTO v_val FROM public.app_settings WHERE key = p_key;
    IF v_val IS NULL THEN
        RETURN p_default;
    END IF;
    RETURN (v_val #>> '{}')::BOOLEAN;
EXCEPTION
    WHEN OTHERS THEN
        RETURN p_default;
END;
$$;

-- Lock: not callable via Supabase API
REVOKE EXECUTE ON FUNCTION public.get_setting_int(TEXT, INT)      FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_setting_bool(TEXT, BOOLEAN)  FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------------------------
-- 3. profiles.is_phone_verified — Public Mirror Column
-- Trigger se maintain hoga. AdCard aur seller detail mein badge ke liye.
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS is_phone_verified BOOLEAN NOT NULL DEFAULT false;

-- ------------------------------------------------------------------------------
-- 4. Auth Trigger: auth.users → profile_private (Phone Sync)
-- Fires AFTER UPDATE of phone or phone_confirmed_at on auth.users
-- Supabase stores phone as "923001234567" (no +), we store "+923001234567"
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.sync_phone_verification()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
DECLARE
    v_formatted_phone TEXT;
BEGIN
    -- Phone confirmed → set verified = true and copy formatted phone
    IF NEW.phone IS NOT NULL AND NEW.phone_confirmed_at IS NOT NULL THEN
        -- Supabase stores without '+', we add it back
        v_formatted_phone := '+' || NEW.phone;

        BEGIN
            UPDATE public.profile_private
            SET
                phone             = v_formatted_phone,
                is_phone_verified = true,
                updated_at        = now()
            WHERE id = NEW.id;

            UPDATE public.profiles
            SET
                is_phone_verified = true,
                updated_at        = now()
            WHERE id = NEW.id;

        EXCEPTION
            -- Another account already has this verified phone
            WHEN unique_violation THEN
                -- Do not crash the auth flow; the app layer will handle the error
                -- by catching Supabase's error when verifyOtp returns a conflict
                NULL;
        END;

    -- Phone removed or changed to unconfirmed → reset verification
    ELSIF OLD.phone IS DISTINCT FROM NEW.phone
       OR (OLD.phone_confirmed_at IS NOT NULL AND NEW.phone_confirmed_at IS NULL)
    THEN
        UPDATE public.profile_private
        SET
            phone             = NULL,
            is_phone_verified = false,
            updated_at        = now()
        WHERE id = NEW.id;

        UPDATE public.profiles
        SET
            is_phone_verified = false,
            updated_at        = now()
        WHERE id = NEW.id;
    END IF;

    RETURN NEW;
END;
$$;

-- Attach to auth.users (safe to re-run: DROP IF EXISTS first)
DROP TRIGGER IF EXISTS on_auth_user_phone_verified ON auth.users;
CREATE TRIGGER on_auth_user_phone_verified
    AFTER UPDATE OF phone, phone_confirmed_at ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_phone_verification();

-- Lock: not callable via API
REVOKE EXECUTE ON FUNCTION public.sync_phone_verification() FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------------------------
-- 5. REVOKE UPDATE (phone) on profile_private
-- Phone can now ONLY be changed via OTP flow (trigger above)
-- whatsapp_number stays editable directly
-- Migration 011 granted UPDATE (phone, whatsapp_number) — we narrow it here
-- ------------------------------------------------------------------------------
REVOKE UPDATE (phone) ON public.profile_private FROM authenticated;
-- whatsapp_number grant remains (from migration 011)

-- ------------------------------------------------------------------------------
-- 6. current_user_phone_verified() — Helper for Policies and RPC Guards
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_user_phone_verified()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
STABLE
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN COALESCE(
        (
            SELECT is_phone_verified
            FROM public.profile_private
            WHERE id = (SELECT auth.uid())
        ),
        false
    );
END;
$$;

-- Needed by RLS policy on ads — grant to authenticated only
REVOKE EXECUTE ON FUNCTION public.current_user_phone_verified() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.current_user_phone_verified() TO authenticated;

-- ------------------------------------------------------------------------------
-- 7. Update ads INSERT Policy: Require Verified Phone
-- Replaces existing "Users can insert own ads" policy
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can insert own ads" ON public.ads;
CREATE POLICY "Users can insert own ads"
    ON public.ads
    FOR INSERT
    WITH CHECK (
        seller_id = (SELECT auth.uid())
        AND NOT public.is_banned()
        AND public.current_user_phone_verified()
    );

-- ------------------------------------------------------------------------------
-- 8. Update get_seller_contact: Require Verified Seller
-- Seller phone nahi hai ya verified nahi → empty result
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_seller_contact(p_ad_id UUID)
RETURNS TABLE (
    phone              TEXT,
    whatsapp_number    TEXT,
    contact_preference TEXT
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id  UUID;
    v_status     ad_status;
    v_pref       contact_preference;
    v_raw_phone  TEXT;
    v_raw_wa     TEXT;
    v_verified   BOOLEAN;
BEGIN
    -- 1. Auth required
    IF (SELECT auth.uid()) IS NULL THEN
        RAISE EXCEPTION 'Authentication required to view seller contact details';
    END IF;

    -- 2. Fetch ad
    SELECT seller_id, status, ads.contact_preference
    INTO v_seller_id, v_status, v_pref
    FROM public.ads
    WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_status != 'active' THEN
        RAISE EXCEPTION 'Seller contact is only available for active ads';
    END IF;

    -- 3. Fetch seller contact + verified flag
    SELECT pp.phone, pp.whatsapp_number, pp.is_phone_verified
    INTO v_raw_phone, v_raw_wa, v_verified
    FROM public.profile_private pp
    WHERE pp.id = v_seller_id;

    -- 4. Seller must have a verified phone to reveal contact
    IF NOT COALESCE(v_verified, false) THEN
        RAISE EXCEPTION 'Seller has not verified their phone number yet';
    END IF;

    -- 5. Return per contact_preference
    IF v_pref = 'phone' THEN
        RETURN QUERY SELECT v_raw_phone, NULL::TEXT, v_pref::TEXT;
    ELSIF v_pref = 'whatsapp' THEN
        RETURN QUERY SELECT NULL::TEXT, v_raw_wa, v_pref::TEXT;
    ELSE -- 'both'
        RETURN QUERY SELECT v_raw_phone, v_raw_wa, v_pref::TEXT;
    END IF;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_seller_contact(UUID) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.get_seller_contact(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 9. ads expires_at Default from app_settings
-- Old default: now() + interval '30 days'  (hardcoded)
-- New default: reads ad_expiry_days from app_settings at insert time
-- Existing active ads are NOT affected
-- ------------------------------------------------------------------------------
ALTER TABLE public.ads
    ALTER COLUMN expires_at
    SET DEFAULT (now() + (get_setting_int('ad_expiry_days', 30)::TEXT || ' days')::INTERVAL);

-- Also update renew_ad function to use app_settings for expiry
CREATE OR REPLACE FUNCTION public.renew_ad(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id    UUID;
    v_status       ad_status;
    v_published_at TIMESTAMPTZ;
    v_expiry_days  INT;
    v_cooldown_hrs INT;
BEGIN
    IF public.is_banned() THEN
        RAISE EXCEPTION 'Banned users cannot renew ads';
    END IF;

    SELECT seller_id, status, published_at
    INTO v_seller_id, v_status, v_published_at
    FROM public.ads WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_seller_id != (SELECT auth.uid()) THEN
        RAISE EXCEPTION 'You are not authorized to renew this ad';
    END IF;

    IF v_status NOT IN ('expired', 'sold') THEN
        RAISE EXCEPTION 'Only expired or sold ads can be renewed';
    END IF;

    -- 24-hour bump-spam protection (uses app_settings)
    v_cooldown_hrs := public.get_setting_int('renew_cooldown_hours', 24);
    IF v_published_at IS NOT NULL
       AND (now() - v_published_at) < (v_cooldown_hrs::TEXT || ' hours')::INTERVAL
    THEN
        RAISE EXCEPTION 'Bump sirf % ghante ke baad allowed hai. Abhi % ghante baki hain.',
            v_cooldown_hrs,
            CEIL(EXTRACT(EPOCH FROM ((v_published_at + (v_cooldown_hrs::TEXT || ' hours')::INTERVAL) - now())) / 3600);
    END IF;

    v_expiry_days := public.get_setting_int('ad_expiry_days', 30);

    UPDATE public.ads
    SET
        status     = 'active',
        published_at = now(),
        expires_at = now() + (v_expiry_days::TEXT || ' days')::INTERVAL,
        sold_at    = NULL,
        deleted_at = NULL,
        updated_at = now()
    WHERE id = p_ad_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.renew_ad(UUID) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.renew_ad(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 10. Backfill: Mark existing users as verified if auth.users already confirmed
-- Safe to run on production — only updates rows where phone was already confirmed
-- ------------------------------------------------------------------------------
DO $$
DECLARE
    v_user RECORD;
BEGIN
    FOR v_user IN
        SELECT id, phone, phone_confirmed_at
        FROM auth.users
        WHERE phone IS NOT NULL
          AND phone_confirmed_at IS NOT NULL
    LOOP
        BEGIN
            UPDATE public.profile_private
            SET phone             = '+' || v_user.phone,
                is_phone_verified = true,
                updated_at        = now()
            WHERE id = v_user.id;

            UPDATE public.profiles
            SET is_phone_verified = true,
                updated_at        = now()
            WHERE id = v_user.id;
        EXCEPTION
            WHEN unique_violation THEN NULL;
        END;
    END LOOP;
END;
$$;

-- ==============================================================================
-- SQL TESTS (run in Supabase SQL Editor to verify)
-- ==============================================================================

/*
-- TEST 1: app_settings rows exist
SELECT key, value FROM app_settings ORDER BY key;
-- Expected: 14 rows with all default settings

-- TEST 2: Helper functions work
SELECT get_setting_int('ad_expiry_days', 99);        -- should return 30
SELECT get_setting_int('nonexistent_key', 42);        -- should return 42 (fallback)
SELECT get_setting_bool('spam_enforcement', true);    -- should return false

-- TEST 3: profiles.is_phone_verified column exists
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'is_phone_verified';

-- TEST 4: sync_phone_verification trigger exists
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_phone_verified';

-- TEST 5: phone UPDATE revoked from authenticated
-- (run as an authenticated user via Supabase client — should get permission denied)
-- UPDATE profile_private SET phone = '+923001234567' WHERE id = auth.uid();

-- TEST 6: current_user_phone_verified() works
SELECT current_user_phone_verified();  -- returns false if not verified

-- TEST 7: ads INSERT policy (needs verified phone)
-- Unverified user INSERT into ads should fail with:
-- "new row violates row-level security policy"

-- TEST 8: get_seller_contact unverified seller
-- SELECT * FROM get_seller_contact('<ad-uuid>');
-- Should raise: "Seller has not verified their phone number yet"

-- TEST 9: renew_ad 24-hour rule
-- Set published_at = now() on a sold ad, then call renew_ad → should fail
-- Set published_at = now() - interval '25 hours' → should succeed

-- ============================================================
-- DEV ONLY: Manually mark YOUR test user as verified
-- Run ONLY on your own test account, NEVER on real users
-- ============================================================
-- UPDATE public.profile_private
--     SET phone = '+923001234567', is_phone_verified = true
--     WHERE id = 'YOUR-TEST-USER-UUID';
-- UPDATE public.profiles
--     SET is_phone_verified = true
--     WHERE id = 'YOUR-TEST-USER-UUID';
*/

