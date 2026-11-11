'use client'

import Link from 'next/link'
import { formatRelativeTime } from '@/src/lib/utils/format'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import type { ConversationListItem } from '@/src/types/chat'
import { Smartphone, CheckCircle2 } from 'lucide-react'

interface ConversationRowProps {
  conversation: ConversationListItem
}

export function ConversationRow({ conversation }: ConversationRowProps) {
  const isUnread = conversation.unread_count > 0
  const coverUrl = conversation.ad_cover_image
    ? getAdImageUrl(conversation.ad_cover_image, 'sm')
    : null

  return (
    <Link
      href={`/inbox/${conversation.conversation_id}`}
      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all ${
        isUnread
          ? 'bg-[#FFFFFF] dark:bg-[#17152B] border-[#7657FF]/40 shadow-[0_4px_20px_rgba(118,87,255,0.06)]'
          : 'bg-[#FFFFFF] dark:bg-[#17152B] border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]/30'
      }`}
    >
      {/* Handset Thumbnail / Avatar */}
      <div className="relative w-12 h-12 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] overflow-hidden shrink-0 flex items-center justify-center border border-[#E9E7EF] dark:border-[#2D2947]">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt={conversation.ad_title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Smartphone className="w-5 h-5 text-[#7657FF]" />
        )}
        {/* Role tag (Buying or Selling) */}
        <span
          className={`absolute bottom-0 right-0 px-1 py-0.2 rounded-tl-md text-[9px] font-bold ${
            conversation.is_buyer
              ? 'bg-[#7657FF] text-white'
              : 'bg-[#159B72] text-white'
          }`}
        >
          {conversation.is_buyer ? 'Buy' : 'Sell'}
        </span>
      </div>

      {/* Main Details */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className={`text-xs truncate ${isUnread ? 'font-black text-[#17152B] dark:text-[#F7F6F2]' : 'font-bold text-[#17152B] dark:text-[#F7F6F2]'}`}>
              {conversation.other_user_name || 'MobileBazar User'}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
          </div>
          <span className="text-[10px] text-[#77758A] dark:text-[#9B98B2] shrink-0">
            {formatRelativeTime(conversation.last_message_at)}
          </span>
        </div>

        {/* Ad Title & Price */}
        <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] truncate font-medium">
          {conversation.ad_title}{' '}
          {conversation.ad_price ? `· Rs ${conversation.ad_price.toLocaleString()}` : ''}
        </p>

        {/* Last Message Preview */}
        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-xs truncate ${
              isUnread
                ? 'font-bold text-[#7657FF] dark:text-[#8A6FFF]'
                : 'text-[#77758A] dark:text-[#9B98B2]'
            }`}
          >
            {conversation.last_message_preview || 'No messages yet'}
          </p>

          {isUnread && (
            <span className="min-w-[18px] h-4.5 px-1.5 rounded-full bg-[#7657FF] text-white text-[10px] font-black flex items-center justify-center shrink-0">
              {conversation.unread_count}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
