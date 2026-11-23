'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { createClient } from '@/src/lib/supabase/client'
import { HeaderChatBadge } from '@/app/components/HeaderChatBadge'

interface HeaderAuthPillProps {
  logoutAction: () => Promise<void>
}

export function HeaderAuthPill({ logoutAction }: HeaderAuthPillProps) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const supabase = createClient()

    let isMounted = true

    async function fetchUser() {
      try {
        const { data } = await supabase.auth.getUser()
        if (!isMounted) return
        if (data.user) {
          setUser(data.user)
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', data.user.id)
            .maybeSingle()
          if (!isMounted) return
          setFullName(profile?.full_name || data.user.email?.split('@')[0] || 'User')
        }
      } catch {
        // guest or offline
      }
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
        setFullName(null)
      }
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (!isClient || !user) {
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
        <span className="max-w-[100px] truncate">{fullName}</span>
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
