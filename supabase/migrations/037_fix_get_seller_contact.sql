-- ==============================================================================
-- Migration 037: Fix get_seller_contact RPC & contact_preference
-- ==============================================================================
-- Fixes: "column pp.contact_preference does not exist"
-- 1. Adds contact_preference to profile_private for table schema completeness
-- 2. Updates get_seller_contact to retrieve contact_preference from public.ads
--    and ensures fallback for whatsapp_number to phone.
-- ==============================================================================

-- 1. Add contact_preference to profile_private if missing
ALTER TABLE public.profile_private 
ADD COLUMN IF NOT EXISTS contact_preference TEXT DEFAULT 'both';

-- 2. Ensure contact_reveals table exists with primary key
CREATE TABLE IF NOT EXISTS public.contact_reveals (
  user_id     UUID  NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ad_id       UUID  NOT NULL REFERENCES public.ads(id)      ON DELETE CASCADE,
  reveal_date DATE  NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, ad_id, reveal_date)
);

ALTER TABLE public.contact_reveals ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.contact_reveals FROM anon;
REVOKE ALL ON public.contact_reveals FROM authenticated;

-- 3. Replace get_seller_contact with corrected query
DROP FUNCTION IF EXISTS public.get_seller_contact(UUID);

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
    v_seller_id      UUID;
    v_status         TEXT;
    v_pref           TEXT;
    v_phone          TEXT;
    v_wa             TEXT;
    v_reveals_today  INT;
    v_daily_limit    INT;
BEGIN
    -- 1. Authentication check
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'Please login to view seller contact details.';
    END IF;

    -- 2. Fetch ad details (contact_preference belongs to public.ads)
    SELECT a.seller_id, a.status::TEXT, a.contact_preference::TEXT
    INTO v_seller_id, v_status, v_pref
    FROM public.ads a
    WHERE a.id = p_ad_id;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'Ad not found.';
    END IF;

    IF v_status != 'active' THEN
        RAISE EXCEPTION 'Seller contact is only available for active ads.';
    END IF;

    -- 3. Fetch seller contact from profile_private
    SELECT pp.phone::TEXT, pp.whatsapp_number::TEXT
    INTO v_phone, v_wa
    FROM public.profile_private pp
    WHERE pp.id = v_seller_id;

    IF v_phone IS NULL OR length(trim(v_phone)) = 0 THEN
        RAISE EXCEPTION 'Seller has not provided a contact number.';
    END IF;

    -- 4. Log contact reveal and check daily rate limit
    INSERT INTO public.contact_reveals (user_id, ad_id, reveal_date)
    VALUES (auth.uid(), p_ad_id, CURRENT_DATE)
    ON CONFLICT (user_id, ad_id, reveal_date) DO NOTHING;

    SELECT COUNT(DISTINCT cr.ad_id)
    INTO v_reveals_today
    FROM public.contact_reveals cr
    WHERE cr.user_id = auth.uid()
      AND cr.reveal_date = CURRENT_DATE;

    -- Read setting or fallback safely
    BEGIN
        v_daily_limit := COALESCE(public.get_setting_int('max_contact_reveals_per_day', 50), 50);
    EXCEPTION WHEN OTHERS THEN
        v_daily_limit := 50;
    END;

    IF v_reveals_today > v_daily_limit THEN
        RAISE EXCEPTION 'You have reached the daily contact reveal limit (% ads). Please try again tomorrow.', v_daily_limit;
    END IF;

    -- 5. Return seller contact
    RETURN QUERY
    SELECT 
        v_phone::TEXT,
        COALESCE(v_wa, v_phone)::TEXT AS whatsapp_number,
        COALESCE(v_pref, 'both')::TEXT AS contact_preference;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_seller_contact(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_contact(UUID) TO authenticated;
