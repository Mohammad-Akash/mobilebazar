import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { connection } from 'next/server'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAdById, getSimilarAds } from '@/src/lib/data/ads'
import { formatPrice, formatRelativeTime } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { createClient } from '@/src/lib/supabase/server'
import { Gallery } from './components/Gallery'
import { SpecTable } from './components/SpecTable'
import { ContactButtons } from './components/ContactButtons'
import { SafetyTips } from './components/SafetyTips'
import { AdCard } from '@/app/components/AdCard'

export const instant = false

interface AdDetailPageProps {
  params: Promise<{ id: string; slug?: string[] }>
}

export async function generateMetadata({ params }: AdDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const ad = await getAdById(id)

  if (!ad) {
    return { title: 'Ad Not Found | MobileBazar' }
  }

  const coverUrl = getAdImageUrl(ad.cover_image_path)
  const priceText = formatPrice(ad.price || 0)
  const metaTitle = `${ad.title} for Sale in ${ad.city_name || 'Pakistan'} - ${priceText}`
  const metaDesc = ad.description ? ad.description.slice(0, 160) : metaTitle

  return {
    title: `${metaTitle} | MobileBazar`,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: coverUrl ? [{ url: coverUrl }] : [],
    },
    robots: ad.status === 'active' ? 'index, follow' : 'noindex, nofollow',
  }
}

export default async function AdDetailPage({ params }: AdDetailPageProps) {
  await connection()
  const { id } = await params
  const ad = await getAdById(id)

  if (!ad) {
    notFound()
  }

  // 1. View Counting with 24-hour cookie guard
  const cookieStore = await cookies()
  const adId = ad.id || id
  const viewCookieName = `viewed_ad_${adId}`
  const hasViewed = cookieStore.get(viewCookieName)

  if (!hasViewed && adId) {
    // Non-blocking fire & forget RPC call
    const supabase = await createClient()
    supabase.rpc('increment_ad_views', { p_ad_id: adId }).then(() => {
      // ignore
    })
    cookieStore.set(viewCookieName, '1', {
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    })
  }

  // 2. Fetch similar ads
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
        {/* Left Column: Photos & Details (8 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photos Gallery */}
          <Gallery images={ad.images} adTitle={ad.title || 'Mobile'} />

          {/* Specifications Table */}
          <SpecTable ad={ad} />

          {/* Description Box (Rendered as plain text to prevent XSS) */}
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

            <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-snug">
              {ad.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span>📍 {ad.city_name}{ad.area_name ? `, ${ad.area_name}` : ''}</span>
              <span>{relativeTime}</span>
            </div>

            {/* Contact Action Buttons (Call / WhatsApp via secure RPC) */}
            <ContactButtons
              adId={adId}
              adTitle={ad.title || 'Mobile Phone'}
              adStatus={ad.status || 'active'}
              contactPreference={ad.contact_preference || 'both'}
            />
          </div>

          {/* Seller Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Seller Information
            </span>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
                {ad.seller_name ? ad.seller_name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {ad.seller_name || 'MobileBazar User'}
                </h4>
                <p className="text-xs text-zinc-400">
                  Active Ads: {ad.seller?.ads_count || 1}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/ads?q=${encodeURIComponent(ad.seller_name || '')}`}
                className="w-full block py-2 text-center text-xs font-semibold text-emerald-600 hover:underline"
              >
                Seller ke deegar ads dekhein →
              </Link>
            </div>
          </div>

          {/* Safety Tips & Share */}
          <SafetyTips adTitle={ad.title || 'Mobile'} />
        </div>
      </div>

      {/* Similar Ads Recommendation Section */}
      {similarAds.length > 0 && (
        <section className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Isi Tarah Ke Deegar Mobiles (Similar Ads)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Aapko ye phones bhi pasand aa sakte hain
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarAds.map((simAd) => (
              <AdCard key={simAd.id} ad={simAd} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
