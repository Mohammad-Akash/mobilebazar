'use client'

import { useState, useEffect, useRef } from 'react'
import { ThreadHeader } from './components/ThreadHeader'
import { PinnedAdCard } from './components/PinnedAdCard'
import { SafetyBanner } from './components/SafetyBanner'
import { MessageBubble } from './components/MessageBubble'
import { QuickReplies } from './components/QuickReplies'
import { ThreadInput } from './components/ThreadInput'
import { BlockReportModal } from './components/BlockReportModal'
import { sendMessageAction, markReadAction } from '@/src/lib/actions/chat'
import { createClient } from '@/src/lib/supabase/client'
import type { ChatMessage } from '@/src/types/chat'
import { AlertCircle } from 'lucide-react'

interface ThreadClientProps {
  conversationId: string
  currentUserId: string
  isBuyer: boolean
  ad: {
    id: string
    title: string
    price: number | null
    status: string
    pta_status: string | null
    ad_images?: Array<{ storage_path: string; position: number }>
  }
  otherUser: {
    id: string
    full_name: string | null
    avatar_url: string | null
    is_phone_verified: boolean
  }
  initialMessages: ChatMessage[]
}

export function ThreadClient({
  conversationId,
  currentUserId,
  isBuyer,
  ad,
  otherUser,
  initialMessages,
}: ThreadClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [modalMode, setModalMode] = useState<'block' | 'report' | null>(null)
  const [errorBanner, setErrorBanner] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom helper
  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      })
    }
  }

  // Mark conversation read on mount and focus
  useEffect(() => {
    markReadAction(conversationId)
    scrollToBottom(false)

    const onFocus = () => {
      markReadAction(conversationId)
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [conversationId])

  // Supabase Realtime subscription on messages table
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`chat_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as {
            id: number
            conversation_id: string
            sender_id: string
            kind: 'text' | 'offer' | 'system'
            body: string
            offer_amount: number | null
            created_at: string
          }

          setMessages((prev) => {
            // Deduplicate if already present (e.g. from optimistic update)
            if (prev.some((m) => m.id === newMsg.id)) {
              return prev
            }
            return [
              ...prev,
              {
                ...newMsg,
                is_mine: newMsg.sender_id === currentUserId,
              },
            ]
          })

          // Mark read if incoming from other user
          if (newMsg.sender_id !== currentUserId) {
            markReadAction(conversationId)
          }

          setTimeout(() => scrollToBottom(true), 100)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, currentUserId])

  // Handle message sending
  const handleSend = async (text: string, kind: 'text' | 'offer' = 'text', offerAmount?: number) => {
    setErrorBanner(null)

    // Call server action
    const res = await sendMessageAction(conversationId, text, kind, offerAmount)

    if (!res.success) {
      setErrorBanner(res.message || 'Message deliver nahi ho saka.')
      if (res.code === 'BLOCKED') {
        setIsBlocked(true)
      }
      return false
    }

    if (res.has_phone_number) {
      setErrorBanner('Phone number detect hua hai. Hamesha safe public jagah mil kar deal karein.')
    }

    setTimeout(() => scrollToBottom(true), 100)
    return true
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  const handleActionSuccess = (action: 'blocked' | 'reported') => {
    if (action === 'blocked') {
      setIsBlocked(true)
      setErrorBanner('Aap ne is user ko block kar diya hai.')
    } else {
      setErrorBanner('Aap ki report submit ho chuki hai. MobileBazar moderation team jald review kare gi.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-6rem)] min-h-[500px] bg-[#FFFFFF] dark:bg-[#17152B] rounded-3xl border border-[#E9E7EF] dark:border-[#2D2947] shadow-xl overflow-hidden">
      {/* Header */}
      <ThreadHeader
        otherUserName={otherUser.full_name || 'MobileBazar User'}
        otherUserAvatar={otherUser.avatar_url}
        isPhoneVerified={otherUser.is_phone_verified}
        onActionClick={(mode) => setModalMode(mode)}
      />

      {/* Pinned Ad Bar & Safety Banner */}
      <div className="p-3 sm:p-4 bg-[#F7F6F2] dark:bg-[#121120] border-b border-[#E9E7EF] dark:border-[#2D2947] space-y-2">
        <PinnedAdCard ad={ad} />
        <SafetyBanner />
      </div>

      {/* Error / Alert notice */}
      {errorBanner && (
        <div className="p-2.5 mx-3 mt-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner(null)}
            className="text-xs font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#F7F6F2]/30 dark:bg-[#0E0D1A]/30 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
              Yeh conversation shuru ho gayi hai
            </p>
            <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] max-w-xs">
              Handset ki condition, PTA status, battery health aur physical meeting ke bare mein baat karein.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onQuickResponse={handleQuickReply}
            />
          ))
        )}
      </div>

      {/* Quick Replies Strip */}
      <div className="px-4 py-2 border-t border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B]">
        <QuickReplies onSelect={handleQuickReply} isBuyer={isBuyer} />
      </div>

      {/* Sticky Bottom Input */}
      <div className="p-3 sm:p-4 bg-[#FFFFFF] dark:bg-[#17152B] border-t border-[#E9E7EF] dark:border-[#2D2947]">
        <ThreadInput
          onSend={(text) => handleSend(text)}
          conversationId={conversationId}
          disabled={isBlocked}
          disabledReason={isBlocked ? 'Aap ne is user ko block kiya hua hai.' : undefined}
        />
      </div>

      {/* Block & Report Modal */}
      <BlockReportModal
        conversationId={conversationId}
        otherUserId={otherUser.id}
        otherUserName={otherUser.full_name || 'User'}
        mode={modalMode}
        onClose={() => setModalMode(null)}
        onSuccess={handleActionSuccess}
      />
    </div>
  )
}
