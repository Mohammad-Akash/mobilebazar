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

interface BrandModelPageProps {
  params: Promise<{ brand: string; model: string }>
}

export async function generateMetadata({ params }: BrandModelPageProps): Promise<Metadata> {
  const { brand: brandSlug, model: modelSlug } = await params
  const validation = await validateLandingSlugs({
    brand: brandSlug,
    model: modelSlug,
  })

  if (!validation?.brand || !validation?.model) {
    return { title: 'Not Found' }
  }

  const { brand, model } = validation
  const stats = await getLandingStats({
    brandSlug: brand.slug,
    modelSlug: model.slug,
  })
  const canonicalPath = `/brands/${brand.slug}/${model.slug}`

  const isIndexable =
    SITE_CONFIG.allowIndexing && stats.adCount >= SITE_CONFIG.minIndexableAds

  return {
    title: `Used ${brand.name} ${model.name} Price in Pakistan & Phones for Sale`,
    description: `Check used and new ${brand.name} ${model.name} prices in Pakistan. ${stats.adCount}+ ads from Karachi, Lahore, Islamabad & more on MobileBazar. PTA verified.`,
    alternates: {
      canonical: canonicalPath,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export default async function BrandModelLandingPage({
  params,
}: BrandModelPageProps) {
  const { brand: brandSlug, model: modelSlug } = await params
  const validation = await validateLandingSlugs({
    brand: brandSlug,
    model: modelSlug,
  })

  if (!validation?.brand || !validation?.model) {
    notFound()
  }

  const { brand, model } = validation
  const [stats, initialAds, relatedLinks] = await Promise.all([
    getLandingStats({
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }),
    getLandingAds({
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }),
    getRelatedLandingLinks({
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }),
  ])

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: brand.name, url: `/brands/${brand.slug}` },
    { name: model.name, url: `/brands/${brand.slug}/${model.slug}` },
  ]

  return (
    <LandingPageLayout
      h1={`Used ${brand.name} ${model.name} for Sale in Pakistan`}
      canonicalPath={`/brands/${brand.slug}/${model.slug}`}
      breadcrumbs={breadcrumbs}
      stats={stats}
      initialAds={initialAds}
      relatedLinks={relatedLinks}
      brandSlug={brand.slug}
      brandName={brand.name}
      modelSlug={model.slug}
      modelName={model.name}
    />
  )
}
