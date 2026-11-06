import Link from 'next/link'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { getLatestAds, getPopularBrands, getActiveCitiesWithCounts } from '@/src/lib/data/ads'
import { AdCard } from '@/app/components/AdCard'
import { JsonLd, buildOrganizationJsonLd } from '@/src/lib/seo/jsonld'

export const instant = false

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  await connection()
  const [latestAds, popularBrands, cities] = await Promise.all([
    getLatestAds(8),
    getPopularBrands(12),
    getActiveCitiesWithCounts(15),
  ])

  return (
    <div className="space-y-12 pb-16">
      <JsonLd data={buildOrganizationJsonLd()} />
      {/* 1. Hero Section with Search & City Selector */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-600/10 via-emerald-600/5 to-transparent py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            🇵🇰 Pakistan ka Sab se Bada Mobile Marketplace
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Apna Manpasand Mobile <span className="text-emerald-600">Kharidein</span> ya{' '}
            <span className="text-emerald-600">Bechein</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Hazaron tasdeeq shuda phones, behtareen qeemat, aur direct seller se rabta.
          </p>

          {/* Search Form (Navigates to /ads?q=...&city=...) */}
          <form
            action="/ads"
            method="GET"
            className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-2 sm:p-2.5 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-2"
          >
            {/* City Selector */}
            <div className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-800 pb-2 sm:pb-0 sm:pr-2">
              <select
                name="city"
                defaultValue=""
                className="w-full h-11 px-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 border-0 focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="">Poora Pakistan (All Cities)</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name} {c.ads_count > 0 ? `(${c.ads_count})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                name="q"
                placeholder="Phone ka naam likhein (e.g. iPhone 13, Galaxy S23)..."
                className="w-full h-11 px-4 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>🔍</span>
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* 2. Popular Brands Row */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Mashhoor Brands (Popular Brands)
            </h2>
            <Link
              href="/ads"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:underline"
            >
              Sab Dekhein →
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {popularBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/ads?brand=${brand.slug}`}
                className="p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center text-center group shadow-sm transition-all"
              >
                <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
                  📱
                </span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {brand.name}
                </span>
                {brand.ads_count > 0 && (
                  <span className="text-[10px] text-zinc-400 mt-0.5">
                    {brand.ads_count} ads
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Latest Ads Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                Taza Tareen Ads (Latest Ads)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Pakistan ke mukhtalif shehron se taza lagaye gaye ishteharat
              </p>
            </div>
            <Link
              href="/ads"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:underline"
            >
              Tamam Ads Dekhein →
            </Link>
          </div>

          {latestAds.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-4">
              <span className="text-5xl">📱</span>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                Abhi tak koi ad post nahi hua
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Pehle seller banein aur apne phone ka ishtehaar yahan lagayein!
              </p>
              <Link
                href="/post-ad"
                className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                + Pehla Ad Post Karein
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          )}
        </section>

        {/* 4. Post Ad Banner */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black">
              Apna Purana Phone Bechna Chahte Hain?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg">
              MobileBazar par apna ad bilkul muft lagayein aur direct verified khareedaron se behtareen offer hasil karein.
            </p>
          </div>
          <Link
            href="/post-ad"
            className="px-8 py-3.5 rounded-2xl bg-white text-emerald-700 font-extrabold text-sm sm:text-base hover:bg-zinc-100 active:scale-95 shadow-lg transition-all whitespace-nowrap"
          >
            + Muft Ad Lagayein
          </Link>
        </section>
      </div>
    </div>
  )
}
