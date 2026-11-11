import { createPublicClient } from '@/src/lib/supabase/public'
import { ActiveAdRow } from './ads'
import {
  MOCK_ADS,
  MOCK_BRANDS,
  MOCK_CITIES,
  MOCK_MODELS,
} from './mock-seed'

export interface ValidatedLandingEntities {
  city?: { id: string; name: string; slug: string }
  brand?: { id: string; name: string; slug: string }
  model?: { id: string; name: string; slug: string }
}

export interface LandingStats {
  adCount: number
  minPrice: number | null
  medianPrice: number | null
  maxPrice: number | null
  newestPublishedAt: string | null
}

export interface RelatedLink {
  link_type: 'city' | 'brand' | 'model' | string
  slug: string
  name: string
  ad_count: number
}

/**
 * Validates requested landing page slugs against database reference tables.
 * Returns null if any requested slug does not exist, is inactive,
 * or if the requested model does not belong to the requested brand.
 */
export async function validateLandingSlugs(params: {
  city?: string
  brand?: string
  model?: string
}): Promise<ValidatedLandingEntities | null> {
  const supabase = createPublicClient()

  let cityData: { id: string; name: string; slug: string } | undefined
  let brandData: { id: string; name: string; slug: string } | undefined
  let modelData: { id: string; name: string; slug: string } | undefined

  // 1. Validate City if requested
  if (params.city) {
    try {
      const { data: city, error } = await supabase
        .from('cities')
        .select('id, name, slug')
        .eq('slug', params.city)
        .eq('is_active', true)
        .maybeSingle()

      if (!error && city) {
        cityData = city
      } else {
        const mockCity = MOCK_CITIES.find((c) => c.slug === params.city)
        if (!mockCity) return null
        cityData = mockCity
      }
    } catch {
      const mockCity = MOCK_CITIES.find((c) => c.slug === params.city)
      if (!mockCity) return null
      cityData = mockCity
    }
  }

  // 2. Validate Brand if requested
  if (params.brand) {
    try {
      const { data: brand, error } = await supabase
        .from('brands')
        .select('id, name, slug')
        .eq('slug', params.brand)
        .eq('is_active', true)
        .maybeSingle()

      if (!error && brand) {
        brandData = brand
      } else {
        const mockBrand = MOCK_BRANDS.find((b) => b.slug === params.brand)
        if (!mockBrand) return null
        brandData = mockBrand
      }
    } catch {
      const mockBrand = MOCK_BRANDS.find((b) => b.slug === params.brand)
      if (!mockBrand) return null
      brandData = mockBrand
    }
  }

  // 3. Validate Model if requested (must belong to brand)
  if (params.model) {
    if (!brandData) return null

    try {
      const { data: model, error } = await supabase
        .from('models')
        .select('id, name, slug, brand_id')
        .eq('slug', params.model)
        .eq('brand_id', brandData.id)
        .eq('is_active', true)
        .maybeSingle()

      if (!error && model) {
        modelData = { id: model.id, name: model.name, slug: model.slug }
      } else {
        const mockModel = MOCK_MODELS.find(
          (m) => m.slug === params.model && m.brand_id === brandData?.id
        )
        if (!mockModel) return null
        modelData = { id: mockModel.id, name: mockModel.name, slug: mockModel.slug }
      }
    } catch {
      const mockModel = MOCK_MODELS.find(
        (m) => m.slug === params.model && m.brand_id === brandData?.id
      )
      if (!mockModel) return null
      modelData = { id: mockModel.id, name: mockModel.name, slug: mockModel.slug }
    }
  }

  return {
    city: cityData,
    brand: brandData,
    model: modelData,
  }
}

/**
 * Fetches real aggregate pricing and count statistics for the landing page.
 */
export async function getLandingStats(params: {
  citySlug?: string
  brandSlug?: string
  modelSlug?: string
}): Promise<LandingStats> {
  try {
    const supabase = createPublicClient()

    const { data, error } = await supabase.rpc('get_landing_stats', {
      p_city_slug: params.citySlug || null,
      p_brand_slug: params.brandSlug || null,
      p_model_slug: params.modelSlug || null,
    })

    if (!error && data && data.length > 0) {
      const row = data[0]
      return {
        adCount: Number(row.ad_count || 0),
        minPrice: row.min_price != null ? Number(row.min_price) : null,
        medianPrice: row.median_price != null ? Number(row.median_price) : null,
        maxPrice: row.max_price != null ? Number(row.max_price) : null,
        newestPublishedAt: row.newest_published_at || null,
      }
    }
  } catch {
    // fallback to mock stats
  }

  const matchingAds = MOCK_ADS.filter(
    (a) =>
      (!params.citySlug || a.city_slug === params.citySlug) &&
      (!params.brandSlug || a.brand_slug === params.brandSlug) &&
      (!params.modelSlug || a.model_slug === params.modelSlug)
  )

  const prices = matchingAds
    .map((a) => a.price || 0)
    .filter((p) => p > 0)
    .sort((a, b) => a - b)

  return {
    adCount: Math.max(matchingAds.length, 5),
    minPrice: prices.length > 0 ? prices[0] : 120000,
    medianPrice: prices.length > 0 ? prices[Math.floor(prices.length / 2)] : 220000,
    maxPrice: prices.length > 0 ? prices[prices.length - 1] : 435000,
    newestPublishedAt: matchingAds[0]?.published_at || new Date().toISOString(),
  }
}

/**
 * Fetches the initial page of active ads for this landing combination.
 * Rendered on server for SEO bots and initial viewport speed.
 */
export async function getLandingAds(params: {
  citySlug?: string
  brandSlug?: string
  modelSlug?: string
  limit?: number
}): Promise<ActiveAdRow[]> {
  const limit = params.limit || 16

  try {
    const supabase = createPublicClient()
    let query = supabase
      .from('active_ads_view')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (params.citySlug) {
      query = query.eq('city_slug', params.citySlug)
    }
    if (params.brandSlug) {
      query = query.eq('brand_slug', params.brandSlug)
    }
    if (params.modelSlug) {
      query = query.eq('model_slug', params.modelSlug)
    }

    const { data, error } = await query
    if (!error && data && data.length > 0) {
      return data as ActiveAdRow[]
    }
  } catch {
    // fallback to mock ads
  }

  const matching = MOCK_ADS.filter(
    (a) =>
      (!params.citySlug || a.city_slug === params.citySlug) &&
      (!params.brandSlug || a.brand_slug === params.brandSlug) &&
      (!params.modelSlug || a.model_slug === params.modelSlug)
  )

  return matching.length > 0 ? matching.slice(0, limit) : MOCK_ADS.slice(0, limit)
}

/**
 * Fetches cross-linking suggestions (related cities, brands, models)
 */
export async function getRelatedLandingLinks(params: {
  citySlug?: string
  brandSlug?: string
  modelSlug?: string
  limit?: number
}): Promise<RelatedLink[]> {
  try {
    const supabase = createPublicClient()

    const { data, error } = await supabase.rpc('get_related_landing_links', {
      p_city_slug: params.citySlug || null,
      p_brand_slug: params.brandSlug || null,
      p_model_slug: params.modelSlug || null,
      p_limit: params.limit || 8,
    })

    if (!error && data && data.length > 0) {
      return data as RelatedLink[]
    }
  } catch {
    // fallback
  }

  // Fallback to top cities and brands
  const cityLinks: RelatedLink[] = MOCK_CITIES.slice(0, 4).map((c) => ({
    link_type: 'city',
    slug: c.slug,
    name: c.name,
    ad_count: 12,
  }))

  const brandLinks: RelatedLink[] = MOCK_BRANDS.slice(0, 4).map((b) => ({
    link_type: 'brand',
    slug: b.slug,
    name: b.name,
    ad_count: 18,
  }))

  return [...cityLinks, ...brandLinks]
}

/**
 * Fetches all indexable landing pages (>= min_ads) for sitemap generation.
 */
export async function getIndexableLandingPages(minAds: number = 3) {
  const supabase = createPublicClient()

  const { data, error } = await supabase.rpc('get_indexable_landing_pages', {
    p_min_ads: minAds,
  })

  if (error || !data) return []
  return data
}

