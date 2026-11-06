-- ==============================================================================
-- Migration 018: Keyset Search Function, Popular Brand RPCs & Performance Indexes
-- Safe to re-run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Performance Keyset Indexes on ads (Partial, WHERE status = 'active')
-- ------------------------------------------------------------------------------

-- Keyset Newest Sort: (published_at DESC, id DESC)
CREATE INDEX IF NOT EXISTS idx_ads_active_keyset_newest 
    ON public.ads (published_at DESC, id DESC) 
    WHERE status = 'active';

-- Keyset Price Low-to-High Sort: (price ASC, id ASC)
CREATE INDEX IF NOT EXISTS idx_ads_active_keyset_price_asc 
    ON public.ads (price ASC, id ASC) 
    WHERE status = 'active';

-- Keyset Price High-to-Low Sort: (price DESC, id DESC)
CREATE INDEX IF NOT EXISTS idx_ads_active_keyset_price_desc 
    ON public.ads (price DESC, id DESC) 
    WHERE status = 'active';

-- Composite City + Keyset Newest
CREATE INDEX IF NOT EXISTS idx_ads_active_city_keyset 
    ON public.ads (city_id, published_at DESC, id DESC) 
    WHERE status = 'active';

-- Composite Brand + Keyset Newest
CREATE INDEX IF NOT EXISTS idx_ads_active_brand_keyset 
    ON public.ads (brand_id, published_at DESC, id DESC) 
    WHERE status = 'active';

-- Drop single-column published_at index if superseded by keyset index
DROP INDEX IF EXISTS idx_ads_active_published;

-- ------------------------------------------------------------------------------
-- 2. Update active_ads_view to include search_vector
-- ------------------------------------------------------------------------------
DROP VIEW IF EXISTS public.active_ads_view;

CREATE VIEW public.active_ads_view WITH (security_invoker = true) AS
SELECT 
    a.id,
    a.seller_id,
    p.full_name AS seller_name,
    p.avatar_url AS seller_avatar,
    a.title,
    a.description,
    a.price,
    a.is_negotiable,
    a.condition,
    a.pta_status,
    a.storage_gb,
    a.ram_gb,
    a.color,
    a.battery_health,
    a.has_box,
    a.has_accessories,
    a.warranty_type,
    a.warranty_months_remaining,
    a.contact_preference,
    a.status,
    a.is_featured,
    a.views_count,
    a.favorites_count,
    a.published_at,
    a.created_at,
    a.search_vector,
    b.id AS brand_id,
    b.name AS brand_name,
    b.slug AS brand_slug,
    m.id AS model_id,
    m.name AS model_name,
    m.slug AS model_slug,
    c.id AS city_id,
    c.name AS city_name,
    c.slug AS city_slug,
    ar.id AS area_id,
    ar.name AS area_name,
    ar.slug AS area_slug,
    img.storage_path AS cover_image_path
FROM public.ads a
JOIN public.profiles p ON a.seller_id = p.id
JOIN public.brands b ON a.brand_id = b.id
JOIN public.models m ON a.model_id = m.id
JOIN public.cities c ON a.city_id = c.id
LEFT JOIN public.areas ar ON a.area_id = ar.id
LEFT JOIN public.ad_images img ON img.ad_id = a.id AND img.position = 0
WHERE a.status = 'active';

GRANT SELECT ON public.active_ads_view TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 3. SQL Keyset Search Function: search_ads(...)
-- Reads from active_ads_view, applies filters, full-text & fuzzy search,
-- uses keyset cursor and returns limit + 1 rows for infinite scroll
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.search_ads(
    p_brand_slug TEXT DEFAULT NULL,
    p_model_slug TEXT DEFAULT NULL,
    p_city_slug TEXT DEFAULT NULL,
    p_area_slug TEXT DEFAULT NULL,
    p_min_price BIGINT DEFAULT NULL,
    p_max_price BIGINT DEFAULT NULL,
    p_pta TEXT DEFAULT NULL,
    p_storage_gb INT DEFAULT NULL,
    p_condition TEXT DEFAULT NULL,
    p_search TEXT DEFAULT NULL,
    p_sort TEXT DEFAULT 'newest',
    p_cursor_value TEXT DEFAULT NULL,
    p_cursor_id UUID DEFAULT NULL,
    p_limit INT DEFAULT 20
)
RETURNS SETOF public.active_ads_view
SECURITY INVOKER
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    v_clean_limit INT;
    v_search_query tsquery;
    v_has_search BOOLEAN := false;
BEGIN
    -- Clamp page limit (min 1, default 20, max 50)
    v_clean_limit := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);

    -- Prepare full-text search query if provided
    IF p_search IS NOT NULL AND trim(p_search) != '' THEN
        v_search_query := websearch_to_tsquery('english', p_search);
        v_has_search := true;
    END IF;

    -- Return filtered query using exact sort order & keyset cursor
    IF p_sort = 'price_asc' THEN
        RETURN QUERY
        SELECT *
        FROM public.active_ads_view v
        WHERE 
            (p_brand_slug IS NULL OR v.brand_slug = p_brand_slug)
            AND (p_model_slug IS NULL OR v.model_slug = p_model_slug)
            AND (p_city_slug IS NULL OR v.city_slug = p_city_slug)
            AND (p_area_slug IS NULL OR v.area_slug = p_area_slug)
            AND (p_min_price IS NULL OR v.price >= p_min_price)
            AND (p_max_price IS NULL OR v.price <= p_max_price)
            AND (p_pta IS NULL OR v.pta_status = p_pta::pta_status)
            AND (p_storage_gb IS NULL OR v.storage_gb = p_storage_gb)
            AND (p_condition IS NULL OR v.condition = p_condition::condition_type)
            AND (
                NOT v_has_search OR 
                v.search_vector @@ v_search_query OR 
                v.title ILIKE ('%' || p_search || '%')
            )
            AND (
                p_cursor_value IS NULL OR p_cursor_id IS NULL OR
                (v.price > p_cursor_value::bigint) OR
                (v.price = p_cursor_value::bigint AND v.id > p_cursor_id)
            )
        ORDER BY v.price ASC, v.id ASC
        LIMIT (v_clean_limit + 1);

    ELSIF p_sort = 'price_desc' THEN
        RETURN QUERY
        SELECT *
        FROM public.active_ads_view v
        WHERE 
            (p_brand_slug IS NULL OR v.brand_slug = p_brand_slug)
            AND (p_model_slug IS NULL OR v.model_slug = p_model_slug)
            AND (p_city_slug IS NULL OR v.city_slug = p_city_slug)
            AND (p_area_slug IS NULL OR v.area_slug = p_area_slug)
            AND (p_min_price IS NULL OR v.price >= p_min_price)
            AND (p_max_price IS NULL OR v.price <= p_max_price)
            AND (p_pta IS NULL OR v.pta_status = p_pta::pta_status)
            AND (p_storage_gb IS NULL OR v.storage_gb = p_storage_gb)
            AND (p_condition IS NULL OR v.condition = p_condition::condition_type)
            AND (
                NOT v_has_search OR 
                v.search_vector @@ v_search_query OR 
                v.title ILIKE ('%' || p_search || '%')
            )
            AND (
                p_cursor_value IS NULL OR p_cursor_id IS NULL OR
                (v.price < p_cursor_value::bigint) OR
                (v.price = p_cursor_value::bigint AND v.id < p_cursor_id)
            )
        ORDER BY v.price DESC, v.id DESC
        LIMIT (v_clean_limit + 1);

    ELSE -- Default: 'newest'
        RETURN QUERY
        SELECT *
        FROM public.active_ads_view v
        WHERE 
            (p_brand_slug IS NULL OR v.brand_slug = p_brand_slug)
            AND (p_model_slug IS NULL OR v.model_slug = p_model_slug)
            AND (p_city_slug IS NULL OR v.city_slug = p_city_slug)
            AND (p_area_slug IS NULL OR v.area_slug = p_area_slug)
            AND (p_min_price IS NULL OR v.price >= p_min_price)
            AND (p_max_price IS NULL OR v.price <= p_max_price)
            AND (p_pta IS NULL OR v.pta_status = p_pta::pta_status)
            AND (p_storage_gb IS NULL OR v.storage_gb = p_storage_gb)
            AND (p_condition IS NULL OR v.condition = p_condition::condition_type)
            AND (
                NOT v_has_search OR 
                v.search_vector @@ v_search_query OR 
                v.title ILIKE ('%' || p_search || '%')
            )
            AND (
                p_cursor_value IS NULL OR p_cursor_id IS NULL OR
                (v.published_at < p_cursor_value::timestamptz) OR
                (v.published_at = p_cursor_value::timestamptz AND v.id < p_cursor_id)
            )
        ORDER BY v.published_at DESC, v.id DESC
        LIMIT (v_clean_limit + 1);
    END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_ads TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 4. Popular Brands with Active Ads Count
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_popular_brands(p_limit INT DEFAULT 12)
RETURNS TABLE (
    id UUID,
    name VARCHAR(80),
    slug VARCHAR(80),
    logo_url TEXT,
    ads_count BIGINT
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    SELECT 
        b.id,
        b.name,
        b.slug,
        b.logo_url,
        COUNT(a.id) AS ads_count
    FROM public.brands b
    JOIN public.ads a ON a.brand_id = b.id AND a.status = 'active'
    WHERE b.is_active = true
    GROUP BY b.id, b.name, b.slug, b.logo_url
    ORDER BY ads_count DESC, b.name ASC
    LIMIT LEAST(GREATEST(p_limit, 1), 50);
$$;

GRANT EXECUTE ON FUNCTION public.get_popular_brands(INT) TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 5. Active Cities with Ad Counts
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_active_cities_with_counts(p_limit INT DEFAULT 30)
RETURNS TABLE (
    id UUID,
    name VARCHAR(100),
    slug VARCHAR(100),
    ads_count BIGINT
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    SELECT 
        c.id,
        c.name,
        c.slug,
        COUNT(a.id) AS ads_count
    FROM public.cities c
    LEFT JOIN public.ads a ON a.city_id = c.id AND a.status = 'active'
    WHERE c.is_active = true
    GROUP BY c.id, c.name, c.slug
    ORDER BY ads_count DESC, c.name ASC
    LIMIT LEAST(GREATEST(p_limit, 1), 50);
$$;

GRANT EXECUTE ON FUNCTION public.get_active_cities_with_counts(INT) TO anon, authenticated;

