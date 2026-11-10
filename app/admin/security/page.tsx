import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { createClient } from '@/src/lib/supabase/server'
import { SecurityClient } from './SecurityClient'

export default async function AdminSecurityPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>
}) {
  await connection()
  const { reason } = await searchParams
  const staff = await requireStaff({ allowSecurityPage: true })
  const supabase = await createClient()

  // Fetch factors for current user
  const { data: factorsData } = await supabase.auth.mfa.listFactors()
  const factors = factorsData?.totp || []

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Staff Security & Two-Factor Authentication (MFA)
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Admin and moderation functions require an active Authenticator App (AAL2) session.
        </p>
      </div>

      {reason === 'enroll_required' && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs text-amber-800 dark:text-amber-200 space-y-1">
          <p className="font-bold">⚠️ Two-Factor Authentication Required</p>
          <p>You must enroll an Authenticator App before accessing any staff moderation queues.</p>
        </div>
      )}

      {reason === 'verify_required' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs text-blue-800 dark:text-blue-200 space-y-1">
          <p className="font-bold">🔐 Code Verification Required</p>
          <p>Your session is currently AAL1. Enter your 6-digit authenticator code below to upgrade to AAL2.</p>
        </div>
      )}

      <SecurityClient
        currentAal={staff.aal}
        factors={factors.map((f) => ({
          id: f.id,
          friendlyName: f.friendly_name || 'Authenticator App',
          status: f.status,
          createdAt: f.created_at,
        }))}
      />
    </div>
  )
}
