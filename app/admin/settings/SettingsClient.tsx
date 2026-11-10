'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setSettingAction } from '@/src/lib/admin/actions'
import { ConfirmWithReasonModal } from '@/src/lib/admin/components/ConfirmWithReasonModal'

interface SettingsClientProps {
  initialSettings: {
    auto_hide_report_threshold: number
    max_active_ads: number
    spam_enforcement: boolean
    spam_flag_score_threshold: number
  }
  recentChanges: Array<{
    id: number
    key: string
    actorName: string
    reason: string
    oldValue: any
    newValue: any
    createdAt: string
  }>
}

export function SettingsClient({ initialSettings, recentChanges }: SettingsClientProps) {
  const router = useRouter()
  const [settings, setSettings] = useState(initialSettings)
  const [pendingChange, setPendingChange] = useState<{ key: string; label: string; value: string } | null>(null)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Request change modal
  function queueChange(key: string, label: string, value: string) {
    setPendingChange({ key, label, value })
  }

  async function handleConfirmChange(reason: string) {
    if (!pendingChange) return
    const res = await setSettingAction({
      key: pendingChange.key,
      value: pendingChange.value,
      reason,
    })

    if (!res.success) {
      throw new Error(res.error || 'Failed to update setting')
    }

    setNotice({ type: 'success', message: `Setting "${pendingChange.key}" updated successfully.` })
    setSettings((prev: any) => ({
      ...prev,
      [pendingChange.key]: pendingChange.value === 'true' ? true : pendingChange.value === 'false' ? false : Number(pendingChange.value),
    }))
    router.refresh()
  }

  return (
    <div className="space-y-8">
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

      {/* ── Settings Form ────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl divide-y divide-zinc-100 dark:divide-zinc-800 shadow-xs">
        {/* 1. auto_hide_report_threshold */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Auto-Hide Report Threshold
            </h3>
            <p className="text-xs text-zinc-500">
              Number of distinct user reports required to automatically move an ad to <code className="font-bold">under_review</code>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
              {settings.auto_hide_report_threshold} reports
            </span>
            <button
              onClick={() => {
                const val = prompt('Enter new threshold (2 to 10):', settings.auto_hide_report_threshold.toString())
                if (val && Number(val) >= 2 && Number(val) <= 10) {
                  queueChange('auto_hide_report_threshold', 'Auto-Hide Report Threshold', val)
                } else if (val) {
                  alert('Value must be between 2 and 10')
                }
              }}
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        {/* 2. max_active_ads */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Max Active Ads Per Seller
            </h3>
            <p className="text-xs text-zinc-500">
              Maximum concurrent live ads a single verified phone number can maintain.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
              {settings.max_active_ads} ads
            </span>
            <button
              onClick={() => {
                const val = prompt('Enter new limit (1 to 50):', settings.max_active_ads.toString())
                if (val && Number(val) >= 1 && Number(val) <= 50) {
                  queueChange('max_active_ads', 'Max Active Ads', val)
                } else if (val) {
                  alert('Value must be between 1 and 50')
                }
              }}
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        {/* 3. spam_enforcement */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Automated Spam Enforcement
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  settings.spam_enforcement
                    ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {settings.spam_enforcement ? 'LIVE ENFORCEMENT ON' : 'SHADOW MODE (RECOMMENDED)'}
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              When enabled, ads exceeding the risk threshold are automatically quarantined to <code className="font-bold">under_review</code> on creation.
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400">
              ⚠️ Check the <Link href="/admin" className="underline font-bold">Flag Precision Matrix</Link> on Dashboard before enabling. Precision should exceed 80%.
            </p>
          </div>
          <button
            onClick={() => {
              const newVal = (!settings.spam_enforcement).toString()
              queueChange('spam_enforcement', 'Automated Spam Enforcement', newVal)
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs ${
              settings.spam_enforcement
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {settings.spam_enforcement ? 'Turn Off (Shadow Mode)' : 'Turn On (Live Enforce)'}
          </button>
        </div>

        {/* 4. spam_flag_score_threshold */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Spam Flag Score Threshold
            </h3>
            <p className="text-xs text-zinc-500">
              Accumulated spam rule score required before an ad is flagged for review.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
              {settings.spam_flag_score_threshold} points
            </span>
            <button
              onClick={() => {
                const val = prompt('Enter score threshold (5 to 100):', settings.spam_flag_score_threshold.toString())
                if (val && Number(val) >= 5 && Number(val) <= 100) {
                  queueChange('spam_flag_score_threshold', 'Spam Flag Score Threshold', val)
                } else if (val) {
                  alert('Value must be between 5 and 100')
                }
              }}
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* ── Recent Settings Audit Log ────────────────────────────────────────── */}
      {recentChanges.length > 0 && (
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Recent Setting Changes (Audit Log)
          </h3>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {recentChanges.map((chg) => (
              <div key={chg.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-emerald-600">{chg.key}</span>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">&quot;{chg.reason}&quot;</p>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {JSON.stringify(chg.oldValue)} → {JSON.stringify(chg.newValue)}
                  </p>
                </div>
                <div className="text-right text-[11px] text-zinc-400">
                  <p>By {chg.actorName}</p>
                  <p>{new Date(chg.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Confirm Setting Change Modal ─────────────────────────────────────── */}
      {pendingChange && (
        <ConfirmWithReasonModal
          isOpen={true}
          title={`Update: ${pendingChange.label}`}
          description={`You are changing the value to: ${pendingChange.value}. Every configuration change requires a mandatory explanation for the audit log.`}
          confirmLabel="Save Setting Change"
          confirmVariant="primary"
          placeholder="e.g. Lowering auto-hide threshold to prevent scam wave during promotion."
          onClose={() => setPendingChange(null)}
          onConfirm={handleConfirmChange}
        />
      )}
    </div>
  )
}

