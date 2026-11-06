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
    return '/images/placeholder-phone.svg'
  }

  // External URLs (e.g. mockups or placeholders)
  if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
    return storagePath
  }

  let finalPath = storagePath

  if (variant === 'sm' || variant === 'md') {
    // If path ends with .webp, insert _sm or _md before extension
    if (finalPath.endsWith('.webp')) {
      finalPath = finalPath.replace(/\.webp$/, `_${variant}.webp`)
    } else if (finalPath.includes('.')) {
      finalPath = finalPath.replace(/\.([a-zA-Z0-9]+)$/, `_${variant}.$1`)
    } else {
      finalPath = `${finalPath}_${variant}`
    }
  }

  return `${SUPABASE_URL}/storage/v1/object/public/ad-images/${finalPath}`
}

export const getImageUrl = getAdImageUrl
