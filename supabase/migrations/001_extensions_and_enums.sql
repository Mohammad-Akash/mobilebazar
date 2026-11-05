-- ==============================================================================
-- Prompt 2 / Migration 001: Extensions, Enums & Core Functions
-- Safe to re-run without errors
-- ==============================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- 2. Enum Types
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

-- 3. Reusable trigger function to update updated_at column
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

