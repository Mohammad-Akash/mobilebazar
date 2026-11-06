// ==============================================================================
// Public (Cookie-less) Supabase Client
// Used for SEO pages (landing pages, sitemap) that must be cacheable via ISR.
// This client does NOT read cookies, so the page stays static/ISR.
// It only has anon-level access (public data only).
// ==============================================================================

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/src/types/supabase'

/**
 * Singleton instance – reused across all requests in the same
 * server process so we don't create a new client on every call.
 */
let publicClient: ReturnType<typeof createSupabaseClient<Database>> | null = null

/**
 * Returns a cookie-less Supabase client with anon-level access.
 *
 * Why cookie-less?
 * ─────────────────
 * Landing pages and sitemaps are generated at build time (SSG) or
 * revalidated periodically (ISR). If the client read cookies, Next.js
 * would treat the page as dynamic (per-request), killing cacheability.
 *
 * Security note:
 * ──────────────
 * This client can only read data that Row-Level Security (RLS)
 * exposes to the `anon` role — no private data is accessible.
 */
export function createPublicClient() {
  // Return the cached singleton if it already exists
  if (publicClient) return publicClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  publicClient = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Do NOT persist sessions — this keeps the client stateless
      persistSession: false,
      // Do NOT auto-refresh tokens — no user sessions involved
      autoRefreshToken: false,
    },
  })

  return publicClient
}
