// ==============================================================================
// Ads Data Access Layer (Server-Side Only)
// Direct Supabase RPC calls with keyset pagination & caching
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'
import { Database } from '@/src/types/supabase'
import { SearchParamsInput, decodeCursor, encodeCursor } from '@/src/lib/validations/search'

export type ActiveAdRow = Database['public']['Views']['active_ads_view']['Row']

export interface SearchAdsResult {
  ads: ActiveAdRow[]
  nextCursor: string | null
  hasNextPage: boolean
}

export interface AdDetailWithRelations extends ActiveAdRow {
  images: { id: string; storage_path: string; position: number }[]
  seller: {
    id: string
    full_name: string | null
    avatar_url: string | null
    created_at: string
    ads_count: number
  } | null
}

export interface PopularBrandItem {
  id: string
  name: string
  slug: string
  logo_url: string | null
  ads_count: number
}

export interface ActiveCityItem {
  id: string
  name: string
  slug: string
  ads_count: number
}

/**
 * Executes keyset search on active ads via search_ads RPC function
 * Handles limit + 1 pagination without running costly count(*)
 */
export async function searchAds(params: SearchParamsInput): Promise<SearchAdsResult> {
  const supabase = await createClient()

  const decoded = decodeCursor(params.cursor)
  const pageSize = params.limit || 20

  // Call the SQL search_ads function
  const { data, error } = await supabase.rpc('search_ads' as any, {
    p_brand_slug: params.brand || null,
    p_model_slug: params.model || null,
    p_city_slug: params.city || null,
    p_area_slug: params.area || null,
    p_min_price: params.min_price || null,
    p_max_price: params.max_price || null,
    p_pta: params.pta || null,
    p_storage_gb: params.storage || null,
    p_condition: params.condition || null,
    p_search: params.q || null,
    p_sort: params.sort || 'newest',
    p_cursor_value: decoded ? decoded.value : null,
    p_cursor_id: decoded ? decoded.id : null,
    p_limit: pageSize,
  })

  if (error) {
    console.error('Error in searchAds RPC:', error)
    // Fallback: query active_ads_view directly if RPC not yet run in dev
    return searchAdsFallback(params)
  }

  const rows = (data as unknown as ActiveAdRow[]) || []
  const hasNextPage = rows.length > pageSize
  const ads = hasNextPage ? rows.slice(0, pageSize) : rows

  let nextCursor: string | null = null
  if (hasNextPage && ads.length > 0) {
    const lastItem = ads[ads.length - 1]
    const cursorValue =
      params.sort === 'price_asc' || params.sort === 'price_desc'
        ? lastItem.price
        : lastItem.published_at

    if (cursorValue !== null && cursorValue !== undefined && lastItem.id) {
      nextCursor = encodeCursor(cursorValue, lastItem.id)
    }
  }

  return {
    ads,
    nextCursor,
    hasNextPage,
  }
}

/**
 * Fallback direct view query (in case migration 018 RPC has not yet been applied)
 */
async function searchAdsFallback(params: SearchParamsInput): Promise<SearchAdsResult> {
  const supabase = await createClient()
  const pageSize = params.limit || 20

  let query = supabase.from('active_ads_view').select('*')

  if (params.brand) query = query.eq('brand_slug', params.brand)
  if (params.model) query = query.eq('model_slug', params.model)
  if (params.city) query = query.eq('city_slug', params.city)
  if (params.area) query = query.eq('area_slug', params.area)
  if (params.min_price) query = query.gte('price', params.min_price)
  if (params.max_price) query = query.lte('price', params.max_price)
  if (params.pta) query = query.eq('pta_status', params.pta)
  if (params.condition) query = query.eq('condition', params.condition)
  if (params.storage) query = query.eq('storage_gb', params.storage)
  if (params.q) query = query.ilike('title', `%${params.q}%`)

  if (params.sort === 'price_asc') {
    query = query.order('price', { ascending: true }).order('id', { ascending: true })
  } else if (params.sort === 'price_desc') {
    query = query.order('price', { ascending: false }).order('id', { ascending: false })
  } else {
    query = query.order('published_at', { ascending: false }).order('id', { ascending: false })
  }

  query = query.limit(pageSize + 1)

  const { data, error } = await query
  if (error) {
    console.error('Fallback query error:', error)
    return { ads: [], nextCursor: null, hasNextPage: false }
  }

  const rows = (data as ActiveAdRow[]) || []
  const hasNextPage = rows.length > pageSize
  const ads = hasNextPage ? rows.slice(0, pageSize) : rows

  let nextCursor: string | null = null
  if (hasNextPage && ads.length > 0) {
    const lastItem = ads[ads.length - 1]
    const cursorValue =
      params.sort === 'price_asc' || params.sort === 'price_desc'
        ? lastItem.price
        : lastItem.published_at

    if (cursorValue !== null && cursorValue !== undefined && lastItem.id) {
      nextCursor = encodeCursor(cursorValue, lastItem.id)
    }
  }

  return { ads, nextCursor, hasNextPage }
}

/**
 * Fetches latest active ads for homepage feed
 */
export async function getLatestAds(limit: number = 8): Promise<ActiveAdRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('active_ads_view')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching latest ads:', error)
    return []
  }

  return (data as ActiveAdRow[]) || []
}

/**
 * Fetches full ad details by ID including images gallery and public seller info
 */
export async function getAdById(adId: string): Promise<AdDetailWithRelations | null> {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(adId)) {
    return null
  }

  const supabase = await createClient()

  // 1. Fetch main ad row with joined brands, models, cities, areas
  const { data: ad, error: adError } = await supabase
    .from('ads')
    .select(
      `
      *,
      brands:brand_id (id, name, slug),
      models:model_id (id, name, slug),
      cities:city_id (id, name, slug),
      areas:area_id (id, name, slug)
    `
    )
    .eq('id', adId)
    .single()

  if (adError || !ad) {
    return null
  }

  // 2. Fetch all images ordered by position
  const { data: images } = await supabase
    .from('ad_images')
    .select('id, storage_path, position')
    .eq('ad_id', adId)
    .order('position', { ascending: true })

  // 3. Fetch public seller details (Notice: NO phone or private fields!)
  const { data: seller } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, created_at, ads_count')
    .eq('id', ad.seller_id)
    .single()

  // Transform into unified structure matching ActiveAdRow
  const brandData = Array.isArray(ad.brands) ? ad.brands[0] : ad.brands
  const modelData = Array.isArray(ad.models) ? ad.models[0] : ad.models
  const cityData = Array.isArray(ad.cities) ? ad.cities[0] : ad.cities
  const areaData = Array.isArray(ad.areas) ? ad.areas[0] : ad.areas

  const result: AdDetailWithRelations = {
    id: ad.id,
    seller_id: ad.seller_id,
    seller_name: seller?.full_name || 'Seller',
    seller_avatar: seller?.avatar_url || null,
    title: ad.title,
    description: ad.description,
    price: ad.price,
    is_negotiable: ad.is_negotiable,
    condition: ad.condition,
    pta_status: ad.pta_status,
    storage_gb: ad.storage_gb,
    ram_gb: ad.ram_gb,
    color: ad.color,
    battery_health: ad.battery_health,
    has_box: ad.has_box,
    has_accessories: ad.has_accessories,
    warranty_type: ad.warranty_type,
    warranty_months_remaining: ad.warranty_months_remaining,
    contact_preference: ad.contact_preference,
    status: ad.status,
    is_featured: ad.is_featured,
    views_count: ad.views_count,
    favorites_count: ad.favorites_count,
    published_at: ad.published_at,
    created_at: ad.created_at,
    brand_id: ad.brand_id,
    brand_name: brandData?.name || null,
    brand_slug: brandData?.slug || null,
    model_id: ad.model_id,
    model_name: modelData?.name || null,
    model_slug: modelData?.slug || null,
    city_id: ad.city_id,
    city_name: cityData?.name || null,
    city_slug: cityData?.slug || null,
    area_id: ad.area_id,
    area_name: areaData?.name || null,
    area_slug: areaData?.slug || null,
    cover_image_path: images && images.length > 0 ? images[0].storage_path : null,
    images: images || [],
    seller: seller || null,
  }

  return result
}

/**
 * Fetches similar active ads based on same model, then same brand, nearby price
 */
export async function getSimilarAds(
  currentAd: { id: string; brand_id: string; model_id: string; city_id: string; price: number },
  limit: number = 4
): Promise<ActiveAdRow[]> {
  const supabase = await createClient()

  // Prioritize same model in active ads, excluding current ad
  const { data, error } = await supabase
    .from('active_ads_view')
    .select('*')
    .eq('model_id', currentAd.model_id)
    .neq('id', currentAd.id)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error || !data || data.length === 0) {
    // Fallback to same brand
    const { data: brandAds } = await supabase
      .from('active_ads_view')
      .select('*')
      .eq('brand_id', currentAd.brand_id)
      .neq('id', currentAd.id)
      .order('published_at', { ascending: false })
      .limit(limit)

    return (brandAds as ActiveAdRow[]) || []
  }

  return (data as ActiveAdRow[]) || []
}

/**
 * Fetches popular brands ordered by active ads count
 */
export async function getPopularBrands(limit: number = 12): Promise<PopularBrandItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_popular_brands' as any, { p_limit: limit })

  if (error || !data || (Array.isArray(data) && data.length === 0)) {
    // Fallback to active brands list
    const { data: brands } = await supabase
      .from('brands')
      .select('id, name, slug, logo_url')
      .eq('is_active', true)
      .limit(limit)

    return (
      brands?.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        logo_url: b.logo_url,
        ads_count: 0,
      })) || []
    )
  }

  return (data as unknown as PopularBrandItem[]) || []
}

/**
 * Fetches active cities with their ad counts
 */
export async function getActiveCitiesWithCounts(limit: number = 30): Promise<ActiveCityItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_active_cities_with_counts' as any, {
    p_limit: limit,
  })

  if (error || !data || (Array.isArray(data) && data.length === 0)) {
    const { data: cities } = await supabase
      .from('cities')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('name')
      .limit(limit)

    return (
      cities?.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        ads_count: 0,
      })) || []
    )
  }

  return (data as unknown as ActiveCityItem[]) || []
}
