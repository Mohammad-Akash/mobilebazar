// ==============================================================================
// Admin Server Actions (Phase 8)
//
// All moderation mutations execute via Supabase RPC functions which enforce
// require_staff() / require_admin() and append to admin_actions.
// ==============================================================================

'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { requireStaff, requireAdmin } from '@/src/lib/admin/guard'

export interface ActionResponse<T = unknown> {
  success: boolean
  error?: string
  data?: T
}

// ── 1. Approve Ad ─────────────────────────────────────────────────────────────
export async function approveAdAction(formData: { adId: string; note?: string }): Promise<ActionResponse> {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_approve_ad', {
    p_ad_id: formData.adId,
    p_note: formData.note?.trim() || null,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const res = data as any
  if (!res?.success) {
    return { success: false, error: res?.message || 'Operation failed' }
  }

  revalidatePath('/admin/ads')
  revalidatePath('/admin/reports')
  revalidatePath('/admin/flags')
  revalidatePath(`/ad/${formData.adId}`)
  revalidatePath('/ads')
  revalidatePath('/')

  return { success: true, data: res }
}

// ── 2. Remove Ad ──────────────────────────────────────────────────────────────
export async function removeAdAction(formData: { adId: string; reason: string }): Promise<ActionResponse> {
  await requireStaff()
  const supabase = await createClient()

  if (!formData.reason || formData.reason.trim().length < 5) {
    return { success: false, error: 'A valid reason of at least 5 characters is required' }
  }

  const { data, error } = await (supabase.rpc as any)('admin_remove_ad', {
    p_ad_id: formData.adId,
    p_reason: formData.reason.trim(),
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const res = data as any
  if (!res?.success) {
    return { success: false, error: res?.message || 'Operation failed' }
  }

  revalidatePath('/admin/ads')
  revalidatePath('/admin/reports')
  revalidatePath('/admin/flags')
  revalidatePath(`/ad/${formData.adId}`)
  revalidatePath('/ads')
  revalidatePath('/dashboard/ads')
  revalidatePath('/')

  return { success: true, data: res }
}

// ── 3. Dismiss Reports ────────────────────────────────────────────────────────
export async function dismissReportsAction(formData: { adId: string; note?: string }): Promise<ActionResponse> {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_dismiss_reports', {
    p_ad_id: formData.adId,
    p_note: formData.note?.trim() || null,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reports')
  revalidatePath('/admin/ads')

  return { success: true, data }
}

// ── 4. Ban User ───────────────────────────────────────────────────────────────
export async function banUserAction(formData: { userId: string; reason: string }): Promise<ActionResponse> {
  await requireAdmin()
  const supabase = await createClient()

  if (!formData.reason || formData.reason.trim().length < 5) {
    return { success: false, error: 'A valid reason of at least 5 characters is required' }
  }

  const { data, error } = await (supabase.rpc as any)('admin_ban_user', {
    p_user_id: formData.userId,
    p_reason: formData.reason.trim(),
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const res = data as any
  if (!res?.success) {
    return { success: false, error: res?.message || 'Ban failed' }
  }

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${formData.userId}`)
  revalidatePath('/admin/ads')
  revalidatePath('/ads')
  revalidatePath('/')

  return { success: true, data: res }
}

// ── 5. Unban User ─────────────────────────────────────────────────────────────
export async function unbanUserAction(formData: { userId: string; reason: string }): Promise<ActionResponse> {
  await requireAdmin()
  const supabase = await createClient()

  if (!formData.reason || formData.reason.trim().length < 5) {
    return { success: false, error: 'A valid reason of at least 5 characters is required' }
  }

  const { data, error } = await (supabase.rpc as any)('admin_unban_user', {
    p_user_id: formData.userId,
    p_reason: formData.reason.trim(),
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const res = data as any
  if (!res?.success) {
    return { success: false, error: res?.message || 'Unban failed' }
  }

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${formData.userId}`)

  return { success: true, data: res }
}

// ── 6. Set Setting ────────────────────────────────────────────────────────────
export async function setSettingAction(formData: { key: string; value: string; reason: string }): Promise<ActionResponse> {
  await requireAdmin()
  const supabase = await createClient()

  if (!formData.reason || formData.reason.trim().length < 5) {
    return { success: false, error: 'A valid reason of at least 5 characters is required' }
  }

  const { data, error } = await (supabase.rpc as any)('admin_set_setting', {
    p_key: formData.key,
    p_value: formData.value,
    p_reason: formData.reason.trim(),
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/settings')
  return { success: true, data }
}

// ── 7. Blocked Terms Management ───────────────────────────────────────────────
export async function upsertTermAction(formData: { term: string; kind: 'block' | 'flag'; reason: string }): Promise<ActionResponse> {
  await requireAdmin()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_upsert_blocked_term', {
    p_term: formData.term,
    p_kind: formData.kind,
    p_reason: formData.reason,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/terms')
  return { success: true, data }
}

export async function disableTermAction(formData: { id: string; reason: string }): Promise<ActionResponse> {
  await requireAdmin()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_disable_blocked_term', {
    p_id: formData.id,
    p_reason: formData.reason,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/terms')
  return { success: true, data }
}

// ── 8. Reveal PII (Admin only, logged) ────────────────────────────────────────
export async function revealPiiAction(formData: { userId: string }): Promise<ActionResponse<{ email: string; phone: string }>> {
  await requireAdmin()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_reveal_user_pii', {
    p_user_id: formData.userId,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  const res = data as any
  if (!res?.success) {
    return { success: false, error: res?.message || 'Failed to reveal PII' }
  }

  return { success: true, data: { email: res.email, phone: res.phone } }
}

// ── 9. Test Spam Rules Sandbox ────────────────────────────────────────────────
export async function testSpamRulesAction(formData: { title: string; description: string }): Promise<ActionResponse<any[]>> {
  await requireStaff()
  const supabase = await createClient()

  const { data, error } = await (supabase.rpc as any)('admin_test_spam_rules', {
    p_title: formData.title,
    p_description: formData.description,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data: data as any[] }
}

