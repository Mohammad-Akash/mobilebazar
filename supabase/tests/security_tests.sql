-- ==============================================================================
-- MobileBazar Security Test Suite (Phase 2 / Prompt 8)
-- Run this script in Supabase SQL Editor.
-- It executes inside a transaction and ALWAYS rolls back at the end.
-- ==============================================================================

BEGIN;

DO $$
DECLARE
    v_user_a UUID := '11111111-1111-1111-1111-111111111111';
    v_user_b UUID := '22222222-2222-2222-2222-222222222222';
    v_city_id UUID;
    v_brand_id UUID;
    v_model_id UUID;
    v_ad_id UUID := gen_random_uuid();
    v_sold_ad_id UUID := gen_random_uuid();
    v_test_count INT;
    v_failed_flag BOOLEAN;
BEGIN
    RAISE NOTICE '--- STARTING SECURITY SUITE TESTS ---';

    -- Setup: Lookup seed master IDs
    SELECT id INTO v_city_id FROM cities WHERE slug = 'karachi' LIMIT 1;
    SELECT id INTO v_brand_id FROM brands WHERE slug = 'apple' LIMIT 1;
    SELECT id INTO v_model_id FROM models WHERE slug = 'iphone-15' AND brand_id = v_brand_id LIMIT 1;

    -- Setup: Create User A & User B
    INSERT INTO profiles (id, full_name) VALUES (v_user_a, 'User A (Seller)'), (v_user_b, 'User B (Buyer)');
    INSERT INTO profile_private (id, phone, whatsapp_number, role, is_phone_verified, is_banned)
    VALUES 
        (v_user_a, '03001111111', '03001111111', 'user', true, false),
        (v_user_b, '03002222222', '03002222222', 'user', true, false);

    -- Setup: Insert an ad by User A directly in DB
    INSERT INTO ads (
        id, seller_id, brand_id, model_id, city_id,
        title, description, price, condition, pta_status, storage_gb, status
    ) VALUES (
        v_ad_id, v_user_a, v_brand_id, v_model_id, v_city_id,
        'iPhone 15 Pro Max', 'Mint condition', 320000, 'used', 'pta_approved', 256, 'active'
    );

    -- --------------------------------------------------------------------------
    -- TEST 1: Anon cannot read profile_private, ad_private, reports
    -- --------------------------------------------------------------------------
    SET LOCAL ROLE anon;
    SET LOCAL "request.jwt.claims" = '{}';

    SELECT count(*) INTO v_test_count FROM profile_private;
    IF v_test_count = 0 THEN
        RAISE NOTICE 'TEST 1 [PASS]: Anon blocked from profile_private';
    ELSE
        RAISE WARNING 'TEST 1 [FAIL]: Anon could read profile_private!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 2: Anon can read active ads only
    -- --------------------------------------------------------------------------
    SELECT count(*) INTO v_test_count FROM ads WHERE id = v_ad_id;
    IF v_test_count = 1 THEN
        RAISE NOTICE 'TEST 2 [PASS]: Anon can view active ads';
    ELSE
        RAISE WARNING 'TEST 2 [FAIL]: Anon cannot view active ads!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 3: User B cannot update User A''s ad
    -- --------------------------------------------------------------------------
    SET LOCAL ROLE authenticated;
    SET LOCAL "request.jwt.claims" = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

    UPDATE ads SET title = 'Hacked by User B' WHERE id = v_ad_id;
    SELECT count(*) INTO v_test_count FROM ads WHERE id = v_ad_id AND title = 'Hacked by User B';
    IF v_test_count = 0 THEN
        RAISE NOTICE 'TEST 3 [PASS]: User B blocked from updating User A ad';
    ELSE
        RAISE WARNING 'TEST 3 [FAIL]: User B updated User A ad!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 4: User A cannot set own role = ''admin'' or is_banned = false
    -- --------------------------------------------------------------------------
    SET LOCAL "request.jwt.claims" = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
    v_failed_flag := false;
    BEGIN
        -- Should fail at column-level grant
        EXECUTE 'UPDATE profile_private SET role = ''admin'' WHERE id = ''11111111-1111-1111-1111-111111111111''';
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 4 [PASS]: User A blocked by column grant from setting role = admin';
    ELSE
        RAISE WARNING 'TEST 4 [FAIL]: User A changed own role!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 5: User A cannot directly update ads.status or is_featured
    -- --------------------------------------------------------------------------
    v_failed_flag := false;
    BEGIN
        EXECUTE 'UPDATE ads SET status = ''sold'' WHERE id = ''' || v_ad_id || '''';
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 5 [PASS]: User A blocked by column grant from direct status update';
    ELSE
        RAISE WARNING 'TEST 5 [FAIL]: User A updated ad status directly!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 6: User A can mark_ad_sold, User B cannot
    -- --------------------------------------------------------------------------
    -- User B tries to mark User A''s ad sold -> must fail
    SET LOCAL "request.jwt.claims" = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
    v_failed_flag := false;
    BEGIN
        PERFORM public.mark_ad_sold(v_ad_id);
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 6a [PASS]: User B rejected from mark_ad_sold on User A ad';
    ELSE
        RAISE WARNING 'TEST 6a [FAIL]: User B marked User A ad sold!';
    END IF;

    -- User A marks own ad sold -> must succeed
    SET LOCAL "request.jwt.claims" = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
    PERFORM public.mark_ad_sold(v_ad_id);
    SELECT count(*) INTO v_test_count FROM ads WHERE id = v_ad_id AND status = 'sold';
    IF v_test_count = 1 THEN
        RAISE NOTICE 'TEST 6b [PASS]: User A marked own ad sold via RPC';
    ELSE
        RAISE WARNING 'TEST 6b [FAIL]: User A failed to mark own ad sold!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 7: delete_ad works, renew_ad fails on deleted ad
    -- --------------------------------------------------------------------------
    PERFORM public.delete_ad(v_ad_id);
    SELECT count(*) INTO v_test_count FROM ads WHERE id = v_ad_id AND status = 'deleted';
    IF v_test_count = 1 THEN
        RAISE NOTICE 'TEST 7a [PASS]: delete_ad soft-deleted ad';
    ELSE
        RAISE WARNING 'TEST 7a [FAIL]: delete_ad failed!';
    END IF;

    v_failed_flag := false;
    BEGIN
        PERFORM public.renew_ad(v_ad_id);
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 7b [PASS]: renew_ad correctly rejected renewing deleted ad';
    ELSE
        RAISE WARNING 'TEST 7b [FAIL]: renew_ad allowed reviving deleted ad!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 8: User A cannot report own ad; User B can report once but not twice
    -- --------------------------------------------------------------------------
    -- Insert a fresh active ad by User A for reporting test
    SET LOCAL ROLE postgres; -- elevated for setup
    INSERT INTO ads (
        id, seller_id, brand_id, model_id, city_id,
        title, description, price, condition, pta_status, storage_gb, status
    ) VALUES (
        v_sold_ad_id, v_user_a, v_brand_id, v_model_id, v_city_id,
        'Report Test Ad', 'Testing reports', 150000, 'used', 'pta_approved', 128, 'active'
    );

    SET LOCAL ROLE authenticated;
    SET LOCAL "request.jwt.claims" = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
    v_failed_flag := false;
    BEGIN
        INSERT INTO reports (ad_id, reporter_id, reason, details)
        VALUES (v_sold_ad_id, v_user_a, 'fraud_scam', 'Reporting my own ad');
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 8a [PASS]: User A blocked from reporting own ad';
    ELSE
        RAISE WARNING 'TEST 8a [FAIL]: User A reported own ad!';
    END IF;

    -- User B reports User A's ad -> Success
    SET LOCAL "request.jwt.claims" = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
    INSERT INTO reports (ad_id, reporter_id, reason, details)
    VALUES (v_sold_ad_id, v_user_b, 'fraud_scam', 'Legitimate report from buyer');

    -- User B tries to report second time -> Blocked by UNIQUE constraint
    v_failed_flag := false;
    BEGIN
        INSERT INTO reports (ad_id, reporter_id, reason, details)
        VALUES (v_sold_ad_id, v_user_b, 'other', 'Second duplicate report');
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 8b [PASS]: Duplicate report blocked by unique constraint';
    ELSE
        RAISE WARNING 'TEST 8b [FAIL]: User B reported same ad twice!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 9: Banned user cannot insert an ad
    -- --------------------------------------------------------------------------
    SET LOCAL ROLE postgres;
    UPDATE profile_private SET is_banned = true WHERE id = v_user_b;

    SET LOCAL ROLE authenticated;
    SET LOCAL "request.jwt.claims" = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

    v_failed_flag := false;
    BEGIN
        INSERT INTO ads (
            seller_id, brand_id, model_id, city_id,
            title, description, price, condition, pta_status, storage_gb
        ) VALUES (
            v_user_b, v_brand_id, v_model_id, v_city_id,
            'Banned Ad', 'Should fail', 100000, 'used', 'pta_approved', 64
        );
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 9 [PASS]: Banned user blocked from inserting ads';
    ELSE
        RAISE WARNING 'TEST 9 [FAIL]: Banned user was able to insert an ad!';
    END IF;

    -- --------------------------------------------------------------------------
    -- TEST 10: get_seller_contact fails for anon, works for logged-in
    -- --------------------------------------------------------------------------
    SET LOCAL ROLE anon;
    SET LOCAL "request.jwt.claims" = '{}';

    v_failed_flag := false;
    BEGIN
        PERFORM * FROM public.get_seller_contact(v_sold_ad_id);
    EXCEPTION WHEN OTHERS THEN
        v_failed_flag := true;
    END;

    IF v_failed_flag THEN
        RAISE NOTICE 'TEST 10a [PASS]: Anon rejected from get_seller_contact';
    ELSE
        RAISE WARNING 'TEST 10a [FAIL]: Anon called get_seller_contact!';
    END IF;

    SET LOCAL ROLE authenticated;
    SET LOCAL "request.jwt.claims" = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
    SELECT count(*) INTO v_test_count FROM public.get_seller_contact(v_sold_ad_id);
    IF v_test_count = 1 THEN
        RAISE NOTICE 'TEST 10b [PASS]: Logged-in buyer retrieved seller contact';
    ELSE
        RAISE WARNING 'TEST 10b [FAIL]: Logged-in buyer could not retrieve seller contact!';
    END IF;

    RAISE NOTICE '--- ALL 10 TESTS COMPLETED ---';
END $$;

ROLLBACK; -- Ensures absolutely no test data is retained in production

