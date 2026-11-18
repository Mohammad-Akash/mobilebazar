'use client'

import { useEffect } from 'react'

export function DraftPurgeOnSuccess() {
  useEffect(() => {
    try {
      localStorage.removeItem('mb_ad_draft')
      localStorage.removeItem('mb_ad_draft_user')
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i)
        if (k && k.startsWith('mb_ad_draft')) {
          localStorage.removeItem(k)
        }
      }
    } catch {
      // Ignore if localStorage is blocked
    }
  }, [])

  return null
}
