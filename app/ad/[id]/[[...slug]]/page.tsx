import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAdById, getSimilarAds } from '@/src/lib/data/ads'
import { formatPrice, formatRelativeTime } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { buildAdSlug, buildAdCanonicalPath } from '@/src/lib/utils/slug'
import { SITE_CONFIG, absoluteUrl } from '@/src/lib/seo/site'
import {
  JsonLd,
  buildProductJsonLd,
  buildBreadcrumbJsonLd,
} from '@/src/lib/seo/jsonld'
import { Gallery } from './components/Gallery'
import { SpecTable } from './components/SpecTable'
import { ContactButtons } from './components/ContactButtons'
import { SafetyTips } from './components/SafetyTips'
import { ViewCounter } from './components/ViewCounter'
import { AdCard } from '@/app/components/AdCard'

export const instant = false

interface AdDetailPageProps {
  params: Promise<{ id: string; slug?: string[] }>
}

export async function generateMetadata({
  params,
}: AdDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const ad = await getAdById(id)

  if (!ad || ad.status === 'deleted') {
    return { title: 'Ad Not Found' }
  }

  const canonicalSlug = buildAdSlug({
    title: ad.title,
    brand_name: ad.brand_name,
    model_name: ad.model_name,
    storage_gb: ad.storage_gb,
    pta_status: ad.pta_status,
    city_name: ad.city_name,
  })

  const canonicalPath = buildAdCanonicalPath(id, canonicalSlug)
  const coverUrl = ad.cover_image_path
    ? getAdImageUrl(ad.cover_image_path, 'md')
    : absoluteUrl(SITE_CONFIG.defaultOgImage)
  const priceText = formatPrice(ad.price || 0)
  const metaTitle = `${ad.title || 'Mobile Phone'} for Sale in ${
    ad.city_name || 'Pakistan'
  } — ${priceText}`
  const metaDesc = ad.description
    ? ad.description.replace(/[\r\n]+/g, ' ').slice(0, 155)
    : `Buy ${ad.title} for ${priceText} in ${ad.city_name || 'Pakistan'} on MobileBazar.`

  const isIndexable =
    ad.status === 'active' && SITE_CONFIG.allowIndexing

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalPath,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: coverUrl,
          width: 800,
          height: 600,
          alt: ad.title || 'Mobile Photo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [coverUrl],
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}

export default async function AdDetailPage({ params }: AdDetailPageProps) {
  const { id, slug: slugArray } = await params
  const ad = await getAdById(id)

  // 1. Not found if ad doesn't exist or is marked as deleted
  if (!ad || ad.status === 'deleted') {
    notFound()
  }

  // 2. Canonical slug enforcement (Permanent 301 Redirect if slug is missing or wrong)
  const canonicalSlug = buildAdSlug({
    title: ad.title,
    brand_name: ad.brand_name,
    model_name: ad.model_name,
    storage_gb: ad.storage_gb,
    pta_status: ad.pta_status,
    city_name: ad.city_name,
  })

  const currentSlug = slugArray?.[0]
  if (currentSlug !== canonicalSlug) {
    permanentRedirect(buildAdCanonicalPath(id, canonicalSlug))
  }

  const adId = ad.id || id
  const canonicalPath = buildAdCanonicalPath(id, canonicalSlug)

  // 3. Structured Data
  const absoluteImages = (ad.images || [])
    .slice(0, 4)
    .map((img) => getAdImageUrl(img.storage_path, 'md'))

  const productJsonLd = buildProductJsonLd({
    id: adId,
    title: ad.title || 'Mobile Phone',
    description: ad.description,
    price: ad.price || 0,
    brandName: ad.brand_name,
    images: absoluteImages,
    canonicalPath,
    status: ad.status || 'active',
    condition: ad.condition,
  })

  const breadcrumbsList = [
    { name: 'Home', url: '/' },
    ...(ad.city_slug && ad.city_name
      ? [{ name: ad.city_name, url: `/mobiles/${ad.city_slug}` }]
      : []),
    ...(ad.brand_slug && ad.brand_name
      ? [{ name: ad.brand_name, url: `/brands/${ad.brand_slug}` }]
      : []),
    ...(ad.brand_slug && ad.model_slug && ad.model_name
      ? [{ name: ad.model_name, url: `/brands/${ad.brand_slug}/${ad.model_slug}` }]
      : []),
    { name: ad.title || 'Ad', url: canonicalPath },
  ]

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbsList)

  // 4. Fetch similar ads
  const similarAds =
    ad.brand_id && ad.model_id && ad.city_id
      ? await getSimilarAds({
          id: adId,
          brand_id: ad.brand_id,
          model_id: ad.model_id,
          city_id: ad.city_id,
          price: ad.price || 0,
        })
      : []

  const relativeTime = ad.published_at ? formatRelativeTime(ad.published_at) : ''

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Schemas */}
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Non-blocking client-side view counter */}
      <ViewCounter adId={adId} />

      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {breadcrumbsList.map((crumb, idx) => {
            const isLast = idx === breadcrumbsList.length - 1
            return (
              <li key={crumb.url} className="flex items-center gap-1.5">
                {idx > 0 && <span>/</span>}
                {isLast ? (
                  <span className="font-medium text-zinc-900 dark:text-zinc-200 truncate max-w-[200px]">
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

      {/* Inactive Ad Warning Banner */}
      {ad.status !== 'active' && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 rounded-2xl text-amber-900 dark:text-amber-200 flex items-center gap-3 shadow-sm">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-sm">Yeh Ad Ab Dastiyab Nahi Hai (Not Active)</p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
              Yeh phone bik chuka hai ya iska waqt khatam ho chuka hai ({ad.status}).
            </p>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photos & Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photos Gallery */}
          <Gallery images={ad.images} adTitle={ad.title || 'Mobile'} />

          {/* Specifications Table */}
          <SpecTable ad={ad} />

          {/* Description Box */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>📝</span>
              <span>Seller ki Tafseel (Description)</span>
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Right Column: Price, Contact, Seller & Safety (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Price Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {formatPrice(ad.price || 0)}
              </span>
              {ad.is_negotiable && (
                <span className="text-xs font-bold text-zinc-400">
                  (Negotiable)
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                {ad.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-zinc-500 pt-1">
                <span>📍 {ad.city_name}{ad.area_name ? `, ${ad.area_name}` : ''}</span>
                <span>•</span>
                <span>🕒 {relativeTime}</span>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Condition: {ad.condition === 'new' ? 'Brand New' : 'Used'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                PTA: {ad.pta_status ? ad.pta_status.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
              </span>
              {ad.storage_gb && (
                <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Storage: {ad.storage_gb} GB
                </span>
              )}
            </div>
          </div>

          {/* Contact Seller Button */}
          <ContactButtons
            adId={adId}
            adTitle={ad.title || 'Mobile Phone'}
            adStatus={ad.status || 'active'}
            contactPreference={ad.contact_preference || 'both'}
          />

          {/* Safety Tips Card */}
          <SafetyTips adTitle={ad.title || 'Mobile Phone'} />
        </div>
      </div>

      {/* Similar Ads Section */}
      {similarAds.length > 0 && (
        <section className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Mutaliqa Phones (Similar Ads)
            </h2>
            <Link
              href={`/ads?brand=${ad.brand_slug}&city=${ad.city_slug}`}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Mazeed Dekhein &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarAds.map((item) => (
              <AdCard key={item.id} ad={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
