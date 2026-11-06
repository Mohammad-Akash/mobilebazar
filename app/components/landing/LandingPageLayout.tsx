import Link from 'next/link'
import { AdCard } from '@/app/components/AdCard'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { LandingStats, RelatedLink } from '@/src/lib/data/landing'
import { formatPrice } from '@/src/lib/utils/format'
import { JsonLd, buildBreadcrumbJsonLd, buildItemListJsonLd } from '@/src/lib/seo/jsonld'
import { buildAdCanonicalPath, buildAdSlug } from '@/src/lib/utils/slug'

interface BreadcrumbItem {
  name: string
  url: string
}

interface LandingPageLayoutProps {
  h1: string
  canonicalPath: string
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
  canonicalPath,
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* 1. Schemas */}
      <JsonLd data={breadcrumbSchema} />
      {initialAds.length > 0 && <JsonLd data={itemListSchema} />}

      {/* 2. Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            return (
              <li key={crumb.url} className="flex items-center gap-1.5">
                {idx > 0 && <span>/</span>}
                {isLast ? (
                  <span className="font-medium text-zinc-900 dark:text-zinc-200">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.url}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {h1}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          {stats.adCount > 0 ? (
            <>
              Dastiyab <strong className="text-zinc-900 dark:text-zinc-100">{stats.adCount} verified ads</strong>
              {cityName && ` in ${cityName}`}. Market price range{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">
                {formatPrice(stats.minPrice || 0)}
              </strong>{' '}
              se{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">
                {formatPrice(stats.maxPrice || 0)}
              </strong>{' '}
              ke darmiyan hai{stats.medianPrice ? ` (Ausat / Median qeemat: ${formatPrice(stats.medianPrice)})` : ''}.
            </>
          ) : (
            `Abhi is category mein koi ad mojood nahi hai. Pehle seller banein aur muft ad lagayein!`
          )}
        </p>

        {/* Real Data Stat Cards */}
        {stats.adCount > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Total Active Ads</span>
              <span className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {stats.adCount}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Lowest Price</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatPrice(stats.minPrice || 0)}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Median Market Price</span>
              <span className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {stats.medianPrice ? formatPrice(stats.medianPrice) : 'N/A'}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Highest Price</span>
              <span className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Mazeed Filters aur Ads Dekhein &rarr;
              </Link>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-4">
            <span className="text-4xl block">📱</span>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Is waqt koi active ad dastiyab nahi hai
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Aap is category mein pehle seller ban sakte hain! Apna ishtehaar muft post karein.
            </p>
            <div className="pt-2">
              <Link
                href="/post-ad"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors shadow-sm"
              >
                + Muft Ad Lagayein
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. Factual Data-Driven FAQ */}
      {stats.adCount > 0 && (
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Aham Sawalat aur Maloomat (FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-2">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {modelName || brandName || 'Mobile'} ki {cityName ? `${cityName} mein ` : 'Pakistan mein '}qeemat kya hai?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                MobileBazar par mojood verified ads ke mutabiq kam se kam qeemat{' '}
                <strong>{formatPrice(stats.minPrice || 0)}</strong> aur zyada se zyada qeemat{' '}
                <strong>{formatPrice(stats.maxPrice || 0)}</strong> hai, jabke ausat qeemat takreeban{' '}
                <strong>{stats.medianPrice ? formatPrice(stats.medianPrice) : 'N/A'}</strong> hai.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-2">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Khareedte waqt fraud se kaise bachein?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                Hamesha seller se public maqam par milein, phone ka IMEI aur PTA status mauqay par check karein, aur phone tasalli se check karne se pehle advance payment na dein.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. Internal Linking Matrix */}
      {relatedLinks.length > 0 && (
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Mutaliqa Searches & Popular Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            {/* Related Cities */}
            {relatedCities.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Doosre Shehron Mein:
                </h3>
                <ul className="space-y-1.5">
                  {relatedCities.map((c) => {
                    const targetPath = brandSlug && modelSlug
                      ? `/mobiles/${c.slug}/${brandSlug}/${modelSlug}`
                      : brandSlug
                      ? `/mobiles/${c.slug}/${brandSlug}`
                      : `/mobiles/${c.slug}`
                    return (
                      <li key={c.slug}>
                        <Link
                          href={targetPath}
                          className="text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {brandName || 'Brand'} ke Doosre Models:
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
                          className="text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Doosre Brands {cityName ? `(${cityName})` : ''}:
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
                          className="text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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

