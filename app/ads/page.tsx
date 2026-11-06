import { Suspense } from 'react'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/src/lib/seo/site'
import { searchParamsSchema } from '@/src/lib/validations/search'
import { searchAds } from '@/src/lib/data/ads'
import { getActiveBrands, getActiveCities } from '@/src/lib/data/reference'
import { FilterSidebar } from './components/FilterSidebar'
import { ActiveFilterChips } from './components/ActiveFilterChips'
import { SortDropdown } from './components/SortDropdown'
import { AdsListingClient } from './AdsListingClient'

export const instant = false

interface AdsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ searchParams }: AdsPageProps): Promise<Metadata> {
  const rawParams = await searchParams
  const hasFilterParams = Object.keys(rawParams).some((key) => {
    const val = rawParams[key]
    return val !== undefined && val !== ''
  })

  // Filtered/searched URLs get noindex, follow to avoid duplicate content & crawl traps,
  // pointing canonical back to the clean /ads base URL.
  if (hasFilterParams) {
    return {
      title: 'Mobiles Search & Filter Results',
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: '/ads',
      },
    }
  }

  // Base /ads URL is indexable
  return {
    title: 'Used & New Mobile Phones for Sale in Pakistan',
    description:
      'Browse verified mobile phones for sale across Pakistan. PTA approved, genuine specs, and trusted sellers in Lahore, Karachi, Islamabad and all cities.',
    alternates: {
      canonical: '/ads',
    },
    robots: SITE_CONFIG.allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}

export default async function AdsPage({ searchParams }: AdsPageProps) {
  await connection()
  const rawParams = await searchParams

  // Flatten searchParams
  const normalizedParams: Record<string, string> = {}
  for (const [key, val] of Object.entries(rawParams)) {
    if (typeof val === 'string') {
      normalizedParams[key] = val
    } else if (Array.isArray(val) && val.length > 0) {
      normalizedParams[key] = val[0]
    }
  }

  const parsed = searchParamsSchema.safeParse(normalizedParams)
  const queryData = parsed.success ? parsed.data : searchParamsSchema.parse({})

  // Fetch initial results + reference lists concurrently on the server
  const [searchResult, brands, cities] = await Promise.all([
    searchAds(queryData),
    getActiveBrands(),
    getActiveCities(),
  ])

  // Lookup active brand/city names for filter chips
  const activeBrandName = brands.find((b) => b.slug === queryData.brand)?.name
  const activeCityName = cities.find((c) => c.slug === queryData.city)?.name

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            Dastiyab Mobiles (Mobiles for Sale)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Poore Pakistan mein daryaft karein
          </p>
        </div>

        <SortDropdown />
      </div>

      {/* Main Content Layout (Sidebar + Results) */}
      <div className="mt-6 flex flex-col lg:flex-row gap-8 items-start">
        {/* Filter Sidebar (Desktop sidebar + Mobile drawer) */}
        <FilterSidebar brands={brands} cities={cities} />

        {/* Results Column */}
        <div className="flex-1 w-full min-w-0">
          {/* Removable Active Filter Chips */}
          <Suspense fallback={null}>
            <ActiveFilterChips
              brandName={activeBrandName}
              cityName={activeCityName}
            />
          </Suspense>

          {/* Initial Server-Rendered Grid + Infinite Scroll */}
          <Suspense fallback={null}>
            <AdsListingClient
              initialAds={searchResult.ads}
              initialCursor={searchResult.nextCursor}
              initialHasNextPage={searchResult.hasNextPage}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

