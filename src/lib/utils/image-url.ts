// ==============================================================================
// Image URL Helper for Supabase Storage (ad-images bucket)
// Returns public URL or elegant placeholder
// ==============================================================================

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zzcxgqtbmrdbaouegphx.supabase.co'

/**
 * Returns public URL for an ad photo stored in Supabase Storage.
 * Handles placeholders and missing paths gracefully.
 */
export function getAdImageUrl(storagePath?: string | null): string {
  if (!storagePath || storagePath.trim() === '') {
    return '/images/placeholder-phone.svg'
  }

  // If path already starts with http/https (e.g. external mockup)
  if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
    return storagePath
  }

  // Return Supabase public bucket URL
  return `${SUPABASE_URL}/storage/v1/object/public/ad-images/${storagePath}`
}

