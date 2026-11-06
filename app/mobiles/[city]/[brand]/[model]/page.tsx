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

interface CityBrandModelPageProps {
  params: Promise<{ city: string; brand: string; model: string }>
}

export async function generateMetadata({ params }: CityBrandModelPageProps): Promise<Metadata> {
  const { city: citySlug, brand: brandSlug, model: modelSlug } = await params
  const validation = await validateLandingSlugs({
    city: citySlug,
    brand: brandSlug,
    model: modelSlug,
  })

  if (!validation?.city || !validation?.brand || !validation?.model) {
    return { title: 'Not Found' }
  }

  const { city, brand, model } = validation
  const stats = await getLandingStats({
    citySlug: city.slug,
    brandSlug: brand.slug,
    modelSlug: model.slug,
  })
  const canonicalPath = `/mobiles/${city.slug}/${brand.slug}/${model.slug}`

  const isIndexable =
    SITE_CONFIG.allowIndexing && stats.adCount >= SITE_CONFIG.minIndexableAds

  return {
    title: `Used ${brand.name} ${model.name} for Sale in ${city.name} — Prices`,
    description: `Buy verified used ${brand.name} ${model.name} in ${city.name}. Current market price ranges from Rs ${stats.minPrice?.toLocaleString() || 'N/A'} on MobileBazar. Safe buyer inspection.`,
    alternates: {
      canonical: canonicalPath,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export default async function CityBrandModelLandingPage({
  params,
}: CityBrandModelPageProps) {
  const { city: citySlug, brand: brandSlug, model: modelSlug } = await params
  const validation = await validateLandingSlugs({
    city: citySlug,
    brand: brandSlug,
    model: modelSlug,
  })

  if (!validation?.city || !validation?.brand || !validation?.model) {
    notFound()
  }

  const { city, brand, model } = validation
  const [stats, initialAds, relatedLinks] = await Promise.all([
    getLandingStats({
      citySlug: city.slug,
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }),
    getLandingAds({
      citySlug: city.slug,
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }),
    getRelatedLandingLinks({
      citySlug: city.slug,
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }),
  ])

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: city.name, url: `/mobiles/${city.slug}` },
    { name: brand.name, url: `/mobiles/${city.slug}/${brand.slug}` },
    { name: model.name, url: `/mobiles/${city.slug}/${brand.slug}/${model.slug}` },
  ]

  return (
    <LandingPageLayout
      h1={`Used ${brand.name} ${model.name} for Sale in ${city.name}`}
      canonicalPath={`/mobiles/${city.slug}/${brand.slug}/${model.slug}`}
      breadcrumbs={breadcrumbs}
      stats={stats}
      initialAds={initialAds}
      relatedLinks={relatedLinks}
      citySlug={city.slug}
      cityName={city.name}
      brandSlug={brand.slug}
      brandName={brand.name}
      modelSlug={model.slug}
      modelName={model.name}
    />
  )
}
