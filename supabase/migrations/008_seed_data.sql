-- ==============================================================================
-- Prompt 9 / Migration 008: Seed Data (Pakistan Cities, Areas, Brands & Models)
-- Safe to re-run (ON CONFLICT DO NOTHING)
-- ==============================================================================

-- 1. Cities Seed (Top 28 Cities of Pakistan)
INSERT INTO cities (name, slug) VALUES
('Karachi', 'karachi'),
('Lahore', 'lahore'),
('Islamabad', 'islamabad'),
('Rawalpindi', 'rawalpindi'),
('Faisalabad', 'faisalabad'),
('Multan', 'multan'),
('Peshawar', 'peshawar'),
('Quetta', 'quetta'),
('Sialkot', 'sialkot'),
('Gujranwala', 'gujranwala'),
('Hyderabad', 'hyderabad'),
('Abbottabad', 'abbottabad'),
('Bahawalpur', 'bahawalpur'),
('Sargodha', 'sargodha'),
('Sukkur', 'sukkur'),
('Larkana', 'larkana'),
('Sheikhupura', 'sheikhupura'),
('Jhang', 'jhang'),
('Rahim Yar Khan', 'rahim-yar-khan'),
('Gujrat', 'gujrat'),
('Mardan', 'mardan'),
('Kasur', 'kasur'),
('Sahiwal', 'sahiwal'),
('Okara', 'okara'),
('Wah Cantt', 'wah-cantt'),
('Mingora (Swat)', 'mingora'),
('Mirpur (AJK)', 'mirpur'),
('Muzaffarabad', 'muzaffarabad')
ON CONFLICT (slug) DO NOTHING;

-- 2. Areas Seed (Karachi, Lahore, Islamabad, Rawalpindi)
DO $$
DECLARE
    v_karachi_id UUID;
    v_lahore_id UUID;
    v_isb_id UUID;
    v_rwp_id UUID;
BEGIN
    SELECT id INTO v_karachi_id FROM cities WHERE slug = 'karachi';
    SELECT id INTO v_lahore_id FROM cities WHERE slug = 'lahore';
    SELECT id INTO v_isb_id FROM cities WHERE slug = 'islamabad';
    SELECT id INTO v_rwp_id FROM cities WHERE slug = 'rawalpindi';

    -- Karachi Areas
    IF v_karachi_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES
        (v_karachi_id, 'DHA (Defence)', 'dha-defence'),
        (v_karachi_id, 'Clifton', 'clifton'),
        (v_karachi_id, 'Gulshan-e-Iqbal', 'gulshan-e-iqbal'),
        (v_karachi_id, 'North Nazimabad', 'north-nazimabad'),
        (v_karachi_id, 'Johar (Gulistan-e-Johar)', 'gulistan-e-johar'),
        (v_karachi_id, 'Saddar (Star City / Saddar Market)', 'saddar'),
        (v_karachi_id, 'Bahria Town', 'bahria-town-karachi'),
        (v_karachi_id, 'PECHS', 'pechs'),
        (v_karachi_id, 'Malir Cantt', 'malir-cantt'),
        (v_karachi_id, 'Federal B Area', 'federal-b-area')
        ON CONFLICT (city_id, slug) DO NOTHING;
    END IF;

    -- Lahore Areas
    IF v_lahore_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES
        (v_lahore_id, 'DHA Phase 1-9', 'dha-lahore'),
        (v_lahore_id, 'Gulberg (Hafeez Centre)', 'gulberg-hafeez-centre'),
        (v_lahore_id, 'Johar Town', 'johar-town'),
        (v_lahore_id, 'Model Town', 'model-town'),
        (v_lahore_id, 'Bahria Town', 'bahria-town-lahore'),
        (v_lahore_id, 'Cantt', 'cantt-lahore'),
        (v_lahore_id, 'Faisal Town', 'faisal-town'),
        (v_lahore_id, 'Allama Iqbal Town', 'allama-iqbal-town'),
        (v_lahore_id, 'Wapda Town', 'wapda-town'),
        (v_lahore_id, 'Garden Town', 'garden-town')
        ON CONFLICT (city_id, slug) DO NOTHING;
    END IF;

    -- Islamabad Areas
    IF v_isb_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES
        (v_isb_id, 'F-6 / F-7 / F-8', 'blue-area-f-sectors'),
        (v_isb_id, 'F-10 / F-11', 'f-10-f-11'),
        (v_isb_id, 'G-9 / G-10 / G-11', 'g-sectors'),
        (v_isb_id, 'Blue Area', 'blue-area'),
        (v_isb_id, 'DHA Phase 2', 'dha-phase-2-islamabad'),
        (v_isb_id, 'Bahria Town Phase 1-8', 'bahria-town-islamabad'),
        (v_isb_id, 'I-8 / I-9', 'i-8-i-9'),
        (v_isb_id, 'E-11', 'e-11'),
        (v_isb_id, 'Bani Gala', 'bani-gala'),
        (v_isb_id, 'PWD / Media Town', 'pwd-media-town')
        ON CONFLICT (city_id, slug) DO NOTHING;
    END IF;

    -- Rawalpindi Areas
    IF v_rwp_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES
        (v_rwp_id, 'Saddar (Singapore Plaza)', 'saddar-singapore-plaza'),
        (v_rwp_id, 'Bahria Town Rawalpindi', 'bahria-town-rawalpindi'),
        (v_rwp_id, 'Satellite Town', 'satellite-town'),
        (v_rwp_id, 'Chaklala Scheme 3', 'chaklala-scheme-3'),
        (v_rwp_id, 'Westridge', 'westridge'),
        (v_rwp_id, 'Commercial Market', 'commercial-market'),
        (v_rwp_id, 'Peshawar Road', 'peshawar-road'),
        (v_rwp_id, 'Adyala Road', 'adyala-road')
        ON CONFLICT (city_id, slug) DO NOTHING;
    END IF;
END $$;

-- 3. Brands Seed
INSERT INTO brands (name, slug) VALUES
('Apple', 'apple'),
('Samsung', 'samsung'),
('Xiaomi', 'xiaomi'),
('Redmi', 'redmi'),
('Poco', 'poco'),
('Infinix', 'infinix'),
('Tecno', 'tecno'),
('Oppo', 'oppo'),
('Vivo', 'vivo'),
('Realme', 'realme'),
('Google Pixel', 'google-pixel'),
('OnePlus', 'oneplus'),
('Motorola', 'motorola'),
('Nothing', 'nothing'),
('Huawei', 'huawei'),
('Honor', 'honor'),
('Nokia', 'nokia'),
('Itel', 'itel')
ON CONFLICT (slug) DO NOTHING;

-- 4. Models Seed
DO $$
DECLARE
    v_apple_id UUID;
    v_samsung_id UUID;
    v_xiaomi_id UUID;
    v_infinix_id UUID;
    v_tecno_id UUID;
    v_pixel_id UUID;
BEGIN
    SELECT id INTO v_apple_id FROM brands WHERE slug = 'apple';
    SELECT id INTO v_samsung_id FROM brands WHERE slug = 'samsung';
    SELECT id INTO v_xiaomi_id FROM brands WHERE slug = 'xiaomi';
    SELECT id INTO v_infinix_id FROM brands WHERE slug = 'infinix';
    SELECT id INTO v_tecno_id FROM brands WHERE slug = 'tecno';
    SELECT id INTO v_pixel_id FROM brands WHERE slug = 'google-pixel';

    -- Apple Models
    IF v_apple_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_apple_id, 'iPhone 16 Pro Max', 'iphone-16-pro-max', 2024, ARRAY[256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 16 Pro', 'iphone-16-pro', 2024, ARRAY[128, 256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 16', 'iphone-16', 2024, ARRAY[128, 256, 512], ARRAY[8]),
        (v_apple_id, 'iPhone 15 Pro Max', 'iphone-15-pro-max', 2023, ARRAY[256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 15 Pro', 'iphone-15-pro', 2023, ARRAY[128, 256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 15', 'iphone-15', 2023, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 14 Pro Max', 'iphone-14-pro-max', 2022, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 14 Pro', 'iphone-14-pro', 2022, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 14', 'iphone-14', 2022, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 13 Pro Max', 'iphone-13-pro-max', 2021, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 13', 'iphone-13', 2021, ARRAY[128, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone 12', 'iphone-12', 2020, ARRAY[64, 128, 256], ARRAY[4]),
        (v_apple_id, 'iPhone 11', 'iphone-11', 2019, ARRAY[64, 128, 256], ARRAY[4])
        ON CONFLICT (brand_id, slug) DO NOTHING;
    END IF;

    -- Samsung Models
    IF v_samsung_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_samsung_id, 'Galaxy S24 Ultra', 'galaxy-s24-ultra', 2024, ARRAY[256, 512, 1024], ARRAY[12]),
        (v_samsung_id, 'Galaxy S24 Plus', 'galaxy-s24-plus', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_samsung_id, 'Galaxy S24', 'galaxy-s24', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S23 Ultra', 'galaxy-s23-ultra', 2023, ARRAY[256, 512, 1024], ARRAY[8, 12]),
        (v_samsung_id, 'Galaxy S23 FE', 'galaxy-s23-fe', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S22 Ultra', 'galaxy-s22-ultra', 2022, ARRAY[128, 256, 512], ARRAY[8, 12]),
        (v_samsung_id, 'Galaxy A55 5G', 'galaxy-a55-5g', 2024, ARRAY[128, 256], ARRAY[8, 12]),
        (v_samsung_id, 'Galaxy A54 5G', 'galaxy-a54-5g', 2023, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy A35 5G', 'galaxy-a35-5g', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy A15', 'galaxy-a15', 2024, ARRAY[128, 256], ARRAY[4, 6, 8]),
        (v_samsung_id, 'Galaxy Z Fold 6', 'galaxy-z-fold-6', 2024, ARRAY[256, 512, 1024], ARRAY[12]),
        (v_samsung_id, 'Galaxy Z Flip 6', 'galaxy-z-flip-6', 2024, ARRAY[256, 512], ARRAY[12])
        ON CONFLICT (brand_id, slug) DO NOTHING;
    END IF;

    -- Xiaomi / Redmi Models
    IF v_xiaomi_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_xiaomi_id, 'Xiaomi 14 Ultra', 'xiaomi-14-ultra', 2024, ARRAY[512, 1024], ARRAY[16]),
        (v_xiaomi_id, 'Xiaomi 14', 'xiaomi-14', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_xiaomi_id, 'Xiaomi 13T Pro', 'xiaomi-13t-pro', 2023, ARRAY[256, 512], ARRAY[12]),
        (v_xiaomi_id, 'Redmi Note 13 Pro Plus', 'redmi-note-13-pro-plus', 2024, ARRAY[256, 512], ARRAY[8, 12]),
        (v_xiaomi_id, 'Redmi Note 13 Pro', 'redmi-note-13-pro', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_xiaomi_id, 'Redmi Note 13', 'redmi-note-13', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_xiaomi_id, 'Redmi 13C', 'redmi-13c', 2023, ARRAY[128, 256], ARRAY[4, 6, 8])
        ON CONFLICT (brand_id, slug) DO NOTHING;
    END IF;

    -- Infinix Models
    IF v_infinix_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_infinix_id, 'Zero 30 5G', 'zero-30-5g', 2023, ARRAY[256], ARRAY[8, 12]),
        (v_infinix_id, 'Note 40 Pro', 'note-40-pro', 2024, ARRAY[256], ARRAY[8, 12]),
        (v_infinix_id, 'Note 40', 'note-40', 2024, ARRAY[256], ARRAY[8]),
        (v_infinix_id, 'Note 30 Pro', 'note-30-pro', 2023, ARRAY[256], ARRAY[8]),
        (v_infinix_id, 'Hot 40 Pro', 'hot-40-pro', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_infinix_id, 'Hot 30', 'hot-30', 2023, ARRAY[128], ARRAY[8]),
        (v_infinix_id, 'Smart 8', 'smart-8', 2023, ARRAY[64, 128], ARRAY[3, 4])
        ON CONFLICT (brand_id, slug) DO NOTHING;
    END IF;

    -- Tecno Models
    IF v_tecno_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_tecno_id, 'Camon 30 Premier', 'camon-30-premier', 2024, ARRAY[512], ARRAY[12]),
        (v_tecno_id, 'Camon 30 Pro 5G', 'camon-30-pro-5g', 2024, ARRAY[256], ARRAY[12]),
        (v_tecno_id, 'Camon 30', 'camon-30', 2024, ARRAY[256], ARRAY[8]),
        (v_tecno_id, 'Spark 20 Pro Plus', 'spark-20-pro-plus', 2024, ARRAY[256], ARRAY[8]),
        (v_tecno_id, 'Spark 20', 'spark-20', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_tecno_id, 'Pova 6 Pro 5G', 'pova-6-pro-5g', 2024, ARRAY[256], ARRAY[8, 12])
        ON CONFLICT (brand_id, slug) DO NOTHING;
    END IF;

    -- Google Pixel Models
    IF v_pixel_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_pixel_id, 'Pixel 9 Pro XL', 'pixel-9-pro-xl', 2024, ARRAY[128, 256, 512], ARRAY[16]),
        (v_pixel_id, 'Pixel 9 Pro', 'pixel-9-pro', 2024, ARRAY[128, 256, 512], ARRAY[16]),
        (v_pixel_id, 'Pixel 9', 'pixel-9', 2024, ARRAY[128, 256], ARRAY[12]),
        (v_pixel_id, 'Pixel 8 Pro', 'pixel-8-pro', 2023, ARRAY[128, 256, 512], ARRAY[12]),
        (v_pixel_id, 'Pixel 8', 'pixel-8', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_pixel_id, 'Pixel 7 Pro', 'pixel-7-pro', 2022, ARRAY[128, 256, 512], ARRAY[12]),
        (v_pixel_id, 'Pixel 7', 'pixel-7', 2022, ARRAY[128, 256], ARRAY[8]),
        (v_pixel_id, 'Pixel 6 Pro', 'pixel-6-pro', 2021, ARRAY[128, 256], ARRAY[12]),
        (v_pixel_id, 'Pixel 6', 'pixel-6', 2021, ARRAY[128, 256], ARRAY[8])
        ON CONFLICT (brand_id, slug) DO NOTHING;
    END IF;
END $$;

