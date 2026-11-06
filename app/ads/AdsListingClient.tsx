'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { AdCard } from '@/app/components/AdCard'
import { AdCardSkeleton } from '@/app/components/AdCardSkeleton'

interface AdsListingClientProps {
  initialAds: ActiveAdRow[]
  initialCursor: string | null
  initialHasNextPage: boolean
}

export function AdsListingClient({
  initialAds,
  initialCursor,
  initialHasNextPage,
}: AdsListingClientProps) {
  const searchParams = useSearchParams()

  const [ads, setAds] = useState<ActiveAdRow[]>(initialAds)
  const [cursor, setCursor] = useState<string | null>(initialCursor)
  const [hasNextPage, setHasNextPage] = useState<boolean>(initialHasNextPage)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const sentinelRef = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef<boolean>(false)

  // Reset list whenever server returns new initialAds (filters / sorting changed)
  useEffect(() => {
    setAds(initialAds)
    setCursor(initialCursor)
    setHasNextPage(initialHasNextPage)
    setError(null)
  }, [initialAds, initialCursor, initialHasNextPage])

  // Fetch Next Page via /api/ads
  const loadNextPage = useCallback(async () => {
    if (!cursor || !hasNextPage || isFetchingRef.current) return

    isFetchingRef.current = true
    setIsLoadingMore(true)
    setError(null)

    try {
      // Build query string keeping all current filters but with the next cursor
      const nextParams = new URLSearchParams(searchParams.toString())
      nextParams.set('cursor', cursor)

      const res = await fetch(`/api/ads?${nextParams.toString()}`)
      if (!res.ok) {
        throw new Error('Agla page load karne mein masla aaya.')
      }

      const json = await res.json()
      const newAds: ActiveAdRow[] = json.ads || []

      setAds((prev) => {
        // Deduplicate ads by ID
        const existingIds = new Set(prev.map((a) => a.id))
        const filteredNew = newAds.filter((a) => !existingIds.has(a.id))
        return [...prev, ...filteredNew]
      })

      setCursor(json.nextCursor || null)
      setHasNextPage(Boolean(json.hasNextPage))
    } catch (err: unknown) {
      console.error('Failed to load more ads:', err)
      setError(err instanceof Error ? err.message : 'Ads load nahi ho sake')
    } finally {
      setIsLoadingMore(false)
      isFetchingRef.current = false
    }
  }, [cursor, hasNextPage, searchParams])

  // Attach IntersectionObserver to Sentinel Element
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasNextPage && !isFetchingRef.current) {
          loadNextPage()
        }
      },
      { rootMargin: '300px' } // trigger 300px before bottom
    )

    observer.observe(sentinel)
    return () => {
      observer.disconnect()
    }
  }, [hasNextPage, loadNextPage])

  // Empty state
  if (ads.length === 0 && !isLoadingMore) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-4">
        <span className="text-4xl">🔍</span>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Koi Ad Nahi Mila (No Ads Found)
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Aapke muntakhib karda filters ke mutabiq koi phone dastiyab nahi hai. Baraye meharbani filters kam karein ya clear karein.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ads Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}

        {/* Skeleton cards while loading more */}
        {isLoadingMore && (
          <>
            <AdCardSkeleton />
            <AdCardSkeleton />
            <AdCardSkeleton />
          </>
        )}
      </div>

      {/* Error state with Retry button */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-center space-y-2">
          <p className="text-xs text-red-700 dark:text-red-300 font-medium">{error}</p>
          <button
            type="button"
            onClick={loadNextPage}
            className="px-4 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
          >
            Dobara Koshish Karein (Retry)
          </button>
        </div>
      )}

      {/* IntersectionObserver Sentinel & Fallback Load More Button */}
      {hasNextPage && (
        <div ref={sentinelRef} className="pt-4 text-center">
          <button
            type="button"
            disabled={isLoadingMore}
            onClick={loadNextPage}
            className="px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isLoadingMore ? 'Ads Load Ho Rahe Hain...' : 'Mazeed Ads Dekhein (Load More) ↓'}
          </button>
        </div>
      )}

      {!hasNextPage && ads.length > 0 && (
        <div className="pt-8 pb-4 text-center text-xs text-zinc-400 font-medium">
          ✓ Tamam ads dekh liye gaye hain (End of results)
        </div>
      )}
    </div>
  )
}

