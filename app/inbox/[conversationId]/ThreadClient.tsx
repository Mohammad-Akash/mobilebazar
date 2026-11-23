'use client'

import { useState, useEffect, useRef } from 'react'
import { ThreadHeader } from './components/ThreadHeader'
import { PinnedAdCard } from './components/PinnedAdCard'
import { SafetyBanner } from './components/SafetyBanner'
import { MessageBubble } from './components/MessageBubble'
import { QuickReplies } from './components/QuickReplies'
import { ThreadInput } from './components/ThreadInput'
import { BlockReportModal } from './components/BlockReportModal'
import { ChatOfferModal } from './components/ChatOfferModal'
import { SharePhoneModal } from './components/SharePhoneModal'
import { ImageLightbox } from './components/ImageLightbox'
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
  initialOtherLastReadAt?: string | null
}

function sortMessagesChronologically(list: ChatMessage[]): ChatMessage[] {
  return [...list].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime()
    const timeB = new Date(b.created_at).getTime()
    if (timeA !== timeB) return timeA - timeB
    return Number(a.id) - Number(b.id)
  })
}

export function ThreadClient({
  conversationId,
  currentUserId,
  isBuyer,
  ad,
  otherUser,
  initialMessages,
  initialOtherLastReadAt,
}: ThreadClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    sortMessagesChronologically(initialMessages)
  )
  const [otherLastReadAt, setOtherLastReadAt] = useState<string | null>(initialOtherLastReadAt || null)
  const [isOtherOnline, setIsOtherOnline] = useState<boolean>(false)

  // Sync state if initialMessages changes
  useEffect(() => {
    setMessages(sortMessagesChronologically(initialMessages))
    setTimeout(() => scrollToBottom(false), 50)
  }, [initialMessages])

  const [modalMode, setModalMode] = useState<'block' | 'report' | null>(null)
  const [errorBanner, setErrorBanner] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)

  // Offer Modal State
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [offerModalInitialAmount, setOfferModalInitialAmount] = useState<number | undefined>(undefined)
  const [isOfferModalCounter, setIsOfferModalCounter] = useState(false)

  // Phone Modal State
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)

  // Lightbox State (Multiple Photos support)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [lightboxCaption, setLightboxCaption] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom helper
  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight + 1000,
        behavior: smooth ? 'smooth' : 'auto',
      })
    }
  }

  // Mark conversation read on mount and window focus
  useEffect(() => {
    markReadAction(conversationId)
    scrollToBottom(false)

    const onFocus = () => {
      markReadAction(conversationId)
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [conversationId])

  // Presence & Online / Active tracking + Conversation Read Receipts
  useEffect(() => {
    const supabase = createClient()

    // 1. Presence channel for Online / Active status
    const presenceChannel = supabase.channel(`presence_${conversationId}`, {
      config: { presence: { key: currentUserId } },
    })

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState()
        const otherPresences = state[otherUser.id]
        setIsOtherOnline(Boolean(otherPresences && otherPresences.length > 0))
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        if (key === otherUser.id) {
          setIsOtherOnline(true)
        }
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        if (key === otherUser.id) {
          setIsOtherOnline(false)
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: currentUserId,
            online_at: new Date().toISOString(),
          })
        }
      })

    // 2. Realtime subscription on conversations table for Seen / Read updates
    const convChannel = supabase
      .channel(`conv_status_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
          filter: `id=eq.${conversationId}`,
        },
        (payload) => {
          const updatedConv = payload.new as any
          const newReadAt = isBuyer
            ? updatedConv.seller_last_read_at
            : updatedConv.buyer_last_read_at
          if (newReadAt) {
            setOtherLastReadAt(newReadAt)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(presenceChannel)
      supabase.removeChannel(convChannel)
    }
  }, [conversationId, currentUserId, otherUser.id, isBuyer])

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
            if (prev.some((m) => m.id === newMsg.id)) {
              return prev
            }
            return sortMessagesChronologically([
              ...prev,
              {
                ...newMsg,
                is_mine: newMsg.sender_id === currentUserId,
              },
            ])
          })

          // Mark read if incoming from other user
          if (newMsg.sender_id !== currentUserId) {
            markReadAction(conversationId)
            setIsOtherOnline(true)
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
      setErrorBanner(res.message || 'Failed to deliver message.')
      if (res.code === 'BLOCKED') {
        setIsBlocked(true)
      }
      return false
    }

    if (res.has_phone_number && !text.startsWith('[CONTACT]:')) {
      setErrorBanner('Phone number detected. Always meet in a safe public place to finalize the deal.')
    }

    setTimeout(() => scrollToBottom(true), 100)
    return true
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  // Offer Handlers
  const handleOpenOfferModal = (initialAmount?: number, isCounter = false) => {
    setOfferModalInitialAmount(initialAmount)
    setIsOfferModalCounter(isCounter)
    setIsOfferModalOpen(true)
  }

  const handleSendOffer = async (amount: number, note: string) => {
    return await handleSend(note, 'offer', amount)
  }

  const handleAcceptOffer = async (amount: number) => {
    await handleSend(
      `✅ Offer Accepted! I am ready to do the deal for Rs ${amount.toLocaleString()}. When and where can we meet?`
    )
  }

  const handleRejectOffer = async (amount: number) => {
    await handleSend(
      `❌ Offer Declined: Thank you, but Rs ${amount.toLocaleString()} is too low for this device.`
    )
  }

  const handleCounterOffer = (amount: number) => {
    handleOpenOfferModal(amount, true)
  }

  // Phone Share Handler
  const handleSendPhone = async (phone: string, note?: string) => {
    const body = note ? `[CONTACT]:${phone}\n${note}` : `[CONTACT]:${phone}`
    return await handleSend(body)
  }

  const handleActionSuccess = (action: 'blocked' | 'reported') => {
    if (action === 'blocked') {
      setIsBlocked(true)
      setErrorBanner('You have blocked this user.')
    } else {
      setErrorBanner('Your report has been submitted. The MobileBazar moderation team will review it shortly.')
    }
  }

  // Calculate human-friendly last seen string
  const getLastSeenText = () => {
    if (isOtherOnline) return 'Active Now'
    if (!otherLastReadAt) return 'Active recently'
    try {
      const diffMs = Date.now() - new Date(otherLastReadAt).getTime()
      const diffMinutes = Math.floor(diffMs / 60000)
      if (diffMinutes < 1) return 'Active just now'
      if (diffMinutes < 60) return `Active ${diffMinutes}m ago`
      const diffHours = Math.floor(diffMinutes / 60)
      if (diffHours < 24) return `Active ${diffHours}h ago`
      return `Last seen ${new Date(otherLastReadAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}`
    } catch {
      return 'Active recently'
    }
  }

  return (
    <div className="fixed inset-0 z-50 sm:relative sm:inset-auto sm:z-auto max-w-4xl mx-auto flex flex-col h-dvh sm:h-[calc(100dvh-6rem)] min-h-0 bg-[#FFFFFF] dark:bg-[#17152B] sm:rounded-3xl border-0 sm:border border-[#E9E7EF] dark:border-[#2D2947] sm:shadow-xl overflow-hidden">
      {/* Header with Live Active/Online Status & Last Seen */}
      <ThreadHeader
        otherUserName={otherUser.full_name || 'MobileBazar User'}
        otherUserAvatar={otherUser.avatar_url}
        isPhoneVerified={otherUser.is_phone_verified}
        isOnline={isOtherOnline}
        lastSeenText={getLastSeenText()}
        onActionClick={(mode) => setModalMode(mode)}
        onSharePhone={() => setIsPhoneModalOpen(true)}
      />

      {/* Pinned Ad Bar & Safety Banner */}
      <div className="p-2 sm:p-3 bg-[#F7F6F2] dark:bg-[#121120] border-b border-[#E9E7EF] dark:border-[#2D2947] space-y-1.5 shrink-0">
        <PinnedAdCard
          ad={ad}
          onOpenOfferModal={() => handleOpenOfferModal(ad.price || undefined, false)}
        />
        <SafetyBanner />
      </div>

      {/* Error / Alert notice */}
      {errorBanner && (
        <div className="p-2.5 mx-3 mt-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner(null)}
            className="text-xs font-bold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Messages Scroll Area with Professional WhatsApp-Style Read Receipts */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 bg-[#F7F6F2]/30 dark:bg-[#0E0D1A]/30 scroll-smooth min-h-0"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
              Conversation started
            </p>
            <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] max-w-xs">
              Discuss phone condition, PTA approval status, battery health, and arrange a safe in-person meeting.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isSeen =
              msg.is_mine &&
              Boolean(otherLastReadAt && new Date(msg.created_at) <= new Date(otherLastReadAt))

            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                isSeen={isSeen}
                onQuickResponse={handleQuickReply}
                onAcceptOffer={handleAcceptOffer}
                onRejectOffer={handleRejectOffer}
                onCounterOffer={handleCounterOffer}
                onImagesClick={(images, initialIndex, caption) => {
                  setLightboxImages(images)
                  setLightboxIndex(initialIndex)
                  setLightboxCaption(caption || null)
                }}
              />
            )
          })
        )}
      </div>

      {/* Quick Replies Strip */}
      <div className="px-3 py-1.5 sm:px-4 sm:py-2 border-t border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] shrink-0">
        <QuickReplies onSelect={handleQuickReply} isBuyer={isBuyer} />
      </div>

      {/* Sticky Bottom Input with Multiple Photos, Rich Emoji Picker, Phone & Offer Buttons */}
      <div className="p-2 sm:p-4 bg-[#FFFFFF] dark:bg-[#17152B] border-t border-[#E9E7EF] dark:border-[#2D2947] shrink-0 safe-bottom">
        <ThreadInput
          onSend={(text, kind, offerAmount) => handleSend(text, kind, offerAmount)}
          onOpenOfferModal={() => handleOpenOfferModal(ad.price || undefined, false)}
          onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
          currentUserId={currentUserId}
          conversationId={conversationId}
          disabled={isBlocked}
          disabledReason={isBlocked ? 'You have blocked this user.' : undefined}
        />
      </div>

      {/* In-Chat Make/Counter Offer Modal */}
      <ChatOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        adTitle={ad.title}
        adPrice={ad.price}
        initialAmount={offerModalInitialAmount}
        isCounter={isOfferModalCounter}
        onSendOffer={handleSendOffer}
      />

      {/* Share Phone Modal */}
      <SharePhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSendPhone={handleSendPhone}
      />

      {/* Multi-Photo Lightbox Gallery View */}
      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        caption={lightboxCaption}
        onClose={() => setLightboxImages([])}
      />

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
