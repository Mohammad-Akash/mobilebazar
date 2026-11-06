import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/src/lib/seo/site'
import { buildAdSlug, buildAdCanonicalPath } from '@/src/lib/utils/slug'
import {
  ADS_PER_SITEMAP,
  getActiveAdsCount,
  getSitemapAdsChunk,
  getStaticAndLandingSitemapEntries,
} from '@/src/lib/data/sitemap'

/**
 * Next.js sitemap segment generator:
 * - Segment 0: Static pages + qualifying landing pages (>= 3 ads)
 * - Segment 1..N: Active ad URLs split into max 10,000 URLs per file
 */
export async function generateSitemaps() {
  if (!SITE_CONFIG.allowIndexing) {
    return [{ id: 0 }]
  }

  const activeAdsCount = await getActiveAdsCount()
  const adSegmentsCount = Math.ceil(activeAdsCount / ADS_PER_SITEMAP)

  const sitemaps = [{ id: 0 }]
  for (let i = 1; i <= Math.max(1, adSegmentsCount); i++) {
    sitemaps.push({ id: i })
  }

  return sitemaps
}

export default async function sitemap({
  id,
}: {
  id: Promise<{ id: number }> | { id: number }
}): Promise<MetadataRoute.Sitemap> {
  const resolved = await id
  const segmentId = Number(resolved.id || 0)

  // Pre-launch defense: empty sitemap if indexing is off
  if (!SITE_CONFIG.allowIndexing) {
    return []
  }

  // Segment 0: Static pages & qualifying landing pages
  if (segmentId === 0) {
    const entries = await getStaticAndLandingSitemapEntries()
    return entries.map((entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
    }))
  }

  // Segment 1..N: Ads chunks
  const ads = await getSitemapAdsChunk(segmentId)
  return ads.map((ad: any) => {
    const brandName = Array.isArray(ad.brand) ? ad.brand[0]?.name : ad.brand?.name
    const modelName = Array.isArray(ad.model) ? ad.model[0]?.name : ad.model?.name
    const cityName = Array.isArray(ad.city) ? ad.city[0]?.name : ad.city?.name

    const slug = buildAdSlug({
      title: ad.title,
      brand_name: brandName,
      model_name: modelName,
      storage_gb: ad.storage_gb,
      pta_status: ad.pta_status,
      city_name: cityName,
    })

    return {
      url: `${SITE_CONFIG.url}${buildAdCanonicalPath(ad.id, slug)}`,
      lastModified: ad.updated_at ? new Date(ad.updated_at) : new Date(),
    }
  })
}
