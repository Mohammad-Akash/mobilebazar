import Link from 'next/link'
import { Smartphone } from 'lucide-react'

export interface BrandInfo {
  name: string
  slug: string
  subText: string
  accentColor: string
  badge?: string
}

export const SMARTPHONE_BRANDS: BrandInfo[] = [
  { name: 'Apple iPhone', slug: 'apple', subText: 'Pro, Max & Base', accentColor: 'group-hover:border-slate-800 dark:group-hover:border-slate-400', badge: 'Top Seller' },
  { name: 'Samsung', slug: 'samsung', subText: 'Galaxy S, Z & A Series', accentColor: 'group-hover:border-blue-600', badge: 'Popular' },
  { name: 'Google Pixel', slug: 'google', subText: 'Pixel 7, 8, 9 & Fold', accentColor: 'group-hover:border-emerald-600', badge: 'AI Camera' },
  { name: 'Xiaomi', slug: 'xiaomi', subText: 'Flagship & T Series', accentColor: 'group-hover:border-amber-500' },
  { name: 'Redmi', slug: 'redmi', subText: 'Note & Turbo Series', accentColor: 'group-hover:border-red-500', badge: 'Best Value' },
  { name: 'OnePlus', slug: 'oneplus', subText: 'Speed & OxygenOS', accentColor: 'group-hover:border-red-600' },
  { name: 'Vivo', slug: 'vivo', subText: 'V & X Zeiss Camera', accentColor: 'group-hover:border-blue-500' },
  { name: 'Oppo', slug: 'oppo', subText: 'Reno & Find Series', accentColor: 'group-hover:border-emerald-500' },
  { name: 'Realme', slug: 'realme', subText: 'GT & Number Series', accentColor: 'group-hover:border-amber-400' },
  { name: 'Tecno', slug: 'tecno', subText: 'Camon & Phantom', accentColor: 'group-hover:border-blue-600' },
  { name: 'Infinix', slug: 'infinix', subText: 'Zero & Note Gaming', accentColor: 'group-hover:border-emerald-600' },
  { name: 'Huawei', slug: 'huawei', subText: 'Pura & Mate Flagship', accentColor: 'group-hover:border-red-500' },
  { name: 'Motorola', slug: 'motorola', subText: 'Edge & Razr Flip', accentColor: 'group-hover:border-indigo-600' },
  { name: 'Nothing', slug: 'nothing', subText: 'Phone (1), (2) & Glyph', accentColor: 'group-hover:border-slate-900 dark:group-hover:border-slate-200', badge: 'Trending' },
]

export function BrandCards({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
      {SMARTPHONE_BRANDS.map((brand) => {
        const isActive = activeSlug === brand.slug
        return (
          <Link
            key={brand.slug}
            href={`/ads?brand=${brand.slug}`}
            className={`group relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 flex flex-col items-center text-center shadow-xs card-hover-effect cursor-pointer ${
              isActive
                ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/50 dark:bg-blue-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600'
            }`}
          >
            {brand.badge && (
              <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950 uppercase tracking-tight shadow-2xs">
                {brand.badge}
              </span>
            )}

            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2.5">
              <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>

            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {brand.name}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {brand.subText}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
