'use client'

import Link from 'next/link'
import { FavoriteButton } from '@/app/components/FavoriteButton'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { formatPrice, formatStorage, formatRelativeTime, formatPtaBadge } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { buildAdSlug, buildAdCanonicalPath } from '@/src/lib/utils/slug'

// Interface for AdCard props
interface AdCardProps {
  ad: ActiveAdRow;
  initialIsFavorited?: boolean;
}

export function AdCard({ ad, initialIsFavorited = false }: AdCardProps) {
  // Helper data
  const pta = formatPtaBadge(ad.pta_status);
  // Try _sm first; onError fallback goes to base (old ads don't have _sm variant)
  const imageUrl = getAdImageUrl(ad.cover_image_path, 'sm');
  const baseImageUrl = getAdImageUrl(ad.cover_image_path, 'base');
  const relativeTime = ad.published_at ? formatRelativeTime(ad.published_at) : '';

  // Deterministic canonical slug for direct, redirect-free navigation
  const slug = buildAdSlug({
    title: ad.title,
    brand_name: ad.brand_name,
    model_name: ad.model_name,
    storage_gb: ad.storage_gb,
    pta_status: ad.pta_status,
    city_name: ad.city_name,
  });
  const adHref = buildAdCanonicalPath(ad.id || '', slug);

  return (
    <Link
      href={adHref}
      className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* 1. Cover Image (Fixed Aspect Ratio to Prevent Layout Shift) */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={ad.title || 'Mobile Phone'}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // _sm variant nahi hai (purani upload) — base image use karo
            const target = e.currentTarget as HTMLImageElement;
            if (!target.dataset.fallback) {
              target.dataset.fallback = '1';
              target.src = baseImageUrl;
            }
          }}
        />

        {/* Featured Badge */}
        {ad.is_featured && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-amber-500 text-zinc-950 font-black text-[11px] shadow-sm uppercase tracking-wide">
            Featured ★
          </div>
        )}

        {/* Condition Tag */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white font-medium text-[11px] capitalize">
          {ad.condition === 'new' ? '✨ Brand New' : 'Used'}
        </div>
      </div>

      {/* 2. Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Price & Negotiable */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {formatPrice(ad.price || 0)}
            </span>
            {ad.is_negotiable && (
              <span className="text-[10px] font-semibold text-zinc-400">
                (Negotiable)
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {ad.title}
          </h3>
        </div>

        {/* Badges: Storage, PTA */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {ad.storage_gb && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
              {formatStorage(ad.storage_gb)}
            </span>
          )}
          <span
            className={`px-2 py-0.5 rounded-md font-medium ${
              pta.isApproved
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {pta.label}
          </span>
        </div>

        {/* Location & Time Footer */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <span className="truncate max-w-[140px] sm:max-w-[170px]" title={`${ad.city_name || ''}${ad.area_name ? `, ${ad.area_name}` : ''}`}>
            📍 {ad.city_name}{ad.area_name ? `, ${ad.area_name}` : ''}
          </span>
          <span className="whitespace-nowrap">{relativeTime}</span>
        </div>
      </div>

      {/* Favorite Button Overlay (top-right) */}
      {ad.id && (
        <div className="absolute top-2 right-2">
          <FavoriteButton adId={ad.id} initialIsFavorited={initialIsFavorited} />
        </div>
      )}
    </Link>
  );
}
