-- ==============================================================================
-- Prompt 5 / Migration 004: Ads, Ad Private (IMEI) & Ad Images
-- Safe to re-run
-- ==============================================================================

-- 1. Main Ads Table
CREATE TABLE IF NOT EXISTS ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    brand_id UUID NOT NULL,
    model_id UUID NOT NULL,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    area_id UUID,
    
    -- Content & Details
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
    has_accessories BOOLEAN NOT NULL DEFAULT false
        ,
    -- Warranty
    warranty_type warranty_type NOT NULL DEFAULT 'none',
    warranty_months_remaining SMALLINT DEFAULT 0,
    CONSTRAINT chk_ad_warranty CHECK (
        (warranty_type = 'none' AND (warranty_months_remaining IS NULL OR warranty_months_remaining = 0)) OR
        (warranty_type = 'in_warranty' AND warranty_months_remaining > 0)
    ),

    -- Contact & Status
    contact_preference contact_preference NOT NULL DEFAULT 'both',
    status ad_status NOT NULL DEFAULT 'active',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    featured_until TIMESTAMPTZ,
    
    -- Counters
    views_count INT NOT NULL DEFAULT 0 CHECK (views_count >= 0),
    favorites_count INT NOT NULL DEFAULT 0 CHECK (favorites_count >= 0),

    -- Lifecycle Timestamps
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
    sold_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- Composite Foreign Keys to ensure Model belongs to Brand, and Area belongs to City
    CONSTRAINT fk_ads_model_brand FOREIGN KEY (model_id, brand_id)
        REFERENCES models(id, brand_id) ON DELETE RESTRICT,
    CONSTRAINT fk_ads_area_city FOREIGN KEY (area_id, city_id)
        REFERENCES areas(id, city_id) ON DELETE SET NULL (area_id)
);

-- Trigger for ads updated_at
DROP TRIGGER IF EXISTS trigger_ads_updated_at ON ads;
CREATE TRIGGER trigger_ads_updated_at
    BEFORE UPDATE ON ads
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- 2. Sensitive / Private Ad Data (Owner & Admin only via RLS)
CREATE TABLE IF NOT EXISTS ad_private (
    ad_id UUID PRIMARY KEY REFERENCES ads(id) ON DELETE CASCADE,
    imei VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for ad_private updated_at
DROP TRIGGER IF EXISTS trigger_ad_private_updated_at ON ad_private;
CREATE TRIGGER trigger_ad_private_updated_at
    BEFORE UPDATE ON ad_private
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- 3. Ad Images Table (Max 8 images per ad, position 0 is cover)
CREATE TABLE IF NOT EXISTS ad_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    position SMALLINT NOT NULL DEFAULT 0 CHECK (position >= 0 AND position <= 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ad_images_ad_id_position_key UNIQUE (ad_id, position) DEFERRABLE INITIALLY DEFERRED
);

-- Enforce Max 8 Images per Ad via Trigger
CREATE OR REPLACE FUNCTION check_ad_images_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT count(*) FROM ad_images WHERE ad_id = NEW.ad_id) >= 8 THEN
        RAISE EXCEPTION 'Maximum 8 images allowed per ad';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_ad_images_limit ON ad_images;
CREATE TRIGGER trigger_check_ad_images_limit
    BEFORE INSERT ON ad_images
    FOR EACH ROW
    EXECUTE FUNCTION check_ad_images_limit();

