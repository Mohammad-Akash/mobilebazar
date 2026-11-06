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

interface CityPageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const validation = await validateLandingSlugs({ city: citySlug })

  if (!validation?.city) {
    return { title: 'City Not Found' }
  }

  const { city } = validation
  const stats = await getLandingStats({ citySlug: city.slug })
  const canonicalPath = `/mobiles/${city.slug}`

  const isIndexable =
    SITE_CONFIG.allowIndexing && stats.adCount >= SITE_CONFIG.minIndexableAds

  return {
    title: `Used Mobile Phones for Sale in ${city.name} — Prices & Deals`,
    description: `Browse ${stats.adCount}+ used and new mobile phones for sale in ${city.name}, Pakistan. PTA approved phones, verified sellers and best deals on MobileBazar.`,
    alternates: {
      canonical: canonicalPath,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export default async function CityLandingPage({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const validation = await validateLandingSlugs({ city: citySlug })

  if (!validation?.city) {
    notFound()
  }

  const { city } = validation
  const [stats, initialAds, relatedLinks] = await Promise.all([
    getLandingStats({ citySlug: city.slug }),
    getLandingAds({ citySlug: city.slug }),
    getRelatedLandingLinks({ citySlug: city.slug }),
  ])

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Mobiles', url: '/ads' },
    { name: city.name, url: `/mobiles/${city.slug}` },
  ]

  return (
    <LandingPageLayout
      h1={`Used Mobile Phones for Sale in ${city.name}`}
      canonicalPath={`/mobiles/${city.slug}`}
      breadcrumbs={breadcrumbs}
      stats={stats}
      initialAds={initialAds}
      relatedLinks={relatedLinks}
      citySlug={city.slug}
      cityName={city.name}
    />
  )
}
