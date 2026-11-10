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

  const { data, error } = await (supabase.rpc as any)('admin_list_ads', {
    p_status: (params.status && params.status !== 'all' ? params.status : null) as any,
    p_search: params.search || null,
    p_seller_id: params.sellerId || null,
    p_cursor_created_at: params.cursorCreatedAt || null,
    p_cursor_id: params.cursorId || null,
    p_limit: params.limit || 20,
  })

  if (error) {
    console.error('[getAdminAds Error]:', error)
    return { ads: [], nextCursor: null }
  }

  const ads = (data as unknown as AdminQueueAd[]) || []
  let nextCursor: { createdAt: string; id: string } | null = null

  if (ads.length > 0 && ads.length >= (params.limit || 20)) {
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

  if (error) {
    console.error('[getAdminAdDetail Error]:', error)
    return null
  }

  return data as any
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

  if (error) {
    console.error('[getAdminReports Error]:', error)
    return { reports: [], nextCursor: null }
  }

  const reports = (data as unknown as AdminReportGroup[]) || []
  let nextCursor: { createdAt: string; adId: string } | null = null

  if (reports.length > 0 && reports.length >= (params?.limit || 20)) {
    const last = reports[reports.length - 1]
    nextCursor = { createdAt: last.oldest_report_at, adId: last.ad_id }
  }

  return { reports, nextCursor }
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

  if (error) {
    console.error('[getAdminFlags Error]:', error)
    return { flags: [], nextCursor: null }
  }

  const flags = (data as unknown as AdminSpamFlag[]) || []
  let nextCursor: { createdAt: string; id: string } | null = null

  if (flags.length > 0 && flags.length >= (params?.limit || 20)) {
    const last = flags[flags.length - 1]
    nextCursor = { createdAt: last.created_at, id: last.id }
  }

  return { flags, nextCursor }
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

  if (error) {
    console.error('[getAdminUsers Error]:', error)
    return { users: [], nextCursor: null }
  }

  const users = (data as unknown as AdminUserListItem[]) || []
  let nextCursor: { createdAt: string; id: string } | null = null

  if (users.length > 0 && users.length >= (params.limit || 20)) {
    const last = users[users.length - 1]
    nextCursor = { createdAt: last.created_at, id: last.id }
  }

  return { users, nextCursor }
}

// ── 6. Get User Detail ────────────────────────────────────────────────────────
export async function getAdminUserDetail(userId: string) {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_get_user', {
    p_user_id: userId,
  })

  if (error) {
    console.error('[getAdminUserDetail Error]:', error)
    return null
  }

  return data as any
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
    console.error('[getAdminAuditLog Error]:', error)
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
