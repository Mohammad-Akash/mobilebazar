import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/src/types/supabase'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, do not crash the proxy/middleware
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  // ── Performance: skip the network round-trip when it is not needed ──────────
  // 1. Next.js prefetch requests never need a refreshed session cookie.
  // 2. If there is no Supabase auth cookie the user is logged-out; nothing to
  //    refresh, so return early and save the RTT to Supabase Auth.
  const isPrefetch =
    request.headers.get('Next-Router-Prefetch') === '1' ||
    request.headers.get('Purpose') === 'prefetch'

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

  if (isPrefetch || !hasAuthCookie) {
    return supabaseResponse
  }
  // ────────────────────────────────────────────────────────────────────────────

  try {
    const supabase = createServerClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // IMPORTANT: DO NOT REMOVE auth.getUser()
    // This verifies the user's JWT and refreshes the auth token via cookies.
    // Only runs for authenticated users (cookie check above).
    await supabase.auth.getUser()
  } catch {
    // Do not crash requests if auth check or connection fails
  }

  return supabaseResponse
}

