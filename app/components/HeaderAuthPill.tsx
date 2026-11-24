'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
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
  const [ready, setReady] = useState(false)
  // Guard so we don't set state after unmount
  const mountedRef = useRef(true)

  const fetchName = useCallback(async (uid: string, email?: string) => {
    try {
      const supabase = createClient()
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', uid)
        .maybeSingle()
      if (!mountedRef.current) return
      setDisplayName(profile?.full_name || email?.split('@')[0] || 'User')
    } catch {
      if (mountedRef.current) setDisplayName(email?.split('@')[0] || 'User')
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    const supabase = createClient()

    /**
     * onAuthStateChange fires INITIAL_SESSION immediately on mount.
     * After a server-action login (cookie set server-side), Supabase's
     * browser client detects the cookie and fires INITIAL_SESSION with
     * the real session — no manual getSession() call needed.
     *
     * This avoids the race condition where getSession() returns null
     * (localStorage empty) before the cookie→localStorage sync happens.
     */
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mountedRef.current) return

      if (
        event === 'INITIAL_SESSION' ||
        event === 'SIGNED_IN' ||
        event === 'TOKEN_REFRESHED' ||
        event === 'USER_UPDATED'
      ) {
        if (session?.user) {
          setUserId(session.user.id)
          fetchName(session.user.id, session.user.email ?? undefined)
        } else {
          setUserId(null)
          setDisplayName(null)
        }
        // Mark ready after INITIAL_SESSION so we never flash "Sign In"
        // before we know the actual auth state
        setReady(true)
      } else if (event === 'SIGNED_OUT') {
        setUserId(null)
        setDisplayName(null)
        setReady(true)
      }
    })

    return () => {
      mountedRef.current = false
      authListener.subscription.unsubscribe()
    }
  }, [fetchName])

  // Still resolving — show a subtle skeleton to avoid layout shift
  if (!ready) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-16 h-7 rounded-lg bg-slate-200 dark:bg-[#2D2947] animate-pulse" />
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
