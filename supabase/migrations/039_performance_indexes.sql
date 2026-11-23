-- ==============================================================================
-- Migration 039: Additional Composite Indexes for Landing Pages, Feeds & Favorites
-- Safe to re-run (all use IF NOT EXISTS)
-- Only indexes - zero business logic changes
-- ==============================================================================

-- 1. Landing Pages: Brand + Model Keyset Newest Sort
-- Speeds up queries on /brands/[brand]/[model]
CREATE INDEX IF NOT EXISTS idx_ads_active_brand_model_keyset 
    ON public.ads (brand_id, model_id, published_at DESC, id DESC) 
    WHERE status = 'active';

-- 2. Landing Pages: City + Brand Keyset Newest Sort
-- Speeds up queries on /mobiles/[city]/[brand]
CREATE INDEX IF NOT EXISTS idx_ads_active_city_brand_keyset 
    ON public.ads (city_id, brand_id, published_at DESC, id DESC) 
    WHERE status = 'active';

-- 3. Area filtered browsing: City + Area Keyset Newest Sort
-- Speeds up neighborhood browsing within major cities (e.g., Gulberg, DHA, Clifton)
CREATE INDEX IF NOT EXISTS idx_ads_active_city_area_keyset 
    ON public.ads (city_id, area_id, published_at DESC, id DESC) 
    WHERE status = 'active';

-- 4. Seller Dashboard Index
-- Speeds up queries on /dashboard/ads filtered by user status
CREATE INDEX IF NOT EXISTS idx_ads_seller_status_created 
    ON public.ads (seller_id, status, created_at DESC);

-- 5. User Favorites Unique Lookup
-- Accelerates favorite checks & eliminates redundant duplicate favorite rows
CREATE UNIQUE INDEX IF NOT EXISTS idx_favorites_user_ad_unique 
    ON public.favorites (user_id, ad_id);

-- 6. Model by Brand Reference Lookup
-- Speeds up model dropdown population when selecting brand
CREATE INDEX IF NOT EXISTS idx_models_brand_active 
    ON public.models (brand_id, is_active);
