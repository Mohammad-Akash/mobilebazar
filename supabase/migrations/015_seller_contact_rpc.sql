-- ==============================================================================
-- Migration 015: Secure Seller Contact RPC Function
-- Safe to re-run
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_seller_contact(p_ad_id UUID)
RETURNS TABLE (
    phone TEXT,
    whatsapp_number TEXT,
    contact_preference TEXT
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_seller_id UUID;
    v_status ad_status;
    v_pref contact_preference;
    v_raw_phone TEXT;
    v_raw_whatsapp TEXT;
BEGIN
    -- 1. Enforce authentication (prevents automated bot scraping)
    IF (SELECT auth.uid()) IS NULL THEN
        RAISE EXCEPTION 'Authentication required to view seller contact details';
    END IF;

    -- 2. Fetch ad details
    SELECT seller_id, status, ads.contact_preference 
    INTO v_seller_id, v_status, v_pref
    FROM ads
    WHERE id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found';
    END IF;

    IF v_status != 'active' THEN
        RAISE EXCEPTION 'Seller contact is only available for active ads';
    END IF;

    -- 3. Fetch seller private contact info
    SELECT pp.phone, pp.whatsapp_number
    INTO v_raw_phone, v_raw_whatsapp
    FROM profile_private pp
    WHERE pp.id = v_seller_id;

    -- 4. Filter according to seller's contact preference
    IF v_pref = 'phone' THEN
        RETURN QUERY SELECT v_raw_phone, NULL::TEXT, v_pref::TEXT;
    ELSIF v_pref = 'whatsapp' THEN
        RETURN QUERY SELECT NULL::TEXT, v_raw_whatsapp, v_pref::TEXT;
    ELSE -- 'both'
        RETURN QUERY SELECT v_raw_phone, v_raw_whatsapp, v_pref::TEXT;
    END IF;
END;
$$;

-- Lock execution: authenticated users only (no anonymous bot access)
REVOKE EXECUTE ON FUNCTION public.get_seller_contact(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_contact(UUID) TO authenticated;

