'use client'

import Link from 'next/link'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { Smartphone, ExternalLink, AlertTriangle, Tag } from 'lucide-react'

interface PinnedAdCardProps {
  ad: {
    id: string
    title: string
    price: number | null
    status: string
    pta_status: string | null
    ad_images?: Array<{ storage_path: string; position: number }>
  }
  onOpenOfferModal?: () => void
}

export function PinnedAdCard({ ad, onOpenOfferModal }: PinnedAdCardProps) {
  const isInactive = ad.status !== 'active'
  const coverImage = ad.ad_images?.[0]?.storage_path
    ? getAdImageUrl(ad.ad_images[0].storage_path, 'base')
    : null

  return (
    <div className="space-y-2">
      {/* Pinned Card */}
      <div className="p-3 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] overflow-hidden shrink-0 flex items-center justify-center border border-[#E9E7EF] dark:border-[#2D2947]">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImage}
                alt={ad.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : null}
            {!coverImage && <Smartphone className="w-5 h-5 text-[#7657FF]" />}
          </div>

          <div className="min-w-0 space-y-0.5">
            <h4 className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] truncate">
              {ad.title}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-[#77758A] dark:text-[#9B98B2]">
              <span className="font-extrabold text-[#17152B] dark:text-[#F7F6F2] tabular-nums">
                {ad.price ? `Rs ${ad.price.toLocaleString()}` : 'Price on request'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{ad.pta_status === 'pta_approved' ? 'PTA Approved' : 'Non-PTA'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenOfferModal && !isInactive && (
            <button
              type="button"
              onClick={onOpenOfferModal}
              className="px-2.5 py-1.5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer active:scale-95"
              title="Send an offer"
            >
              <Tag className="w-3.5 h-3.5 stroke-[2.2]" />
              <span className="hidden sm:inline">Make Offer</span>
            </button>
          )}

          <Link
            href={`/ad/${ad.id}`}
            target="_blank"
            className="p-2 rounded-xl text-[#7657FF] hover:bg-[#7657FF]/10 transition-colors shrink-0"
            title="Open listing in new tab"
          >
            <ExternalLink className="w-4 h-4 stroke-[2]" />
          </Link>
        </div>
      </div>

      {/* Inactive Ad Warning Banner */}
      {isInactive && (
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>This phone is no longer active ({ad.status}). You can still continue your conversation.</span>
        </div>
      )}
    </div>
  )
}
