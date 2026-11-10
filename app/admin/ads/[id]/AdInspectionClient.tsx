'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { approveAdAction, removeAdAction, dismissReportsAction } from '@/src/lib/admin/actions'
import { ConfirmWithReasonModal } from '@/src/lib/admin/components/ConfirmWithReasonModal'

interface AdInspectionProps {
  initialData: {
    ad: any
    images: Array<{ id: string; storage_path: string; position: number }>
    reports: any[]
    flags: any[]
    moderation_history: any[]
    imei: string | null
    can_view_pii: boolean
  }
}

const COMMON_REMOVAL_REASONS = [
  'Scam / Fraud suspected (demands advance payment or courier)',
  'Contains phone number or external link in text/images',
  'Unrealistically low price / fake price clickbait',
  'Not a mobile phone or prohibited accessory',
  'Duplicate advertisement by same seller',
  'Incorrect specifications or misleading PTA status',
]

export function AdInspectionClient({ initialData }: AdInspectionProps) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData.images[0]?.storage_path || null
  )
  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [selectedReasonPreset, setSelectedReasonPreset] = useState('')
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const { ad, images, reports, flags, moderation_history, imei, can_view_pii } = data
  const supabaseStorageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ad-images`

  // ── 1. Approve Ad ───────────────────────────────────────────────────────────
  async function handleApprove() {
    if (!confirm('Are you sure you want to approve this ad and make it active?')) return
    setLoading(true)
    setActionNotice(null)
    try {
      const res = await approveAdAction({ adId: ad.id, note: 'Approved by staff review' })
      if (!res.success) {
        setActionNotice({ type: 'error', message: res.error || 'Failed to approve ad' })
      } else {
        setActionNotice({ type: 'success', message: 'Ad approved and published successfully!' })
        setData((prev) => ({
          ...prev,
          ad: { ...prev.ad, status: 'active' },
        }))
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  // ── 2. Remove Ad ────────────────────────────────────────────────────────────
  async function handleRemoveConfirm(reason: string) {
    const fullReason = selectedReasonPreset
      ? `${selectedReasonPreset}: ${reason}`
      : reason

    const res = await removeAdAction({ adId: ad.id, reason: fullReason })
    if (!res.success) {
      throw new Error(res.error || 'Failed to remove ad')
    }

    setActionNotice({ type: 'success', message: 'Ad has been removed and seller notified.' })
    setData((prev) => ({
      ...prev,
      ad: { ...prev.ad, status: 'deleted' },
    }))
    router.refresh()
  }

  // ── 3. Dismiss Reports ──────────────────────────────────────────────────────
  async function handleDismissReports() {
    if (!confirm('Dismiss all pending reports for this ad without altering the ad?')) return
    setLoading(true)
    setActionNotice(null)
    try {
      const res = await dismissReportsAction({ adId: ad.id, note: 'Reports dismissed by staff' })
      if (!res.success) {
        setActionNotice({ type: 'error', message: res.error || 'Failed to dismiss reports' })
      } else {
        setActionNotice({ type: 'success', message: 'Pending reports dismissed.' })
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  const isUnderReview = ad.status === 'under_review'
  const isDeleted = ad.status === 'deleted'
  const pendingReports = reports.filter((r) => r.status === 'pending')

  return (
    <div className="space-y-6">
      {/* ── Top Bar with Status and Actions ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/ads"
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            ← Back to Queue
          </Link>
          <div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              {ad.title}
            </h1>
            <p className="text-xs text-zinc-500">
              ID: <span className="font-mono">{ad.id}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {isUnderReview && (
            <button
              onClick={handleApprove}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-40"
            >
              Approve Ad
            </button>
          )}

          {!isDeleted && (
            <button
              onClick={() => setRemoveModalOpen(true)}
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-40"
            >
              Remove Ad
            </button>
          )}

          {pendingReports.length > 0 && (
            <button
              onClick={handleDismissReports}
              disabled={loading}
              className="px-3.5 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all disabled:opacity-40"
            >
              Dismiss Reports
            </button>
          )}
        </div>
      </div>

      {actionNotice && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium border ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
          }`}
        >
          {actionNotice.message}
        </div>
      )}

      {/* ── Main Layout: Images + Specs ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="w-full aspect-4/3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={`${supabaseStorageUrl}/${selectedImage}`}
                alt="Ad photo"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-4xl">📱</span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.storage_path)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 ${
                    selectedImage === img.storage_path
                      ? 'border-emerald-500'
                      : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={`${supabaseStorageUrl}/${img.storage_path}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Seller Card */}
          <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Seller Profile</span>
              <Link
                href={`/admin/users/${ad.seller_id}`}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Inspect Seller →
              </Link>
            </div>
            <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{ad.seller_name}</p>
            <p className="text-xs text-zinc-400">ID: {ad.seller_id}</p>
          </div>
        </div>

        {/* Specs Table & Details */}
        <div className="space-y-4">
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="text-sm font-semibold text-zinc-500">Asking Price</span>
              <span className="text-2xl font-black text-emerald-600">
                Rs {ad.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <span className="text-zinc-400">Brand & Model:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{ad.brand_name} {ad.model_name}</p>
              </div>
              <div>
                <span className="text-zinc-400">City:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{ad.city_name}</p>
              </div>
              <div>
                <span className="text-zinc-400">Condition:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase">{ad.condition}</p>
              </div>
              <div>
                <span className="text-zinc-400">PTA Status:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase">{ad.pta_status}</p>
              </div>
              <div>
                <span className="text-zinc-400">Storage / RAM:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{ad.storage_gb}GB / {ad.ram_gb || '-'}GB</p>
              </div>
              <div>
                <span className="text-zinc-400">Battery Health:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{ad.battery_health ? `${ad.battery_health}%` : '-'}</p>
              </div>
            </div>

            {can_view_pii && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-400">IMEI (Admin Only):</span>
                <code className="block mt-0.5 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-md font-mono font-bold text-zinc-800 dark:text-zinc-200 select-all">
                  {imei || 'Not provided'}
                </code>
              </div>
            )}
          </div>

          {/* Description (rendered strictly as plain text) */}
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Description (Plain Text View)
            </h3>
            <pre className="text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
              {ad.description || 'No description provided.'}
            </pre>
          </div>
        </div>
      </div>

      {/* ── Reports List ─────────────────────────────────────────────────────── */}
      <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>🚩 Reports ({reports.length})</span>
        </h3>

        {reports.length === 0 ? (
          <p className="text-xs text-zinc-400">No reports filed against this ad.</p>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {reports.map((rep) => (
              <div key={rep.id} className="py-2.5 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-600 uppercase">{rep.reason}</span>
                  <span className="text-zinc-400 text-[11px]">{new Date(rep.created_at).toLocaleDateString()}</span>
                </div>
                {rep.details && <p className="text-zinc-600 dark:text-zinc-400">{rep.details}</p>}
                <p className="text-[11px] text-zinc-400">
                  Reporter: <span className="font-semibold text-zinc-600 dark:text-zinc-300">{rep.reporter_name}</span> (Joined: {new Date(rep.reporter_joined_at).toLocaleDateString()}) • Status: <span className="font-bold">{rep.status}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Spam Flags List ──────────────────────────────────────────────────── */}
      <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>🛡️ Spam Rules Signals ({flags.length})</span>
        </h3>

        {flags.length === 0 ? (
          <p className="text-xs text-zinc-400">No automated spam signals triggered for this ad.</p>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {flags.map((flg) => (
              <div key={flg.id} className="py-2 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-purple-600">{flg.flag_type}</span>
                  {flg.detail && <p className="text-zinc-500 text-[11px]">{flg.detail}</p>}
                </div>
                <div className="text-right">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Score +{flg.score}</span>
                  {flg.outcome && (
                    <span className="block text-[10px] font-bold text-zinc-400 uppercase">
                      Outcome: {flg.outcome}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Moderation History ───────────────────────────────────────────────── */}
      {moderation_history.length > 0 && (
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Staff Moderation History
          </h3>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {moderation_history.map((m) => (
              <div key={m.id} className="py-2">
                <p className="font-medium text-zinc-800 dark:text-zinc-200">&quot;{m.reason}&quot;</p>
                <p className="text-[11px] text-zinc-400">
                  Moderator: {m.moderator_name || 'Staff'} • {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Removal Modal with Reason Presets ─────────────────────────────────── */}
      {removeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Remove Advertisement
            </h3>
            <p className="text-xs text-zinc-500">
              This will flip the ad status to deleted and notify the seller with your reason.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Select Common Reason:
              </label>
              <select
                value={selectedReasonPreset}
                onChange={(e) => setSelectedReasonPreset(e.target.value)}
                className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs border border-zinc-200 dark:border-zinc-700"
              >
                <option value="">-- Choose a standard reason --</option>
                {COMMON_REMOVAL_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <ConfirmWithReasonModal
              isOpen={true}
              title="Confirm Ad Removal"
              description="Provide detailed notes for the seller (min 5 chars):"
              confirmLabel="Delete & Notify Seller"
              confirmVariant="danger"
              placeholder="e.g. Asking for JazzCash advance payment is prohibited on MobileBazar."
              onClose={() => setRemoveModalOpen(false)}
              onConfirm={handleRemoveConfirm}
            />
          </div>
        </div>
      )}
    </div>
  )
}

