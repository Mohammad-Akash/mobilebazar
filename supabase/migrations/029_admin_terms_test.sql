-- ==============================================================================
-- Migration 029: Admin Blocked Terms Rule Testing Sandbox (Phase 8)
--
-- Read-only testing function to dry-run text against active blocked_terms
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.admin_test_spam_rules(
    p_title       TEXT,
    p_description TEXT
)
RETURNS TABLE (
    rule_type TEXT,
    matched_term TEXT,
    kind TEXT,
    score INT,
    detail TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_combined   TEXT;
    v_normalized TEXT;
    v_term_rec   RECORD;
BEGIN
    PERFORM public.require_staff();

    v_combined := COALESCE(p_title, '') || ' ' || COALESCE(p_description, '');
    v_normalized := public.normalize_text(v_combined);

    -- 1. Check phone number rule
    IF v_normalized ~ '(\+?92|0)?3[0-9]{2}[0-9]{7}' THEN
        rule_type := 'phone_in_text';
        matched_term := 'Pakistani mobile number pattern detected';
        kind := 'block';
        score := 25;
        detail := 'Ad text contains a direct telephone or WhatsApp number';
        RETURN NEXT;
    END IF;

    -- 2. Check URL rule
    IF v_normalized ~ '(https?:\/\/|www\.)[a-z0-9\-\.]+\.[a-z]{2,}' THEN
        rule_type := 'link_in_text';
        matched_term := 'Web link / URL detected';
        kind := 'block';
        score := 25;
        detail := 'Ad text contains an external website link';
        RETURN NEXT;
    END IF;

    -- 3. Check blocked_terms matches
    FOR v_term_rec IN
        SELECT term, kind
        FROM public.blocked_terms
        WHERE is_active = true
    LOOP
        IF v_normalized ~ ('\m' || v_term_rec.term || '\M') THEN
            rule_type := 'blocked_term';
            matched_term := v_term_rec.term;
            kind := v_term_rec.kind;
            score := CASE WHEN v_term_rec.kind = 'block' THEN 50 ELSE 15 END;
            detail := 'Matched keyword from active ' || v_term_rec.kind || ' dictionary';
            RETURN NEXT;
        END IF;
    END LOOP;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_test_spam_rules(TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_test_spam_rules(TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_test_spam_rules(TEXT, TEXT) TO authenticated;

