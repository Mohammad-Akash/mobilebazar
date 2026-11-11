import Link from 'next/link'
import { AdCard } from '@/app/components/AdCard'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { LandingStats, RelatedLink } from '@/src/lib/data/landing'
import { formatPrice } from '@/src/lib/utils/format'
import { JsonLd, buildBreadcrumbJsonLd, buildItemListJsonLd } from '@/src/lib/seo/jsonld'
import { buildAdCanonicalPath, buildAdSlug } from '@/src/lib/utils/slug'
import { ChevronRight, Smartphone, ArrowRight, PlusCircle } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  url: string
}

interface LandingPageLayoutProps {
  h1: string
  canonicalPath?: string
  breadcrumbs: BreadcrumbItem[]
  stats: LandingStats
  initialAds: ActiveAdRow[]
  relatedLinks: RelatedLink[]
  citySlug?: string
  cityName?: string
  brandSlug?: string
  brandName?: string
  modelSlug?: string
  modelName?: string
}

export function LandingPageLayout({
  h1,
  breadcrumbs,
  stats,
  initialAds,
  relatedLinks,
  citySlug,
  cityName,
  brandSlug,
  brandName,
  modelSlug,
  modelName,
}: LandingPageLayoutProps) {
  // Breadcrumb schema
  const breadcrumbSchema = buildBreadcrumbJsonLd(breadcrumbs)

  // ItemList schema (first 10 ads)
  const itemListSchema = buildItemListJsonLd(
    initialAds.slice(0, 10).map((ad) => {
      const slug = buildAdSlug({
        title: ad.title,
        brand_name: ad.brand_name,
        model_name: ad.model_name,
        storage_gb: ad.storage_gb,
        pta_status: ad.pta_status,
        city_name: ad.city_name,
      })
      return {
        name: ad.title || 'Mobile Phone',
        url: buildAdCanonicalPath(ad.id || '', slug),
      }
    })
  )

  // Filter related links by type
  const relatedCities = relatedLinks.filter((l) => l.link_type === 'city')
  const relatedBrands = relatedLinks.filter((l) => l.link_type === 'brand')
  const relatedModels = relatedLinks.filter((l) => l.link_type === 'model')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Schemas */}
      <JsonLd data={breadcrumbSchema} />
      {initialAds.length > 0 && <JsonLd data={itemListSchema} />}

      {/* 2. Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            return (
              <li key={crumb.url} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {isLast ? (
                  <span className="font-bold text-slate-900 dark:text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.url}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* 3. Page Header & Stats Summary */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Verified Smartphone Market</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {h1}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {stats.adCount > 0 ? (
            <>
              Showing <strong className="text-slate-900 dark:text-white">{stats.adCount} verified phone ads</strong>
              {cityName && ` in ${cityName}`}. Market price ranges from{' '}
              <strong className="text-blue-600 dark:text-blue-400">
                {formatPrice(stats.minPrice || 0)}
              </strong>{' '}
              to{' '}
              <strong className="text-blue-600 dark:text-blue-400">
                {formatPrice(stats.maxPrice || 0)}
              </strong>
              {stats.medianPrice ? ` (Median price: ${formatPrice(stats.medianPrice)})` : ''}.
            </>
          ) : (
            `No smartphone ads currently available in this category. Be the first to post a free phone ad!`
          )}
        </p>

        {/* Real Data Stat Cards */}
        {stats.adCount > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
              <span className="text-xs text-slate-400 block font-medium">Active Phone Listings</span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 block">
                {stats.adCount}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
              <span className="text-xs text-slate-400 block font-medium">Starting From</span>
              <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5 block">
                {formatPrice(stats.minPrice || 0)}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
              <span className="text-xs text-slate-400 block font-medium">Median Market Price</span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 block">
                {stats.medianPrice ? formatPrice(stats.medianPrice) : 'N/A'}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
              <span className="text-xs text-slate-400 block font-medium">Top Tier Flagship</span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 block">
                {formatPrice(stats.maxPrice || 0)}
              </span>
            </div>
          </div>
        )}
      </header>

      {/* 4. Active Ads Listing Grid */}
      <section className="space-y-6">
        {initialAds.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {initialAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>

            {/* View all with full filters link */}
            <div className="text-center pt-4">
              <Link
                href={`/ads?${new URLSearchParams({
                  ...(citySlug ? { city: citySlug } : {}),
                  ...(brandSlug ? { brand: brandSlug } : {}),
                }).toString()}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm shadow-blue-600/30 active:scale-95"
              >
                <span>View All Filtered Smartphones</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 mx-auto flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Smartphone className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              No active phone listings available right now
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Be the first seller in this category! Post your smartphone for free today.
            </p>
            <div className="pt-2">
              <Link
                href="/post-ad"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm shadow-blue-600/30 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Free Smartphone Ad</span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. Factual Data-Driven FAQ */}
      {stats.adCount > 0 && (
        <section className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                What is the price of {modelName || brandName || 'smartphones'} in {cityName || 'Pakistan'}?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                According to verified smartphone listings on MobileBazar, prices range from{' '}
                <strong className="text-blue-600 dark:text-blue-400">{formatPrice(stats.minPrice || 0)}</strong> to{' '}
                <strong className="text-blue-600 dark:text-blue-400">{formatPrice(stats.maxPrice || 0)}</strong>, with a median market price of{' '}
                <strong>{stats.medianPrice ? formatPrice(stats.medianPrice) : 'N/A'}</strong>.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                How do I verify PTA status before purchasing?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Always meet the seller in person in a safe public location. Dial *#06# to obtain the handset IMEI and verify it directly on the official PTA DIRBS system or SMS to 8484.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. Internal Linking Matrix */}
      {relatedLinks.length > 0 && (
        <section className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Related Smartphone Searches & Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            {/* Related Cities */}
            {relatedCities.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                  In Other Cities:
                </h3>
                <ul className="space-y-1.5">
                  {relatedCities.map((c) => {
                    const targetPath =
                      brandSlug && modelSlug
                        ? `/mobiles/${c.slug}/${brandSlug}/${modelSlug}`
                        : brandSlug
                        ? `/mobiles/${c.slug}/${brandSlug}`
                        : `/mobiles/${c.slug}`
                    return (
                      <li key={c.slug}>
                        <Link
                          href={targetPath}
                          className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {modelName || brandName || 'Mobiles'} in {c.name} ({c.ad_count})
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Related Models */}
            {relatedModels.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                  Other {brandName || 'Brand'} Models:
                </h3>
                <ul className="space-y-1.5">
                  {relatedModels.map((m) => {
                    const targetPath = citySlug
                      ? `/mobiles/${citySlug}/${brandSlug}/${m.slug}`
                      : `/brands/${brandSlug}/${m.slug}`
                    return (
                      <li key={m.slug}>
                        <Link
                          href={targetPath}
                          className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {brandName} {m.name} {cityName ? `in ${cityName}` : ''} ({m.ad_count})
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Related Brands */}
            {relatedBrands.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                  Other Brands {cityName ? `(${cityName})` : ''}:
                </h3>
                <ul className="space-y-1.5">
                  {relatedBrands.map((b) => {
                    const targetPath = citySlug
                      ? `/mobiles/${citySlug}/${b.slug}`
                      : `/brands/${b.slug}`
                    return (
                      <li key={b.slug}>
                        <Link
                          href={targetPath}
                          className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {b.name} Phones {cityName ? `in ${cityName}` : ''} ({b.ad_count})
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
