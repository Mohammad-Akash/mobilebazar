'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { AdminReportGroup } from '@/src/types/admin'
import { dismissReportsAction, removeAdAction } from '@/src/lib/admin/actions'
import { ConfirmWithReasonModal } from '@/src/lib/admin/components/ConfirmWithReasonModal'

interface ReportsQueueClientProps {
  initialReports: AdminReportGroup[]
  initialCursor: { createdAt: string; adId: string } | null
}

export function ReportsQueueClient({ initialReports, initialCursor }: ReportsQueueClientProps) {
  const router = useRouter()
  const [reports, setReports] = useState(initialReports)
  const [removeTarget, setRemoveTarget] = useState<AdminReportGroup | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Dismiss reports for an ad
  async function handleDismiss(adId: string) {
    if (!confirm('Dismiss all pending reports for this ad?')) return
    setLoadingId(adId)
    try {
      const res = await dismissReportsAction({ adId, note: 'Dismissed from reports queue' })
      if (res.success) {
        setReports((prev) => prev.filter((r) => r.ad_id !== adId))
        router.refresh()
      } else {
        alert(res.error || 'Failed to dismiss reports')
      }
    } finally {
      setLoadingId(null)
    }
  }

  // Remove ad from report queue
  async function handleRemoveConfirm(reason: string) {
    if (!removeTarget) return
    const res = await removeAdAction({ adId: removeTarget.ad_id, reason })
    if (!res.success) {
      throw new Error(res.error || 'Failed to remove ad')
    }
    setReports((prev) => prev.filter((r) => r.ad_id !== removeTarget.ad_id))
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            🎉 All clear! No pending reports in the queue.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((grp) => (
            <div
              key={grp.ad_id}
              className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/ads/${grp.ad_id}`}
                    className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 hover:underline"
                  >
                    {grp.ad_title}
                  </Link>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 uppercase">
                    {grp.distinct_reporters} Reporters
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {grp.reasons.map((rsn) => (
                    <span
                      key={rsn}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      {rsn}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-zinc-400 pt-1">
                  Seller: <span className="font-medium text-zinc-600 dark:text-zinc-300">{grp.seller_name}</span> • Oldest Report: {new Date(grp.oldest_report_at).toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Link
                  href={`/admin/ads/${grp.ad_id}`}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-colors"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleDismiss(grp.ad_id)}
                  disabled={loadingId === grp.ad_id}
                  className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl transition-colors disabled:opacity-40"
                >
                  Dismiss
                </button>

                <button
                  onClick={() => setRemoveTarget(grp)}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Remove Ad
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {removeTarget && (
        <ConfirmWithReasonModal
          isOpen={true}
          title={`Remove Ad: "${removeTarget.ad_title}"`}
          description="Enter a clear reason for the seller. All pending reports will be marked as action taken."
          confirmLabel="Remove & Mark Resolved"
          confirmVariant="danger"
          onClose={() => setRemoveTarget(null)}
          onConfirm={handleRemoveConfirm}
        />
      )}
    </div>
  )
}

