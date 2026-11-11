'use client'

import { useState } from 'react'
import { ReportModal } from './ReportModal'
import { Share2, Flag, Check, ShieldAlert } from 'lucide-react'

interface SafetyTipsProps {
  adId: string
  adTitle: string
}

export function SafetyTips({ adId, adTitle }: SafetyTipsProps) {
  const [copied, setCopied] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: adTitle,
          text: `Check out this smartphone on MobileBazar: ${adTitle}`,
          url: currentUrl,
        })
        return
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="space-y-4">
      {/* 1. Safety Box */}
      <div className="bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/30 rounded-3xl p-5 space-y-3">
        <h4 className="font-bold text-amber-900 dark:text-amber-300 text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>MobileBazar Buyer Safety Checklist</span>
        </h4>
        <ul className="text-xs text-amber-900/90 dark:text-amber-200/90 space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span>Meet the seller in a busy, well-lit public place (e.g. coffee shop or mall).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span>Verify IMEI and PTA status by dialing <strong>*#06#</strong> on the dial pad.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span>Never send advance bank or JazzCash payments before inspecting the handset.</span>
          </li>
        </ul>
      </div>

      {/* 2. Action Buttons: Share & Report */}
      <div className="flex items-center gap-3">
        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600 font-bold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share Phone</span>
            </>
          )}
        </button>

        {/* Report Button */}
        <button
          type="button"
          onClick={() => setReportModalOpen(true)}
          className="py-3 px-4 rounded-2xl border border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 transition-colors shadow-xs active:scale-95"
        >
          <Flag className="w-4 h-4" />
          <span>Report</span>
        </button>
      </div>

      <ReportModal
        adId={adId}
        adTitle={adTitle}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  )
}
