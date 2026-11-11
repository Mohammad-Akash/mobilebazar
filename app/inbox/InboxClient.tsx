'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ConversationRow } from './components/ConversationRow'
import type { ConversationListItem } from '@/src/types/chat'
import { createClient } from '@/src/lib/supabase/client'
import { MessageSquare, Search, Smartphone, ShoppingBag, ArrowRight } from 'lucide-react'

interface InboxClientProps {
  initialConversations: ConversationListItem[]
}

export function InboxClient({ initialConversations }: InboxClientProps) {
  const router = useRouter()
  const [conversations, setConversations] = useState<ConversationListItem[]>(initialConversations)
  const [activeTab, setActiveTab] = useState<'all' | 'buying' | 'selling'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setConversations(initialConversations)
  }, [initialConversations])

  // Supabase Realtime listener on conversations
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('inbox_conversations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          // Re-fetch inbox state via router refresh
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router])

  // Filter by tab and search
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (activeTab === 'buying' && !c.is_buyer) return false
      if (activeTab === 'selling' && c.is_buyer) return false

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = c.ad_title.toLowerCase().includes(query)
        const matchesUser = (c.other_user_name || '').toLowerCase().includes(query)
        const matchesPreview = (c.last_message_preview || '').toLowerCase().includes(query)
        return matchesTitle || matchesUser || matchesPreview
      }

      return true
    })
  }, [conversations, activeTab, searchQuery])

  const totalUnread = useMemo(() => {
    return conversations.reduce((acc, c) => acc + (c.unread_count || 0), 0)
  }, [conversations])

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E7EF] dark:border-[#2D2947]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#17152B] dark:text-[#F7F6F2] tracking-tight">
              Messages Inbox
            </h1>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#7657FF] text-white text-xs font-bold">
                {totalUnread} new
              </span>
            )}
          </div>
          <p className="text-xs text-[#77758A] dark:text-[#9B98B2] mt-0.5">
            Direct chat threads with verified buyers and sellers on MobileBazar.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#77758A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages or models..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] focus:border-[#7657FF] rounded-xl text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#17152B] text-white dark:bg-[#F7F6F2] dark:text-[#17152B] shadow-xs'
              : 'bg-[#FFFFFF] dark:bg-[#17152B] text-[#77758A] dark:text-[#9B98B2] border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]'
          }`}
        >
          All Threads ({conversations.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('buying')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'buying'
              ? 'bg-[#17152B] text-white dark:bg-[#F7F6F2] dark:text-[#17152B] shadow-xs'
              : 'bg-[#FFFFFF] dark:bg-[#17152B] text-[#77758A] dark:text-[#9B98B2] border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Buying</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('selling')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'selling'
              ? 'bg-[#17152B] text-white dark:bg-[#F7F6F2] dark:text-[#17152B] shadow-xs'
              : 'bg-[#FFFFFF] dark:bg-[#17152B] text-[#77758A] dark:text-[#9B98B2] border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Selling</span>
        </button>
      </div>

      {/* Conversation List */}
      {filteredConversations.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7657FF]/10 text-[#7657FF] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F6F2]">
              {searchQuery ? 'Koi matching conversation nahi mili' : 'Koi messages nahi hain'}
            </h3>
            <p className="text-xs text-[#77758A] dark:text-[#9B98B2] max-w-sm mx-auto">
              {searchQuery
                ? 'Apna search query change karein ya filters check karein.'
                : 'Marketplace par smartphones browse karein aur direct sellers se chat karein.'}
            </p>
          </div>
          {!searchQuery && (
            <Link
              href="/ads"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7657FF] text-white font-bold text-xs shadow-sm hover:bg-[#6343ED] transition-all"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredConversations.map((conv) => (
            <ConversationRow key={conv.conversation_id} conversation={conv} />
          ))}
        </div>
      )}
    </div>
  )
}
