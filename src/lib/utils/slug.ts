/**
 * Slug utility for deterministic, SEO-friendly, clean ASCII URLs.
 */

/**
 * Converts arbitrary text into a clean, URL-safe ASCII slug.
 * - Converts to lowercase
 * - Strips accents / diacritics
 * - Replaces any non-alphanumeric character with a single hyphen
 * - Strips leading and trailing hyphens
 * - Truncates to max length
 */
export function slugify(text: string, maxLength: number = 80): string {
  if (!text) return ''

  const slug = text
    .normalize('NFKD') // split accented characters into base letter + accent
    .replace(/[\u0300-\u036f]/g, '') // remove accent diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumerics with hyphens
    .replace(/^-+|-+$/g, '') // trim hyphens

  if (slug.length <= maxLength) return slug

  // Truncate at maximum length without breaking in the middle of a token if possible
  const truncated = slug.slice(0, maxLength)
  const lastHyphen = truncated.lastIndexOf('-')
  if (lastHyphen > maxLength * 0.6) {
    return truncated.slice(0, lastHyphen)
  }
  return truncated.replace(/-+$/, '')
}

export interface AdSlugInput {
  title?: string | null
  brand_name?: string | null
  model_name?: string | null
  storage_gb?: number | null
  pta_status?: string | null
  city_name?: string | null
}

/**
 * Builds a deterministic canonical slug for an ad.
 * Pattern: [brand]-[model]-[storage]gb-[pta]-[city]
 * Example: "apple-iphone-13-128gb-approved-lahore"
 */
export function buildAdSlug(input: AdSlugInput): string {
  const parts: string[] = []

  if (input.brand_name) parts.push(input.brand_name)
  if (input.model_name) parts.push(input.model_name)
  if (input.storage_gb) parts.push(`${input.storage_gb}gb`)
  if (input.pta_status) {
    const ptaClean = input.pta_status.toLowerCase()
    if (ptaClean.includes('approved')) parts.push('approved')
    else if (ptaClean.includes('non')) parts.push('non-pta')
    else parts.push(ptaClean)
  }
  if (input.city_name) parts.push(input.city_name)

  const candidate = parts.length > 0 ? parts.join(' ') : (input.title || 'mobile-phone')
  const slug = slugify(candidate, 80)
  return slug || 'mobile-phone'
}

/**
 * Returns the canonical URL path for an ad detail page.
 */
export function buildAdCanonicalPath(id: string, slug?: string): string {
  if (!slug) return `/ad/${id}`
  return `/ad/${id}/${slug}`
}

