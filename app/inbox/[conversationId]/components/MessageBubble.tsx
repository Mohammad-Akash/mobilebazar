'use client'

import { OfferCard } from './OfferCard'
import type { ChatMessage } from '@/src/types/chat'
import { Check } from 'lucide-react'

interface MessageBubbleProps {
  message: ChatMessage
  onQuickResponse?: (reply: string) => void
}

export function MessageBubble({ message, onQuickResponse }: MessageBubbleProps) {
  const isMine = message.is_mine

  if (message.kind === 'system') {
    return (
      <div className="flex justify-center my-3">
        <div className="px-3 py-1 rounded-full bg-[#E9E7EF] dark:bg-[#2D2947] text-[11px] font-semibold text-[#77758A] dark:text-[#9B98B2] text-center max-w-sm">
          {message.body}
        </div>
      </div>
    )
  }

  if (message.kind === 'offer' && message.offer_amount) {
    return (
      <div className={`flex my-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <OfferCard
          amount={message.offer_amount}
          isMine={isMine}
          onQuickResponse={onQuickResponse}
        />
      </div>
    )
  }

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  return (
    <div className={`flex my-1.5 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap ${
          isMine
            ? 'bg-[#7657FF] text-white rounded-tr-xs shadow-xs'
            : 'bg-[#FFFFFF] dark:bg-[#17152B] text-[#17152B] dark:text-[#F7F6F2] rounded-tl-xs border border-[#E9E7EF] dark:border-[#2D2947] shadow-xs'
        }`}
      >
        <p>{message.body}</p>
        <div
          className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
            isMine ? 'text-white/75' : 'text-[#77758A] dark:text-[#9B98B2]'
          }`}
        >
          <span>{formatTime(message.created_at)}</span>
          {isMine && <Check className="w-3 h-3 stroke-[2.5]" />}
        </div>
      </div>
    </div>
  )
}
