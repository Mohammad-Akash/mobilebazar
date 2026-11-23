'use client'

import { useState, useEffect } from 'react'
import { ShieldAlert, X } from 'lucide-react'

export function SafetyBanner() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('safety_banner_dismissed') === '1') {
        setDismissed(true)
      }
    } catch {
      // ignore
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem('safety_banner_dismissed', '1')
    } catch {
      // ignore
    }
  }

  if (dismissed) return null

  return (
    <div className="py-1.5 px-2.5 sm:p-2.5 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#77758A] dark:text-[#9B98B2]">
      <div className="flex items-center gap-2 min-w-0">
        <ShieldAlert className="w-3.5 h-3.5 text-[#7657FF] dark:text-[#8A6FFF] shrink-0" />
        <span className="truncate">
          <strong className="text-[#17152B] dark:text-[#F7F6F2]">Safety:</strong> Never send advance money. Inspect device in person.
        </span>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="p-1 rounded-lg text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2] hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        title="Dismiss safety note"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
