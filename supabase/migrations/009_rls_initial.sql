-- ==============================================================================
-- Prompt 10 / Migration 009: Row Level Security (RLS) Initial Lock & Public Reference Policies
-- Safe to re-run
-- ==============================================================================

-- 1. Enable RLS on ALL tables (Default Deny: All client access blocked until explicit policy added)
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

-- 2. Public Read Policies for Reference Tables (Anyone can read active records)

-- Cities: Anyone can view active cities
DROP POLICY IF EXISTS "Public can view active cities" ON cities;
CREATE POLICY "Public can view active cities"
    ON cities
    FOR SELECT
    USING (is_active = true);

-- Areas: Anyone can view active areas
DROP POLICY IF EXISTS "Public can view active areas" ON areas;
CREATE POLICY "Public can view active areas"
    ON areas
    FOR SELECT
    USING (is_active = true);

-- Brands: Anyone can view active brands
DROP POLICY IF EXISTS "Public can view active brands" ON brands;
CREATE POLICY "Public can view active brands"
    ON brands
    FOR SELECT
    USING (is_active = true);

-- Models: Anyone can view active models
DROP POLICY IF EXISTS "Public can view active models" ON models;
CREATE POLICY "Public can view active models"
    ON models
    FOR SELECT
    USING (is_active = true);

