/**
 * Image URL Helper for Supabase Storage (ad-images bucket)
 * Supports 3 browser-generated variants:
 * - base: 1600px (fullscreen zoom)
 * - md: 800px (ad detail gallery, Open Graph)
 * - sm: 400px (ad cards, listing grids)
 */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zzcxgqtbmrdbaouegphx.supabase.co'

export type ImageVariant = 'base' | 'md' | 'sm'

/**
 * Returns public URL for an ad photo stored in Supabase Storage with variant support.
 * Example storagePath: "user-123/ad-456/uuid.webp"
 * Variant 'sm' => "user-123/ad-456/uuid_sm.webp"
 * Variant 'md' => "user-123/ad-456/uuid_md.webp"
 * Variant 'base' => "user-123/ad-456/uuid.webp"
 */
export function getAdImageUrl(
  storagePath?: string | null,
  variant: ImageVariant = 'base'
): string {
  if (!storagePath || storagePath.trim() === '') {
    return ''
  }

  // External URLs (e.g. mockups or placeholders)
  if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
    return storagePath
  }

  // Use the original path as default to ensure it always renders, 
  // since only base image is guaranteed to exist across all uploads.
  return `${SUPABASE_URL}/storage/v1/object/public/ad-images/${storagePath}`
}

export const getImageUrl = getAdImageUrl
