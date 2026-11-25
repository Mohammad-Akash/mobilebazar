'use client' 

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { getFavoritedIdsAction } from '@/src/lib/actions/favorites'
import { AdCard } from '@/app/components/AdCard'
import { AdCardSkeleton } from '@/app/components/skeletons/AdCardSkeleton'

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
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set())

  const sentinelRef = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef<boolean>(false)

  // Load favorite IDs for the current list of ads (initial load and after pagination)
  useEffect(() => {
    async function loadFavs() {
      const ids = ads.map((a) => a.id).filter((id): id is string => Boolean(id))
      if (ids.length === 0) return
      const favIds = await getFavoritedIdsAction(ids)
      setFavoritedIds(new Set(favIds))
    }
    loadFavs()
  }, [ads])

  // Reset when server sends new initial data (filters / sorting changed)
  useEffect(() => {
    setAds(initialAds)
    setCursor(initialCursor)
    setHasNextPage(initialHasNextPage)
    setError(null)
  }, [initialAds, initialCursor, initialHasNextPage])

  // Fetch next page via /api/ads
  const loadNextPage = useCallback(async () => {
    if (!cursor || !hasNextPage || isFetchingRef.current) return
    isFetchingRef.current = true
    setIsLoadingMore(true)
    setError(null)
    try {
      const nextParams = new URLSearchParams(searchParams.toString())
      nextParams.set('cursor', cursor)
      const res = await fetch(`/api/ads?${nextParams.toString()}`)
      if (!res.ok) throw new Error('Failed to load next page.')
      const json = await res.json()
      const newAds: ActiveAdRow[] = json.ads || []
      setAds((prev) => {
        const existing = new Set(prev.map((a) => a.id))
        const filtered = newAds.filter((a) => !existing.has(a.id))
        return [...prev, ...filtered]
      })
      setCursor(json.nextCursor || null)
      setHasNextPage(Boolean(json.hasNextPage))
    } catch (err: unknown) {
      console.error('Failed to load more ads:', err)
      setError(err instanceof Error ? err.message : 'Failed to load ads.')
    } finally {
      setIsLoadingMore(false)
      isFetchingRef.current = false
    }
  }, [cursor, hasNextPage, searchParams])

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingRef.current) {
        loadNextPage()
      }
    }, { rootMargin: '300px' })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, loadNextPage])

  // Empty state
  if (ads.length === 0 && !isLoadingMore) {
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF] shadow-xs">
          <Search className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-black text-[#17152B] dark:text-[#F7F6F2] tracking-tight">
            No Ads Found
          </h3>
          <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2] max-w-sm mx-auto leading-relaxed">
            No phones match your selected filters. Please adjust or clear your filters to see more results.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/ads"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all shadow-sm shadow-[#7657FF]/30 active:scale-95 cursor-pointer"
          >
            Clear All Filters
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ads Grid (2 cols on mobile, 3 cols on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id || Math.random().toString()} ad={ad} initialIsFavorited={ad.id ? favoritedIds.has(ad.id) : false} />
        ))}
        {isLoadingMore && (
          <>
            <AdCardSkeleton />
            <AdCardSkeleton />
            <AdCardSkeleton />
          </>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-center space-y-2">
          <p className="text-xs text-red-700 dark:text-red-300 font-medium">{error}</p>
          <button type="button" onClick={loadNextPage} className="px-4 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs">
            Retry
          </button>
        </div>
      )}

      {/* Sentinel / Load More */}
      {hasNextPage && (
        <div ref={sentinelRef} className="pt-4 text-center">
          <button
            type="button"
            disabled={isLoadingMore}
            onClick={loadNextPage}
            className="px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isLoadingMore ? 'Loading ads...' : 'Load More Ads ↓'}
          </button>
        </div>
      )}

      {!hasNextPage && ads.length > 0 && (
        <div className="pt-8 pb-4 text-center text-xs text-zinc-400 font-medium">✓ You have viewed all available ads</div>
      )}
    </div>
  )
}
