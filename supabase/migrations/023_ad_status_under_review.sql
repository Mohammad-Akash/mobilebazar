-- ==============================================================================
-- Migration 023: Add 'under_review' to ad_status enum
-- IMPORTANT: This migration must run ALONE and be committed before migration 024.
-- Reason: PostgreSQL does not allow using a newly added enum value in the same
-- transaction that added it ("unsafe use of new value of enum type").
-- After running this: regenerate TypeScript types before applying migration 024.
-- ==============================================================================
ALTER TYPE ad_status ADD VALUE IF NOT EXISTS 'under_review';
