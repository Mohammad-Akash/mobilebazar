// ==============================================================================
// Admin Security Guards (Phase 8)
//
// Rules:
// - Stealth 404: Returns notFound() for unauthenticated or non-staff users
// - MFA Enforcement: Checks authenticator assurance level (AAL2)
// - Role hierarchy: requireStaff() vs requireAdmin()
// ==============================================================================

import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'
import type { StaffRole } from '@/src/types/admin'

export interface StaffAuthContext {
  user: {
    id: string
    email?: string | null
  }
  role: StaffRole
  aal: 'aal1' | 'aal2'
}

/**
 * Enforces that the current session belongs to an active staff member (moderator or admin).
 * Redirects to /admin/security if MFA enrollment or verification is needed.
 * Returns notFound() (HTTP 404) for all non-staff users.
 */
export async function requireStaff(options?: { allowSecurityPage?: boolean }): Promise<StaffAuthContext> {
  const supabase = await createClient()

  // 1. Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    notFound()
  }

  // 2. Role check from profile_private
  const { data: profile } = await supabase
    .from('profile_private')
    .select('role, is_banned')
    .eq('id', user.id)
    .single()

  const role = (profile?.role as StaffRole) || 'user'
  const isBanned = profile?.is_banned ?? false

  if (isBanned || (role !== 'moderator' && role !== 'admin')) {
    notFound() // Stealth 404 for normal users
  }

  // 3. MFA Assurance Level Check
  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  const currentAal = mfaData?.currentLevel ?? 'aal1'
  const nextAal = mfaData?.nextLevel ?? 'aal1'

  // If already on security enrollment/verification page, bypass redirect loop
  if (options?.allowSecurityPage) {
    return {
      user: { id: user.id, email: user.email },
      role,
      aal: currentAal as 'aal1' | 'aal2',
    }
  }

  // Check if staff has enrolled MFA
  if (nextAal === 'aal1') {
    // Has not enrolled in MFA yet
    redirect('/admin/security?reason=enroll_required')
  }

  // Has enrolled in MFA, but current session is only aal1
  if (currentAal !== 'aal2') {
    redirect('/admin/security?reason=verify_required')
  }

  return {
    user: { id: user.id, email: user.email },
    role,
    aal: 'aal2',
  }
}

/**
 * Enforces that the current session belongs to an active administrator with AAL2.
 */
export async function requireAdmin(): Promise<StaffAuthContext> {
  const ctx = await requireStaff()
  if (ctx.role !== 'admin') {
    notFound()
  }
  return ctx
}

