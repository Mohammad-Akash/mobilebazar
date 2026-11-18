-- ==============================================================================
-- Migration 035: Fix All Post Ad & Helper Permissions for Authenticated Users
-- Run this in Supabase SQL Editor once to enable seamless ad posting.
-- ==============================================================================

-- 1. App Settings Helpers (Required by ads.expires_at default and spam triggers)
GRANT EXECUTE ON FUNCTION public.get_setting_int(TEXT, INT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_setting_bool(TEXT, BOOLEAN) TO authenticated, anon;

-- 2. Text Normalization Helper (Required by spam check trigger)
GRANT EXECUTE ON FUNCTION public.normalize_text(TEXT) TO authenticated, anon;

-- 3. Search Vector Trigger Function (Must be SECURITY DEFINER with search_path = public)
CREATE OR REPLACE FUNCTION public.ads_generate_search_vector()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
    v_brand_name TEXT := '';
    v_model_name TEXT := '';
BEGIN
    SELECT name INTO v_brand_name FROM public.brands WHERE id = NEW.brand_id;
    SELECT name INTO v_model_name FROM public.models WHERE id = NEW.model_id;

    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(v_brand_name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(v_model_name, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');

    RETURN NEW;
END;
$$;
GRANT EXECUTE ON FUNCTION public.ads_generate_search_vector() TO authenticated, anon;

-- 4. Profile Ads Count Trigger Function (Must be SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.update_profile_ads_count()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF (NEW.status = 'active') THEN
            UPDATE public.profiles SET ads_count = ads_count + 1 WHERE id = NEW.seller_id;
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.status != 'active' AND NEW.status = 'active') THEN
            UPDATE public.profiles SET ads_count = ads_count + 1 WHERE id = NEW.seller_id;
        ELSIF (OLD.status = 'active' AND NEW.status != 'active') THEN
            UPDATE public.profiles SET ads_count = GREATEST(ads_count - 1, 0) WHERE id = NEW.seller_id;
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        IF (OLD.status = 'active') THEN
            UPDATE public.profiles SET ads_count = GREATEST(ads_count - 1, 0) WHERE id = OLD.seller_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;
GRANT EXECUTE ON FUNCTION public.update_profile_ads_count() TO authenticated, anon;

-- 5. Ad Limit & Spam Triggers
GRANT EXECUTE ON FUNCTION public.check_user_ad_limits() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_ad_spam_before() TO authenticated;
GRANT EXECUTE ON FUNCTION public.flag_ad_spam_after() TO authenticated;

-- 6. Phone Verification Guard
GRANT EXECUTE ON FUNCTION public.current_user_phone_verified() TO authenticated;

-- 7. Add cpid_approved to pta_status enum if not already present
ALTER TYPE pta_status ADD VALUE IF NOT EXISTS 'cpid_approved' AFTER 'pta_approved';
