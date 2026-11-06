import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/src/lib/seo/site'
import {
  validateLandingSlugs,
  getLandingStats,
  getLandingAds,
  getRelatedLandingLinks,
} from '@/src/lib/data/landing'
import { LandingPageLayout } from '@/app/components/landing/LandingPageLayout'

export const instant = false

interface CityBrandPageProps {
  params: Promise<{ city: string; brand: string }>
}

export async function generateMetadata({ params }: CityBrandPageProps): Promise<Metadata> {
  const { city: citySlug, brand: brandSlug } = await params
  const validation = await validateLandingSlugs({ city: citySlug, brand: brandSlug })

  if (!validation?.city || !validation?.brand) {
    return { title: 'Not Found' }
  }

  const { city, brand } = validation
  const stats = await getLandingStats({ citySlug: city.slug, brandSlug: brand.slug })
  const canonicalPath = `/mobiles/${city.slug}/${brand.slug}`

  const isIndexable =
    SITE_CONFIG.allowIndexing && stats.adCount >= SITE_CONFIG.minIndexableAds

  return {
    title: `Used ${brand.name} Mobiles in ${city.name} — Prices & Ads`,
    description: `Find ${stats.adCount}+ used and new ${brand.name} phones for sale in ${city.name}, Pakistan. Verified listings, PTA approval, and price comparison on MobileBazar.`,
    alternates: {
      canonical: canonicalPath,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export default async function CityBrandLandingPage({ params }: CityBrandPageProps) {
  const { city: citySlug, brand: brandSlug } = await params
  const validation = await validateLandingSlugs({ city: citySlug, brand: brandSlug })

  if (!validation?.city || !validation?.brand) {
    notFound()
  }

  const { city, brand } = validation
  const [stats, initialAds, relatedLinks] = await Promise.all([
    getLandingStats({ citySlug: city.slug, brandSlug: brand.slug }),
    getLandingAds({ citySlug: city.slug, brandSlug: brand.slug }),
    getRelatedLandingLinks({ citySlug: city.slug, brandSlug: brand.slug }),
  ])

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: city.name, url: `/mobiles/${city.slug}` },
    { name: brand.name, url: `/mobiles/${city.slug}/${brand.slug}` },
  ]

  return (
    <LandingPageLayout
      h1={`Used ${brand.name} Phones for Sale in ${city.name}`}
      canonicalPath={`/mobiles/${city.slug}/${brand.slug}`}
      breadcrumbs={breadcrumbs}
      stats={stats}
      initialAds={initialAds}
      relatedLinks={relatedLinks}
      citySlug={city.slug}
      cityName={city.name}
      brandSlug={brand.slug}
      brandName={brand.name}
    />
  )
}
