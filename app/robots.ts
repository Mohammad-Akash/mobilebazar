import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/src/lib/seo/site'

/**
 * Generates dynamic robots.txt
 * - When NEXT_PUBLIC_ALLOW_INDEXING=false (pre-launch), blocks all crawlers from everything.
 * - When active, disallows private pages, APIs, and auth routes.
 *
 * NOTE on filtered URLs (/ads?city=...):
 * We intentionally do NOT disallow query parameters in robots.txt because:
 * 1. If Googlebot is blocked by robots.txt from fetching a URL, it cannot read the HTML meta tags
 *    (e.g., canonical or noindex), and might still index the raw URL as a bare link without snippet.
 * 2. Allowing Googlebot to crawl filter URLs enables it to see the <meta name="robots" content="noindex, follow">
 *    and the <link rel="canonical" href="..."> pointing to the clean canonical landing page.
 *    This safely passes internal link equity while preventing duplicate content in index.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_CONFIG.allowIndexing) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/api/',
          '/auth/',
          '/login',
          '/signup',
          '/post-ad',
          '/post-ad/',
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}

