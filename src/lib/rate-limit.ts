// ==============================================================================
// Rate Limiting & Client IP Detection
// Supports Upstash Redis with In-Memory fallback for seamless development & testing
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
  otp_send: createLimiter(5, '60 s'),
  otp_verify: createLimiter(10, '15 m'),
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

// In-Memory sliding cache when Redis is not yet provisioned
const memoryCache = new Map<string, { count: number; resetAt: number }>()

/**
 * Rate limit check function
 */
export async function checkRateLimit(
  type: LimiterName,
  customIdentifier?: string
): Promise<RateLimitCheckResult> {
  const limiter = limiters[type]
  const identifier = customIdentifier || (await getClientIp())
  const key = `${type}:${identifier}`

  // 1. If Upstash Redis is configured, use it
  if (limiter) {
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
      console.warn(`[RateLimit] Upstash call failed for ${type}, falling back to memory:`, error)
    }
  }

  // 2. Resilient In-Memory Limiter (Permits testing without Upstash keys)
  const now = Date.now()
  const windowMs = type === 'otp_send' ? 60 * 1000 : 15 * 60 * 1000
  const maxLimit = type === 'otp_send' ? 5 : 15

  const entry = memoryCache.get(key)
  if (!entry || now > entry.resetAt) {
    memoryCache.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: maxLimit - 1 }
  }

  if (entry.count >= maxLimit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
    return {
      success: false,
      retryAfterSeconds: retryAfter,
    }
  }

  entry.count += 1
  return {
    success: true,
    remaining: maxLimit - entry.count,
  }
}
