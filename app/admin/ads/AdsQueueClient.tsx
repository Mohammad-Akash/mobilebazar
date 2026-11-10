'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { AdminQueueAd } from '@/src/types/admin'
import { getAdminAds } from '@/src/lib/admin/queries'

interface AdsQueueClientProps {
  initialAds: AdminQueueAd[]
  initialStatus: string
  initialQuery: string
  initialCursor: { createdAt: string; id: string } | null
}

const TABS = [
  { label: '⏳ Under Review', value: 'under_review' },
  { label: '✅ Active', value: 'active' },
  { label: '🤝 Sold', value: 'sold' },
  { label: '⌛ Expired', value: 'expired' },
  { label: '🗑️ Removed / Deleted', value: 'deleted' },
  { label: 'All Statuses', value: 'all' },
]

export function AdsQueueClient({
  initialAds,
  initialStatus,
  initialQuery,
  initialCursor,
}: AdsQueueClientProps) {
  const router = useRouter()
  const [ads, setAds] = useState<AdminQueueAd[]>(initialAds)
  const [cursor, setCursor] = useState(initialCursor)
  const [search, setSearch] = useState(initialQuery)
  const [loading, setLoading] = useState(false)

  function handleTabChange(statusVal: string) {
    router.push(`/admin/ads?status=${statusVal}&q=${encodeURIComponent(search)}`)
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/admin/ads?status=${initialStatus}&q=${encodeURIComponent(search)}`)
  }

  async function handleLoadMore() {
    if (!cursor || loading) return
    setLoading(true)
    try {
      const res = await getAdminAds({
        status: initialStatus,
        search,
        cursorCreatedAt: cursor.createdAt,
        cursorId: cursor.id,
        limit: 20,
      })
      setAds((prev) => [...prev, ...res.ads])
      setCursor(res.nextCursor)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Tabs & Filter Bar ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Scrollable Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {TABS.map((tab) => {
            const isActive = initialStatus === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, brand, model..."
            className="w-56 sm:w-64 h-9 px-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-3 h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
          >
            Filter
          </button>
        </form>
      </div>

      {/* ── Ads Queue Table / Cards ────────────────────────────────────────── */}
      {ads.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            No ads found in this queue.
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            Check other tabs or refine your search query.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {ads.map((ad) => {
            const hasReports = ad.reports_count > 0
            const hasFlags = ad.max_flag_score > 0
            const supabaseStorageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ad-images`
            const coverSrc = ad.cover_image ? `${supabaseStorageUrl}/${ad.cover_image}` : null

            return (
              <div
                key={ad.id}
                className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    {coverSrc ? (
                      <img
                        src={coverSrc}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xl">📱</span>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/ads/${ad.id}`}
                        className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 hover:underline"
                      >
                        {ad.title}
                      </Link>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          ad.status === 'under_review'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : ad.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : ad.status === 'deleted'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                        }`}
                      >
                        {ad.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 flex items-center gap-2">
                      <span className="font-bold text-emerald-600">Rs {ad.price.toLocaleString()}</span>
                      <span>•</span>
                      <span>{ad.brand_name} {ad.model_name}</span>
                      <span>•</span>
                      <span>{ad.city_name}</span>
                    </p>

                    <p className="text-[11px] text-zinc-400">
                      Seller: <span className="font-medium text-zinc-600 dark:text-zinc-300">{ad.seller_name}</span> • Created: {new Date(ad.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Right Badges & Action Link */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  {hasReports && (
                    <span className="px-2 py-1 rounded-lg bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-[11px] font-bold">
                      🚩 {ad.reports_count} Reports
                    </span>
                  )}

                  {hasFlags && (
                    <span className="px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[11px] font-bold">
                      🛡️ Score {ad.max_flag_score}
                    </span>
                  )}

                  <Link
                    href={`/admin/ads/${ad.id}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Inspect Ad →
                  </Link>
                </div>
              </div>
            )
          })}

          {cursor && (
            <div className="text-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-40"
              >
                {loading ? 'Loading...' : 'Load More Ads'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

