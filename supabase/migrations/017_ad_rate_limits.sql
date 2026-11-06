-- ==============================================================================
-- Migration 017: Ad Rate Limits & Active Ad Limits Trigger
-- Enforces: Max 10 active ads per user, Max 5 new ads per 24 hours
-- Cannot be bypassed by client or API
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.check_user_ad_limits()
RETURNS TRIGGER AS $$
DECLARE
    v_active_count INT;
    v_recent_count INT;
BEGIN
    -- Check 1: User can have at most 10 active ads simultaneously
    SELECT COUNT(*) INTO v_active_count
    FROM public.ads
    WHERE seller_id = NEW.seller_id
      AND status = 'active';

    IF v_active_count >= 10 THEN
        RAISE EXCEPTION 'User active ads limit exceeded: Maximum 10 active ads allowed';
    END IF;

    -- Check 2: User can post at most 5 new ads per 24-hour rolling window
    SELECT COUNT(*) INTO v_recent_count
    FROM public.ads
    WHERE seller_id = NEW.seller_id
      AND created_at >= (now() - interval '24 hours');

    IF v_recent_count >= 5 THEN
        RAISE EXCEPTION 'User rate limit exceeded: Maximum 5 ads per 24 hours allowed';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Revoke direct execution via RPC
REVOKE EXECUTE ON FUNCTION public.check_user_ad_limits() FROM PUBLIC, anon, authenticated;

-- Attach trigger BEFORE INSERT on ads
DROP TRIGGER IF EXISTS trigger_check_user_ad_limits ON public.ads;
CREATE TRIGGER trigger_check_user_ad_limits
    BEFORE INSERT ON public.ads
    FOR EACH ROW
    EXECUTE FUNCTION public.check_user_ad_limits();

