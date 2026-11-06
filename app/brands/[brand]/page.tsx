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

interface BrandPageProps {
  params: Promise<{ brand: string }>
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params
  const validation = await validateLandingSlugs({ brand: brandSlug })

  if (!validation?.brand) {
    return { title: 'Brand Not Found' }
  }

  const { brand } = validation
  const stats = await getLandingStats({ brandSlug: brand.slug })
  const canonicalPath = `/brands/${brand.slug}`

  const isIndexable =
    SITE_CONFIG.allowIndexing && stats.adCount >= SITE_CONFIG.minIndexableAds

  return {
    title: `Used ${brand.name} Mobiles for Sale in Pakistan — Price & Models`,
    description: `Find ${stats.adCount}+ used and new ${brand.name} phones for sale across Pakistan. Compare prices, check PTA status and connect with verified sellers on MobileBazar.`,
    alternates: {
      canonical: canonicalPath,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export default async function BrandLandingPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params
  const validation = await validateLandingSlugs({ brand: brandSlug })

  if (!validation?.brand) {
    notFound()
  }

  const { brand } = validation
  const [stats, initialAds, relatedLinks] = await Promise.all([
    getLandingStats({ brandSlug: brand.slug }),
    getLandingAds({ brandSlug: brand.slug }),
    getRelatedLandingLinks({ brandSlug: brand.slug }),
  ])

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Brands', url: '/ads' },
    { name: brand.name, url: `/brands/${brand.slug}` },
  ]

  return (
    <LandingPageLayout
      h1={`Used ${brand.name} Mobile Phones for Sale in Pakistan`}
      canonicalPath={`/brands/${brand.slug}`}
      breadcrumbs={breadcrumbs}
      stats={stats}
      initialAds={initialAds}
      relatedLinks={relatedLinks}
      brandSlug={brand.slug}
      brandName={brand.name}
    />
  )
}
