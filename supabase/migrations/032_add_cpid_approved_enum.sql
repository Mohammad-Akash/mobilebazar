-- ==============================================================================
-- Migration: Add cpid_approved to pta_status enum
-- Supports CPID Server Approved devices (Samsung, Google Pixel, OnePlus, etc.)
-- ==============================================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_enum
        WHERE enumlabel = 'cpid_approved'
          AND enumtypid = 'pta_status'::regtype
    ) THEN
        ALTER TYPE pta_status ADD VALUE 'cpid_approved' AFTER 'pta_approved';
    END IF;
END $$;
