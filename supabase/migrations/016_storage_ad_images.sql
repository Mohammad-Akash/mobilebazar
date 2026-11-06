-- ==============================================================================
-- Migration 016: Storage Buckets & Policies for Ad Images and Avatars
-- Safe to re-run
-- ==============================================================================

-- 1. Create Public Buckets (if not already present)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('ad-images', 'ad-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Policies on storage.objects

-- Public Read Policy: Anyone can view images from ad-images and avatars
DROP POLICY IF EXISTS "Public can view ad images and avatars" ON storage.objects;
CREATE POLICY "Public can view ad images and avatars"
    ON storage.objects
    FOR SELECT
    USING (bucket_id IN ('ad-images', 'avatars'));

-- Upload Policy: Authenticated, non-banned users can upload ONLY inside their own user ID folder
DROP POLICY IF EXISTS "Users can upload into their own folder" ON storage.objects;
CREATE POLICY "Users can upload into their own folder"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id IN ('ad-images', 'avatars')
        AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
        AND NOT public.is_banned()
    );

-- Update Policy: Users can update their own files
DROP POLICY IF EXISTS "Users can update their own uploads" ON storage.objects;
CREATE POLICY "Users can update their own uploads"
    ON storage.objects
    FOR UPDATE
    USING (
        bucket_id IN ('ad-images', 'avatars')
        AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
        AND NOT public.is_banned()
    )
    WITH CHECK (
        bucket_id IN ('ad-images', 'avatars')
        AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
    );

-- Delete Policy: Users can delete their own files
DROP POLICY IF EXISTS "Users can delete their own uploads" ON storage.objects;
CREATE POLICY "Users can delete their own uploads"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id IN ('ad-images', 'avatars')
        AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
        AND NOT public.is_banned()
    );

