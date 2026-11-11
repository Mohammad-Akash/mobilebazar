import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAdById, getSimilarAds } from '@/src/lib/data/ads'
import { formatPrice, formatRelativeTime } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { buildAdSlug, buildAdCanonicalPath } from '@/src/lib/utils/slug'
import { SITE_CONFIG, absoluteUrl } from '@/src/lib/seo/site'
import { createClient } from '@/src/lib/supabase/server'
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
import {
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
  FileText,
} from 'lucide-react'

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
  const metaTitle = `${ad.title || 'Smartphone'} for Sale in ${
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

  if (!ad || ad.status === 'deleted') {
    notFound()
  }

  let currentUserId: string | null = null
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    currentUserId = user?.id || null
  } catch {
    // offline or session error
  }

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

  const absoluteImages = (ad.images || [])
    .slice(0, 4)
    .map((img) => getAdImageUrl(img.storage_path, 'md'))

  const productJsonLd = buildProductJsonLd({
    id: adId,
    title: ad.title || 'Smartphone',
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
    { name: ad.title || 'Phone', url: canonicalPath },
  ]

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbsList)

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Schemas */}
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Non-blocking view counter */}
      <ViewCounter adId={adId} />

      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {breadcrumbsList.map((crumb, idx) => {
            const isLast = idx === breadcrumbsList.length - 1
            return (
              <li key={crumb.url} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {isLast ? (
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[220px]">
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

      {/* Inactive Ad Warning Banner */}
      {ad.status !== 'active' && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-3xl text-amber-900 dark:text-amber-200 flex items-center gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <p className="font-bold text-sm">This Smartphone Listing is No Longer Active</p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
              This handset has been marked as sold or expired ({ad.status}).
            </p>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photos & Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photos Gallery */}
          <Gallery images={ad.images} adTitle={ad.title || 'Smartphone'} />

          {/* Specifications Table */}
          <SpecTable ad={ad} />

          {/* Description Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Seller Note & Condition Details</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Right Column: Price, Contact, Seller & Safety (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Price & Primary Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-0.5">
                  Asking Price
                </span>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                  {formatPrice(ad.price || 0)}
                </span>
              </div>
              {ad.is_negotiable ? (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Negotiable
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500">
                  Fixed Price
                </span>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <h1 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
                {ad.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {ad.city_name}
                    {ad.area_name ? `, ${ad.area_name}` : ''}
                  </span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{relativeTime}</span>
                </span>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {ad.condition === 'new' ? '✨ Brand New' : '📱 Used Phone'}
              </span>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  ad.pta_status === 'pta_approved'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                }`}
              >
                {ad.pta_status ? ad.pta_status.replace(/_/g, ' ').toUpperCase() : 'PTA UNVERIFIED'}
              </span>
              {ad.storage_gb && (
                <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-bold">
                  {ad.storage_gb} GB Storage
                </span>
              )}
              {ad.battery_health != null && (
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                  🔋 {ad.battery_health}% Battery
                </span>
              )}
            </div>
          </div>

          {/* Contact Seller Button */}
          <ContactButtons
            adId={adId}
            adTitle={ad.title || 'Smartphone'}
            adPrice={ad.price || 0}
            adStatus={ad.status || 'active'}
            contactPreference={ad.contact_preference || 'both'}
            isOwner={currentUserId ? currentUserId === ad.seller_id : false}
          />

          {/* Seller Profile Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 text-lg">
                {(ad.seller?.full_name || ad.seller_name || 'U')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {ad.seller?.full_name || ad.seller_name || 'MobileBazar Seller'}
                  </span>
                  {ad.seller?.is_phone_verified ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Phone</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      Unverified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Member since{' '}
                  {ad.seller?.created_at
                    ? new Date(ad.seller.created_at).toLocaleDateString('en-PK', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Recently'}{' '}
                  • {ad.seller?.ads_count ?? 1} Phone Ads
                </p>
              </div>
            </div>
          </div>

          {/* Safety Tips Card */}
          <SafetyTips adId={adId} adTitle={ad.title || 'Smartphone'} />
        </div>
      </div>

      {/* Similar Phones Section */}
      {similarAds.length > 0 && (
        <section className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Similar Smartphones
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Compare other {ad.brand_name || 'phone'} listings in {ad.city_name || 'Pakistan'}
              </p>
            </div>
            <Link
              href={`/ads?brand=${ad.brand_slug}&city=${ad.city_slug}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
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
