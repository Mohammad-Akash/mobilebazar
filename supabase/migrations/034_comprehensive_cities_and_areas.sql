-- ==============================================================================
-- Migration: Comprehensive Pakistan Cities & Localities Seed
-- 80 Cities & 500+ Areas across all Provinces & Territories
-- ==============================================================================

-- 1. Insert/Update Cities
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
('Gujrat', 'gujrat'),
('Sheikhupura', 'sheikhupura'),
('Sahiwal', 'sahiwal'),
('Rahim Yar Khan', 'rahim-yar-khan'),
('Jhang', 'jhang'),
('Kasur', 'kasur'),
('Dera Ghazi Khan', 'dera-ghazi-khan'),
('Okara', 'okara'),
('Chiniot', 'chiniot'),
('Kamoke', 'kamoke'),
('Mandi Bahauddin', 'mandi-bahauddin'),
('Jhelum', 'jhelum'),
('Khanewal', 'khanewal'),
('Vehari', 'vehari'),
('Murree', 'murree'),
('Attock', 'attock'),
('Chakwal', 'chakwal'),
('Hafizabad', 'hafizabad'),
('Muzaffargarh', 'muzaffargarh'),
('Burewala', 'burewala'),
('Bahawalnagar', 'bahawalnagar'),
('Pakpattan', 'pakpattan'),
('Mianwali', 'mianwali'),
('Taxila', 'taxila'),
('Wazirabad', 'wazirabad'),
('Khushab', 'khushab'),
('Bhakkar', 'bhakkar'),
('Larkana', 'larkana'),
('Nawabshah', 'nawabshah'),
('Mirpur Khas', 'mirpur-khas'),
('Jacobabad', 'jacobabad'),
('Shikarpur', 'shikarpur'),
('Khairpur', 'khairpur'),
('Dadu', 'dadu'),
('Tando Adam', 'tando-adam'),
('Tando Allahyar', 'tando-allahyar'),
('Thatta', 'thatta'),
('Badin', 'badin'),
('Ghotki', 'ghotki'),
('Mardan', 'mardan'),
('Swat (Mingora)', 'swat'),
('Kohat', 'kohat'),
('Bannu', 'bannu'),
('Dera Ismail Khan', 'dera-ismail-khan'),
('Mansehra', 'mansehra'),
('Charsadda', 'charsadda'),
('Nowshera', 'nowshera'),
('Haripur', 'haripur'),
('Swabi', 'swabi'),
('Batkhela', 'batkhela'),
('Gwadar', 'gwadar'),
('Turbat', 'turbat'),
('Khuzdar', 'khuzdar'),
('Hub', 'hub'),
('Sibi', 'sibi'),
('Zhob', 'zhob'),
('Chaman', 'chaman'),
('Muzaffarabad', 'muzaffarabad'),
('Mirpur AJK', 'mirpur-ajk'),
('Rawalakot', 'rawalakot'),
('Kotli', 'kotli'),
('Bhimber', 'bhimber'),
('Gilgit', 'gilgit'),
('Skardu', 'skardu'),
('Hunza', 'hunza')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 2. Populate areas for each city
DO $$
DECLARE
    v_city_id UUID;
BEGIN
    -- City: karachi
    SELECT id INTO v_city_id FROM cities WHERE slug = 'karachi' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Defence', 'dha-defence') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Clifton', 'clifton') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulshan-e-Iqbal', 'gulshan-e-iqbal') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'North Nazimabad', 'north-nazimabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Saddar (Mobile Market / Star City)', 'saddar-mobile-market-star-city') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'PECHS (Block 1-6)', 'pechs-block-1-6') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulistan-e-Johar', 'gulistan-e-johar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Tariq Road & Bahadurabad', 'tariq-road-bahadurabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Scheme 33', 'scheme-33') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Malir & Malir Cantt', 'malir-malir-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Korangi', 'korangi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Federal B Area (F.B Area)', 'federal-b-area-f-b-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Nazimabad', 'nazimabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Zamzama Commercial', 'zamzama-commercial') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shahrah-e-Faisal', 'shahrah-e-faisal') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Buffer Zone', 'buffer-zone') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Garden West & East', 'garden-west-east') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jamshed Road', 'jamshed-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulshan-e-Maymar', 'gulshan-e-maymar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Landhi', 'landhi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Liaquatabad', 'liaquatabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'North Karachi', 'north-karachi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Orangi Town', 'orangi-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Defence View', 'defence-view') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bath Island', 'bath-island') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Soldier Bazar', 'soldier-bazar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shah Faisal Colony', 'shah-faisal-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Surjani Town', 'surjani-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulshan-e-Hadeed', 'gulshan-e-hadeed') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Steel Town', 'steel-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'KDA Scheme 1', 'kda-scheme-1') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Askari 4 & 5', 'askari-4-5') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: lahore
    SELECT id INTO v_city_id FROM cities WHERE slug = 'lahore' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Phase 5 & 6', 'dha-lahore') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulberg (Hafeez Centre)', 'gulberg-hafeez-centre') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Johar Town', 'johar-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bahria Town', 'bahria-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town', 'model-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Lahore Cantt', 'lahore-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Allama Iqbal Town', 'allama-iqbal-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Wapda Town', 'wapda-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Garden Town', 'garden-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Faisal Town', 'faisal-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Samanabad', 'samanabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shadman', 'shadman') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cavalry Ground', 'cavalry-ground') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Township', 'township') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Valencia Town', 'valencia-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Lake City', 'lake-city') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Askari (1-11)', 'askari-1-11') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sabzazar', 'sabzazar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Paragon City', 'paragon-city') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mall Road & Anarkali', 'mall-road-anarkali') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Ichhra', 'ichhra') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulshan-e-Ravi', 'gulshan-e-ravi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mughalpura', 'mughalpura') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Harbanspura', 'harbanspura') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Rahbar', 'dha-rahbar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'State Life Housing Society', 'state-life-housing-society') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bedian Road', 'bedian-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Raiwind Road', 'raiwind-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shadbagh', 'shadbagh') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Baghbanpura', 'baghbanpura') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chung & Multan Road', 'chung-multan-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: islamabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'islamabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Blue Area', 'blue-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'F-7 / F-6 Markaz', 'f-7-markaz') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'F-8', 'f-8') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'F-10 (Markaz)', 'f-10-markaz') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'F-11 (Markaz)', 'f-11-markaz') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G-9 (Karachi Company)', 'g-9-karachi-company') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G-10 (Markaz)', 'g-10-markaz') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G-11 (Markaz)', 'g-11-markaz') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G-13', 'g-13') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'E-11', 'e-11') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'I-8 (Markaz)', 'i-8-markaz') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'I-9', 'i-9') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'I-10', 'i-10') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Phase 1 & 2', 'dha-phase-1-2') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bahria Town Phase 1-8', 'bahria-town-phase-1-8') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulberg Greens', 'gulberg-greens') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'B-17 Multi Gardens', 'b-17-multi-gardens') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'D-12', 'd-12') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G-6 & G-7 (Aabpara)', 'g-6-g-7-aabpara') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'H-13', 'h-13') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Soan Gardens', 'soan-gardens') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'PWD Housing Society', 'pwd-housing-society') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Zaraj Housing Society', 'zaraj-housing-society') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Naval Anchorage', 'naval-anchorage') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Police Foundation', 'police-foundation') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chak Shahzad', 'chak-shahzad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bani Gala', 'bani-gala') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: rawalpindi
    SELECT id INTO v_city_id FROM cities WHERE slug = 'rawalpindi' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Saddar (Singapore Plaza)', 'saddar-singapore-plaza') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Satellite Town', 'satellite-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bahria Town Rawalpindi', 'bahria-town-rawalpindi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Rawalpindi', 'dha-rawalpindi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Commercial Market', 'commercial-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Westridge', 'westridge') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chaklala Scheme 3', 'chaklala-scheme-3') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Peshawar Road', 'peshawar-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulraiz Housing Scheme', 'gulraiz-housing-scheme') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Adyala Road', 'adyala-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Murree Road', 'murree-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Rawal Town', 'rawal-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Tench Bhatta', 'tench-bhatta') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shamsabad', 'shamsabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Raja Bazar', 'raja-bazar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Askari 14', 'askari-14') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Tulsa Road', 'tulsa-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Airport Housing Society', 'airport-housing-society') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chaklala Scheme 1 & 2', 'chaklala-scheme-1-2') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chur Harpal', 'chur-harpal') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Morgah', 'morgah') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: faisalabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'faisalabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'D Ground', 'd-ground') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Madina Town', 'madina-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Peoples Colony 1 & 2', 'peoples-colony-1-2') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Kohinoor City & Plaza', 'kohinoor-city-plaza') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Canal Road', 'canal-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulberg', 'gulberg') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jinnah Colony', 'jinnah-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Samanabad', 'samanabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Ghulam Muhammad Abad', 'ghulam-muhammad-abad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Millat Town', 'millat-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Susan Road', 'susan-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Satiana Road', 'satiana-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Civil Lines', 'civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mansoorabad', 'mansoorabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Eden Valley', 'eden-valley') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: multan
    SELECT id INTO v_city_id FROM cities WHERE slug = 'multan' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulgasht Colony', 'gulgasht-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Multan Cantt', 'multan-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bosan Road', 'bosan-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'New Multan', 'new-multan') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shah Rukn-e-Alam Colony', 'shah-rukn-e-alam-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'MDA Officers Colony', 'mda-officers-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town', 'model-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shershah Road', 'shershah-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Wapda Town', 'wapda-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Multan', 'dha-multan') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Buch Villas', 'buch-villas') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Garden Town', 'garden-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chungi No. 9', 'chungi-no-9') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: peshawar
    SELECT id INTO v_city_id FROM cities WHERE slug = 'peshawar' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Hayatabad (Phase 1-7)', 'hayatabad-phase-1-7') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'University Town', 'university-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Peshawar Cantt', 'peshawar-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Saddar (Fakhr-e-Alam Road)', 'saddar-fakhr-e-alam-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Ring Road', 'ring-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulbahar', 'gulbahar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Warsak Road', 'warsak-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Kohat Road', 'kohat-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Dalazak Road', 'dalazak-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Karkhano Market', 'karkhano-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Charsadda Road', 'charsadda-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DHA Peshawar', 'dha-peshawar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Regi Model Town', 'regi-model-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: quetta
    SELECT id INTO v_city_id FROM cities WHERE slug = 'quetta' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Quetta Cantt', 'quetta-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Zarghoon Road', 'zarghoon-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jinnah Road', 'jinnah-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Samungli Road', 'samungli-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Satellite Town', 'satellite-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Airport Road', 'airport-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Shahrah-e-Iqbal', 'shahrah-e-iqbal') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town', 'model-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Nawan Killi', 'nawan-killi') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Brewery Road', 'brewery-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: sialkot
    SELECT id INTO v_city_id FROM cities WHERE slug = 'sialkot' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sialkot Cantt', 'sialkot-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town', 'model-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Kashmir Road', 'kashmir-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Paris Road', 'paris-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Defense Road', 'defense-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Daska Road', 'daska-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Rangpura', 'rangpura') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Ugoki', 'ugoki') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Commissioner Road', 'commissioner-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: gujranwala
    SELECT id INTO v_city_id FROM cities WHERE slug = 'gujranwala' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'DC Colony', 'dc-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town', 'model-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Wapda Town', 'wapda-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gujranwala Cantt', 'gujranwala-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Satellite Town', 'satellite-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road (Mobile Market)', 'g-t-road-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Rahwali Cantt', 'rahwali-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Peoples Colony', 'peoples-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Master City', 'master-city') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Garden Town', 'garden-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Court Road', 'court-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jalalpur Jattan Road', 'jalalpur-jattan-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Rehman Shaheed Road', 'rehman-shaheed-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Servis Mor', 'servis-mor') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road Gujrat', 'g-t-road-gujrat') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: hyderabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'hyderabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Qasimabad', 'qasimabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Latifabad (Unit 1-12)', 'latifabad-unit-1-12') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Auto Bhan Road', 'auto-bhan-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Saddar', 'saddar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Hyderabad Cantt', 'hyderabad-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Citizen Colony', 'citizen-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Kohsar Agency', 'kohsar-agency') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Wadhu Wah Road', 'wadhu-wah-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: abbottabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'abbottabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mandian', 'mandian') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Supply Bazar', 'supply-bazar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'PMA Kakul Road', 'pma-kakul-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jadoon Plaza / Phase 1 & 2', 'jadoon-plaza-phase-1-2') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Abbottabad Cantt', 'abbottabad-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mansehra Road', 'mansehra-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Link Road', 'link-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Fateh Sher Colony', 'fateh-sher-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Farid Town', 'farid-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College Road', 'college-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Civil Lines', 'civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Girls College Road', 'girls-college-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: bahawalpur
    SELECT id INTO v_city_id FROM cities WHERE slug = 'bahawalpur' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town A & B', 'model-town-a-b') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bahawalpur Cantt', 'bahawalpur-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Circular Road', 'circular-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Satellite Town', 'satellite-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Noor Mahal Road', 'noor-mahal-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'One Unit Staff Colony', 'one-unit-staff-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cheema Town', 'cheema-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: sargodha
    SELECT id INTO v_city_id FROM cities WHERE slug = 'sargodha' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Satellite Town', 'satellite-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'University Road', 'university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Fatima Jinnah Colony', 'fatima-jinnah-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sargodha Cantt', 'sargodha-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Club Road', 'club-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Trust Plaza', 'trust-plaza') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: sukkur
    SELECT id INTO v_city_id FROM cities WHERE slug = 'sukkur' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Military Road', 'military-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Minara Road', 'minara-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Barrage Colony', 'barrage-colony') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'New Pind', 'new-pind') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bunder Road', 'bunder-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sukkur Town', 'sukkur-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: dera-ghazi-khan
    SELECT id INTO v_city_id FROM cities WHERE slug = 'dera-ghazi-khan' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: okara
    SELECT id INTO v_city_id FROM cities WHERE slug = 'okara' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: chiniot
    SELECT id INTO v_city_id FROM cities WHERE slug = 'chiniot' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: kamoke
    SELECT id INTO v_city_id FROM cities WHERE slug = 'kamoke' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: mandi-bahauddin
    SELECT id INTO v_city_id FROM cities WHERE slug = 'mandi-bahauddin' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: jhelum
    SELECT id INTO v_city_id FROM cities WHERE slug = 'jhelum' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: khanewal
    SELECT id INTO v_city_id FROM cities WHERE slug = 'khanewal' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: vehari
    SELECT id INTO v_city_id FROM cities WHERE slug = 'vehari' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: murree
    SELECT id INTO v_city_id FROM cities WHERE slug = 'murree' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: attock
    SELECT id INTO v_city_id FROM cities WHERE slug = 'attock' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: chakwal
    SELECT id INTO v_city_id FROM cities WHERE slug = 'chakwal' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: hafizabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'hafizabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: muzaffargarh
    SELECT id INTO v_city_id FROM cities WHERE slug = 'muzaffargarh' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: burewala
    SELECT id INTO v_city_id FROM cities WHERE slug = 'burewala' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: bahawalnagar
    SELECT id INTO v_city_id FROM cities WHERE slug = 'bahawalnagar' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: pakpattan
    SELECT id INTO v_city_id FROM cities WHERE slug = 'pakpattan' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: mianwali
    SELECT id INTO v_city_id FROM cities WHERE slug = 'mianwali' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: taxila
    SELECT id INTO v_city_id FROM cities WHERE slug = 'taxila' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: wazirabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'wazirabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: khushab
    SELECT id INTO v_city_id FROM cities WHERE slug = 'khushab' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: bhakkar
    SELECT id INTO v_city_id FROM cities WHERE slug = 'bhakkar' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: larkana
    SELECT id INTO v_city_id FROM cities WHERE slug = 'larkana' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: nawabshah
    SELECT id INTO v_city_id FROM cities WHERE slug = 'nawabshah' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: mirpur-khas
    SELECT id INTO v_city_id FROM cities WHERE slug = 'mirpur-khas' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: jacobabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'jacobabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: shikarpur
    SELECT id INTO v_city_id FROM cities WHERE slug = 'shikarpur' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: khairpur
    SELECT id INTO v_city_id FROM cities WHERE slug = 'khairpur' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: dadu
    SELECT id INTO v_city_id FROM cities WHERE slug = 'dadu' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: tando-adam
    SELECT id INTO v_city_id FROM cities WHERE slug = 'tando-adam' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: tando-allahyar
    SELECT id INTO v_city_id FROM cities WHERE slug = 'tando-allahyar' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: thatta
    SELECT id INTO v_city_id FROM cities WHERE slug = 'thatta' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: badin
    SELECT id INTO v_city_id FROM cities WHERE slug = 'badin' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: ghotki
    SELECT id INTO v_city_id FROM cities WHERE slug = 'ghotki' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: mardan
    SELECT id INTO v_city_id FROM cities WHERE slug = 'mardan' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Bank Road', 'bank-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mardan Cantt', 'mardan-cantt') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sheikh Maltoon Town', 'sheikh-maltoon-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Nowshera Road', 'nowshera-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Baghdada', 'baghdada') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: swat
    SELECT id INTO v_city_id FROM cities WHERE slug = 'swat' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Mingora Bazar', 'mingora-bazar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Saidu Sharif', 'saidu-sharif') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Fizagat', 'fizagat') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Gulkada', 'gulkada') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Airport Road Mingora', 'airport-road-mingora') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: kohat
    SELECT id INTO v_city_id FROM cities WHERE slug = 'kohat' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: bannu
    SELECT id INTO v_city_id FROM cities WHERE slug = 'bannu' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: dera-ismail-khan
    SELECT id INTO v_city_id FROM cities WHERE slug = 'dera-ismail-khan' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: mansehra
    SELECT id INTO v_city_id FROM cities WHERE slug = 'mansehra' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: charsadda
    SELECT id INTO v_city_id FROM cities WHERE slug = 'charsadda' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: nowshera
    SELECT id INTO v_city_id FROM cities WHERE slug = 'nowshera' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: haripur
    SELECT id INTO v_city_id FROM cities WHERE slug = 'haripur' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: swabi
    SELECT id INTO v_city_id FROM cities WHERE slug = 'swabi' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: batkhela
    SELECT id INTO v_city_id FROM cities WHERE slug = 'batkhela' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: gwadar
    SELECT id INTO v_city_id FROM cities WHERE slug = 'gwadar' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jinnah Avenue', 'jinnah-avenue') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Marine Drive', 'marine-drive') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'New Town', 'new-town') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Port Road', 'port-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: turbat
    SELECT id INTO v_city_id FROM cities WHERE slug = 'turbat' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: khuzdar
    SELECT id INTO v_city_id FROM cities WHERE slug = 'khuzdar' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: hub
    SELECT id INTO v_city_id FROM cities WHERE slug = 'hub' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: sibi
    SELECT id INTO v_city_id FROM cities WHERE slug = 'sibi' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: zhob
    SELECT id INTO v_city_id FROM cities WHERE slug = 'zhob' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: chaman
    SELECT id INTO v_city_id FROM cities WHERE slug = 'chaman' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: muzaffarabad
    SELECT id INTO v_city_id FROM cities WHERE slug = 'muzaffarabad' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Domel', 'domel') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Plate', 'plate') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'CMH Road', 'cmh-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Madina Market', 'madina-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Upper Adda', 'upper-adda') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: mirpur-ajk
    SELECT id INTO v_city_id FROM cities WHERE slug = 'mirpur-ajk' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sector F-1 & F-2', 'sector-f-1-f-2') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Sector C-1 to C-4', 'sector-c-1-to-c-4') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Allama Iqbal Road', 'allama-iqbal-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Kalyal Mor', 'kalyal-mor') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Chowk Shaheedan', 'chowk-shaheedan') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: rawalakot
    SELECT id INTO v_city_id FROM cities WHERE slug = 'rawalakot' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: kotli
    SELECT id INTO v_city_id FROM cities WHERE slug = 'kotli' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: bhimber
    SELECT id INTO v_city_id FROM cities WHERE slug = 'bhimber' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: gilgit
    SELECT id INTO v_city_id FROM cities WHERE slug = 'gilgit' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Jutial', 'jutial') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Airport Road', 'airport-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Nagaral', 'nagaral') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Kashrote', 'kashrote') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'City Market', 'city-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: skardu
    SELECT id INTO v_city_id FROM cities WHERE slug = 'skardu' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Skardu Main Bazar', 'skardu-main-bazar') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College Road', 'college-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Yadgar Chowk', 'yadgar-chowk') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Hussainabad', 'hussainabad') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

    -- City: hunza
    SELECT id INTO v_city_id FROM cities WHERE slug = 'hunza' LIMIT 1;
    IF v_city_id IS NOT NULL THEN
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Main City Bazar / Mobile Market', 'main-city-bazar-mobile-market') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Model Town / Civil Lines', 'model-town-civil-lines') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'Cantt Area', 'cantt-area') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'College / University Road', 'college-university-road') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
        INSERT INTO areas (city_id, name, slug) VALUES (v_city_id, 'G.T. Road / Highway Bypass', 'g-t-road-highway-bypass') ON CONFLICT (city_id, slug) DO UPDATE SET name = EXCLUDED.name;
    END IF;

END $$;
