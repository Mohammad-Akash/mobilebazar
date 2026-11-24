'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { createClient } from '@/src/lib/supabase/client'
import { HeaderChatBadge } from '@/app/components/HeaderChatBadge'

interface HeaderAuthPillProps {
  logoutAction: () => Promise<void>
}

export function HeaderAuthPill({ logoutAction }: HeaderAuthPillProps) {
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  // Start as false so SSR and first-client paint both render "Sign In" (no flicker)
  const [ready, setReady] = useState(false)

  const fetchName = useCallback(async (uid: string, email?: string) => {
    try {
      const supabase = createClient()
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', uid)
        .maybeSingle()
      setDisplayName(profile?.full_name || email?.split('@')[0] || 'User')
    } catch {
      setDisplayName(email?.split('@')[0] || 'User')
    }
  }, [])

  useEffect(() => {
    const supabase = createClient()
    let isMounted = true

    async function init() {
      // 1. getSession() is instant (reads from storage, no network call)
      //    Use it to immediately show logged-in state without waiting for getUser()
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session

      if (!isMounted) return

      if (session?.user) {
        // Show user immediately from session — no network round-trip needed yet
        setUserId(session.user.id)
        setReady(true)
        // Fetch display name in background (non-blocking)
        fetchName(session.user.id, session.user.email ?? undefined)
      } else {
        setReady(true)
      }

      // 2. Also do getUser() in background to ensure token is fresh (security best practice)
      //    but don't block the UI on it
      supabase.auth.getUser().catch(() => {/* ignore */})
    }

    init()

    // 3. Subscribe to auth state changes for login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      if (session?.user) {
        setUserId(session.user.id)
        setReady(true)
        // Fetch the profile name when auth state changes (login event)
        fetchName(session.user.id, session.user.email ?? undefined)
      } else {
        setUserId(null)
        setDisplayName(null)
        setReady(true)
      }
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [fetchName])

  // Not hydrated yet — render nothing (avoids mismatch with SSR "Sign In")
  if (!ready) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Tiny skeleton so layout doesn't jump */}
        <div className="w-16 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/login"
          className="text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] py-2 px-2.5 transition-colors min-h-[44px] flex items-center"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <HeaderChatBadge />
      <Link
        href="/dashboard"
        className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] dark:hover:text-[#8A6FFF] py-2 px-3 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] transition-colors min-h-[44px]"
        title="Go to Dashboard"
      >
        <User className="w-3.5 h-3.5 text-[#7657FF]" />
        <span className="max-w-[100px] truncate">
          {displayName ?? '...'}
        </span>
      </Link>
      <form action={logoutAction} className="hidden lg:block">
        <button
          type="submit"
          className="text-xs font-medium text-[#77758A] hover:text-[#E45858] dark:text-[#9B98B2] dark:hover:text-[#E45858] py-2 px-2 transition-colors cursor-pointer min-h-[44px] flex items-center"
        >
          Logout
        </button>
      </form>
    </div>
  )
}
