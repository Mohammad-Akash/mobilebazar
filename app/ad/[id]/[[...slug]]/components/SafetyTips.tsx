'use client'

import { useState } from 'react'

interface SafetyTipsProps {
  adTitle: string
}

export function SafetyTips({ adTitle }: SafetyTipsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: adTitle,
          text: `MobileBazar par ye ad dekhein: ${adTitle}`,
          url: currentUrl,
        })
        return
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: Copy link to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="space-y-4">
      {/* 1. Safety Box */}
      <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-5 space-y-2.5">
        <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-center gap-1.5">
          <span>🛡️</span>
          <span>Khareedari Ke Zaroori Hifazati Mashwaray</span>
        </h4>
        <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-1.5 list-disc list-inside">
          <li>Phone lene se pehle kisi pur-aman aam jagah (public place) par milein.</li>
          <li>Kharidne se pehle *#06# mila kar IMEI aur PTA status tasdeeq karein.</li>
          <li>Phone check kiye baghair peshgi raqam (advance payment) hargiz na dein.</li>
        </ul>
      </div>

      {/* 2. Action Buttons: Share & Report */}
      <div className="flex items-center gap-3">
        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <span>🔗</span>
          <span>{copied ? 'Link Copied! ✓' : 'Share Ad'}</span>
        </button>

        {/* Report Button (Disabled placeholder for Phase 7) */}
        <button
          type="button"
          disabled
          title="Reporting Phase 7 mein activate hogi"
          className="py-2.5 px-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs font-medium text-zinc-400 cursor-not-allowed opacity-60"
        >
          🚩 Report Ad
        </button>
      </div>
    </div>
  )
}

