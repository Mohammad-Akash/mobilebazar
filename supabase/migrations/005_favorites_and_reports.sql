-- ==============================================================================
-- Prompt 6 / Migration 005: Favorites & Reports with Counter Trigger
-- Safe to re-run
-- ==============================================================================

-- 1. Favorites Table (Bookmarks)
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, ad_id)
);

-- 2. Reports Table (Spam / Fraud reporting)
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

-- 3. Trigger Function: Automatically update ads.favorites_count (SECURITY DEFINER for RLS bypass)
CREATE OR REPLACE FUNCTION update_ad_favorites_count()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE ads 
        SET favorites_count = favorites_count + 1 
        WHERE id = NEW.ad_id;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE ads 
        SET favorites_count = GREATEST(favorites_count - 1, 0) 
        WHERE id = OLD.ad_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to favorites
DROP TRIGGER IF EXISTS trigger_favorites_count ON favorites;
CREATE TRIGGER trigger_favorites_count
    AFTER INSERT OR DELETE ON favorites
    FOR EACH ROW
    EXECUTE FUNCTION update_ad_favorites_count();

