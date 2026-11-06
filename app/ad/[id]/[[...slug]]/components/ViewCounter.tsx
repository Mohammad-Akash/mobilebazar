'use client'

import { useEffect } from 'react'

export function ViewCounter({ adId }: { adId: string }) {
  useEffect(() => {
    if (!adId) return

    const storageKey = `mb_viewed_${adId}`
    const lastViewed = localStorage.getItem(storageKey)
    const now = Date.now()
    const ONE_DAY_MS = 24 * 60 * 60 * 1000

    if (!lastViewed || now - Number(lastViewed) > ONE_DAY_MS) {
      localStorage.setItem(storageKey, String(now))
      // Fire-and-forget view count increment via API
      fetch(`/api/ads/${adId}/views`, { method: 'POST' }).catch(() => {
        // ignore background tracking errors
      })
    }
  }, [adId])

  return null
}

