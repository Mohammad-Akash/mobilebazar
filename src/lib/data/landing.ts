import { createPublicClient } from '@/src/lib/supabase/public'
import { ActiveAdRow } from './ads'

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
    const { data: city, error } = await supabase
      .from('cities')
      .select('id, name, slug')
      .eq('slug', params.city)
      .eq('is_active', true)
      .maybeSingle()

    if (error || !city) return null
    cityData = city
  }

  // 2. Validate Brand if requested
  if (params.brand) {
    const { data: brand, error } = await supabase
      .from('brands')
      .select('id, name, slug')
      .eq('slug', params.brand)
      .eq('is_active', true)
      .maybeSingle()

    if (error || !brand) return null
    brandData = brand
  }

  // 3. Validate Model if requested (must belong to brand)
  if (params.model) {
    if (!brandData) return null

    const { data: model, error } = await supabase
      .from('models')
      .select('id, name, slug, brand_id')
      .eq('slug', params.model)
      .eq('brand_id', brandData.id)
      .eq('is_active', true)
      .maybeSingle()

    if (error || !model) return null
    modelData = { id: model.id, name: model.name, slug: model.slug }
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
  const supabase = createPublicClient()

  const { data, error } = await supabase.rpc('get_landing_stats', {
    p_city_slug: params.citySlug || null,
    p_brand_slug: params.brandSlug || null,
    p_model_slug: params.modelSlug || null,
  })

  if (error || !data || data.length === 0) {
    return {
      adCount: 0,
      minPrice: null,
      medianPrice: null,
      maxPrice: null,
      newestPublishedAt: null,
    }
  }

  const row = data[0]
  return {
    adCount: Number(row.ad_count || 0),
    minPrice: row.min_price != null ? Number(row.min_price) : null,
    medianPrice: row.median_price != null ? Number(row.median_price) : null,
    maxPrice: row.max_price != null ? Number(row.max_price) : null,
    newestPublishedAt: row.newest_published_at || null,
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
  const supabase = createPublicClient()
  const limit = params.limit || 16

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
  if (error || !data) return []
  return data as ActiveAdRow[]
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
  const supabase = createPublicClient()

  const { data, error } = await supabase.rpc('get_related_landing_links', {
    p_city_slug: params.citySlug || null,
    p_brand_slug: params.brandSlug || null,
    p_model_slug: params.modelSlug || null,
    p_limit: params.limit || 8,
  })

  if (error || !data) return []
  return data as RelatedLink[]
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

