-- ============================================================
-- Migration 025: Spam Rules
-- ============================================================
-- Provides:
--   1. normalize_text()          – pure text normalization helper
--   2. blocked_terms             – admin-managed block/flag terms
--   3. ad_flags                  – per-ad spam signal records
--   4. check_ad_spam_before()    – BEFORE trigger: hard blocks
--   5. flag_ad_spam_after()      – AFTER trigger: soft flags + score
--   6. Trigger attachments
-- ============================================================

-- ============================================================
-- 1. normalize_text(input TEXT) RETURNS TEXT
-- ============================================================
-- Pure function: no table access, IMMUTABLE, SECURITY INVOKER.
-- Steps (in order):
--   a) Lowercase
--   b) Arabic-Indic (U+0660–U+0669) → ASCII 0-9
--   c) Extended Arabic-Indic (U+06F0–U+06F9) → ASCII 0-9
--   d) Remove zero-width / BOM characters
--   e) Collapse separator characters (space, dash, dot) that sit
--      between digit sequences, e.g. "0300 123 4567" → "03001234567"
-- ============================================================

CREATE OR REPLACE FUNCTION public.normalize_text(input TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    -- Step e: collapse separators between digit groups
    regexp_replace(
      -- Step d: strip zero-width / BOM chars
      regexp_replace(
        -- Step c: Extended Arabic-Indic → ASCII
        translate(
          -- Step b: Arabic-Indic → ASCII
          translate(
            -- Step a: lowercase
            lower(input),
            -- Arabic-Indic digits U+0660–U+0669
            '٠١٢٣٤٥٦٧٨٩',
            '0123456789'
          ),
          -- Extended Arabic-Indic digits U+06F0–U+06F9
          '۰۱۲۳۴۵۶۷۸۹',
          '0123456789'
        ),
        -- Remove zero-width space, ZWJ, ZWNJ, BOM
        u&'\200b' || u&'\200c' || u&'\200d' || u&'\feff',
        '',
        'g'
      ),
      -- Collapse spaces / dashes / dots between digit sequences
      '([0-9])[ \t\-\.]+([0-9])',
      '\1\2',
      'g'
    );
$$;

-- Revoke from public roles – internal use only
REVOKE EXECUTE ON FUNCTION public.normalize_text(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.normalize_text(TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION public.normalize_text(TEXT) FROM authenticated;

-- ============================================================
-- 2. blocked_terms table
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blocked_terms (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  term       TEXT        NOT NULL UNIQUE,
  kind       TEXT        NOT NULL CHECK (kind IN ('block', 'flag')),
  is_active  BOOLEAN     NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blocked_terms ENABLE ROW LEVEL SECURITY;

-- No anon / authenticated access; only service_role / postgres
REVOKE ALL ON public.blocked_terms FROM anon;
REVOKE ALL ON public.blocked_terms FROM authenticated;

-- Seed: 'flag' kind – scam/fraud phrases
INSERT INTO public.blocked_terms (term, kind) VALUES
  ('advance',                 'flag'),
  ('advance payment',         'flag'),
  ('token money',             'flag'),
  ('token pehle',             'flag'),
  ('pehle paise',             'flag'),
  ('send money',              'flag'),
  ('money first',             'flag'),
  ('courier se',              'flag'),
  ('courier bhej',            'flag'),
  ('trust me',                'flag'),
  ('i am genuine',            'flag'),
  ('genuine seller',          'flag'),
  ('no fraud',                'flag'),
  ('money order',             'flag'),
  ('bank transfer first',     'flag'),
  ('western union',           'flag'),
  ('easypaisa pehle',         'flag'),
  ('jazzcash pehle',          'flag')
ON CONFLICT (term) DO NOTHING;

-- ============================================================
-- 3. ad_flags table
-- ============================================================

CREATE TABLE IF NOT EXISTS public.ad_flags (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id       UUID        NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
  flag_type   TEXT        NOT NULL,
  detail      TEXT,
  score       INT         NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID        REFERENCES public.profiles(id) ON DELETE SET NULL
);

ALTER TABLE public.ad_flags ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.ad_flags FROM anon;
REVOKE ALL ON public.ad_flags FROM authenticated;

-- Partial index: only unresolved flags, used by review queries
CREATE INDEX IF NOT EXISTS ad_flags_ad_id_unresolved_idx
  ON public.ad_flags(ad_id)
  WHERE resolved_at IS NULL;

-- ============================================================
-- 4. BEFORE INSERT OR UPDATE trigger: check_ad_spam_before()
-- ============================================================
-- Hard-blocks ads that contain phone numbers, URLs, exact block-
-- kind terms, or are exact duplicates of an active ad by the same
-- seller.  Raises a user-friendly exception in Urdu/Roman-Urdu.
-- ============================================================

CREATE OR REPLACE FUNCTION public.check_ad_spam_before()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_normalized TEXT;
  v_term       TEXT;
  v_digit_seq  TEXT;
BEGIN
  -- ---------------------------------------------------------
  -- Build normalised combined text
  -- ---------------------------------------------------------
  v_normalized := normalize_text(
    COALESCE(NEW.title, '')       || ' ' ||
    COALESCE(NEW.description, '') || ' ' ||
    COALESCE(NEW.color, '')
  );

  -- ---------------------------------------------------------
  -- BLOCK 1: Pakistani mobile phone number
  -- Pattern after normalization (separators already removed):
  --   03XXXXXXXXX  (11 digits)
  --   923XXXXXXXXX (12 digits — without leading +)
  --   923XXXXXXXXX (12 digits — + already stripped by normalize)
  -- We use a single regex that captures the digit run so we can
  -- verify it is NOT a 15-digit IMEI sequence.
  -- ---------------------------------------------------------
  IF v_normalized ~ '(^|[^0-9])(0|\+?92)(3[0-9]{9})([^0-9]|$)' THEN
    -- Confirm it is not part of a 15-digit IMEI (we reject the
    -- block only when the surrounding context shows exactly 15
    -- consecutive digits).  Extract the continuous digit run(s)
    -- around each match and skip blocking if any run = 15 digits.
    -- Simpler conservative check: scan all runs of >=11 digits;
    -- if a 15-digit run exists and contains the phone pattern
    -- the entire check is a false positive from an IMEI.
    IF v_normalized ~ '(^|[^0-9])[0-9]{15}([^0-9]|$)' THEN
      -- Likely IMEI – skip phone block
      NULL;
    ELSE
      RAISE EXCEPTION 'Ishtehaar mein phone number dena allowed nahi hai. Buyers aap se "Contact Karein" button se rabta karenge.'
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  -- ---------------------------------------------------------
  -- BLOCK 2: URL / web link in text
  -- ---------------------------------------------------------
  IF v_normalized ~ '(https?://|www\.|\.com|\.pk|\.net|\.org|bit\.ly|wa\.me)' THEN
    RAISE EXCEPTION 'Ishtehaar mein website links dena allowed nahi hai.'
      USING ERRCODE = 'P0001';
  END IF;

  -- ---------------------------------------------------------
  -- BLOCK 3: Duplicate active ad by same seller (INSERT only)
  -- Same seller + model + storage + price + city + status=active
  -- ---------------------------------------------------------
  IF TG_OP = 'INSERT' THEN
    IF EXISTS (
      SELECT 1
      FROM public.ads
      WHERE seller_id  = NEW.seller_id
        AND model_id   = NEW.model_id
        AND storage_gb = NEW.storage_gb
        AND price      = NEW.price
        AND city_id    = NEW.city_id
        AND condition  = NEW.condition
        AND status     = 'active'
        AND id        != NEW.id
    ) THEN
      RAISE EXCEPTION 'Aap ka bilkul aisi hi condition aur qeemat wala ishtehaar pehle se maujood hai.'
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  -- ---------------------------------------------------------
  -- BLOCK 4: blocked_terms kind='block'
  -- ---------------------------------------------------------
  FOR v_term IN
    SELECT term
    FROM public.blocked_terms
    WHERE kind = 'block'
      AND is_active = true
  LOOP
    IF v_normalized LIKE ('%' || normalize_text(v_term) || '%') THEN
      RAISE EXCEPTION 'Ishtehaar mein kuch aise alfaaz hain jo allowed nahi hain. Baraye meharbani edit karein.'
        USING ERRCODE = 'P0001';
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.check_ad_spam_before() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_ad_spam_before() FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_ad_spam_before() FROM authenticated;

-- ============================================================
-- 5. AFTER INSERT trigger: flag_ad_spam_after()
-- ============================================================
-- Soft-flags the ad by inserting rows into ad_flags and, when
-- spam_enforcement is enabled and the total score meets the
-- threshold, moves the ad to 'under_review'.
-- ============================================================

CREATE OR REPLACE FUNCTION public.flag_ad_spam_after()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_normalized     TEXT;
  v_term           TEXT;
  v_total_score    INT  := 0;
  v_median_price   NUMERIC;
  v_count          INT;
  v_seller_created TIMESTAMPTZ;
  v_cheap_pct      NUMERIC;
  v_min_samples    INT;
  v_new_acct_hours INT;
  v_exp_threshold  BIGINT;
  v_threshold      INT;
  v_enforcement    BOOLEAN;
BEGIN
  -- ---------------------------------------------------------
  -- Build normalised combined text (same as BEFORE trigger)
  -- ---------------------------------------------------------
  v_normalized := normalize_text(
    COALESCE(NEW.title, '')       || ' ' ||
    COALESCE(NEW.description, '') || ' ' ||
    COALESCE(NEW.color, '')
  );

  -- ---------------------------------------------------------
  -- FLAG 1: scam phrases (flag-kind blocked_terms), score=3 each
  -- ---------------------------------------------------------
  FOR v_term IN
    SELECT term
    FROM public.blocked_terms
    WHERE kind = 'flag'
      AND is_active = true
  LOOP
    IF v_normalized LIKE ('%' || normalize_text(v_term) || '%') THEN
      INSERT INTO public.ad_flags (ad_id, flag_type, detail, score)
      VALUES (NEW.id, 'scam_phrase', v_term, 3);
      v_total_score := v_total_score + 3;
    END IF;
  END LOOP;

  -- ---------------------------------------------------------
  -- FLAG 2: Suspiciously cheap price, score=5
  -- ---------------------------------------------------------
  v_cheap_pct   := get_setting_int('spam_cheap_price_pct', 40)::NUMERIC / 100;
  v_min_samples := get_setting_int('spam_min_samples', 10);

  SELECT
    COUNT(*),
    percentile_cont(0.5) WITHIN GROUP (ORDER BY price)
  INTO v_count, v_median_price
  FROM public.ads
  WHERE model_id   = NEW.model_id
    AND storage_gb = NEW.storage_gb
    AND condition  = NEW.condition
    AND status     = 'active'
    AND id        != NEW.id;

  IF v_count >= v_min_samples
     AND v_median_price IS NOT NULL
     AND NEW.price < v_median_price * (1 - v_cheap_pct)
  THEN
    INSERT INTO public.ad_flags (ad_id, flag_type, detail, score)
    VALUES (
      NEW.id,
      'cheap_price',
      'price=' || NEW.price || ' median=' || round(v_median_price),
      5
    );
    v_total_score := v_total_score + 5;
  END IF;

  -- ---------------------------------------------------------
  -- FLAG 3: New account posting expensive item, score=4
  -- ---------------------------------------------------------
  v_new_acct_hours := get_setting_int('spam_new_account_hours', 24);
  v_exp_threshold  := get_setting_int('spam_expensive_threshold', 80000);

  SELECT created_at
  INTO v_seller_created
  FROM public.profiles
  WHERE id = NEW.seller_id;

  IF v_seller_created IS NOT NULL
     AND (now() - v_seller_created) < (v_new_acct_hours || ' hours')::INTERVAL
     AND NEW.price > v_exp_threshold
  THEN
    INSERT INTO public.ad_flags (ad_id, flag_type, detail, score)
    VALUES (
      NEW.id,
      'new_account_expensive',
      'account_age_hours=' ||
        round(extract(epoch FROM (now() - v_seller_created)) / 3600, 1) ||
        ' price=' || NEW.price,
      4
    );
    v_total_score := v_total_score + 4;
  END IF;

  -- ---------------------------------------------------------
  -- Auto-quarantine if enforcement is ON and score is high
  -- ---------------------------------------------------------
  v_enforcement := get_setting_bool('spam_enforcement', false);
  v_threshold   := get_setting_int('spam_flag_score_threshold', 10);

  IF v_enforcement AND v_total_score >= v_threshold THEN
    UPDATE public.ads
    SET status = 'under_review'
    WHERE id = NEW.id;
  END IF;

  RETURN NULL; -- AFTER trigger return value is ignored
END;
$$;

REVOKE EXECUTE ON FUNCTION public.flag_ad_spam_after() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.flag_ad_spam_after() FROM anon;
REVOKE EXECUTE ON FUNCTION public.flag_ad_spam_after() FROM authenticated;

-- ============================================================
-- 6. Attach triggers
-- ============================================================

DROP TRIGGER IF EXISTS trigger_check_ad_spam_before ON public.ads;
CREATE TRIGGER trigger_check_ad_spam_before
  BEFORE INSERT OR UPDATE OF title, description, color ON public.ads
  FOR EACH ROW
  EXECUTE FUNCTION public.check_ad_spam_before();

DROP TRIGGER IF EXISTS trigger_flag_ad_spam_after ON public.ads;
CREATE TRIGGER trigger_flag_ad_spam_after
  AFTER INSERT ON public.ads
  FOR EACH ROW
  EXECUTE FUNCTION public.flag_ad_spam_after();

-- ============================================================
-- 7. Daily flag review query (admin reference)
-- ============================================================
-- Run in the Supabase SQL editor or a cron job to triage flags:
--
-- SELECT
--   af.flag_type,
--   af.detail,
--   af.score,
--   a.title,
--   a.price,
--   a.status,
--   af.created_at
-- FROM public.ad_flags af
-- JOIN public.ads a ON af.ad_id = a.id
-- WHERE af.resolved_at IS NULL
-- ORDER BY af.created_at DESC
-- LIMIT 50;
--
-- To resolve a flag (mark reviewed by admin):
-- UPDATE public.ad_flags
--   SET resolved_at = now(), resolved_by = '<admin_profile_id>'
-- WHERE id = '<flag_id>';

-- ============================================================
-- 8. SQL TESTS (run manually; all wrapped in ROLLBACK)
-- ============================================================
/*

BEGIN;

-- ── Helper: set enforcement OFF for shadow-mode tests ─────────
-- UPDATE app_settings SET value='false' WHERE key='spam_enforcement';

-- ── T01: normalize_text basic ─────────────────────────────────
-- SELECT normalize_text('0 3 0 0 - 1 2 3 4 5 6 7');
-- Expected: '03001234567'

-- SELECT normalize_text('۰۳۰۰۱۲۳۴۵۶۷');
-- Expected: '03001234567'

-- SELECT normalize_text('٠٣٠٠١٢٣٤٥٦٧');
-- Expected: '03001234567'

-- ── T02: Phone number block – various formats ──────────────────
-- Should RAISE EXCEPTION (phone number):

-- INSERT INTO ads(..., title='Call me on 0300-1234567') ...;
-- INSERT INTO ads(..., title='My number +92 300 1234567') ...;
-- INSERT INTO ads(..., title='Urdu digits ۰۳۰۰۱۲۳۴۵۶۷') ...;
-- INSERT INTO ads(..., title='Number: 923001234567') ...;

-- ── T03: URL block ─────────────────────────────────────────────
-- Should RAISE EXCEPTION (URL):

-- INSERT INTO ads(..., description='Visit www.mysite.com') ...;
-- INSERT INTO ads(..., description='Chat wa.me/923001234567') ...;
-- INSERT INTO ads(..., description='See http://bit.ly/abc') ...;

-- ── T04: FALSE POSITIVE – IMEI (15 digits) must NOT be blocked ─
-- normalize_text('358240051111110') → '358240051111110'  (15 digits, no phone match)
-- SELECT normalize_text('358240051111110');
-- Should return '358240051111110' and NOT match phone regex.

-- INSERT INTO ads(..., description='IMEI: 358240051111110') ...;
-- Should succeed (no block).

-- ── T05: FALSE POSITIVE – Model codes must NOT block ──────────
-- 'A2403'    → 5 chars, not a phone
-- '8GB 256GB'→ no phone pattern
-- 'SM-G991B' → alphanumeric
-- INSERT INTO ads(..., title='Samsung SM-G991B 8GB 256GB A2403') ...;
-- Should succeed.

-- ── T06: FALSE POSITIVE – Price in description must NOT block ──
-- 'Rs 85,000' normalises to 'rs 85000'; no phone regex match
-- INSERT INTO ads(..., description='Price Rs 85,000 negotiable') ...;
-- Should succeed.

-- ── T07: Duplicate ad detection (INSERT only) ─────────────────
-- After inserting a valid ad, insert identical (seller/model/storage/price/city/condition):
-- Should RAISE EXCEPTION (duplicate).
-- A subsequent UPDATE on the original must NOT raise this exception.

-- ── T08: blocked_terms kind='flag' scam phrase flagging ───────
-- INSERT INTO ads(..., description='advance payment karo pehle') ...;
-- After insert, check ad_flags:
--   SELECT * FROM ad_flags WHERE ad_id = '<new_id>';
-- Expected: row with flag_type='scam_phrase', detail='advance payment', score=3
--           and/or detail='advance', score=3

-- ── T09: Cheap price flagging ─────────────────────────────────
-- Requires >=10 active ads for the same model/storage/condition.
-- Insert an ad with price << (median * 0.6).
-- Expected: ad_flags row with flag_type='cheap_price', score=5.

-- ── T10: New account + expensive item ─────────────────────────
-- Create a profile within the last 24 h, insert ad with price > 80000.
-- Expected: ad_flags row with flag_type='new_account_expensive', score=4.

-- ── T11: Shadow mode (spam_enforcement = false) ────────────────
-- UPDATE app_settings SET value='false' WHERE key='spam_enforcement';
-- Insert an ad matching multiple flag conditions (total score >= 10).
-- Expected: ad_flags rows inserted BUT ads.status remains 'active' (NOT 'under_review').
-- SELECT status FROM ads WHERE id = '<new_id>';  -- must be 'active'

-- ── T12: Enforcement mode ──────────────────────────────────────
-- UPDATE app_settings SET value='true'  WHERE key='spam_enforcement';
-- UPDATE app_settings SET value='8'     WHERE key='spam_flag_score_threshold';
-- Insert ad with scam phrase + cheap price (score = 3+5 = 8).
-- Expected: ads.status = 'under_review'
-- SELECT status FROM ads WHERE id = '<new_id>';  -- must be 'under_review'

ROLLBACK;

*/
