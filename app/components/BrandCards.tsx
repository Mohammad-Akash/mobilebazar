import Link from 'next/link'
import { Smartphone } from 'lucide-react'

export interface BrandInfo {
  name: string
  slug: string
  subText: string
}

export const SMARTPHONE_BRANDS: BrandInfo[] = [
  { name: 'Apple iPhone', slug: 'apple', subText: 'Pro Max & Base' },
  { name: 'Samsung', slug: 'samsung', subText: 'Galaxy S & Z Series' },
  { name: 'Google Pixel', slug: 'google', subText: 'Pixel 8, 9 & Fold' },
  { name: 'Xiaomi', slug: 'xiaomi', subText: 'Flagship & HyperOS' },
  { name: 'OnePlus', slug: 'oneplus', subText: 'Flagship & Open' },
  { name: 'Nothing', slug: 'nothing', subText: 'Phone (2) & Glyph' },
  { name: 'Redmi', slug: 'redmi', subText: 'Note & Turbo' },
  { name: 'Vivo', slug: 'vivo', subText: 'X-Series & V Zeiss' },
  { name: 'Oppo', slug: 'oppo', subText: 'Find & Reno Series' },
  { name: 'Realme', slug: 'realme', subText: 'GT & Number Series' },
  { name: 'Tecno', slug: 'tecno', subText: 'Phantom & Camon' },
  { name: 'Infinix', slug: 'infinix', subText: 'Zero & GT Gaming' },
  { name: 'Motorola', slug: 'motorola', subText: 'Razr Flip & Edge' },
  { name: 'Huawei', slug: 'huawei', subText: 'Pura & Mate Series' },
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
            className={`group relative p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17152B] border transition-all duration-200 flex flex-col items-start text-left editorial-card cursor-pointer shadow-xs ${
              isActive
                ? 'border-[#7657FF] ring-1 ring-[#7657FF]/30 bg-[#7657FF]/5 dark:bg-[#7657FF]/10'
                : 'border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]/60 dark:hover:border-[#8A6FFF]/60'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] group-hover:bg-[#7657FF] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Smartphone className="w-4 h-4 stroke-[2]" />
            </div>

            <h3 className="font-bold text-xs sm:text-sm text-[#17152B] dark:text-[#F7F6F2] group-hover:text-[#7657FF] dark:group-hover:text-[#8A6FFF] transition-colors line-clamp-1">
              {brand.name}
            </h3>
            <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] line-clamp-1 mt-0.5 font-medium">
              {brand.subText}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
