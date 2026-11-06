/**
 * SEO & Site Configuration
 * Centralized site metadata, environment-based indexability rules, and absolute URL helpers.
 */

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const CLEAN_SITE_URL = RAW_SITE_URL.replace(/\/+$/, '')

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'MobileBazar',
  url: CLEAN_SITE_URL,
  description:
    'Buy and sell mobile phones across Pakistan. PTA verified phones, genuine specs, and trusted sellers in Lahore, Karachi, Islamabad and nationwide.',
  defaultOgImage: '/og-default.png',
  minIndexableAds: 3,
  // Launch index switch: when false, the entire site is blocked from indexing
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
} as const

/**
 * Returns an absolute URL for a given pathname.
 * Handles leading/trailing slashes gracefully.
 */
export function absoluteUrl(path: string = ''): string {
  if (!path) return SITE_CONFIG.url
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_CONFIG.url}${cleanPath}`
}

