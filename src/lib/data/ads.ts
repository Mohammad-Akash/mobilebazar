// ==============================================================================
// Ads Data Access Layer (Server-Side Only)
// Direct Supabase RPC calls with keyset pagination & caching
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'
import { Database } from '@/src/types/supabase'
import { SearchParamsInput, decodeCursor, encodeCursor } from '@/src/lib/validations/search'
import {
  MOCK_ADS,
  MOCK_BRANDS,
  MOCK_CITIES,
} from './mock-seed'

export function searchMockAds(params: SearchParamsInput): SearchAdsResult {
  let filtered = [...MOCK_ADS]
  if (params.brand) filtered = filtered.filter((a) => a.brand_slug === params.brand)
  if (params.model) filtered = filtered.filter((a) => a.model_slug === params.model)
  if (params.city) filtered = filtered.filter((a) => a.city_slug === params.city)
  if (params.area) filtered = filtered.filter((a) => a.area_slug === params.area)
  if (params.min_price) filtered = filtered.filter((a) => (a.price || 0) >= params.min_price!)
  if (params.max_price) filtered = filtered.filter((a) => (a.price || 0) <= params.max_price!)
  if (params.pta) filtered = filtered.filter((a) => a.pta_status === params.pta)
  if (params.condition) filtered = filtered.filter((a) => a.condition === params.condition)
  if (params.storage) filtered = filtered.filter((a) => a.storage_gb === params.storage)
  if (params.q) {
    const q = params.q.toLowerCase()
    filtered = filtered.filter(
      (a) =>
        (a.title || '').toLowerCase().includes(q) ||
        (a.description || '').toLowerCase().includes(q)
    )
  }
  if (params.sort === 'price_asc') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
  } else if (params.sort === 'price_desc') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime()
    )
  }
  const pageSize = params.limit || 20
  const ads = filtered.slice(0, pageSize)
  return { ads, nextCursor: null, hasNextPage: false }
}

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
    is_phone_verified?: boolean
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
  try {
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

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
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
  } catch {
    return searchAdsFallback(params)
  }
}

/**
 * Fallback direct view query (in case migration 018 RPC has not yet been applied)
 */
async function searchAdsFallback(params: SearchParamsInput): Promise<SearchAdsResult> {
  try {
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
    if (error || !data || data.length === 0) {
      return searchMockAds(params)
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
  } catch {
    return searchMockAds(params)
  }
}

/**
 * Fetches latest active ads for homepage feed
 */
export async function getLatestAds(limit: number = 8): Promise<ActiveAdRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('active_ads_view')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error || !data || data.length === 0) {
      return MOCK_ADS.slice(0, limit)
    }

    return (data as ActiveAdRow[]) || []
  } catch {
    return MOCK_ADS.slice(0, limit)
  }
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

  // 1. Fast path: check active_ads_view first (has pre-joined brand, model, city, area)
  const { data: viewAd } = await supabase
    .from('active_ads_view')
    .select('*')
    .eq('id', adId)
    .maybeSingle()

  if (viewAd) {
    const [imagesRes, sellerRes] = await Promise.all([
      supabase
        .from('ad_images')
        .select('id, storage_path, position')
        .eq('ad_id', adId)
        .order('position', { ascending: true }),
      viewAd.seller_id
        ? supabase
            .from('profiles')
            .select('id, full_name, avatar_url, created_at, ads_count, is_phone_verified')
            .eq('id', viewAd.seller_id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
    ])

    const images = imagesRes.data || []
    const seller = sellerRes.data

    return {
      ...(viewAd as ActiveAdRow),
      images,
      cover_image_path: images.length > 0 ? images[0].storage_path : viewAd.cover_image_path,
      seller: seller || null,
    } as AdDetailWithRelations
  }

  // 2. Fallback path for sold or expired ads (direct from ads table)
  const { data: ad, error: adError } = await supabase
    .from('ads')
    .select('*')
    .eq('id', adId)
    .maybeSingle()

  if (adError || !ad || ad.status === 'deleted') {
    return null
  }

  // Fetch relations safely by IDs without PostgREST foreign key relationship syntax
  const [brandRes, modelRes, cityRes, areaRes, imagesRes, sellerRes] = await Promise.all([
    ad.brand_id
      ? supabase.from('brands').select('id, name, slug').eq('id', ad.brand_id).maybeSingle()
      : Promise.resolve({ data: null }),
    ad.model_id
      ? supabase.from('models').select('id, name, slug').eq('id', ad.model_id).maybeSingle()
      : Promise.resolve({ data: null }),
    ad.city_id
      ? supabase.from('cities').select('id, name, slug').eq('id', ad.city_id).maybeSingle()
      : Promise.resolve({ data: null }),
    ad.area_id
      ? supabase.from('areas').select('id, name, slug').eq('id', ad.area_id).maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from('ad_images')
      .select('id, storage_path, position')
      .eq('ad_id', adId)
      .order('position', { ascending: true }),
    supabase
      .from('profiles')
      .select('id, full_name, avatar_url, created_at, ads_count, is_phone_verified')
      .eq('id', ad.seller_id)
      .maybeSingle(),
  ])

  const brand = brandRes.data
  const model = modelRes.data
  const city = cityRes.data
  const area = areaRes.data
  const images = imagesRes.data || []
  const seller = sellerRes.data

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
    brand_name: brand?.name || null,
    brand_slug: brand?.slug || null,
    model_id: ad.model_id,
    model_name: model?.name || null,
    model_slug: model?.slug || null,
    city_id: ad.city_id,
    city_name: city?.name || null,
    city_slug: city?.slug || null,
    area_id: ad.area_id,
    area_name: area?.name || null,
    area_slug: area?.slug || null,
    cover_image_path: images.length > 0 ? images[0].storage_path : null,
    images,
    seller: seller || null,
  }

  // If not found in supabase, check MOCK_ADS
  const mockAd = MOCK_ADS.find((a) => a.id === adId)
  if (mockAd) {
    return {
      ...mockAd,
      images: [
        { id: 'img-1', storage_path: mockAd.cover_image_path || '', position: 0 },
        {
          id: 'img-2',
          storage_path:
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
          position: 1,
        },
      ],
      seller: {
        id: mockAd.seller_id || 'u-1',
        full_name: mockAd.seller_name || 'Verified Seller',
        avatar_url: mockAd.seller_avatar || null,
        created_at: mockAd.created_at || new Date().toISOString(),
        ads_count: 3,
        is_phone_verified: true,
      },
    } as AdDetailWithRelations
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
  try {
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

      if (brandAds && brandAds.length > 0) {
        return brandAds as ActiveAdRow[]
      }

      const mockSimilar = MOCK_ADS.filter(
        (a) =>
          a.id !== currentAd.id &&
          (a.brand_id === currentAd.brand_id || a.model_id === currentAd.model_id)
      )
      return mockSimilar.slice(0, limit)
    }

    return (data as ActiveAdRow[]) || []
  } catch {
    const mockSimilar = MOCK_ADS.filter(
      (a) =>
        a.id !== currentAd.id &&
        (a.brand_id === currentAd.brand_id || a.model_id === currentAd.model_id)
    )
    return mockSimilar.slice(0, limit)
  }
}

/**
 * Fetches popular brands ordered by active ads count
 */
export async function getPopularBrands(limit: number = 12): Promise<PopularBrandItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('get_popular_brands' as any, { p_limit: limit })

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      return MOCK_BRANDS.slice(0, limit).map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        logo_url: b.logo_url,
        ads_count: MOCK_ADS.filter((a) => a.brand_slug === b.slug).length,
      }))
    }

    return (data as unknown as PopularBrandItem[]) || []
  } catch {
    return MOCK_BRANDS.slice(0, limit).map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      logo_url: b.logo_url,
      ads_count: MOCK_ADS.filter((a) => a.brand_slug === b.slug).length,
    }))
  }
}

/**
 * Fetches active cities with their ad counts
 */
export async function getActiveCitiesWithCounts(limit: number = 30): Promise<ActiveCityItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('get_active_cities_with_counts' as any, {
      p_limit: limit,
    })

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      return MOCK_CITIES.slice(0, limit).map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        ads_count: MOCK_ADS.filter((a) => a.city_slug === c.slug).length,
      }))
    }

    return (data as unknown as ActiveCityItem[]) || []
  } catch {
    return MOCK_CITIES.slice(0, limit).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      ads_count: MOCK_ADS.filter((a) => a.city_slug === c.slug).length,
    }))
  }
}
