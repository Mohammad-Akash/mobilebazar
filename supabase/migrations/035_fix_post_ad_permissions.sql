-- ==============================================================================
-- Migration 035: Fix Post Ad Trigger Permissions & Search Vector Security
-- Ensures all BEFORE/AFTER triggers on ads table have SECURITY DEFINER
-- and EXECUTE privileges so authenticated users can post ads without RLS/trigger permission errors.
-- ==============================================================================

-- 1. ads_generate_search_vector: Must be SECURITY DEFINER with search_path = public
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

-- 2. update_profile_ads_count: Must be SECURITY DEFINER
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

-- 3. Ensure check_user_ad_limits has execute permissions for triggers
GRANT EXECUTE ON FUNCTION public.check_user_ad_limits() TO authenticated;

-- 4. Ensure check_ad_spam_before and flag_ad_spam_after have execute permissions for triggers
GRANT EXECUTE ON FUNCTION public.check_ad_spam_before() TO authenticated;
GRANT EXECUTE ON FUNCTION public.flag_ad_spam_after() TO authenticated;

-- 5. Ensure phone verification helper grants
GRANT EXECUTE ON FUNCTION public.current_user_phone_verified() TO authenticated;
