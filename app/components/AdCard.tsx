'use client'

import Link from 'next/link'
import { FavoriteButton } from '@/app/components/FavoriteButton'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { formatPrice, formatStorage, formatRelativeTime, formatPtaBadge } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { buildAdSlug, buildAdCanonicalPath } from '@/src/lib/utils/slug'
import { ShieldCheck, MapPin, Clock, Cpu, Sparkles } from 'lucide-react'

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

  // Format RAM + Storage spec label
  const specLabel = [
    ad.ram_gb ? `${ad.ram_gb}GB RAM` : null,
    ad.storage_gb ? formatStorage(ad.storage_gb) : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md card-hover-effect hover:border-blue-400 dark:hover:border-blue-600 transition-all">
      {/* 1. Phone Photo Viewport */}
      <Link href={adHref} className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800/60 overflow-hidden block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={ad.title || 'Smartphone'}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            if (!target.dataset.fallback) {
              target.dataset.fallback = '1'
              target.src = baseImageUrl
            }
          }}
        />

        {/* Featured Flagship Ribbon */}
        {ad.is_featured && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}

        {/* Condition Chip */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white font-semibold text-[10px] tracking-tight">
          {ad.condition === 'new' ? 'Brand New' : 'Verified Used'}
        </div>

        {/* Battery Health Indicator if available */}
        {ad.battery_health && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
            {ad.battery_health}% Batt
          </div>
        )}
      </Link>

      {/* Favorite Button (Floating Top Right) */}
      {ad.id && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <FavoriteButton adId={ad.id} initialIsFavorited={initialIsFavorited} />
        </div>
      )}

      {/* 2. Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Model Kicker */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider">{ad.brand_name || 'Smartphone'}</span>
            {ad.is_negotiable && (
              <span className="text-blue-600 dark:text-blue-400 font-medium text-[10px]">
                Negotiable
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
              {formatPrice(ad.price || 0)}
            </span>
          </div>

          {/* Title */}
          <Link href={adHref}>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 mt-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {ad.title}
            </h3>
          </Link>
        </div>

        {/* Specs Badges: RAM/Storage & PTA Status */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            {specLabel && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                <Cpu className="w-3 h-3 text-slate-400" />
                <span>{specLabel}</span>
              </span>
            )}

            <span
              className={`px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center gap-1 ${
                pta.isApproved
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {pta.isApproved && <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
              <span>{pta.label}</span>
            </span>
          </div>

          {/* Location & Time Footer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1 truncate max-w-[130px] sm:max-w-[160px]" title={`${ad.city_name || ''}${ad.area_name ? `, ${ad.area_name}` : ''}`}>
              <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
              <span className="truncate">{ad.city_name}{ad.area_name ? `, ${ad.area_name}` : ''}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0 whitespace-nowrap">
              <Clock className="w-2.5 h-2.5 text-slate-400" />
              <span>{relativeTime}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
