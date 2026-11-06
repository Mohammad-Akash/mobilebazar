-- ==============================================================================
-- Migration: 020_seo_landing_pages.sql
-- Purpose:   SQL functions for SEO landing pages (city, brand, model combos),
--            sitemap generation, and internal linking.
-- ==============================================================================

-- 1. get_landing_stats: Returns ad count, min/median/max price, newest date
-- for any combination of city, brand, model slugs (all optional)
CREATE OR REPLACE FUNCTION public.get_landing_stats(
    p_city_slug TEXT DEFAULT NULL,
    p_brand_slug TEXT DEFAULT NULL,
    p_model_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
    ad_count BIGINT,
    min_price BIGINT,
    median_price NUMERIC,
    max_price BIGINT,
    newest_published_at TIMESTAMPTZ
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    SELECT
        COUNT(*) AS ad_count,
        MIN(price) AS min_price,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) AS median_price,
        MAX(price) AS max_price,
        MAX(published_at) AS newest_published_at
    FROM public.active_ads_view
    WHERE (p_city_slug IS NULL OR city_slug = p_city_slug)
      AND (p_brand_slug IS NULL OR brand_slug = p_brand_slug)
      AND (p_model_slug IS NULL OR model_slug = p_model_slug);
$$;

GRANT EXECUTE ON FUNCTION public.get_landing_stats(TEXT, TEXT, TEXT) TO anon, authenticated;

-- 2. get_indexable_landing_pages: Returns all combinations with >= p_min_ads active ads
-- Used by the sitemap generator
CREATE OR REPLACE FUNCTION public.get_indexable_landing_pages(
    p_min_ads INT DEFAULT 3
)
RETURNS TABLE (
    page_type TEXT,
    city_slug TEXT,
    brand_slug TEXT,
    model_slug TEXT,
    ad_count BIGINT,
    newest_published_at TIMESTAMPTZ
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    -- City pages: /mobiles/[city]
    SELECT 'city'::TEXT, v.city_slug, NULL::TEXT, NULL::TEXT, COUNT(*), MAX(v.published_at)
    FROM public.active_ads_view v
    WHERE v.city_slug IS NOT NULL
    GROUP BY v.city_slug
    HAVING COUNT(*) >= p_min_ads

    UNION ALL

    -- Brand pages: /brands/[brand]
    SELECT 'brand'::TEXT, NULL::TEXT, v.brand_slug, NULL::TEXT, COUNT(*), MAX(v.published_at)
    FROM public.active_ads_view v
    WHERE v.brand_slug IS NOT NULL
    GROUP BY v.brand_slug
    HAVING COUNT(*) >= p_min_ads

    UNION ALL

    -- City + Brand pages: /mobiles/[city]/[brand]
    SELECT 'city_brand'::TEXT, v.city_slug, v.brand_slug, NULL::TEXT, COUNT(*), MAX(v.published_at)
    FROM public.active_ads_view v
    WHERE v.city_slug IS NOT NULL AND v.brand_slug IS NOT NULL
    GROUP BY v.city_slug, v.brand_slug
    HAVING COUNT(*) >= p_min_ads

    UNION ALL

    -- Brand + Model pages: /brands/[brand]/[model]
    SELECT 'brand_model'::TEXT, NULL::TEXT, v.brand_slug, v.model_slug, COUNT(*), MAX(v.published_at)
    FROM public.active_ads_view v
    WHERE v.brand_slug IS NOT NULL AND v.model_slug IS NOT NULL
    GROUP BY v.brand_slug, v.model_slug
    HAVING COUNT(*) >= p_min_ads

    UNION ALL

    -- City + Brand + Model pages: /mobiles/[city]/[brand]/[model]
    SELECT 'city_brand_model'::TEXT, v.city_slug, v.brand_slug, v.model_slug, COUNT(*), MAX(v.published_at)
    FROM public.active_ads_view v
    WHERE v.city_slug IS NOT NULL AND v.brand_slug IS NOT NULL AND v.model_slug IS NOT NULL
    GROUP BY v.city_slug, v.brand_slug, v.model_slug
    HAVING COUNT(*) >= p_min_ads;
$$;

GRANT EXECUTE ON FUNCTION public.get_indexable_landing_pages(INT) TO anon, authenticated;

-- 3. get_related_landing_links: Returns related cities, brands, models with ad counts
-- for internal linking on landing pages
CREATE OR REPLACE FUNCTION public.get_related_landing_links(
    p_city_slug TEXT DEFAULT NULL,
    p_brand_slug TEXT DEFAULT NULL,
    p_model_slug TEXT DEFAULT NULL,
    p_limit INT DEFAULT 10
)
RETURNS TABLE (
    link_type TEXT,
    slug TEXT,
    name TEXT,
    ad_count BIGINT
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    -- Related cities (top cities with ads matching current brand/model filter)
    SELECT 'city'::TEXT, v.city_slug, v.city_name, COUNT(*)
    FROM public.active_ads_view v
    WHERE v.city_slug IS NOT NULL
      AND (p_city_slug IS NULL OR v.city_slug != p_city_slug)
      AND (p_brand_slug IS NULL OR v.brand_slug = p_brand_slug)
      AND (p_model_slug IS NULL OR v.model_slug = p_model_slug)
    GROUP BY v.city_slug, v.city_name
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC
    LIMIT p_limit

    UNION ALL

    -- Related brands (top brands with ads matching current city filter)
    SELECT 'brand'::TEXT, v.brand_slug, v.brand_name, COUNT(*)
    FROM public.active_ads_view v
    WHERE v.brand_slug IS NOT NULL
      AND (p_brand_slug IS NULL OR v.brand_slug != p_brand_slug)
      AND (p_city_slug IS NULL OR v.city_slug = p_city_slug)
    GROUP BY v.brand_slug, v.brand_name
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC
    LIMIT p_limit

    UNION ALL

    -- Related models (only when brand is set; top models of that brand matching city)
    SELECT 'model'::TEXT, v.model_slug, v.model_name, COUNT(*)
    FROM public.active_ads_view v
    WHERE v.model_slug IS NOT NULL
      AND p_brand_slug IS NOT NULL
      AND v.brand_slug = p_brand_slug
      AND (p_model_slug IS NULL OR v.model_slug != p_model_slug)
      AND (p_city_slug IS NULL OR v.city_slug = p_city_slug)
    GROUP BY v.model_slug, v.model_name
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC
    LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.get_related_landing_links(TEXT, TEXT, TEXT, INT) TO anon, authenticated;

-- 4. Indexes to support landing page queries
-- These help the grouping and filtering in the functions above
CREATE INDEX IF NOT EXISTS idx_active_ads_city_brand_model
    ON public.ads (city_id, brand_id, model_id)
    WHERE status = 'active';

-- 5. Function to get all active ad URLs for sitemap (keyset pagination, no OFFSET)
CREATE OR REPLACE FUNCTION public.get_sitemap_ads(
    p_cursor_id UUID DEFAULT NULL,
    p_limit INT DEFAULT 10000
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    brand_name TEXT,
    model_name TEXT,
    storage_gb INT,
    city_name TEXT,
    updated_at TIMESTAMPTZ
)
SECURITY INVOKER
LANGUAGE sql
STABLE
AS $$
    SELECT a.id, a.title,
           b.name AS brand_name,
           m.name AS model_name,
           a.storage_gb,
           c.name AS city_name,
           a.updated_at
    FROM public.ads a
    LEFT JOIN public.brands b ON a.brand_id = b.id
    LEFT JOIN public.models m ON a.model_id = m.id
    LEFT JOIN public.cities c ON a.city_id = c.id
    WHERE a.status = 'active'
      AND (p_cursor_id IS NULL OR a.id > p_cursor_id)
    ORDER BY a.id ASC
    LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.get_sitemap_ads(UUID, INT) TO anon, authenticated;
