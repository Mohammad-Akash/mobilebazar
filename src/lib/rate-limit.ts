// ==============================================================================
// Upstash Redis Rate Limiting & Client IP Detection
// Supports Vercel, Cloudflare Proxy, and Localhost
// Fail-safe design:
//   - otp_send fails CLOSED in production if Redis is unreachable (stops SMS pumping)
//   - other endpoints fail OPEN to avoid breaking legitimate traffic if Redis blips
// ==============================================================================

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

// Initialize Redis only if environment variables are provided
const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
)

const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

/**
 * Extracts reliable client IP address
 * Priority:
 * 1. cf-connecting-ip (Cloudflare proxy, cannot be spoofed by client)
 * 2. x-forwarded-for (first IP in chain = real client on Vercel)
 * 3. x-real-ip
 * 4. Fallback 127.0.0.1
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers()

  const cfIp = headerList.get('cf-connecting-ip')
  if (cfIp) return cfIp.trim()

  const xff = headerList.get('x-forwarded-for')
  if (xff) {
    const ips = xff.split(',')
    if (ips.length > 0 && ips[0].trim()) {
      return ips[0].trim()
    }
  }

  const realIp = headerList.get('x-real-ip')
  if (realIp) return realIp.trim()

  return '127.0.0.1'
}

// ── Rate Limiter Factory ───────────────────────────────────────────────────────
function createLimiter(requests: number, windowStr: `${number} s` | `${number} m` | `${number} h`) {
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, windowStr),
    analytics: false,
    prefix: 'mb_rl',
  })
}

// ── Named Limiters ─────────────────────────────────────────────────────────────
export const limiters = {
  login: createLimiter(10, '15 m'),
  signup: createLimiter(5, '60 m'),
  otp_send: createLimiter(3, '60 m'),
  otp_verify: createLimiter(5, '15 m'),
  report: createLimiter(10, '60 m'),
  post_ad: createLimiter(10, '60 m'),
  contact_reveal: createLimiter(30, '60 m'),
  search: createLimiter(60, '60 m'),
}

export type LimiterName = keyof typeof limiters

export interface RateLimitCheckResult {
  success: boolean
  remaining?: number
  reset?: number // Unix timestamp ms
  retryAfterSeconds?: number
}

/**
 * Rate limit check function
 * @param type Limiter type name
 * @param customIdentifier Optional identifier (e.g. user ID or phone); defaults to client IP
 */
export async function checkRateLimit(
  type: LimiterName,
  customIdentifier?: string
): Promise<RateLimitCheckResult> {
  const limiter = limiters[type]

  // If Upstash is not configured:
  if (!limiter) {
    // In production, otp_send must fail CLOSED to prevent SMS pumping
    if (type === 'otp_send' && process.env.NODE_ENV === 'production') {
      return {
        success: false,
        retryAfterSeconds: 60,
      }
    }
    // In dev or for non-sensitive actions, allow request
    return { success: true }
  }

  const identifier = customIdentifier || (await getClientIp())
  const key = `${type}:${identifier}`

  try {
    const result = await limiter.limit(key)
    if (!result.success) {
      const now = Date.now()
      const retryAfter = Math.max(1, Math.ceil((result.reset - now) / 1000))
      return {
        success: false,
        remaining: result.remaining,
        reset: result.reset,
        retryAfterSeconds: retryAfter,
      }
    }
    return {
      success: true,
      remaining: result.remaining,
      reset: result.reset,
    }
  } catch (error) {
    console.error(`[RateLimit Error: ${type}]`, error)
    // Fail CLOSED for otp_send; Fail OPEN for others
    if (type === 'otp_send') {
      return { success: false, retryAfterSeconds: 60 }
    }
    return { success: true }
  }
}
