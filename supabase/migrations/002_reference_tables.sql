-- ==============================================================================
-- Prompt 3 / Migration 002: Reference Tables (Cities, Areas, Brands, Models)
-- Safe to re-run
-- ==============================================================================

-- 1. Cities Table
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for cities updated_at
DROP TRIGGER IF EXISTS trigger_cities_updated_at ON cities;
CREATE TRIGGER trigger_cities_updated_at
    BEFORE UPDATE ON cities
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- 2. Areas Table (belongs to a city)
CREATE TABLE IF NOT EXISTS areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT areas_city_id_slug_key UNIQUE (city_id, slug),
    CONSTRAINT areas_id_city_id_key UNIQUE (id, city_id) -- Needed for composite FK in ads
);

-- Trigger for areas updated_at
DROP TRIGGER IF EXISTS trigger_areas_updated_at ON areas;
CREATE TRIGGER trigger_areas_updated_at
    BEFORE UPDATE ON areas
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- Indexes for areas
CREATE INDEX IF NOT EXISTS idx_areas_city_id ON areas(city_id);
CREATE INDEX IF NOT EXISTS idx_areas_slug ON areas(slug);

-- 3. Brands Table
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(80) NOT NULL UNIQUE,
    slug VARCHAR(80) NOT NULL UNIQUE,
    logo_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for brands updated_at
DROP TRIGGER IF EXISTS trigger_brands_updated_at ON brands;
CREATE TRIGGER trigger_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- 4. Models Table (belongs to a brand)
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
    CONSTRAINT models_id_brand_id_key UNIQUE (id, brand_id) -- Needed for composite FK in ads
);

-- Trigger for models updated_at
DROP TRIGGER IF EXISTS trigger_models_updated_at ON models;
CREATE TRIGGER trigger_models_updated_at
    BEFORE UPDATE ON models
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- Indexes for models
CREATE INDEX IF NOT EXISTS idx_models_brand_id ON models(brand_id);
CREATE INDEX IF NOT EXISTS idx_models_slug ON models(slug);

