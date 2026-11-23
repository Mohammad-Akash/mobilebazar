'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { MyAdItem } from '@/src/lib/data/dashboard'
import { formatPrice, formatRelativeTime } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { markAdSoldAction, deleteAdAction, renewAdAction } from '@/src/lib/actions/dashboard-ads'
import {
  Smartphone,
  Eye,
  Heart,
  MapPin,
  Clock,
  Edit3,
  CheckCircle2,
  Trash2,
  RotateCcw,
  AlertCircle,
  PlusCircle,
} from 'lucide-react'

interface MyAdsClientProps {
  initialAds: MyAdItem[]
  currentStatus: 'active' | 'sold' | 'expired' | 'under_review'
}

export function MyAdsClient({ initialAds, currentStatus }: MyAdsClientProps) {
  const [ads, setAds] = useState<MyAdItem[]>(initialAds)
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    setAds(initialAds)
  }, [initialAds])

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

  const getDaysUntilExpiry = (expiresAt: string) => {
    const diffMs = new Date(expiresAt).getTime() - Date.now()
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  }

  if (ads.length === 0) {
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] border border-[#7657FF]/20 mx-auto flex items-center justify-center">
          <Smartphone className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-[#17152B] dark:text-[#F7F6F2]">
          No {currentStatus.replace('_', ' ').toUpperCase()} Smartphones Found
        </h3>
        <p className="text-xs text-[#77758A] dark:text-[#9B98B2] max-w-sm mx-auto">
          {currentStatus === 'active'
            ? 'You do not have any active phone listings. List your mobile now!'
            : `You have no ${currentStatus.replace('_', ' ')} phone ads.`}
        </p>
        {currentStatus === 'active' && (
          <Link
            href="/post-ad"
            className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] text-white font-bold text-xs shadow-sm transition-all min-h-[44px] w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.2]" />
            <span>Post a Smartphone Ad</span>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="divide-y divide-[#E9E7EF] dark:divide-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
        {ads.map((ad) => {
          const daysLeft = getDaysUntilExpiry(ad.expires_at)
          const isExpiringSoon = currentStatus === 'active' && daysLeft <= 3 && daysLeft >= 0
          const isUnderReview = ad.status === 'under_review' || currentStatus === 'under_review'

          return (
            <div
              key={ad.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F7F6F2]/60 dark:hover:bg-[#211E38]/40 transition-colors"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto min-w-0">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-[#F7F6F2] dark:bg-[#211E38] shrink-0 border border-[#E9E7EF] dark:border-[#2D2947]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAdImageUrl(ad.cover_image_path)}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                  {ad.is_featured && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500 text-black">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-lg font-black text-[#7657FF] dark:text-[#8A6FFF]">
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
                    className="font-bold text-sm text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] dark:hover:text-[#8A6FFF] line-clamp-1 transition-colors block"
                  >
                    {ad.title}
                  </Link>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#77758A] dark:text-[#9B98B2]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{ad.city_name || 'Pakistan'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{ad.views_count} views</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{ad.favorites_count} saves</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatRelativeTime(ad.published_at || ad.created_at)}</span>
                    </span>
                  </div>

                  {isUnderReview && (
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 pt-0.5">
                      This handset is temporarily awaiting quick safety review.
                    </p>
                  )}

                  {ad.moderation_reason && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300">
                      <span className="font-bold">Removed by moderators:</span> &quot;{ad.moderation_reason}&quot;
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Action Buttons (Responsive Grid/Flex on mobile, 44px tap targets) */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E9E7EF] dark:border-[#2D2947]">
                {currentStatus === 'active' && !isUnderReview && (
                  <>
                    <Link
                      href={`/dashboard/ads/${ad.id}/edit`}
                      className="min-h-[44px] flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleMarkSold(ad)}
                      className="min-h-[44px] flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Sold</span>
                    </button>
                  </>
                )}

                {(currentStatus === 'sold' || currentStatus === 'expired') && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleRenew(ad)}
                    className="min-h-[44px] flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm shadow-[#7657FF]/30"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Renew Ad</span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(ad)}
                  className="min-h-[44px] px-3.5 py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sm:hidden">Delete</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
