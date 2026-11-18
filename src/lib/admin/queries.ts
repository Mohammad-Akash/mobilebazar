// ==============================================================================
// Admin Query Helpers (Phase 8)
// Server-only data loaders calling PostgreSQL RPCs with requireStaff() guard
// ==============================================================================

'use server'

import { createClient } from '@/src/lib/supabase/server'
import { requireStaff, requireAdmin } from '@/src/lib/admin/guard'
import type {
  AdminQueueAd,
  AdminReportGroup,
  AdminSpamFlag,
  AdminUserListItem,
  AdminAuditAction,
} from '@/src/types/admin'

// ── 1. List Ads Queue ─────────────────────────────────────────────────────────
export async function getAdminAds(params: {
  status?: string | null
  search?: string | null
  sellerId?: string | null
  cursorCreatedAt?: string | null
  cursorId?: string | null
  limit?: number
}): Promise<{ ads: AdminQueueAd[]; nextCursor: { createdAt: string; id: string } | null }> {
  await requireStaff()
  const supabase = await createClient()

  // 1. Try PostgreSQL RPC
  const { data, error } = await (supabase.rpc as any)('admin_list_ads', {
    p_status: (params.status && params.status !== 'all' ? params.status : null) as any,
    p_search: params.search || null,
    p_seller_id: params.sellerId || null,
    p_cursor_created_at: params.cursorCreatedAt || null,
    p_cursor_id: params.cursorId || null,
    p_limit: params.limit || 20,
  })

  if (!error && Array.isArray(data) && data.length > 0) {
    const ads = data as AdminQueueAd[]
    let nextCursor: { createdAt: string; id: string } | null = null
    if (ads.length >= (params.limit || 20)) {
      const last = ads[ads.length - 1]
      nextCursor = { createdAt: last.created_at, id: last.id }
    }
    return { ads, nextCursor }
  }

  // 2. Direct fallback on ads table (avoids PostgREST ambiguous join PGRST201)
  let fallbackQuery = supabase
    .from('ads')
    .select('id, title, price, status, seller_id, brand_id, model_id, city_id, created_at')
    .order('created_at', { ascending: false })
    .limit((params.limit || 20) + 1)

  if (params.status && params.status !== 'all') {
    fallbackQuery = fallbackQuery.eq('status', params.status as any)
  }

  if (params.sellerId) {
    fallbackQuery = fallbackQuery.eq('seller_id', params.sellerId)
  }

  if (params.search && params.search.trim()) {
    fallbackQuery = fallbackQuery.ilike('title', `%${params.search.trim()}%`)
  }

  if (params.cursorCreatedAt && params.cursorId) {
    fallbackQuery = fallbackQuery.or(
      `created_at.lt.${params.cursorCreatedAt},and(created_at.eq.${params.cursorCreatedAt},id.lt.${params.cursorId})`
    )
  }

  const { data: rawAds } = await fallbackQuery
  if (!rawAds || rawAds.length === 0) {
    return { ads: [], nextCursor: null }
  }

  const hasNextPage = rawAds.length > (params.limit || 20)
  const fallbackData = hasNextPage ? rawAds.slice(0, params.limit || 20) : rawAds

  const sellerIds = Array.from(new Set(fallbackData.map((a: any) => a.seller_id).filter(Boolean)))
  const cityIds = Array.from(new Set(fallbackData.map((a: any) => a.city_id).filter(Boolean)))
  const brandIds = Array.from(new Set(fallbackData.map((a: any) => a.brand_id).filter(Boolean)))
  const modelIds = Array.from(new Set(fallbackData.map((a: any) => a.model_id).filter(Boolean)))
  const adIds = fallbackData.map((a: any) => a.id)

  const [profRes, citiesRes, brandsRes, modelsRes, imagesRes, reportsRes] = await Promise.all([
    sellerIds.length > 0 ? supabase.from('profiles').select('id, full_name').in('id', sellerIds) : Promise.resolve({ data: [] }),
    cityIds.length > 0 ? supabase.from('cities').select('id, name').in('id', cityIds) : Promise.resolve({ data: [] }),
    brandIds.length > 0 ? supabase.from('brands').select('id, name').in('id', brandIds) : Promise.resolve({ data: [] }),
    modelIds.length > 0 ? supabase.from('models').select('id, name').in('id', modelIds) : Promise.resolve({ data: [] }),
    supabase.from('ad_images').select('ad_id, storage_path, position').in('ad_id', adIds).order('position', { ascending: true }),
    supabase.from('reports').select('ad_id').in('ad_id', adIds).eq('status', 'pending' as any),
  ])

  const profMap = new Map((profRes.data || []).map((p: any) => [p.id, p.full_name]))
  const cityMap = new Map((citiesRes.data || []).map((c: any) => [c.id, c.name]))
  const brandMap = new Map((brandsRes.data || []).map((b: any) => [b.id, b.name]))
  const modelMap = new Map((modelsRes.data || []).map((m: any) => [m.id, m.name]))

  // Cover image for each ad (first image or position 0)
  const coverMap = new Map<string, string>()
  ;(imagesRes.data || []).forEach((img: any) => {
    if (!coverMap.has(img.ad_id) || img.position === 0) {
      coverMap.set(img.ad_id, img.storage_path)
    }
  })

  // Pending reports count
  const reportCountMap = new Map<string, number>()
  ;(reportsRes.data || []).forEach((r: any) => {
    reportCountMap.set(r.ad_id, (reportCountMap.get(r.ad_id) || 0) + 1)
  })

  const ads: AdminQueueAd[] = fallbackData.map((a: any) => ({
    id: a.id,
    title: a.title,
    price: a.price,
    status: a.status,
    seller_id: a.seller_id,
    seller_name: profMap.get(a.seller_id) || 'Seller',
    city_name: cityMap.get(a.city_id) || '',
    brand_name: brandMap.get(a.brand_id) || '',
    model_name: modelMap.get(a.model_id) || '',
    cover_image: coverMap.get(a.id) || null,
    reports_count: reportCountMap.get(a.id) || 0,
    max_flag_score: 0,
    created_at: a.created_at,
  }))

  let nextCursor: { createdAt: string; id: string } | null = null
  if (hasNextPage && ads.length > 0) {
    const last = ads[ads.length - 1]
    nextCursor = { createdAt: last.created_at, id: last.id }
  }

  return { ads, nextCursor }
}

// ── 2. Get Single Ad Inspection ───────────────────────────────────────────────
export async function getAdminAdDetail(adId: string) {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_get_ad', {
    p_ad_id: adId,
  })

  if (!error && data && data.success) {
    return data as any
  }

  if (error) {
    console.warn('[getAdminAdDetail RPC failed, using live fallback]:', (error as any)?.message || error)
  }

  // Direct fallback
  const [adRes, imagesRes, reportsRes, flagsRes, modRes] = await Promise.all([
    supabase.from('ads').select('*').eq('id', adId).maybeSingle(),
    supabase.from('ad_images').select('id, storage_path, position').eq('ad_id', adId).order('position', { ascending: true }),
    supabase.from('reports').select('id, reason, details, status, created_at, reporter_id').eq('ad_id', adId),
    (supabase.from('ad_flags' as any) as any).select('*').eq('ad_id', adId),
    (supabase.from('ad_moderation' as any) as any).select('id, reason, created_at, moderator_id').eq('ad_id', adId),
  ])

  if (!adRes.data) return null

  const adRow = adRes.data as any
  const reporterIds = Array.from(new Set((reportsRes.data || []).map((r: any) => r.reporter_id).filter(Boolean)))
  const moderatorIds = Array.from(new Set((modRes.data || []).map((m: any) => m.moderator_id).filter(Boolean)))

  const [sellerRes, cityRes, brandRes, modelRes, reportersRes, modsRes] = await Promise.all([
    adRow.seller_id ? supabase.from('profiles').select('id, full_name, avatar_url, created_at').eq('id', adRow.seller_id).maybeSingle() : Promise.resolve({ data: null }),
    adRow.city_id ? supabase.from('cities').select('id, name').eq('id', adRow.city_id).maybeSingle() : Promise.resolve({ data: null }),
    adRow.brand_id ? (supabase.from('brands') as any).select('id, name').eq('id', adRow.brand_id).maybeSingle() : Promise.resolve({ data: null }),
    adRow.model_id ? (supabase.from('models') as any).select('id, name').eq('id', adRow.model_id).maybeSingle() : Promise.resolve({ data: null }),
    reporterIds.length > 0 ? supabase.from('profiles').select('id, full_name, created_at').in('id', reporterIds as string[]) : Promise.resolve({ data: [] }),
    moderatorIds.length > 0 ? supabase.from('profiles').select('id, full_name').in('id', moderatorIds as string[]) : Promise.resolve({ data: [] }),
  ])

  const repMap = new Map((reportersRes.data || []).map((p: any) => [p.id, p]))
  const modMap = new Map((modsRes.data || []).map((p: any) => [p.id, p.full_name]))

  const formattedReports = (reportsRes.data || []).map((r: any) => {
    const repProfile = repMap.get(r.reporter_id)
    return {
      id: r.id,
      reason: r.reason,
      details: r.details,
      status: r.status,
      created_at: r.created_at,
      reporter_id: r.reporter_id,
      reporter_name: repProfile?.full_name || 'Reporter',
      reporter_joined_at: repProfile?.created_at,
    }
  })

  const formattedMod = (modRes.data || []).map((m: any) => ({
    id: m.id,
    reason: m.reason,
    created_at: m.created_at,
    moderator_name: modMap.get(m.moderator_id) || 'Staff',
  }))

  return {
    success: true,
    ad: {
      ...adRow,
      seller_name: sellerRes.data?.full_name || 'Seller',
      seller_avatar: sellerRes.data?.avatar_url || null,
      city_name: cityRes.data?.name || '',
      brand_name: brandRes.data?.name || '',
      model_name: modelRes.data?.name || '',
    },
    images: imagesRes.data || [],
    reports: formattedReports,
    flags: flagsRes.data || [],
    moderation_history: formattedMod,
    imei: null,
    can_view_pii: false,
  }
}

// ── 3. List Reports Queue ─────────────────────────────────────────────────────
export async function getAdminReports(params?: {
  status?: string
  cursorCreatedAt?: string | null
  cursorAdId?: string | null
  limit?: number
}): Promise<{ reports: AdminReportGroup[]; nextCursor: { createdAt: string; adId: string } | null }> {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_list_reports', {
    p_status: (params?.status || 'pending') as any,
    p_cursor_created_at: params?.cursorCreatedAt || null,
    p_cursor_ad_id: params?.cursorAdId || null,
    p_limit: params?.limit || 20,
  })

  if (!error && data) {
    const reports = (data as unknown as AdminReportGroup[]) || []
    let nextCursor: { createdAt: string; adId: string } | null = null

    if (reports.length > 0 && reports.length >= (params?.limit || 20)) {
      const last = reports[reports.length - 1]
      nextCursor = { createdAt: last.oldest_report_at, adId: last.ad_id }
    }

    return { reports, nextCursor }
  }

  if (error) {
    console.warn('[getAdminReports RPC failed, using live fallback]:', (error as any)?.message || error)
  }

  // Direct fallback without nested PostgREST joins
  const { data: fallbackReports } = await supabase
    .from('reports')
    .select('id, ad_id, reason, details, status, created_at, reporter_id')
    .eq('status', (params?.status || 'pending') as any)
    .order('created_at', { ascending: true })
    .limit(params?.limit || 20)

  if (fallbackReports && fallbackReports.length > 0) {
    const adIds = Array.from(new Set(fallbackReports.map((r: any) => r.ad_id).filter(Boolean))) as string[]
    const { data: adsData } = await supabase.from('ads').select('id, title, status, seller_id').in('id', adIds)
    const sellerIds = Array.from(new Set((adsData || []).map((a: any) => a.seller_id).filter(Boolean))) as string[]
    const { data: sellersData } = await supabase.from('profiles').select('id, full_name').in('id', sellerIds)

    const sellerMap = new Map((sellersData || []).map((p: any) => [p.id, p.full_name]))
    const adMap = new Map((adsData || []).map((a: any) => [a.id, {
      title: a.title,
      status: a.status,
      seller_name: sellerMap.get(a.seller_id) || 'Seller',
    }]))

    const groupedMap = new Map<string, AdminReportGroup>()
    for (const r of fallbackReports as any[]) {
      const adId = r.ad_id
      const adInfo = adMap.get(adId)
      const existing = groupedMap.get(adId)
      if (!existing) {
        groupedMap.set(adId, {
          ad_id: adId,
          ad_title: adInfo?.title || 'Ad',
          ad_status: adInfo?.status || 'active',
          seller_name: adInfo?.seller_name || 'Seller',
          pending_count: 1,
          distinct_reporters: 1,
          reasons: [r.reason],
          oldest_report_at: r.created_at,
        })
      } else {
        existing.pending_count += 1
        if (!existing.reasons.includes(r.reason)) existing.reasons.push(r.reason)
      }
    }
    return { reports: Array.from(groupedMap.values()), nextCursor: null }
  }

  return { reports: [], nextCursor: null }
}

// ── 4. List Spam Flags Queue ──────────────────────────────────────────────────
export async function getAdminFlags(params?: {
  unresolvedOnly?: boolean
  cursorCreatedAt?: string | null
  cursorId?: string | null
  limit?: number
}): Promise<{ flags: AdminSpamFlag[]; nextCursor: { createdAt: string; id: string } | null }> {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_list_flags', {
    p_unresolved_only: params?.unresolvedOnly ?? true,
    p_cursor_created_at: params?.cursorCreatedAt || null,
    p_cursor_id: params?.cursorId || null,
    p_limit: params?.limit || 20,
  })

  if (!error && data) {
    const flags = (data as unknown as AdminSpamFlag[]) || []
    let nextCursor: { createdAt: string; id: string } | null = null

    if (flags.length > 0 && flags.length >= (params?.limit || 20)) {
      const last = flags[flags.length - 1]
      nextCursor = { createdAt: last.created_at, id: last.id }
    }

    return { flags, nextCursor }
  }

  if (error) {
    console.warn('[getAdminFlags RPC failed, using live fallback]:', (error as any)?.message || error)
  }

  // Direct fallback without nested PostgREST joins
  let flagsQuery = (supabase.from('ad_flags' as any) as any)
    .select('id, ad_id, flag_type, detail, score, outcome, created_at, resolved_at')
    .order('score', { ascending: false })
    .limit(params?.limit || 25)

  if (params?.unresolvedOnly ?? true) {
    flagsQuery = flagsQuery.is('resolved_at', null)
  }

  const { data: fallbackFlags } = await flagsQuery
  if (fallbackFlags && fallbackFlags.length > 0) {
    const adIds = Array.from(new Set(fallbackFlags.map((f: any) => f.ad_id).filter(Boolean))) as string[]
    const { data: adsData } = await supabase.from('ads').select('id, title, status, seller_id').in('id', adIds)
    const sellerIds = Array.from(new Set((adsData || []).map((a: any) => a.seller_id).filter(Boolean))) as string[]
    const { data: sellersData } = await supabase.from('profiles').select('id, full_name').in('id', sellerIds)

    const sellerMap = new Map((sellersData || []).map((p: any) => [p.id, p.full_name]))
    const adMap = new Map((adsData || []).map((a: any) => [a.id, {
      title: a.title,
      status: a.status,
      seller_name: sellerMap.get(a.seller_id) || 'Seller',
    }]))

    const flags: AdminSpamFlag[] = fallbackFlags.map((f: any) => {
      const adInfo = adMap.get(f.ad_id)
      return {
        id: f.id,
        ad_id: f.ad_id,
        ad_title: adInfo?.title || 'Ad',
        ad_status: adInfo?.status || 'active',
        seller_name: adInfo?.seller_name || 'Seller',
        flag_type: f.flag_type,
        detail: f.detail,
        score: f.score,
        outcome: f.outcome,
        created_at: f.created_at,
        resolved_at: f.resolved_at,
      }
    })
    return { flags, nextCursor: null }
  }

  return { flags: [], nextCursor: null }
}

// ── 5. List Users ─────────────────────────────────────────────────────────────
export async function getAdminUsers(params: {
  search?: string | null
  cursorCreatedAt?: string | null
  cursorId?: string | null
  limit?: number
}): Promise<{ users: AdminUserListItem[]; nextCursor: { createdAt: string; id: string } | null }> {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_list_users', {
    p_search: params.search || null,
    p_cursor_created_at: params.cursorCreatedAt || null,
    p_cursor_id: params.cursorId || null,
    p_limit: params.limit || 20,
  })

  if (!error && data) {
    const users = (data as unknown as AdminUserListItem[]) || []
    let nextCursor: { createdAt: string; id: string } | null = null

    if (users.length > 0 && users.length >= (params.limit || 20)) {
      const last = users[users.length - 1]
      nextCursor = { createdAt: last.created_at, id: last.id }
    }

    return { users, nextCursor }
  }

  if (error) {
    console.warn('[getAdminUsers RPC failed, using live fallback]:', (error as any)?.message || error)
  }

  // Direct fallback on profiles table (without ambiguous PostgREST embed)
  let profQuery = supabase
    .from('profiles')
    .select('id, full_name, created_at, ads_count, is_phone_verified')
    .order('created_at', { ascending: false })
    .limit((params.limit || 20) + 1)

  if (params.search && params.search.trim()) {
    profQuery = profQuery.ilike('full_name', `%${params.search.trim()}%`)
  }

  const { data: rawUsers } = await profQuery

  if (rawUsers && rawUsers.length > 0) {
    const hasNextPage = rawUsers.length > (params.limit || 20)
    const fallbackUsers = hasNextPage ? rawUsers.slice(0, params.limit || 20) : rawUsers

    const userIds = fallbackUsers.map((u: any) => u.id)
    const { data: privData } = await supabase
      .from('profile_private')
      .select('id, role, is_banned, phone')
      .in('id', userIds)

    const privMap = new Map<string, any>((privData || []).map((pv: any) => [pv.id, pv]))

    const users: AdminUserListItem[] = fallbackUsers.map((u: any) => {
      const priv = privMap.get(u.id)
      const phone = priv?.phone
      return {
        id: u.id,
        full_name: u.full_name || 'User',
        role: priv?.role || 'user',
        is_phone_verified: u.is_phone_verified ?? false,
        is_banned: priv?.is_banned ?? false,
        masked_phone: phone ? `${phone.slice(0, 5)}****${phone.slice(-3)}` : 'No phone',
        ads_count: u.ads_count ?? 0,
        created_at: u.created_at,
      }
    })

    let nextCursor: { createdAt: string; id: string } | null = null
    if (hasNextPage && users.length > 0) {
      const last = users[users.length - 1]
      nextCursor = { createdAt: last.created_at, id: last.id }
    }

    return { users, nextCursor }
  }

  return { users: [], nextCursor: null }
}

// ── 6. Get User Detail ────────────────────────────────────────────────────────
export async function getAdminUserDetail(userId: string) {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_get_user', {
    p_user_id: userId,
  })

  if (!error && data && data.success) {
    return data as any
  }

  if (error) {
    console.warn('[getAdminUserDetail RPC failed, using live fallback]:', (error as any)?.message || error)
  }

  // Direct fallback
  const [profRes, privRes, adsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('profile_private').select('*').eq('id', userId).maybeSingle(),
    supabase.from('ads').select('status').eq('seller_id', userId),
  ])

  if (!profRes.data) return null

  const adsBreakdown: Record<string, number> = {}
  adsRes.data?.forEach((a: any) => {
    adsBreakdown[a.status] = (adsBreakdown[a.status] || 0) + 1
  })

  return {
    success: true,
    profile: {
      ...profRes.data,
      role: privRes.data?.role || 'user',
      is_banned: privRes.data?.is_banned ?? false,
      ban_reason: (privRes.data as any)?.ban_reason || null,
      banned_at: (privRes.data as any)?.banned_at || null,
      masked_phone: privRes.data?.phone ? `${privRes.data.phone.slice(0, 5)}****${privRes.data.phone.slice(-3)}` : 'No phone',
    },
    ads_breakdown: adsBreakdown,
    reports_made_count: 0,
    reports_received_count: 0,
    recent_staff_actions: [],
  }
}

// ── 7. List Audit Actions (Admin Only) ────────────────────────────────────────
export async function getAdminAuditLog(params: {
  actorId?: string | null
  action?: string | null
  targetType?: string | null
  cursorCreatedAt?: string | null
  cursorId?: number | null
  limit?: number
}): Promise<{ actions: AdminAuditAction[]; nextCursor: { createdAt: string; id: number } | null }> {
  await requireAdmin()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_list_actions', {
    p_actor_id: params.actorId || null,
    p_action: params.action || null,
    p_target_type: params.targetType || null,
    p_cursor_created_at: params.cursorCreatedAt || null,
    p_cursor_id: params.cursorId ? params.cursorId : null,
    p_limit: params.limit || 30,
  })

  if (error) {
    console.warn('[getAdminAuditLog RPC failed, using live fallback]:', (error as any)?.message || error)

    let auditQuery = (supabase.from('admin_actions' as any) as any)
      .select('id, actor_id, action, target_type, target_id, reason, metadata, created_at, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(params.limit || 30)

    if (params.targetType) {
      auditQuery = auditQuery.eq('target_type', params.targetType)
    }
    if (params.action) {
      auditQuery = auditQuery.eq('action', params.action)
    }

    const { data: fallbackActions } = await auditQuery
    if (fallbackActions && fallbackActions.length > 0) {
      const actions: AdminAuditAction[] = fallbackActions.map((a: any) => ({
        id: a.id,
        actor_id: a.actor_id,
        actor_name: a.profiles?.full_name || 'Staff',
        action: a.action,
        target_type: a.target_type,
        target_id: a.target_id,
        reason: a.reason,
        metadata: a.metadata,
        created_at: a.created_at,
      }))
      return { actions, nextCursor: null }
    }

    return { actions: [], nextCursor: null }
  }

  const actions = (data as unknown as AdminAuditAction[]) || []
  let nextCursor: { createdAt: string; id: number } | null = null

  if (actions.length > 0 && actions.length >= (params.limit || 30)) {
    const last = actions[actions.length - 1]
    nextCursor = { createdAt: last.created_at, id: last.id }
  }

  return { actions, nextCursor }
}
