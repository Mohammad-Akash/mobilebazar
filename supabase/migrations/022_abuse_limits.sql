-- =============================================================================
-- Migration 022: Abuse Limits
-- - contact_reveals table (daily contact reveal tracking)
-- - get_seller_contact updated with reveal logging + daily limit
-- - check_report_eligibility BEFORE INSERT trigger on reports
-- - pg_cron job to cleanup old contact_reveals rows
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. contact_reveals table
-- ---------------------------------------------------------------------------

CREATE TABLE public.contact_reveals (
  user_id     UUID  NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ad_id       UUID  NOT NULL REFERENCES public.ads(id)      ON DELETE CASCADE,
  reveal_date DATE  NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, ad_id, reveal_date)
);

-- Enable RLS (no policies — direct access is intentionally blocked)
ALTER TABLE public.contact_reveals ENABLE ROW LEVEL SECURITY;

-- Strip all direct access; only SECURITY DEFINER functions may touch this table
REVOKE ALL ON public.contact_reveals FROM anon;
REVOKE ALL ON public.contact_reveals FROM authenticated;

-- ---------------------------------------------------------------------------
-- 2. get_seller_contact
--    Returns seller phone/whatsapp/preference for an ad.
--    Checks:
--      a) Caller must be authenticated
--      b) Seller must have a verified phone (from migration 021)
--      c) Logs the reveal and enforces daily unique-ad limit
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_seller_contact(p_ad_id UUID)
RETURNS TABLE(phone TEXT, whatsapp_number TEXT, contact_preference TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_seller_id      UUID;
  v_reveals_today  INT;
  v_daily_limit    INT;
BEGIN
  -- Must be signed in
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Yeh feature sirf registered users ke liye hai. Pehle login karein.';
  END IF;

  -- Fetch the ad's seller and verify the ad is active
  SELECT seller_id
    INTO v_seller_id
    FROM public.ads
   WHERE id = p_ad_id
     AND status = 'active';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Yeh ishtehaar maujood nahi ya active nahi hai.';
  END IF;

  -- Seller must have a verified phone number
  IF NOT EXISTS (
    SELECT 1
      FROM public.profile_private pp
     WHERE pp.id = v_seller_id
       AND pp.is_phone_verified = TRUE
  ) THEN
    RAISE EXCEPTION 'Is seller ka phone number verify nahi hua hai.';
  END IF;

  -- Log this reveal; ON CONFLICT DO NOTHING means re-revealing same ad today is free
  INSERT INTO public.contact_reveals (user_id, ad_id, reveal_date)
  VALUES (auth.uid(), p_ad_id, CURRENT_DATE)
  ON CONFLICT DO NOTHING;

  -- Count distinct ads revealed today by this caller
  SELECT COUNT(DISTINCT cr.ad_id)
    INTO v_reveals_today
    FROM public.contact_reveals cr
   WHERE cr.user_id     = auth.uid()
     AND cr.reveal_date = CURRENT_DATE;

  -- Enforce daily limit (checked AFTER inserting so the current reveal is included)
  v_daily_limit := get_setting_int('max_contact_reveals_per_day', 20);

  IF v_reveals_today > v_daily_limit THEN
    RAISE EXCEPTION 'Aap ne aaj ki limit (% ads) puri kar li hai. Kal dobara koshish karein.', v_daily_limit;
  END IF;

  -- Return seller contact details
  RETURN QUERY
    SELECT
      pp.phone::TEXT,
      pp.whatsapp_number::TEXT,
      pp.contact_preference::TEXT
    FROM public.profile_private pp
   WHERE pp.id = v_seller_id;
END;
$$;

-- Restrict execution: authenticated users only
REVOKE EXECUTE ON FUNCTION public.get_seller_contact(UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_seller_contact(UUID) FROM anon;
GRANT  EXECUTE ON FUNCTION public.get_seller_contact(UUID) TO authenticated;

-- ---------------------------------------------------------------------------
-- 3. check_report_eligibility — BEFORE INSERT trigger on reports
--    Validation order:
--      1. Reporter phone verified
--      2. Reporter account age >= min_report_account_age_days (default 3)
--      3. Reporter is not the ad's seller
--      4. Ad exists and is active
--      5. Reporter has not hit daily report limit
--    (Duplicate-report guard is handled by UNIQUE(ad_id, reporter_id) on reports)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.check_report_eligibility()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_seller_id        UUID;
  v_ad_status        TEXT;
  v_account_age_days INT;
  v_min_age_days     INT;
  v_reports_today    INT;
  v_max_reports      INT;
BEGIN
  -- 1. Reporter must have a verified phone
  IF NOT EXISTS (
    SELECT 1
      FROM public.profile_private pp
     WHERE pp.id               = NEW.reporter_id
       AND pp.is_phone_verified = TRUE
  ) THEN
    RAISE EXCEPTION 'Report karne ke liye pehle apna phone verify karein.';
  END IF;

  -- 2. Reporter account must be old enough
  v_min_age_days := get_setting_int('min_report_account_age_days', 3);

  SELECT EXTRACT(DAY FROM now() - p.created_at)::INT
    INTO v_account_age_days
    FROM public.profiles p
   WHERE p.id = NEW.reporter_id;

  IF v_account_age_days IS NULL OR v_account_age_days < v_min_age_days THEN
    RAISE EXCEPTION 'Report karne ke liye account kam az kam % din purana hona chahiye.', v_min_age_days;
  END IF;

  -- 3. Reporter cannot report their own ad
  SELECT a.seller_id, a.status::TEXT
    INTO v_seller_id, v_ad_status
    FROM public.ads a
   WHERE a.id = NEW.ad_id;

  IF NEW.reporter_id = v_seller_id THEN
    RAISE EXCEPTION 'Aap apna khud ka ishtehaar report nahi kar sakte.';
  END IF;

  -- 4. Ad must exist and be active
  IF v_seller_id IS NULL OR v_ad_status <> 'active' THEN
    RAISE EXCEPTION 'Sirf active ishtehaaraat report kiye ja sakte hain.';
  END IF;

  -- 5. Daily report limit
  v_max_reports := get_setting_int('max_reports_per_day', 5);

  SELECT COUNT(*)
    INTO v_reports_today
    FROM public.reports r
   WHERE r.reporter_id = NEW.reporter_id
     AND r.created_at  >= now() - INTERVAL '24 hours';

  IF v_reports_today >= v_max_reports THEN
    RAISE EXCEPTION 'Aap aaj ki report limit (%) puri kar chuke hain.', v_max_reports;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger functions must not be callable directly by any role
REVOKE EXECUTE ON FUNCTION public.check_report_eligibility() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_report_eligibility() FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_report_eligibility() FROM authenticated;

-- Attach trigger to reports table
DROP TRIGGER IF EXISTS trg_check_report_eligibility ON public.reports;
CREATE TRIGGER trg_check_report_eligibility
  BEFORE INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.check_report_eligibility();

-- ---------------------------------------------------------------------------
-- 4. pg_cron: cleanup contact_reveals older than 7 days (runs daily at 3 AM)
-- ---------------------------------------------------------------------------

SELECT cron.schedule(
  'cleanup-contact-reveals',
  '0 3 * * *',
  $$ DELETE FROM public.contact_reveals WHERE reveal_date < CURRENT_DATE - INTERVAL '7 days'; $$
);

-- =============================================================================
-- SQL TESTS (run manually in Supabase SQL editor or psql)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- TEST 1: Report with unverified phone → should raise exception
-- ---------------------------------------------------------------------------
-- Setup: ensure reporter has is_phone_verified = FALSE in profile_private
-- Then attempt:
--
--   INSERT INTO public.reports (ad_id, reporter_id, reason)
--   VALUES ('<some_active_ad_id>', '<unverified_user_id>', 'spam');
--
-- Expected error: 'Report karne ke liye pehle apna phone verify karein.'

-- ---------------------------------------------------------------------------
-- TEST 2: Report on own ad → should raise exception
-- ---------------------------------------------------------------------------
-- Setup: use an ad where seller_id = reporter_id (same user)
-- Then attempt:
--
--   INSERT INTO public.reports (ad_id, reporter_id, reason)
--   VALUES ('<own_ad_id>', '<seller_user_id>', 'spam');
--
-- Expected error: 'Aap apna khud ka ishtehaar report nahi kar sakte.'

-- ---------------------------------------------------------------------------
-- TEST 3: Report limit (conceptual)
-- ---------------------------------------------------------------------------
-- Setup: authenticated user (verified, account >= 3 days old) inserts 5 reports
--        against 5 different active ads within 24 hours.
-- Then attempt a 6th:
--
--   INSERT INTO public.reports (ad_id, reporter_id, reason)
--   VALUES ('<sixth_ad_id>', '<reporter_id>', 'fraud');
--
-- Expected error: 'Aap aaj ki report limit (5) puri kar chuke hain.'

-- ---------------------------------------------------------------------------
-- TEST 4: contact_reveals daily limit
-- ---------------------------------------------------------------------------
-- Setup: set max_contact_reveals_per_day to a low value, e.g. 2, in app_settings
--   UPDATE public.app_settings SET value = '2' WHERE key = 'max_contact_reveals_per_day';
--
-- Then reveal 3 distinct active ads as the same authenticated user:
--   SELECT * FROM public.get_seller_contact('<ad_id_1>');  -- OK
--   SELECT * FROM public.get_seller_contact('<ad_id_2>');  -- OK
--   SELECT * FROM public.get_seller_contact('<ad_id_3>');  -- should error
--
-- Expected error on 3rd call:
--   'Aap ne aaj ki limit (2 ads) puri kar li hai. Kal dobara koshish karein.'

-- ---------------------------------------------------------------------------
-- TEST 5: Same-ad re-reveal does NOT increment daily count
-- ---------------------------------------------------------------------------
-- Setup: set max_contact_reveals_per_day = 1 in app_settings
-- Then call get_seller_contact for the same ad twice:
--
--   SELECT * FROM public.get_seller_contact('<ad_id_1>');  -- reveals + count=1 → OK
--   SELECT * FROM public.get_seller_contact('<ad_id_1>');  -- ON CONFLICT DO NOTHING → count still 1 → OK
--
-- Both calls should succeed because re-revealing the same ad on the same day
-- does not create a new contact_reveals row (ON CONFLICT DO NOTHING),
-- so the distinct-ad count stays at 1.
