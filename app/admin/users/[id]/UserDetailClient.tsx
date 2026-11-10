'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { banUserAction, unbanUserAction, revealPiiAction } from '@/src/lib/admin/actions'
import { ConfirmWithReasonModal } from '@/src/lib/admin/components/ConfirmWithReasonModal'

interface UserDetailClientProps {
  initialData: {
    profile: {
      id: string
      full_name: string
      avatar_url: string | null
      created_at: string
      role: string
      is_phone_verified: boolean
      is_banned: boolean
      ban_reason: string | null
      banned_at: string | null
      masked_phone: string
    }
    ads_breakdown: {
      active: number
      under_review: number
      sold: number
      expired: number
      deleted: number
    }
    reports_made_count: number
    reports_received_count: number
    recent_staff_actions: any[]
  }
  isAdmin: boolean
}

export function UserDetailClient({ initialData, isAdmin }: UserDetailClientProps) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [piiData, setPiiData] = useState<{ email: string; phone: string } | null>(null)
  const [piiLoading, setPiiLoading] = useState(false)
  const [banModalOpen, setBanModalOpen] = useState(false)
  const [unbanModalOpen, setUnbanModalOpen] = useState(false)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const { profile, ads_breakdown, reports_made_count, reports_received_count, recent_staff_actions } = data

  // ── 1. Reveal PII ───────────────────────────────────────────────────────────
  async function handleRevealPii() {
    setPiiLoading(true)
    setNotice(null)
    try {
      const res = await revealPiiAction({ userId: profile.id })
      if (!res.success || !res.data) {
        setNotice({ type: 'error', message: res.error || 'Failed to reveal PII' })
      } else {
        setPiiData(res.data)
      }
    } finally {
      setPiiLoading(false)
    }
  }

  // ── 2. Ban User ─────────────────────────────────────────────────────────────
  async function handleBanConfirm(reason: string) {
    const res = await banUserAction({ userId: profile.id, reason })
    if (!res.success) {
      throw new Error(res.error || 'Failed to ban user')
    }

    setNotice({
      type: 'success',
      message: `User banned successfully. ${(res.data as any)?.ads_removed || 0} active/under_review ads removed.`,
    })

    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, is_banned: true, ban_reason: reason },
      ads_breakdown: {
        ...prev.ads_breakdown,
        active: 0,
        under_review: 0,
        deleted: prev.ads_breakdown.deleted + prev.ads_breakdown.active + prev.ads_breakdown.under_review,
      },
    }))
    router.refresh()
  }

  // ── 3. Unban User ───────────────────────────────────────────────────────────
  async function handleUnbanConfirm(reason: string) {
    const res = await unbanUserAction({ userId: profile.id, reason })
    if (!res.success) {
      throw new Error(res.error || 'Failed to unban user')
    }

    setNotice({
      type: 'success',
      message: 'User unbanned successfully. (Note: Previously removed ads remain deleted).',
    })

    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, is_banned: false, ban_reason: null },
    }))
    router.refresh()
  }

  const isStaffTarget = profile.role === 'admin' || profile.role === 'moderator'

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            ← Back to Users
          </Link>
          <div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>{profile.full_name || 'Anonymous User'}</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {profile.role}
              </span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono">ID: {profile.id}</p>
          </div>
        </div>

        {/* Ban / Unban Controls (Admin Only) */}
        {isAdmin && !isStaffTarget && (
          <div className="flex items-center gap-2">
            {profile.is_banned ? (
              <button
                onClick={() => setUnbanModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Unban User
              </button>
            ) : (
              <button
                onClick={() => setBanModalOpen(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Ban User
              </button>
            )}
          </div>
        )}
      </div>

      {notice && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium border ${
            notice.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
          }`}
        >
          {notice.message}
        </div>
      )}

      {/* ── Banned Notice Banner ────────────────────────────────────────────── */}
      {profile.is_banned && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-800 dark:text-red-200 space-y-1">
          <p className="font-bold text-sm">🚫 Account is Currently Banned</p>
          <p>
            Reason: <span className="font-semibold">&quot;{profile.ban_reason || 'Violation of terms'}&quot;</span>
          </p>
          {profile.banned_at && (
            <p className="text-[11px] text-red-600 dark:text-red-400">
              Banned on: {new Date(profile.banned_at).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* ── Profile & Contact Details ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Account Information
          </h2>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-zinc-400">Full Name:</span>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">{profile.full_name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-zinc-400">Member Since:</span>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-zinc-400">Phone Verification:</span>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                {profile.is_phone_verified ? '✅ Verified' : '❌ Not Verified'}
              </p>
            </div>
            <div>
              <span className="text-zinc-400">Masked Phone:</span>
              <p className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">{profile.masked_phone}</p>
            </div>
          </div>

          {/* Admin PII Reveal Section */}
          {isAdmin && (
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500">Contact Details (PII)</span>
                {!piiData && (
                  <button
                    onClick={handleRevealPii}
                    disabled={piiLoading}
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-bold transition-colors disabled:opacity-40"
                  >
                    {piiLoading ? 'Revealing...' : '👁️ Reveal PII (Logged)'}
                  </button>
                )}
              </div>

              {piiData ? (
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl space-y-1 font-mono text-xs">
                  <p>
                    <span className="text-zinc-400">Email:</span>{' '}
                    <span className="font-bold select-all text-zinc-900 dark:text-zinc-100">{piiData.email || 'N/A'}</span>
                  </p>
                  <p>
                    <span className="text-zinc-400">Phone:</span>{' '}
                    <span className="font-bold select-all text-zinc-900 dark:text-zinc-100">{piiData.phone || 'N/A'}</span>
                  </p>
                  <span className="text-[10px] text-amber-600 block pt-1">
                    🔒 Access recorded in audit log.
                  </span>
                </div>
              ) : (
                <p className="text-[11px] text-zinc-400 italic">
                  Protected under Phase 8 privacy policy. Click above to decrypt and log.
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Ads Breakdown & Trust Signals ─────────────────────────────────── */}
        <div className="space-y-6">
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Ads Breakdown
              </h2>
              <Link
                href={`/admin/ads?q=${profile.id}`}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                View all user ads →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                <p className="text-lg font-black text-emerald-600">{ads_breakdown.active}</p>
                <p className="text-[10px] text-zinc-500 font-semibold">Active</p>
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/40">
                <p className="text-lg font-black text-amber-600">{ads_breakdown.under_review}</p>
                <p className="text-[10px] text-zinc-500 font-semibold">Under Review</p>
              </div>
              <div className="p-2.5 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/40">
                <p className="text-lg font-black text-red-600">{ads_breakdown.deleted}</p>
                <p className="text-[10px] text-zinc-500 font-semibold">Deleted/Removed</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-400">Reports filed by user:</span>
                <p className="font-bold text-zinc-800 dark:text-zinc-200">{reports_made_count}</p>
              </div>
              <div>
                <span className="text-zinc-400">Reports on user&apos;s ads:</span>
                <p className={`font-bold ${reports_received_count > 0 ? 'text-red-600' : 'text-zinc-800 dark:text-zinc-200'}`}>
                  {reports_received_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Staff Actions on this User ─────────────────────────────────── */}
      {recent_staff_actions.length > 0 && (
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Timeline of Staff Actions
          </h3>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {recent_staff_actions.map((act) => (
              <div key={act.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold uppercase text-purple-600">{act.action}</span>
                  {act.reason && <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">&quot;{act.reason}&quot;</p>}
                </div>
                <div className="text-right text-[11px] text-zinc-400">
                  <p>By {act.actor_name || 'Staff'}</p>
                  <p>{new Date(act.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Ban Modal ────────────────────────────────────────────────────────── */}
      {banModalOpen && (
        <ConfirmWithReasonModal
          isOpen={true}
          title={`Ban User: ${profile.full_name || 'User'}`}
          description={`Warning: Banning this user will immediately delete ${ads_breakdown.active + ads_breakdown.under_review} active/under_review ads and resolve linked reports. Enter a mandatory reason:`}
          confirmLabel="Permanently Ban User"
          confirmVariant="danger"
          requireNameMatch={profile.full_name || profile.id}
          placeholder="e.g. Repeated advance payment fraud reported by multiple users."
          onClose={() => setBanModalOpen(false)}
          onConfirm={handleBanConfirm}
        />
      )}

      {/* ── Unban Modal ──────────────────────────────────────────────────────── */}
      {unbanModalOpen && (
        <ConfirmWithReasonModal
          isOpen={true}
          title={`Unban User: ${profile.full_name || 'User'}`}
          description="Note: Previously deleted ads will remain deleted. The user will regain permission to post new ads. Enter a reason:"
          confirmLabel="Unban Account"
          confirmVariant="primary"
          placeholder="e.g. Appeal reviewed and approved with warning."
          onClose={() => setUnbanModalOpen(false)}
          onConfirm={handleUnbanConfirm}
        />
      )}
    </div>
  )
}
