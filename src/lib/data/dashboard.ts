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
  status: 'active' | 'sold' | 'expired' | 'deleted'
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
}

export interface MyAdCounts {
  active_count: number
  sold_count: number
  expired_count: number
}

/**
 * Fetches counts of ads per status for the authenticated user
 */
export async function getMyAdCounts(): Promise<MyAdCounts> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_my_ad_counts' as any)

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    // Fallback: direct count query
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { active_count: 0, sold_count: 0, expired_count: 0 }

    const [activeRes, soldRes, expiredRes] = await Promise.all([
      supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'active'),
      supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'sold'),
      supabase.from('ads').select('*', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'expired'),
    ])

    return {
      active_count: activeRes.count || 0,
      sold_count: soldRes.count || 0,
      expired_count: expiredRes.count || 0,
    }
  }

  const row = data[0]
  return {
    active_count: Number(row.active_count || 0),
    sold_count: Number(row.sold_count || 0),
    expired_count: Number(row.expired_count || 0),
  }
}

/**
 * Fetches user's ads for a specific tab with keyset pagination
 */
export async function getMyAds(
  status: 'active' | 'sold' | 'expired',
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
      brands:brand_id(name),
      models:model_id(name),
      cities:city_id(name),
      ad_images(storage_path,position)
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
    console.error('Error in getMyAds:', error)
    return { ads: [], nextCursor: null, hasNextPage: false }
  }

  const hasNextPage = data.length > limit
  const rawAds = hasNextPage ? data.slice(0, limit) : data

  const ads: MyAdItem[] = rawAds.map((a: any) => {
    const brandData = Array.isArray(a.brands) ? a.brands[0] : a.brands
    const modelData = Array.isArray(a.models) ? a.models[0] : a.models
    const cityData = Array.isArray(a.cities) ? a.cities[0] : a.cities

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
      brand_name: brandData?.name || null,
      model_name: modelData?.name || null,
      city_name: cityData?.name || null,
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

