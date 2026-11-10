'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { MyAdItem } from '@/src/lib/data/dashboard'
import { formatPrice, formatRelativeTime } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { markAdSoldAction, deleteAdAction, renewAdAction } from '@/src/lib/actions/dashboard-ads'

interface MyAdsClientProps {
  initialAds: MyAdItem[]
  currentStatus: 'active' | 'sold' | 'expired' | 'under_review'
}

export function MyAdsClient({ initialAds, currentStatus }: MyAdsClientProps) {
  const [ads, setAds] = useState<MyAdItem[]>(initialAds)
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Mark Sold Handler
  const handleMarkSold = (ad: MyAdItem) => {
    if (!confirm(`Are you sure you want to mark "${ad.title}" as SOLD?`)) return
    setActionError(null)

    startTransition(async () => {
      const res = await markAdSoldAction(ad.id)
      if (res.error) {
        setActionError(res.error)
      } else {
        setAds((prev) => prev.filter((item) => item.id !== ad.id))
        setSuccessMessage(`"${ad.title}" has been marked as SOLD.`)
      }
    })
  }

  // Delete Ad Handler
  const handleDelete = (ad: MyAdItem) => {
    if (!confirm(`Are you sure you want to DELETE "${ad.title}"? This cannot be undone.`)) return
    setActionError(null)

    startTransition(async () => {
      const res = await deleteAdAction(ad.id)
      if (res.error) {
        setActionError(res.error)
      } else {
        setAds((prev) => prev.filter((item) => item.id !== ad.id))
        setSuccessMessage(`"${ad.title}" has been deleted.`)
      }
    })
  }

  // Repost / Renew Ad Handler
  const handleRenew = (ad: MyAdItem) => {
    if (!confirm(`Do you want to renew "${ad.title}" for another 30 days?`)) return
    setActionError(null)

    startTransition(async () => {
      const res = await renewAdAction(ad.id)
      if (res.error) {
        setActionError(res.error)
      } else {
        setAds((prev) => prev.filter((item) => item.id !== ad.id))
        setSuccessMessage(`"${ad.title}" has been renewed and is now active.`)
      }
    })
  }

  // Helper to calculate days until expiration
  const getDaysUntilExpiry = (expiresAt: string) => {
    const diffMs = new Date(expiresAt).getTime() - Date.now()
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  }

  if (ads.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-4">
        <span className="text-4xl">📱</span>
        <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
          No {currentStatus.replace('_', ' ').toUpperCase()} Ads Found
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          {currentStatus === 'active'
            ? 'You do not have any active ads. Post a new ad now!'
            : `You have no ${currentStatus.replace('_', ' ')} ads.`}
        </p>
        {currentStatus === 'active' && (
          <Link
            href="/post-ad"
            className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
          >
            + Post an Ad
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300">
          ⚠️ {actionError}
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
          ✓ {successMessage}
        </div>
      )}

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        {ads.map((ad) => {
          const daysLeft = getDaysUntilExpiry(ad.expires_at)
          const isExpiringSoon = currentStatus === 'active' && daysLeft <= 3 && daysLeft >= 0
          const isUnderReview = ad.status === 'under_review' || currentStatus === 'under_review'

          return (
            <div
              key={ad.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAdImageUrl(ad.cover_image_path)}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                  {ad.is_featured && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500 text-black">
                      ★
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {formatPrice(ad.price)}
                    </span>
                    {isUnderReview && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300">
                        🛡️ Under Review
                      </span>
                    )}
                    {isExpiringSoon && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300">
                        ⏳ {daysLeft === 0 ? 'Expires today' : `Expires in ${daysLeft} days`}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/ad/${ad.id}`}
                    className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 line-clamp-1 transition-colors"
                  >
                    {ad.title}
                  </Link>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                    <span>📍 {ad.city_name || 'Pakistan'}</span>
                    <span>•</span>
                    <span>👁️ {ad.views_count} views</span>
                    <span>•</span>
                    <span>❤️ {ad.favorites_count} saves</span>
                    <span>•</span>
                    <span>{formatRelativeTime(ad.published_at || ad.created_at)}</span>
                  </div>

                  {isUnderReview && (
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 pt-0.5">
                      This ad is temporarily hidden from public view for security or moderation review.
                    </p>
                  )}

                  {ad.moderation_reason && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300">
                      <span className="font-bold">Removed by moderators:</span> &quot;{ad.moderation_reason}&quot;
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                {currentStatus === 'active' && !isUnderReview && (
                  <>
                    <Link
                      href={`/dashboard/ads/${ad.id}/edit`}
                      className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                    >
                      ✏️ Edit
                    </Link>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleMarkSold(ad)}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      ✓ Mark Sold
                    </button>
                  </>
                )}

                {(currentStatus === 'sold' || currentStatus === 'expired') && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleRenew(ad)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    🔄 Renew Ad
                  </button>
                )}

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(ad)}
                  className="px-3 py-2 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

