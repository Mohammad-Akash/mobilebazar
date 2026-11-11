'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { createClient } from '@/src/lib/supabase/client'

export function HeaderChatBadge() {
  const [unreadCount, setUnreadCount] = useState<number>(0)

  useEffect(() => {
    let isMounted = true
    const supabase = createClient()

    async function fetchUnread() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await (supabase.rpc as unknown as (name: string) => Promise<{ data: number | null; error: Error | null }>)(
          'get_unread_chat_total'
        )

        if (!error && isMounted && data !== null) {
          setUnreadCount(Number(data) || 0)
        }
      } catch {
        // silent fallback
      }
    }

    fetchUnread()

    // Poll periodically or on window focus
    const interval = setInterval(fetchUnread, 15000)
    window.addEventListener('focus', fetchUnread)

    return () => {
      isMounted = false
      clearInterval(interval)
      window.removeEventListener('focus', fetchUnread)
    }
  }, [])

  return (
    <Link
      href="/inbox"
      aria-label="Messages Inbox"
      className="relative p-2 rounded-xl text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
      title="Messages"
    >
      <MessageSquare className="w-4 h-4 stroke-[2]" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#7657FF] text-white text-[10px] font-black flex items-center justify-center leading-none shadow-xs animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Link>
  )
}
