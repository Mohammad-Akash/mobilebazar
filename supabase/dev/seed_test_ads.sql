-- ==============================================================================
-- MobileBazar DEV-ONLY Seed Script: Realistic Test Ads Generator
-- Run this script in the Supabase SQL Editor (as postgres/service_role)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- HOW TO RUN:
-- 1. Open Supabase Dashboard -> SQL Editor
-- 2. Paste this script
-- 3. (Optional) Set your specific user ID in `v_custom_user_id` below, or leave NULL
--    to automatically pick the first user from the profiles table.
-- 4. Click "Run". It generates 2,000 realistic ads with images in seconds.
--
-- CLEANUP QUERY (To delete all test data anytime):
-- DELETE FROM public.ads WHERE description LIKE '%[TEST_DATA]%';
-- ------------------------------------------------------------------------------

DO $$
DECLARE
    -- Configure your seller user ID here (or leave NULL to auto-select)
    v_custom_user_id UUID := NULL; 
    v_seller_id UUID;
    v_count INT := 2000; -- Change this to test smaller or larger datasets
    v_inserted INT := 0;
BEGIN
    -- 1. Identify Seller ID
    IF v_custom_user_id IS NOT NULL THEN
        v_seller_id := v_custom_user_id;
    ELSE
        SELECT id INTO v_seller_id FROM public.profiles ORDER BY created_at ASC LIMIT 1;
    END IF;

    IF v_seller_id IS NULL THEN
        RAISE EXCEPTION 'No user found in profiles. Please sign up or create at least one user before running this seed script.';
    END IF;

    RAISE NOTICE 'Using seller ID: % for generating % test ads...', v_seller_id, v_count;

    -- 2. Temporarily disable user rate limit trigger (so 2,000 ads can be bulk inserted for DEV testing)
    ALTER TABLE public.ads DISABLE TRIGGER trigger_check_user_ad_limits;

    -- 3. Bulk Insert 2,000 realistic ads
    WITH brand_models AS (
        SELECT 
            m.id AS model_id,
            m.name AS model_name,
            m.slug AS model_slug,
            m.storage_options,
            m.ram_options,
            b.id AS brand_id,
            b.name AS brand_name,
            b.slug AS brand_slug
        FROM public.models m
        JOIN public.brands b ON m.brand_id = b.id
        WHERE m.is_active = true
    ),
    all_cities AS (
        SELECT id, name, slug FROM public.cities WHERE is_active = true
    ),
    raw_ads AS (
        SELECT 
            gen_random_uuid() AS ad_id,
            v_seller_id AS seller_id,
            bm.brand_id,
            bm.model_id,
            bm.brand_name,
            bm.brand_slug,
            bm.model_name,
            c.id AS city_id,
            c.name AS city_name,
            -- Pick area belonging to selected city (or NULL)
            (SELECT a.id FROM public.areas a WHERE a.city_id = c.id ORDER BY random() LIMIT 1) AS area_id,
            
            -- Condition (80% used, 20% new)
            (CASE WHEN random() < 0.20 THEN 'new'::condition_type ELSE 'used'::condition_type END) AS cond,

            -- PTA status
            (CASE 
                WHEN random() < 0.60 THEN 'pta_approved'::pta_status
                WHEN random() < 0.85 THEN 'non_pta'::pta_status
                WHEN random() < 0.95 THEN 'jv'::pta_status
                ELSE 'unknown'::pta_status
            END) AS pta,

            -- Storage (from model options or fallback)
            COALESCE(
                bm.storage_options[1 + floor(random() * COALESCE(array_length(bm.storage_options, 1), 1))::int],
                (ARRAY[64, 128, 256, 512])[1 + floor(random() * 4)::int]
            ) AS storage,

            -- RAM
            COALESCE(
                bm.ram_options[1 + floor(random() * COALESCE(array_length(bm.ram_options, 1), 1))::int],
                (ARRAY[4, 6, 8, 12])[1 + floor(random() * 4)::int]
            ) AS ram,

            -- Color
            (ARRAY['Black', 'White', 'Silver', 'Gold', 'Deep Purple', 'Blue', 'Natural Titanium', 'Space Grey', 'Green'])[1 + floor(random() * 9)::int] AS col,

            -- Warranty
            (CASE WHEN random() < 0.25 THEN 'in_warranty'::warranty_type ELSE 'none'::warranty_type END) AS w_type,
            (CASE WHEN random() < 0.25 THEN 1 + floor(random() * 11)::int ELSE 0 END) AS w_months,

            -- Brand-based price calculation
            (CASE 
                WHEN bm.brand_slug = 'apple' THEN (75000 + floor(random() * 450000 / 1000) * 1000)::bigint
                WHEN bm.brand_slug = 'samsung' THEN (35000 + floor(random() * 380000 / 1000) * 1000)::bigint
                WHEN bm.brand_slug IN ('google', 'oneplus') THEN (45000 + floor(random() * 180000 / 1000) * 1000)::bigint
                WHEN bm.brand_slug IN ('xiaomi', 'vivo', 'oppo', 'realme') THEN (25000 + floor(random() * 120000 / 1000) * 1000)::bigint
                ELSE (15000 + floor(random() * 65000 / 1000) * 1000)::bigint
            END) AS ad_price,

            -- Published at randomly distributed over past 60 days
            (now() - (random() * interval '60 days')) AS pub_at

        FROM generate_series(1, v_count) s
        CROSS JOIN LATERAL (SELECT * FROM brand_models ORDER BY random() LIMIT 1) bm
        CROSS JOIN LATERAL (SELECT * FROM all_cities ORDER BY random() LIMIT 1) c
    ),
    inserted_ads AS (
        INSERT INTO public.ads (
            id,
            seller_id,
            brand_id,
            model_id,
            city_id,
            area_id,
            title,
            description,
            price,
            is_negotiable,
            condition,
            pta_status,
            storage_gb,
            ram_gb,
            color,
            battery_health,
            has_box,
            has_accessories,
            warranty_type,
            warranty_months_remaining,
            contact_preference,
            status,
            is_featured,
            views_count,
            favorites_count,
            published_at,
            created_at,
            updated_at
        )
        SELECT 
            ad_id,
            seller_id,
            brand_id,
            model_id,
            city_id,
            area_id,
            -- Realistic title
            (brand_name || ' ' || model_name || ' ' || 
             (CASE WHEN storage >= 1024 THEN (storage/1024)::text || 'TB' ELSE storage::text || 'GB' END) || ' ' ||
             (CASE WHEN pta = 'pta_approved' THEN 'PTA Approved' WHEN pta = 'non_pta' THEN 'Non-PTA' ELSE 'JV' END)
            ) AS title,
            -- Description clearly tagged with [TEST_DATA] for safe cleanup
            ('Original phone in excellent condition. 10/10 condition, complete box with all genuine accessories. Serious buyers in ' || city_name || ' only. Price slightly negotiable on spot. [TEST_DATA]') AS description,
            ad_price,
            (random() > 0.3) AS is_negotiable,
            cond,
            pta,
            storage,
            ram,
            col,
            (CASE WHEN cond = 'used' THEN (78 + floor(random() * 22)::int) ELSE NULL END) AS battery_health,
            (random() > 0.4) AS has_box,
            (random() > 0.5) AS has_accessories,
            w_type,
            w_months,
            (ARRAY['phone'::contact_preference, 'whatsapp'::contact_preference, 'both'::contact_preference])[1 + floor(random() * 3)::int],
            'active'::ad_status,
            (random() < 0.05) AS is_featured, -- 5% featured ads
            floor(random() * 250)::int AS views_count,
            floor(random() * 35)::int AS favorites_count,
            pub_at,
            pub_at,
            pub_at
        FROM raw_ads
        RETURNING id, brand_slug
    )
    -- 4. Insert cover image row for each inserted ad
    INSERT INTO public.ad_images (ad_id, storage_path, position)
    SELECT 
        ia.id,
        'placeholder/' || ia.brand_slug || '.webp',
        0
    FROM inserted_ads ia;

    -- 5. Re-enable user rate limit trigger
    ALTER TABLE public.ads ENABLE TRIGGER trigger_check_user_ad_limits;

    SELECT count(*) INTO v_inserted FROM public.ads WHERE description LIKE '%[TEST_DATA]%';
    RAISE NOTICE 'SUCCESS: % test ads generated and ready for testing!', v_inserted;
END $$;

-- ==============================================================================
-- CLEANUP QUERY:
-- To delete all generated test data anytime without affecting real ads:
--
-- DELETE FROM public.ads WHERE description LIKE '%[TEST_DATA]%';
-- ==============================================================================


-- ==============================================================================
-- OPTIONAL: 100,000 ADS PERFORMANCE STRESS TEST BLOCK
-- 
-- ⚠️ WARNING:
-- Supabase Free Tier has a 500 MB database storage limit.
-- 100,000 ads with full-text search tsvectors and trigram indexes take ~120-180 MB.
-- Only run this block if you are doing a dedicated performance/stress benchmark.
-- Clean up immediately afterwards using the cleanup query above.
-- ==============================================================================
/*
DO $$
DECLARE
    v_seller_id UUID;
    v_batch INT := 10000; -- Run in batches of 10k to prevent statement timeout
BEGIN
    SELECT id INTO v_seller_id FROM public.profiles ORDER BY created_at ASC LIMIT 1;
    ALTER TABLE public.ads DISABLE TRIGGER trigger_check_user_ad_limits;

    FOR i IN 1..10 LOOP
        -- (Repeats batch logic for 10 x 10,000 = 100,000 ads)
        RAISE NOTICE 'Inserting stress-test batch % of 10...', i;
    END LOOP;

    ALTER TABLE public.ads ENABLE TRIGGER trigger_check_user_ad_limits;
END $$;
*/

