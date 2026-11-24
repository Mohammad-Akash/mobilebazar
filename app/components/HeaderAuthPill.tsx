'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { createClient } from '@/src/lib/supabase/client'
import { HeaderChatBadge } from '@/app/components/HeaderChatBadge'

interface HeaderAuthPillProps {
  initialUser?: { id: string; email?: string } | null
  initialFullName?: string | null
  logoutAction: () => Promise<void>
}

export function HeaderAuthPill({
  initialUser = null,
  initialFullName = null,
  logoutAction,
}: HeaderAuthPillProps) {
  const [user, setUser] = useState(initialUser)
  const [fullName, setFullName] = useState(initialFullName)

  // Sync state if server re-renders and passes updated props (e.g. after login/logout)
  useEffect(() => {
    setUser(initialUser)
    setFullName(initialFullName)
  }, [initialUser, initialFullName])

  // Also listen for client-side auth events (e.g. client token refresh or cross-tab signout)
  useEffect(() => {
    const supabase = createClient()
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .maybeSingle()
          setFullName(profile?.full_name || session.user.email?.split('@')[0] || 'User')
        } catch {
          setFullName(session.user.email?.split('@')[0] || 'User')
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setFullName(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (!user) {
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
          {fullName || user.email?.split('@')[0] || 'User'}
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
