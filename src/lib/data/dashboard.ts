// ==============================================================================
// Dashboard Data Access Layer (Server-Side Only)
// Fetches authenticated user's ads, counts, and favorites
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'
import { encodeCursor, decodeCursor } from '@/src/lib/validations/search'

export interface MyAdItem {
  id: string
  title: string
  price: number
  is_negotiable: boolean
  condition: string
  pta_status: string
  storage_gb: number
  status: 'active' | 'sold' | 'expired' | 'deleted' | 'under_review'
  is_featured: boolean
  views_count: number
  favorites_count: number
  published_at: string
  created_at: string
  expires_at: string
  brand_name: string | null
  model_name: string | null
  city_name: string | null
  cover_image_path: string | null
  moderation_reason?: string | null
}

export interface MyAdCounts {
  active_count: number
  sold_count: number
  expired_count: number
  under_review_count: number
}

/**
 * Fetches counts of ads per status for the authenticated user
 */
export async function getMyAdCounts(): Promise<MyAdCounts> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { active_count: 0, sold_count: 0, expired_count: 0, under_review_count: 0 }

  const [activeRes, soldRes, expiredRes, underReviewRes] = await Promise.all([
    supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'active'),
    supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'sold'),
    supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'expired'),
    supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'under_review'),
  ])

  return {
    active_count: activeRes.count || 0,
    sold_count: soldRes.count || 0,
    expired_count: expiredRes.count || 0,
    under_review_count: underReviewRes.count || 0,
  }
}

/**
 * Fetches user's ads for a specific tab with keyset pagination
 */
export async function getMyAds(
  status: 'active' | 'sold' | 'expired' | 'under_review',
  cursor?: string | null,
  limit: number = 15
): Promise<{ ads: MyAdItem[]; nextCursor: string | null; hasNextPage: boolean }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { ads: [], nextCursor: null, hasNextPage: false }
  }

  const decoded = decodeCursor(cursor)

  let query = supabase
    .from('ads')
    .select(`
      id,
      title,
      price,
      is_negotiable,
      condition,
      pta_status,
      storage_gb,
      status,
      is_featured,
      views_count,
      favorites_count,
      published_at,
      created_at,
      expires_at,
      brand_id,
      model_id,
      city_id,
      ad_images (storage_path, position)
    `)
    .eq('seller_id', user.id)
    .eq('status', status)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })

  if (decoded) {
    // Keyset condition: created_at < cursor_time OR (created_at = cursor_time AND id < cursor_id)
    query = query.or(
      `created_at.lt.${decoded.value},and(created_at.eq.${decoded.value},id.lt.${decoded.id})`
    )
  }

  query = query.limit(limit + 1)

  const { data, error } = await query
  if (error || !data) {
    console.error('Error in getMyAds:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    return { ads: [], nextCursor: null, hasNextPage: false }
  }

  const hasNextPage = data.length > limit
  const rawAds = hasNextPage ? data.slice(0, limit) : data

  // Safely batch-fetch brand, model, and city names without relying on composite FK PostgREST embeds
  const brandIds = Array.from(new Set(rawAds.map((a: any) => a.brand_id).filter(Boolean)))
  const modelIds = Array.from(new Set(rawAds.map((a: any) => a.model_id).filter(Boolean)))
  const cityIds = Array.from(new Set(rawAds.map((a: any) => a.city_id).filter(Boolean)))

  const [brandsRes, modelsRes, citiesRes] = await Promise.all([
    brandIds.length > 0 ? (supabase.from('brands') as any).select('id, name').in('id', brandIds) : Promise.resolve({ data: [] }),
    modelIds.length > 0 ? (supabase.from('models') as any).select('id, name').in('id', modelIds) : Promise.resolve({ data: [] }),
    cityIds.length > 0 ? (supabase.from('cities') as any).select('id, name').in('id', cityIds) : Promise.resolve({ data: [] }),
  ])

  const brandMap = new Map<string, string>((brandsRes.data || []).map((b: any) => [b.id, b.name]))
  const modelMap = new Map<string, string>((modelsRes.data || []).map((m: any) => [m.id, m.name]))
  const cityMap = new Map<string, string>((citiesRes.data || []).map((c: any) => [c.id, c.name]))

  const ads: MyAdItem[] = rawAds.map((a: any) => {
    // Find cover image (position 0)
    const images = Array.isArray(a.ad_images) ? a.ad_images : []
    const cover = images.find((img: any) => img.position === 0) || images[0]

    return {
      id: a.id,
      title: a.title,
      price: a.price,
      is_negotiable: a.is_negotiable,
      condition: a.condition,
      pta_status: a.pta_status,
      storage_gb: a.storage_gb,
      status: a.status,
      is_featured: a.is_featured,
      views_count: a.views_count,
      favorites_count: a.favorites_count,
      published_at: a.published_at,
      created_at: a.created_at,
      expires_at: a.expires_at,
      brand_name: brandMap.get(a.brand_id) || null,
      model_name: modelMap.get(a.model_id) || null,
      city_name: cityMap.get(a.city_id) || null,
      cover_image_path: cover?.storage_path || null,
    }
  })

  let nextCursor: string | null = null
  if (hasNextPage && ads.length > 0) {
    const lastItem = ads[ads.length - 1]
    nextCursor = encodeCursor(lastItem.created_at, lastItem.id)
  }

  return { ads, nextCursor, hasNextPage }
}

