-- ==============================================================================
-- Prompt 7 / Migration 006: Performance Indexes for Scalability (Millions of Ads)
-- Safe to re-run
-- ==============================================================================

-- 1. Latest Active Ads (Homepage feed & browsing)
-- Query: SELECT * FROM ads WHERE status = 'active' ORDER BY published_at DESC LIMIT 20;
CREATE INDEX IF NOT EXISTS idx_ads_active_published 
    ON ads (published_at DESC) 
    WHERE status = 'active';

-- 2. City Filter with Newest Sorting
-- Query: SELECT * FROM ads WHERE city_id = $1 AND status = 'active' ORDER BY published_at DESC;
CREATE INDEX IF NOT EXISTS idx_ads_city_published 
    ON ads (city_id, published_at DESC) 
    WHERE status = 'active';

-- 3. City + Brand + Price Range Filter with Newest Sorting (Most common marketplace query)
-- Query: SELECT * FROM ads WHERE city_id = $1 AND brand_id = $2 AND price BETWEEN $3 AND $4 AND status = 'active' ORDER BY published_at DESC;
CREATE INDEX IF NOT EXISTS idx_ads_city_brand_price_published 
    ON ads (city_id, brand_id, price, published_at DESC) 
    WHERE status = 'active';

-- 4. Brand + Model Filter with Newest Sorting
-- Query: SELECT * FROM ads WHERE brand_id = $1 AND model_id = $2 AND status = 'active' ORDER BY published_at DESC;
CREATE INDEX IF NOT EXISTS idx_ads_brand_model_published 
    ON ads (brand_id, model_id, published_at DESC) 
    WHERE status = 'active';

-- 5. Additional Spec Filters on Active Ads (PTA, Condition, Storage)
-- Query: SELECT * FROM ads WHERE pta_status = $1 AND condition = $2 AND status = 'active';
CREATE INDEX IF NOT EXISTS idx_ads_filters 
    ON ads (pta_status, condition, storage_gb) 
    WHERE status = 'active';

-- 6. Seller's Own Ads Dashboard ("My Ads" page)
-- Query: SELECT * FROM ads WHERE seller_id = $1 ORDER BY created_at DESC;
CREATE INDEX IF NOT EXISTS idx_ads_seller_created 
    ON ads (seller_id, created_at DESC);

-- 7. Ads Expiring Soon (For scheduled background cron job)
-- Query: SELECT id FROM ads WHERE status = 'active' AND expires_at <= now();
CREATE INDEX IF NOT EXISTS idx_ads_expiring_soon 
    ON ads (expires_at) 
    WHERE status = 'active';

-- 8. User Favorites List ("Saved Ads" page)
-- Query: SELECT ad_id FROM favorites WHERE user_id = $1 ORDER BY created_at DESC;
CREATE INDEX IF NOT EXISTS idx_favorites_user_created 
    ON favorites (user_id, created_at DESC);

-- 9. Admin Reports Moderation Panel (Filter by pending status)
-- Query: SELECT * FROM reports WHERE status = 'pending' ORDER BY created_at DESC;
CREATE INDEX IF NOT EXISTS idx_reports_status_created 
    ON reports (status, created_at DESC);

-- 10. Trigram Fuzzy Text Search on Ad Title (Quick autocomplete / typos)
-- Query: SELECT * FROM ads WHERE title ILIKE '%iphne%';
CREATE INDEX IF NOT EXISTS idx_ads_title_trgm 
    ON ads USING gin (title gin_trgm_ops) 
    WHERE status = 'active';

-- 11. Foreign Key index on ad_images for fast lookup
CREATE INDEX IF NOT EXISTS idx_ad_images_ad_id_position 
    ON ad_images (ad_id, position);

