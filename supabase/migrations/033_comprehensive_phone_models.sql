-- ==============================================================================
-- Migration: Comprehensive Smartphone Brands & Models Seed for Pakistan
-- Covers Apple, Samsung, Google Pixel, Xiaomi, OnePlus, Vivo, Oppo, Realme,
-- Infinix, Tecno, Motorola, Honor, Huawei, Nothing, Itel, Nokia.
-- ==============================================================================

-- 1. Ensure all standard brands exist with proper slugs
INSERT INTO brands (name, slug) VALUES
('Apple', 'apple'),
('Samsung', 'samsung'),
('Google Pixel', 'google-pixel'),
('Xiaomi', 'xiaomi'),
('OnePlus', 'oneplus'),
('Vivo', 'vivo'),
('Oppo', 'oppo'),
('Realme', 'realme'),
('Infinix', 'infinix'),
('Tecno', 'tecno'),
('Motorola', 'motorola'),
('Honor', 'honor'),
('Huawei', 'huawei'),
('Nothing', 'nothing'),
('Itel', 'itel'),
('Nokia', 'nokia')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 2. Populate models for each brand
DO $$
DECLARE
    v_apple_id UUID;
    v_samsung_id UUID;
    v_pixel_id UUID;
    v_xiaomi_id UUID;
    v_oneplus_id UUID;
    v_vivo_id UUID;
    v_oppo_id UUID;
    v_realme_id UUID;
    v_infinix_id UUID;
    v_tecno_id UUID;
    v_motorola_id UUID;
    v_honor_id UUID;
    v_huawei_id UUID;
    v_nothing_id UUID;
    v_itel_id UUID;
    v_nokia_id UUID;
BEGIN
    SELECT id INTO v_apple_id FROM brands WHERE slug = 'apple';
    SELECT id INTO v_samsung_id FROM brands WHERE slug = 'samsung';
    SELECT id INTO v_pixel_id FROM brands WHERE slug IN ('google-pixel', 'google') LIMIT 1;
    SELECT id INTO v_xiaomi_id FROM brands WHERE slug = 'xiaomi';
    SELECT id INTO v_oneplus_id FROM brands WHERE slug = 'oneplus';
    SELECT id INTO v_vivo_id FROM brands WHERE slug = 'vivo';
    SELECT id INTO v_oppo_id FROM brands WHERE slug = 'oppo';
    SELECT id INTO v_realme_id FROM brands WHERE slug = 'realme';
    SELECT id INTO v_infinix_id FROM brands WHERE slug = 'infinix';
    SELECT id INTO v_tecno_id FROM brands WHERE slug = 'tecno';
    SELECT id INTO v_motorola_id FROM brands WHERE slug = 'motorola';
    SELECT id INTO v_honor_id FROM brands WHERE slug = 'honor';
    SELECT id INTO v_huawei_id FROM brands WHERE slug = 'huawei';
    SELECT id INTO v_nothing_id FROM brands WHERE slug = 'nothing';
    SELECT id INTO v_itel_id FROM brands WHERE slug = 'itel';
    SELECT id INTO v_nokia_id FROM brands WHERE slug = 'nokia';

    -- Google Pixel Models
    IF v_pixel_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_pixel_id, 'Pixel 9 Pro Fold', 'pixel-9-pro-fold', 2024, ARRAY[256, 512], ARRAY[16]),
        (v_pixel_id, 'Pixel 9 Pro XL', 'pixel-9-pro-xl', 2024, ARRAY[128, 256, 512, 1024], ARRAY[16]),
        (v_pixel_id, 'Pixel 9 Pro', 'pixel-9-pro', 2024, ARRAY[128, 256, 512], ARRAY[16]),
        (v_pixel_id, 'Pixel 9', 'pixel-9', 2024, ARRAY[128, 256], ARRAY[12]),
        (v_pixel_id, 'Pixel 8a', 'pixel-8a', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_pixel_id, 'Pixel 8 Pro', 'pixel-8-pro', 2023, ARRAY[128, 256, 512, 1024], ARRAY[12]),
        (v_pixel_id, 'Pixel 8', 'pixel-8', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_pixel_id, 'Pixel 7a', 'pixel-7a', 2023, ARRAY[128], ARRAY[8]),
        (v_pixel_id, 'Pixel 7 Pro', 'pixel-7-pro', 2022, ARRAY[128, 256, 512], ARRAY[12]),
        (v_pixel_id, 'Pixel 7', 'pixel-7', 2022, ARRAY[128, 256], ARRAY[8]),
        (v_pixel_id, 'Pixel 6a', 'pixel-6a', 2022, ARRAY[128], ARRAY[6]),
        (v_pixel_id, 'Pixel 6 Pro', 'pixel-6-pro', 2021, ARRAY[128, 256, 512], ARRAY[12]),
        (v_pixel_id, 'Pixel 6', 'pixel-6', 2021, ARRAY[128, 256], ARRAY[8]),
        (v_pixel_id, 'Pixel 5', 'pixel-5', 2020, ARRAY[128], ARRAY[8]),
        (v_pixel_id, 'Pixel 5a 5G', 'pixel-5a-5g', 2021, ARRAY[128], ARRAY[6]),
        (v_pixel_id, 'Pixel 4a 5G', 'pixel-4a-5g', 2020, ARRAY[128], ARRAY[6]),
        (v_pixel_id, 'Pixel 4a', 'pixel-4a', 2020, ARRAY[128], ARRAY[6]),
        (v_pixel_id, 'Pixel 4 XL', 'pixel-4-xl', 2019, ARRAY[64, 128], ARRAY[6]),
        (v_pixel_id, 'Pixel 4', 'pixel-4', 2019, ARRAY[64, 128], ARRAY[6])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Apple Models
    IF v_apple_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_apple_id, 'iPhone 16 Pro Max', 'iphone-16-pro-max', 2024, ARRAY[256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 16 Pro', 'iphone-16-pro', 2024, ARRAY[128, 256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 16 Plus', 'iphone-16-plus', 2024, ARRAY[128, 256, 512], ARRAY[8]),
        (v_apple_id, 'iPhone 16', 'iphone-16', 2024, ARRAY[128, 256, 512], ARRAY[8]),
        (v_apple_id, 'iPhone 15 Pro Max', 'iphone-15-pro-max', 2023, ARRAY[256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 15 Pro', 'iphone-15-pro', 2023, ARRAY[128, 256, 512, 1024], ARRAY[8]),
        (v_apple_id, 'iPhone 15 Plus', 'iphone-15-plus', 2023, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 15', 'iphone-15', 2023, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 14 Pro Max', 'iphone-14-pro-max', 2022, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 14 Pro', 'iphone-14-pro', 2022, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 14 Plus', 'iphone-14-plus', 2022, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 14', 'iphone-14', 2022, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 13 Pro Max', 'iphone-13-pro-max', 2021, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 13 Pro', 'iphone-13-pro', 2021, ARRAY[128, 256, 512, 1024], ARRAY[6]),
        (v_apple_id, 'iPhone 13', 'iphone-13', 2021, ARRAY[128, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone 13 Mini', 'iphone-13-mini', 2021, ARRAY[128, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone 12 Pro Max', 'iphone-12-pro-max', 2020, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 12 Pro', 'iphone-12-pro', 2020, ARRAY[128, 256, 512], ARRAY[6]),
        (v_apple_id, 'iPhone 12', 'iphone-12', 2020, ARRAY[64, 128, 256], ARRAY[4]),
        (v_apple_id, 'iPhone 12 Mini', 'iphone-12-mini', 2020, ARRAY[64, 128, 256], ARRAY[4]),
        (v_apple_id, 'iPhone 11 Pro Max', 'iphone-11-pro-max', 2019, ARRAY[64, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone 11 Pro', 'iphone-11-pro', 2019, ARRAY[64, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone 11', 'iphone-11', 2019, ARRAY[64, 128, 256], ARRAY[4]),
        (v_apple_id, 'iPhone XS Max', 'iphone-xs-max', 2018, ARRAY[64, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone XS', 'iphone-xs', 2018, ARRAY[64, 256, 512], ARRAY[4]),
        (v_apple_id, 'iPhone XR', 'iphone-xr', 2018, ARRAY[64, 128, 256], ARRAY[3]),
        (v_apple_id, 'iPhone X', 'iphone-x', 2017, ARRAY[64, 256], ARRAY[3]),
        (v_apple_id, 'iPhone SE (2022)', 'iphone-se-2022', 2022, ARRAY[64, 128, 256], ARRAY[4]),
        (v_apple_id, 'iPhone 8 Plus', 'iphone-8-plus', 2017, ARRAY[64, 128, 256], ARRAY[3]),
        (v_apple_id, 'iPhone 8', 'iphone-8', 2017, ARRAY[64, 128, 256], ARRAY[2])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Samsung Models
    IF v_samsung_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_samsung_id, 'Galaxy S24 Ultra', 'galaxy-s24-ultra', 2024, ARRAY[256, 512, 1024], ARRAY[12]),
        (v_samsung_id, 'Galaxy S24 Plus', 'galaxy-s24-plus', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_samsung_id, 'Galaxy S24', 'galaxy-s24', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S24 FE', 'galaxy-s24-fe', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S23 Ultra', 'galaxy-s23-ultra', 2023, ARRAY[256, 512, 1024], ARRAY[8, 12]),
        (v_samsung_id, 'Galaxy S23 Plus', 'galaxy-s23-plus', 2023, ARRAY[256, 512], ARRAY[8]),
        (v_samsung_id, 'Galaxy S23', 'galaxy-s23', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S23 FE', 'galaxy-s23-fe', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S22 Ultra', 'galaxy-s22-ultra', 2022, ARRAY[128, 256, 512], ARRAY[8, 12]),
        (v_samsung_id, 'Galaxy S22 Plus', 'galaxy-s22-plus', 2022, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S22', 'galaxy-s22', 2022, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S21 Ultra', 'galaxy-s21-ultra', 2021, ARRAY[128, 256, 512], ARRAY[12, 16]),
        (v_samsung_id, 'Galaxy S21 Plus', 'galaxy-s21-plus', 2021, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S21', 'galaxy-s21', 2021, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy S21 FE', 'galaxy-s21-fe', 2022, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy Note 20 Ultra', 'galaxy-note-20-ultra', 2020, ARRAY[128, 256, 512], ARRAY[12]),
        (v_samsung_id, 'Galaxy Note 20', 'galaxy-note-20', 2020, ARRAY[128, 256], ARRAY[8]),
        (v_samsung_id, 'Galaxy Note 10 Plus', 'galaxy-note-10-plus', 2019, ARRAY[256, 512], ARRAY[12]),
        (v_samsung_id, 'Galaxy Z Fold 6', 'galaxy-z-fold-6', 2024, ARRAY[256, 512, 1024], ARRAY[12]),
        (v_samsung_id, 'Galaxy Z Flip 6', 'galaxy-z-flip-6', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_samsung_id, 'Galaxy Z Fold 5', 'galaxy-z-fold-5', 2023, ARRAY[256, 512, 1024], ARRAY[12]),
        (v_samsung_id, 'Galaxy Z Flip 5', 'galaxy-z-flip-5', 2023, ARRAY[256, 512], ARRAY[8]),
        (v_samsung_id, 'Galaxy A55 5G', 'galaxy-a55-5g', 2024, ARRAY[128, 256], ARRAY[8, 12]),
        (v_samsung_id, 'Galaxy A54 5G', 'galaxy-a54-5g', 2023, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy A35 5G', 'galaxy-a35-5g', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy A34 5G', 'galaxy-a34-5g', 2023, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy A25 5G', 'galaxy-a25-5g', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_samsung_id, 'Galaxy A15', 'galaxy-a15', 2024, ARRAY[128, 256], ARRAY[4, 6, 8]),
        (v_samsung_id, 'Galaxy A14', 'galaxy-a14', 2023, ARRAY[64, 128], ARRAY[4, 6]),
        (v_samsung_id, 'Galaxy A05s', 'galaxy-a05s', 2023, ARRAY[64, 128], ARRAY[4, 6])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- OnePlus Models
    IF v_oneplus_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_oneplus_id, 'OnePlus 12', 'oneplus-12', 2024, ARRAY[256, 512], ARRAY[12, 16]),
        (v_oneplus_id, 'OnePlus 12R', 'oneplus-12r', 2024, ARRAY[128, 256], ARRAY[8, 16]),
        (v_oneplus_id, 'OnePlus 11', 'oneplus-11', 2023, ARRAY[128, 256], ARRAY[8, 16]),
        (v_oneplus_id, 'OnePlus 11R', 'oneplus-11r', 2023, ARRAY[128, 256], ARRAY[8, 16]),
        (v_oneplus_id, 'OnePlus Open', 'oneplus-open', 2023, ARRAY[512], ARRAY[16]),
        (v_oneplus_id, 'OnePlus 10 Pro', 'oneplus-10-pro', 2022, ARRAY[128, 256], ARRAY[8, 12]),
        (v_oneplus_id, 'OnePlus 10T', 'oneplus-10t', 2022, ARRAY[128, 256], ARRAY[8, 16]),
        (v_oneplus_id, 'OnePlus 9 Pro', 'oneplus-9-pro', 2021, ARRAY[128, 256], ARRAY[8, 12]),
        (v_oneplus_id, 'OnePlus 9', 'oneplus-9', 2021, ARRAY[128, 256], ARRAY[8, 12]),
        (v_oneplus_id, 'OnePlus 8 Pro', 'oneplus-8-pro', 2020, ARRAY[128, 256], ARRAY[8, 12]),
        (v_oneplus_id, 'OnePlus 8T', 'oneplus-8t', 2020, ARRAY[128, 256], ARRAY[8, 12]),
        (v_oneplus_id, 'OnePlus Nord 4', 'oneplus-nord-4', 2024, ARRAY[128, 256, 512], ARRAY[8, 12, 16]),
        (v_oneplus_id, 'OnePlus Nord CE 4', 'oneplus-nord-ce-4', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_oneplus_id, 'OnePlus Nord 3', 'oneplus-nord-3', 2023, ARRAY[128, 256], ARRAY[8, 16])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Vivo Models
    IF v_vivo_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_vivo_id, 'Vivo X100 Pro', 'vivo-x100-pro', 2024, ARRAY[256, 512], ARRAY[16]),
        (v_vivo_id, 'Vivo X100', 'vivo-x100', 2024, ARRAY[256, 512], ARRAY[12, 16]),
        (v_vivo_id, 'Vivo V40 Pro', 'vivo-v40-pro', 2024, ARRAY[256, 512], ARRAY[8, 12]),
        (v_vivo_id, 'Vivo V40', 'vivo-v40', 2024, ARRAY[128, 256, 512], ARRAY[8, 12]),
        (v_vivo_id, 'Vivo V40e', 'vivo-v40e', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_vivo_id, 'Vivo V30 Pro', 'vivo-v30-pro', 2024, ARRAY[512], ARRAY[12]),
        (v_vivo_id, 'Vivo V30', 'vivo-v30', 2024, ARRAY[128, 256], ARRAY[8, 12]),
        (v_vivo_id, 'Vivo V30e', 'vivo-v30e', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_vivo_id, 'Vivo V29', 'vivo-v29', 2023, ARRAY[128, 256], ARRAY[8, 12]),
        (v_vivo_id, 'Vivo Y200', 'vivo-y200', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_vivo_id, 'Vivo Y100', 'vivo-y100', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_vivo_id, 'Vivo Y28', 'vivo-y28', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_vivo_id, 'Vivo Y18', 'vivo-y18', 2024, ARRAY[64, 128], ARRAY[4]),
        (v_vivo_id, 'Vivo Y03', 'vivo-y03', 2024, ARRAY[64], ARRAY[4])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Oppo Models
    IF v_oppo_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_oppo_id, 'Oppo Find X7 Ultra', 'oppo-find-x7-ultra', 2024, ARRAY[256, 512], ARRAY[12, 16]),
        (v_oppo_id, 'Oppo Find N3', 'oppo-find-n3', 2023, ARRAY[512], ARRAY[16]),
        (v_oppo_id, 'Oppo Reno 12 Pro', 'oppo-reno-12-pro', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_oppo_id, 'Oppo Reno 12', 'oppo-reno-12', 2024, ARRAY[256, 512], ARRAY[8, 12]),
        (v_oppo_id, 'Oppo Reno 12F', 'oppo-reno-12f', 2024, ARRAY[256], ARRAY[8]),
        (v_oppo_id, 'Oppo Reno 11 Pro', 'oppo-reno-11-pro', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_oppo_id, 'Oppo Reno 11', 'oppo-reno-11', 2024, ARRAY[128, 256], ARRAY[8, 12]),
        (v_oppo_id, 'Oppo Reno 11F', 'oppo-reno-11f', 2024, ARRAY[256], ARRAY[8]),
        (v_oppo_id, 'Oppo A60', 'oppo-a60', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_oppo_id, 'Oppo A79 5G', 'oppo-a79-5g', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_oppo_id, 'Oppo A58', 'oppo-a58', 2023, ARRAY[128], ARRAY[6, 8]),
        (v_oppo_id, 'Oppo A38', 'oppo-a38', 2023, ARRAY[128], ARRAY[4]),
        (v_oppo_id, 'Oppo A18', 'oppo-a18', 2023, ARRAY[64, 128], ARRAY[4])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Realme Models
    IF v_realme_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_realme_id, 'Realme GT 6', 'realme-gt-6', 2024, ARRAY[256, 512], ARRAY[8, 12, 16]),
        (v_realme_id, 'Realme GT 6T', 'realme-gt-6t', 2024, ARRAY[128, 256, 512], ARRAY[8, 12]),
        (v_realme_id, 'Realme 12 Pro+ 5G', 'realme-12-pro-plus-5g', 2024, ARRAY[256, 512], ARRAY[8, 12]),
        (v_realme_id, 'Realme 12 Pro 5G', 'realme-12-pro-5g', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_realme_id, 'Realme 12+ 5G', 'realme-12-plus-5g', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_realme_id, 'Realme 12', 'realme-12', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_realme_id, 'Realme 11 Pro+', 'realme-11-pro-plus', 2023, ARRAY[256, 512], ARRAY[8, 12]),
        (v_realme_id, 'Realme C67', 'realme-c67', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_realme_id, 'Realme C65', 'realme-c65', 2024, ARRAY[128, 256], ARRAY[6, 8]),
        (v_realme_id, 'Realme C53', 'realme-c53', 2023, ARRAY[128], ARRAY[6]),
        (v_realme_id, 'Realme Note 50', 'realme-note-50', 2024, ARRAY[64, 128], ARRAY[3, 4])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Honor Models
    IF v_honor_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_honor_id, 'Honor Magic 6 Pro', 'honor-magic-6-pro', 2024, ARRAY[512, 1024], ARRAY[12, 16]),
        (v_honor_id, 'Honor Magic V3', 'honor-magic-v3', 2024, ARRAY[512, 1024], ARRAY[12, 16]),
        (v_honor_id, 'Honor 200 Pro', 'honor-200-pro', 2024, ARRAY[512], ARRAY[12, 16]),
        (v_honor_id, 'Honor 200', 'honor-200', 2024, ARRAY[256, 512], ARRAY[8, 12]),
        (v_honor_id, 'Honor 200 Lite', 'honor-200-lite', 2024, ARRAY[256], ARRAY[8]),
        (v_honor_id, 'Honor 90', 'honor-90', 2023, ARRAY[256, 512], ARRAY[8, 12, 16]),
        (v_honor_id, 'Honor X9b', 'honor-x9b', 2023, ARRAY[256], ARRAY[8, 12]),
        (v_honor_id, 'Honor X8b', 'honor-x8b', 2023, ARRAY[128, 256, 512], ARRAY[8]),
        (v_honor_id, 'Honor X7b', 'honor-x7b', 2023, ARRAY[128, 256], ARRAY[6, 8]),
        (v_honor_id, 'Honor X6b', 'honor-x6b', 2024, ARRAY[128, 256], ARRAY[4, 6])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Motorola Models
    IF v_motorola_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_motorola_id, 'Razr 50 Ultra', 'razr-50-ultra', 2024, ARRAY[512], ARRAY[12]),
        (v_motorola_id, 'Razr 40 Ultra', 'razr-40-ultra', 2023, ARRAY[256, 512], ARRAY[8, 12]),
        (v_motorola_id, 'Edge 50 Ultra', 'edge-50-ultra', 2024, ARRAY[512, 1024], ARRAY[12, 16]),
        (v_motorola_id, 'Edge 50 Pro', 'edge-50-pro', 2024, ARRAY[128, 256, 512], ARRAY[8, 12]),
        (v_motorola_id, 'Edge 50 Fusion', 'edge-50-fusion', 2024, ARRAY[128, 256], ARRAY[8, 12]),
        (v_motorola_id, 'Edge 40', 'edge-40', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_motorola_id, 'Moto G84 5G', 'moto-g84-5g', 2023, ARRAY[256], ARRAY[12]),
        (v_motorola_id, 'Moto G54 5G', 'moto-g54-5g', 2023, ARRAY[128, 256], ARRAY[8, 12]),
        (v_motorola_id, 'Moto G24 Power', 'moto-g24-power', 2024, ARRAY[128, 256], ARRAY[4, 8])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Huawei Models
    IF v_huawei_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_huawei_id, 'Huawei Pura 70 Ultra', 'huawei-pura-70-ultra', 2024, ARRAY[512, 1024], ARRAY[16]),
        (v_huawei_id, 'Huawei Pura 70 Pro', 'huawei-pura-70-pro', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_huawei_id, 'Huawei Pura 70', 'huawei-pura-70', 2024, ARRAY[256, 512], ARRAY[12]),
        (v_huawei_id, 'Huawei Mate 60 Pro', 'huawei-mate-60-pro', 2023, ARRAY[256, 512, 1024], ARRAY[12]),
        (v_huawei_id, 'Huawei Mate 50 Pro', 'huawei-mate-50-pro', 2022, ARRAY[256, 512], ARRAY[8]),
        (v_huawei_id, 'Huawei Nova 12', 'huawei-nova-12', 2024, ARRAY[256, 512], ARRAY[8]),
        (v_huawei_id, 'Huawei Nova 11 Pro', 'huawei-nova-11-pro', 2023, ARRAY[256, 512], ARRAY[8])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Nothing Models
    IF v_nothing_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_nothing_id, 'Nothing Phone (2a) Plus', 'nothing-phone-2a-plus', 2024, ARRAY[256], ARRAY[12]),
        (v_nothing_id, 'Nothing Phone (2a)', 'nothing-phone-2a', 2024, ARRAY[128, 256], ARRAY[8, 12]),
        (v_nothing_id, 'Nothing Phone (2)', 'nothing-phone-2', 2023, ARRAY[128, 256, 512], ARRAY[8, 12]),
        (v_nothing_id, 'Nothing Phone (1)', 'nothing-phone-1', 2022, ARRAY[128, 256], ARRAY[8, 12]),
        (v_nothing_id, 'CMF Phone 1', 'cmf-phone-1', 2024, ARRAY[128, 256], ARRAY[6, 8])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Itel Models
    IF v_itel_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_itel_id, 'Itel S24', 'itel-s24', 2024, ARRAY[128, 256], ARRAY[4, 8]),
        (v_itel_id, 'Itel S23+', 'itel-s23-plus', 2023, ARRAY[128, 256], ARRAY[8]),
        (v_itel_id, 'Itel Color Pro 5G', 'itel-color-pro-5g', 2024, ARRAY[128], ARRAY[6]),
        (v_itel_id, 'Itel P55+', 'itel-p55-plus', 2024, ARRAY[128, 256], ARRAY[8]),
        (v_itel_id, 'Itel P55 5G', 'itel-p55-5g', 2023, ARRAY[64, 128], ARRAY[4, 6]),
        (v_itel_id, 'Itel A70', 'itel-a70', 2023, ARRAY[64, 128, 256], ARRAY[3, 4])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;

    -- Nokia Models
    IF v_nokia_id IS NOT NULL THEN
        INSERT INTO models (brand_id, name, slug, release_year, storage_options, ram_options) VALUES
        (v_nokia_id, 'Nokia G42 5G', 'nokia-g42-5g', 2023, ARRAY[128, 256], ARRAY[6, 8]),
        (v_nokia_id, 'Nokia G22', 'nokia-g22', 2023, ARRAY[64, 128], ARRAY[4]),
        (v_nokia_id, 'Nokia C32', 'nokia-c32', 2023, ARRAY[64, 128], ARRAY[3, 4]),
        (v_nokia_id, 'Nokia 105 4G', 'nokia-105-4g', 2023, ARRAY[1], ARRAY[1])
        ON CONFLICT (brand_id, slug) DO UPDATE SET name = EXCLUDED.name, release_year = EXCLUDED.release_year;
    END IF;
END $$;
