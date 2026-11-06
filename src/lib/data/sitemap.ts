import { createPublicClient } from '@/src/lib/supabase/public'
import { SITE_CONFIG } from '@/src/lib/seo/site'
import { getIndexableLandingPages } from './landing'

export const ADS_PER_SITEMAP = 10000

/**
 * Returns total count of active ads to calculate number of sitemap chunks
 */
export async function getActiveAdsCount(): Promise<number> {
  const supabase = createPublicClient()
  const { count, error } = await supabase
    .from('ads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  if (error || count === null) return 0
  return count
}

/**
 * Fetches a slice of active ads for a specific sitemap segment ID.
 * Segment 1 = ads 0..9999, Segment 2 = ads 10000..19999, etc.
 * Uses indexed pagination on (id) for fast sequential streaming.
 */
export async function getSitemapAdsChunk(segmentId: number) {
  const supabase = createPublicClient()
  const offset = (segmentId - 1) * ADS_PER_SITEMAP

  const { data, error } = await supabase
    .from('ads')
    .select(`
      id,
      title,
      storage_gb,
      pta_status,
      updated_at,
      brand:brands(name, slug),
      model:models(name, slug),
      city:cities(name, slug)
    `)
    .eq('status', 'active')
    .order('id', { ascending: true })
    .range(offset, offset + ADS_PER_SITEMAP - 1)

  if (error || !data) return []
  return data
}

/**
 * Returns all static & indexable landing page entries for Sitemap Segment 0
 */
export async function getStaticAndLandingSitemapEntries() {
  const entries: Array<{ url: string; lastModified?: Date }> = [
    { url: `${SITE_CONFIG.url}/`, lastModified: new Date() },
    { url: `${SITE_CONFIG.url}/ads`, lastModified: new Date() },
  ]

  const landingPages = await getIndexableLandingPages(SITE_CONFIG.minIndexableAds)

  for (const page of landingPages) {
    let path = ''
    if (page.page_type === 'city' && page.city_slug) {
      path = `/mobiles/${page.city_slug}`
    } else if (page.page_type === 'brand' && page.brand_slug) {
      path = `/brands/${page.brand_slug}`
    } else if (page.page_type === 'city_brand' && page.city_slug && page.brand_slug) {
      path = `/mobiles/${page.city_slug}/${page.brand_slug}`
    } else if (page.page_type === 'brand_model' && page.brand_slug && page.model_slug) {
      path = `/brands/${page.brand_slug}/${page.model_slug}`
    } else if (
      page.page_type === 'city_brand_model' &&
      page.city_slug &&
      page.brand_slug &&
      page.model_slug
    ) {
      path = `/mobiles/${page.city_slug}/${page.brand_slug}/${page.model_slug}`
    }

    if (path) {
      entries.push({
        url: `${SITE_CONFIG.url}${path}`,
        lastModified: page.newest_published_at
          ? new Date(page.newest_published_at)
          : new Date(),
      })
    }
  }

  return entries
}

