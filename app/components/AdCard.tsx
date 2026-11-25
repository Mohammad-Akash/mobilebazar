'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FavoriteButton } from '@/app/components/FavoriteButton'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { formatPrice, formatStorage, formatRelativeTime, formatPtaBadge } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { buildAdSlug, buildAdCanonicalPath } from '@/src/lib/utils/slug'
import { ShieldCheck, MapPin, Sparkles } from 'lucide-react'

interface AdCardProps {
  ad: ActiveAdRow
  initialIsFavorited?: boolean
}

export function AdCard({ ad, initialIsFavorited = false }: AdCardProps) {
  const pta = formatPtaBadge(ad.pta_status)
  const imageUrl = getAdImageUrl(ad.cover_image_path, 'sm')
  const baseImageUrl = getAdImageUrl(ad.cover_image_path, 'base')
  const relativeTime = ad.published_at ? formatRelativeTime(ad.published_at) : ''

  const slug = buildAdSlug({
    title: ad.title,
    brand_name: ad.brand_name,
    model_name: ad.model_name,
    storage_gb: ad.storage_gb,
    pta_status: ad.pta_status,
    city_name: ad.city_name,
  })
  const adHref = buildAdCanonicalPath(ad.id || '', slug)

  // Clean unboxed metadata string
  const specItems: string[] = []
  if (ad.storage_gb) specItems.push(formatStorage(ad.storage_gb))
  if (ad.ram_gb) specItems.push(`${ad.ram_gb}GB RAM`)
  if (ad.battery_health) specItems.push(`${ad.battery_health}% Batt`)

  return (
    <article className="group relative flex flex-col bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]/50 dark:hover:border-[#8A6FFF]/50 rounded-2xl overflow-hidden editorial-card shadow-[0_2px_8px_rgba(23,21,43,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
      {/* 1. Phone Photo Viewport */}
      <Link
        href={adHref}
        className="relative w-full aspect-[4/3] bg-[#F7F6F2] dark:bg-[#211E38] overflow-hidden block"
      >
        <Image
          src={imageUrl}
          alt={ad.title || 'Smartphone'}
          fill
          sizes="(max-width: 1024px) 50vw, 300px"
          loading="lazy"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
        />

        {/* Minimal Editorial Kicker (Top Left: Featured or Condition) */}
        {ad.is_featured ? (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 rounded-md bg-[#C7F36B] text-[#17152B] font-bold text-[9px] sm:text-[10px] tracking-tight flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            <span>Featured</span>
          </div>
        ) : (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 rounded-md bg-[#17152B]/80 text-[#F7F6F2] font-medium text-[9px] sm:text-[10px] backdrop-blur-md">
            {ad.condition === 'new' ? 'Brand New' : 'Verified Used'}
          </div>
        )}
      </Link>

      {/* Floating Save Action (Top Right) */}
      {ad.id && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <FavoriteButton adId={ad.id} initialIsFavorited={initialIsFavorited} />
        </div>
      )}

      {/* 2. Editorial Product Body */}
      <div className="p-2.5 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-3">
        <div>
          {/* Brand & Market Header */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-[#77758A] dark:text-[#9B98B2] tracking-wider uppercase">
            <span className="truncate">{ad.brand_name || 'Smartphone'}</span>
            {ad.is_negotiable && (
              <span className="text-[#7657FF] dark:text-[#8A6FFF] font-medium lowercase tracking-normal shrink-0 ml-1">
                negotiable
              </span>
            )}
          </div>

          {/* Model Title */}
          <Link href={adHref} className="block mt-0.5 sm:mt-1">
            <h3 className="text-xs sm:text-base font-bold text-[#17152B] dark:text-[#F7F6F2] group-hover:text-[#7657FF] dark:group-hover:text-[#8A6FFF] transition-colors line-clamp-1 leading-snug">
              {ad.title}
            </h3>
          </Link>

          {/* Clean Unboxed Specs Row (Zero-Pill Discipline) */}
          <div className="mt-1 sm:mt-1.5 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#77758A] dark:text-[#9B98B2] flex-wrap">
            {specItems.map((spec, i) => (
              <span key={spec} className="inline-flex items-center gap-1 sm:gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-[#77758A]/50">·</span>}
                <span>{spec}</span>
              </span>
            ))}
            {specItems.length > 0 && <span aria-hidden="true" className="text-[#77758A]/50">·</span>}
            <span
              className={`inline-flex items-center gap-0.5 sm:gap-1 font-semibold ${
                pta.isApproved
                  ? 'text-[#159B72]'
                  : 'text-[#77758A] dark:text-[#9B98B2]'
              }`}
            >
              {pta.isApproved && <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#159B72]" />}
              <span>{pta.label}</span>
            </span>
          </div>
        </div>

        {/* Pricing & Footer Location */}
        <div className="pt-2 sm:pt-3 border-t border-[#E9E7EF] dark:border-[#2D2947] flex items-end justify-between gap-1 sm:gap-2">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#77758A] dark:text-[#9B98B2] font-medium block">
              Price
            </span>
            <span className="text-sm sm:text-xl font-black text-[#17152B] dark:text-[#F7F6F2] tabular-nums tracking-tight block truncate">
              {formatPrice(ad.price || 0)}
            </span>
          </div>

          <div className="text-right text-[10px] sm:text-[11px] text-[#77758A] dark:text-[#9B98B2] space-y-0.5 shrink-0">
            <span className="flex items-center justify-end gap-0.5 sm:gap-1 font-medium truncate max-w-[70px] min-[420px]:max-w-[95px] sm:max-w-[120px]">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#7657FF] shrink-0" />
              <span className="truncate">{ad.city_name}</span>
            </span>
            <span className="block text-[9px] sm:text-[10px] text-[#77758A]/80">
              {relativeTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
