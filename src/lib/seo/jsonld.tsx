import React from 'react'
import { SITE_CONFIG, absoluteUrl } from './site'

/**
 * JsonLd component
 * Serializes schema objects safely by escaping "<" to prevent script breakout (XSS).
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}) {
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  )
}

/**
 * Organization schema for Site-wide / Homepage
 */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: absoluteUrl('/logo.png'),
    description: SITE_CONFIG.description,
  }
}

/**
 * BreadcrumbList schema
 */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

/**
 * Product + Offer schema for Ad Detail
 * STRICT GOOGLE COMPLIANCE:
 * - Genuine price in PKR
 * - InStock or SoldOut availability
 * - NewCondition or UsedCondition
 * - NEVER include seller phone, email, name, IMEI, or fake review/rating.
 */
export interface ProductJsonLdInput {
  id: string
  title: string
  description?: string | null
  price: number
  brandName?: string | null
  images?: string[]
  canonicalPath: string
  status: 'active' | 'sold' | 'expired' | 'deleted' | string
  condition?: 'new' | 'used' | string | null
}

export function buildProductJsonLd(input: ProductJsonLdInput) {
  const isAvailable = input.status === 'active'
  const isNew = input.condition === 'new'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.title,
    sku: input.id,
    image: input.images && input.images.length > 0 ? input.images : [absoluteUrl(SITE_CONFIG.defaultOgImage)],
    description: input.description
      ? input.description.replace(/[\r\n]+/g, ' ').slice(0, 300)
      : input.title,
    ...(input.brandName
      ? {
          brand: {
            '@type': 'Brand',
            name: input.brandName,
          },
        }
      : {}),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(input.canonicalPath),
      priceCurrency: 'PKR',
      price: input.price,
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      itemCondition: isNew
        ? 'https://schema.org/NewCondition'
        : 'https://schema.org/UsedCondition',
    },
  }
}

/**
 * ItemList schema for Landing Pages (lists first N ads for rich snippets)
 */
export function buildItemListJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(item.url),
      name: item.name,
    })),
  }
}

