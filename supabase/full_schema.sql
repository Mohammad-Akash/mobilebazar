-- ==============================================================================
-- MobileBazar: COMPLETE DATABASE SCHEMA (Phase 1) - FIXED VERSION
-- Run this single script in Supabase -> SQL Editor, then run 008_seed_data.sql
-- Requires PostgreSQL 15+ (Supabase default)
-- ==============================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- 2. Enums
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ad_status') THEN
        CREATE TYPE ad_status AS ENUM ('draft', 'active', 'sold', 'expired', 'deleted');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'condition_type') THEN
        CREATE TYPE condition_type AS ENUM ('new', 'used');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pta_status') THEN
        CREATE TYPE pta_status AS ENUM ('pta_approved', 'non_pta', 'jv', 'unknown');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'warranty_type') THEN
        CREATE TYPE warranty_type AS ENUM ('none', 'in_warranty');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contact_preference') THEN
        CREATE TYPE contact_preference AS ENUM ('phone', 'whatsapp', 'both');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'report_reason') THEN
        CREATE TYPE report_reason AS ENUM ('fake_ad', 'already_sold', 'fraud_scam', 'wrong_info', 'prohibited_item', 'other');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'report_status') THEN
        CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'dismissed', 'action_taken');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');
    END IF;
END $$;

-- 3. Core function: updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- 4. Reference tables
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_cities_updated_at ON cities;
CREATE TRIGGER trigger_cities_updated_at
    BEFORE UPDATE ON cities
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT areas_city_id_slug_key UNIQUE (city_id, slug),
    CONSTRAINT areas_id_city_id_key UNIQUE (id, city_id)
);

DROP TRIGGER IF EXISTS trigger_areas_updated_at ON areas;
CREATE TRIGGER trigger_areas_updated_at
    BEFORE UPDATE ON areas
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_areas_city_id ON areas(city_id);
CREATE INDEX IF NOT EXISTS idx_areas_slug ON areas(slug);

CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(80) NOT NULL UNIQUE,
    slug VARCHAR(80) NOT NULL UNIQUE,
    logo_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_brands_updated_at ON brands;
CREATE TRIGGER trigger_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    release_year SMALLINT,
    storage_options INT[],
    ram_options INT[],
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT models_brand_id_slug_key UNIQUE (brand_id, slug),
    CONSTRAINT models_id_brand_id_key UNIQUE (id, brand_id)
);

DROP TRIGGER IF EXISTS trigger_models_updated_at ON models;
CREATE TRIGGER trigger_models_updated_at
    BEFORE UPDATE ON models
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_models_brand_id ON models(brand_id);
CREATE INDEX IF NOT EXISTS idx_models_slug ON models(slug);

-- 5. Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(120),
    avatar_url TEXT,
    city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
    ads_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS profile_private (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    whatsapp_number VARCHAR(20),
    role user_role NOT NULL DEFAULT 'user',
    is_phone_verified BOOLEAN NOT NULL DEFAULT false,
    is_banned BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_profile_private_updated_at ON profile_private;
CREATE TRIGGER trigger_profile_private_updated_at
    BEFORE UPDATE ON profile_private
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_private_phone_unique
    ON profile_private(phone)
    WHERE phone IS NOT NULL;

-- Auto-create profile rows on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
DECLARE
    v_full_name TEXT;
    v_avatar_url TEXT;
    v_phone TEXT;
BEGIN
    v_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        'User'
    );
    v_avatar_url := NEW.raw_user_meta_data->>'avatar_url';
    v_phone := NULLIF(NEW.phone, '');

    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (NEW.id, v_full_name, v_avatar_url)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.profile_private (id, phone, is_phone_verified)
    VALUES (
        NEW.id,
        v_phone,
        CASE WHEN NEW.phone_confirmed_at IS NOT NULL THEN true ELSE false END
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- 6. Ads, ad_private, ad_images
CREATE TABLE IF NOT EXISTS ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    brand_id UUID NOT NULL,
    model_id UUID NOT NULL,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    area_id UUID,

    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price BIGINT NOT NULL CHECK (price > 0),
    is_negotiable BOOLEAN NOT NULL DEFAULT true,
    condition condition_type NOT NULL,
    pta_status pta_status NOT NULL DEFAULT 'unknown',
    storage_gb SMALLINT NOT NULL CHECK (storage_gb > 0),
    ram_gb SMALLINT CHECK (ram_gb IS NULL OR ram_gb > 0),
    color VARCHAR(50),
    battery_health SMALLINT CHECK (battery_health IS NULL OR (battery_health >= 0 AND battery_health <= 100)),
    has_box BOOLEAN NOT NULL DEFAULT false,
    has_accessories BOOLEAN NOT NULL DEFAULT false,
    warranty_type warranty_type NOT NULL DEFAULT 'none',
    warranty_months_remaining SMALLINT DEFAULT 0,
    contact_preference contact_preference NOT NULL DEFAULT 'both',
    status ad_status NOT NULL DEFAULT 'active',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    featured_until TIMESTAMPTZ,
    views_count INT NOT NULL DEFAULT 0 CHECK (views_count >= 0),
    favorites_count INT NOT NULL DEFAULT 0 CHECK (favorites_count >= 0),
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
    sold_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT chk_ad_warranty CHECK (
        (warranty_type = 'none' AND (warranty_months_remaining IS NULL OR warranty_months_remaining = 0)) OR
        (warranty_type = 'in_warranty' AND warranty_months_remaining > 0)
    ),
    CONSTRAINT fk_ads_model_brand FOREIGN KEY (model_id, brand_id)
        REFERENCES models(id, brand_id) ON DELETE RESTRICT,
    CONSTRAINT fk_ads_area_city FOREIGN KEY (area_id, city_id)
        REFERENCES areas(id, city_id) ON DELETE SET NULL (area_id)
);

DROP TRIGGER IF EXISTS trigger_ads_updated_at ON ads;
CREATE TRIGGER trigger_ads_updated_at
    BEFORE UPDATE ON ads
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS ad_private (
    ad_id UUID PRIMARY KEY REFERENCES ads(id) ON DELETE CASCADE,
    imei VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_ad_private_updated_at ON ad_private;
CREATE TRIGGER trigger_ad_private_updated_at
    BEFORE UPDATE ON ad_private
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS ad_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    position SMALLINT NOT NULL DEFAULT 0 CHECK (position >= 0 AND position <= 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ad_images_ad_id_position_key UNIQUE (ad_id, position) DEFERRABLE INITIALLY DEFERRED
);

CREATE OR REPLACE FUNCTION check_ad_images_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF (SELECT count(*) FROM ad_images WHERE ad_id = NEW.ad_id) >= 8 THEN
        RAISE EXCEPTION 'Maximum 8 images allowed per ad';
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_check_ad_images_limit ON ad_images;
CREATE TRIGGER trigger_check_ad_images_limit
    BEFORE INSERT ON ad_images
    FOR EACH ROW EXECUTE FUNCTION check_ad_images_limit();

-- 7. Favorites & Reports
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, ad_id)
);

CREATE OR REPLACE FUNCTION update_ad_favorites_count()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE ads SET favorites_count = favorites_count + 1 WHERE id = NEW.ad_id;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE ads SET favorites_count = GREATEST(favorites_count - 1, 0) WHERE id = OLD.ad_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trigger_favorites_count ON favorites;
CREATE TRIGGER trigger_favorites_count
    AFTER INSERT OR DELETE ON favorites
    FOR EACH ROW EXECUTE FUNCTION update_ad_favorites_count();

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reason report_reason NOT NULL,
    details TEXT,
    status report_status NOT NULL DEFAULT 'pending',
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT reports_ad_reporter_unique UNIQUE (ad_id, reporter_id)
);

-- 8. Performance indexes
CREATE INDEX IF NOT EXISTS idx_ads_active_published ON ads (published_at DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ads_city_published ON ads (city_id, published_at DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ads_city_brand_price_published ON ads (city_id, brand_id, price, published_at DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ads_brand_model_published ON ads (brand_id, model_id, published_at DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ads_filters ON ads (pta_status, condition, storage_gb) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ads_seller_created ON ads (seller_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ads_expiring_soon ON ads (expires_at) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_favorites_user_created ON favorites (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_status_created ON reports (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ads_title_trgm ON ads USING gin (title gin_trgm_ops) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ad_images_ad_id_position ON ad_images (ad_id, position);

-- 9. Full-text search, counters, RPC, listing view
ALTER TABLE ads ADD COLUMN IF NOT EXISTS search_vector tsvector;

CREATE OR REPLACE FUNCTION ads_generate_search_vector()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_brand_name TEXT := '';
    v_model_name TEXT := '';
BEGIN
    SELECT name INTO v_brand_name FROM brands WHERE id = NEW.brand_id;
    SELECT name INTO v_model_name FROM models WHERE id = NEW.model_id;

    NEW.search_vector :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(v_brand_name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(v_model_name, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_ads_search_vector ON ads;
CREATE TRIGGER trigger_ads_search_vector
    BEFORE INSERT OR UPDATE OF title, description, brand_id, model_id ON ads
    FOR EACH ROW EXECUTE FUNCTION ads_generate_search_vector();

CREATE INDEX IF NOT EXISTS idx_ads_search_vector ON ads USING gin (search_vector) WHERE status = 'active';

CREATE OR REPLACE FUNCTION update_profile_ads_count()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF (NEW.status = 'active') THEN
            UPDATE profiles SET ads_count = ads_count + 1 WHERE id = NEW.seller_id;
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.status <> 'active' AND NEW.status = 'active') THEN
            UPDATE profiles SET ads_count = ads_count + 1 WHERE id = NEW.seller_id;
        ELSIF (OLD.status = 'active' AND NEW.status <> 'active') THEN
            UPDATE profiles SET ads_count = GREATEST(ads_count - 1, 0) WHERE id = NEW.seller_id;
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        IF (OLD.status = 'active') THEN
            UPDATE profiles SET ads_count = GREATEST(ads_count - 1, 0) WHERE id = OLD.seller_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trigger_profile_ads_count ON ads;
CREATE TRIGGER trigger_profile_ads_count
    AFTER INSERT OR UPDATE OF status OR DELETE ON ads
    FOR EACH ROW EXECUTE FUNCTION update_profile_ads_count();

CREATE OR REPLACE FUNCTION mark_expired_ads()
RETURNS INTEGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE ads
    SET status = 'expired'
    WHERE status = 'active' AND expires_at <= now();

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION mark_expired_ads() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION mark_expired_ads() TO service_role;

CREATE OR REPLACE FUNCTION increment_ad_views(p_ad_id UUID)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE ads SET views_count = views_count + 1
    WHERE id = p_ad_id AND status = 'active';
END;
$$;

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

-- 10. RLS initial lock + public reference policies
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_private ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_private ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active cities" ON cities;
CREATE POLICY "Public can view active cities" ON cities FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active areas" ON areas;
CREATE POLICY "Public can view active areas" ON areas FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active brands" ON brands;
CREATE POLICY "Public can view active brands" ON brands FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active models" ON models;
CREATE POLICY "Public can view active models" ON models FOR SELECT USING (is_active = true);