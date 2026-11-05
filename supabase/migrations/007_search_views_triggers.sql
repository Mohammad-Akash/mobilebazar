-- ==============================================================================
-- Prompt 8 / Migration 007: Full-Text Search, Counters, Expiry Function & Listing View
-- Safe to re-run
-- ==============================================================================

-- 1. Full-Text Search Vector Column on ads
ALTER TABLE ads ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Function to build tsvector from ad title, description, brand, and model
CREATE OR REPLACE FUNCTION ads_generate_search_vector()
RETURNS TRIGGER AS $$
DECLARE
    v_brand_name TEXT := '';
    v_model_name TEXT := '';
BEGIN
    -- Fetch brand and model names
    SELECT name INTO v_brand_name FROM brands WHERE id = NEW.brand_id;
    SELECT name INTO v_model_name FROM models WHERE id = NEW.model_id;

    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(v_brand_name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(v_model_name, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to keep search_vector updated before insert or update
DROP TRIGGER IF EXISTS trigger_ads_search_vector ON ads;
CREATE TRIGGER trigger_ads_search_vector
    BEFORE INSERT OR UPDATE OF title, description, brand_id, model_id ON ads
    FOR EACH ROW
    EXECUTE FUNCTION ads_generate_search_vector();

-- GIN Index on Full-Text Search Vector
CREATE INDEX IF NOT EXISTS idx_ads_search_vector 
    ON ads USING gin (search_vector) 
    WHERE status = 'active';

-- 2. Trigger: Keep profiles.ads_count updated
CREATE OR REPLACE FUNCTION update_profile_ads_count()
RETURNS TRIGGER AS $$
BEGIN
    -- If inserted as active
    IF (TG_OP = 'INSERT') THEN
        IF (NEW.status = 'active') THEN
            UPDATE profiles SET ads_count = ads_count + 1 WHERE id = NEW.seller_id;
        END IF;
        RETURN NEW;
    -- If status updated
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.status != 'active' AND NEW.status = 'active') THEN
            UPDATE profiles SET ads_count = ads_count + 1 WHERE id = NEW.seller_id;
        ELSIF (OLD.status = 'active' AND NEW.status != 'active') THEN
            UPDATE profiles SET ads_count = GREATEST(ads_count - 1, 0) WHERE id = NEW.seller_id;
        END IF;
        RETURN NEW;
    -- If deleted
    ELSIF (TG_OP = 'DELETE') THEN
        IF (OLD.status = 'active') THEN
            UPDATE profiles SET ads_count = GREATEST(ads_count - 1, 0) WHERE id = OLD.seller_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profile_ads_count ON ads;
CREATE TRIGGER trigger_profile_ads_count
    AFTER INSERT OR UPDATE OF status OR DELETE ON ads
    FOR EACH ROW
    EXECUTE FUNCTION update_profile_ads_count();

-- 3. SQL Function to mark expired ads (For pg_cron or edge functions)
CREATE OR REPLACE FUNCTION mark_expired_ads()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE ads
    SET status = 'expired'
    WHERE status = 'active' 
      AND expires_at <= now();

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- 4. RPC Function to increment ad views safely
CREATE OR REPLACE FUNCTION increment_ad_views(p_ad_id UUID)
RETURNS VOID 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE ads
    SET views_count = views_count + 1
    WHERE id = p_ad_id;
END;
$$;

-- 5. View for Active Ads with Joins (Frontend Listing & Card UI)
CREATE OR REPLACE VIEW active_ads_view AS
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
FROM ads a
JOIN profiles p ON a.seller_id = p.id
JOIN brands b ON a.brand_id = b.id
JOIN models m ON a.model_id = m.id
JOIN cities c ON a.city_id = c.id
LEFT JOIN areas ar ON a.area_id = ar.id
LEFT JOIN ad_images img ON img.ad_id = a.id AND img.position = 0
WHERE a.status = 'active';

