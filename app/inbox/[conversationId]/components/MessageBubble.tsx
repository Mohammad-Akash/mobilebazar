'use client'

import { OfferCard } from './OfferCard'
import { ReadReceipt } from './ReadReceipt'
import type { ChatMessage } from '@/src/types/chat'
import { Phone, MessageCircle, ZoomIn, ShieldCheck } from 'lucide-react'
import { getAdImageUrl } from '@/src/lib/utils/image-url'

interface MessageBubbleProps {
  message: ChatMessage
  isSeen?: boolean
  onQuickResponse?: (reply: string) => void
  onAcceptOffer?: (amount: number) => void
  onRejectOffer?: (amount: number) => void
  onCounterOffer?: (amount: number) => void
  onImagesClick?: (images: string[], initialIndex: number, caption?: string) => void
}

export function MessageBubble({
  message,
  isSeen = false,
  onQuickResponse,
  onAcceptOffer,
  onRejectOffer,
  onCounterOffer,
  onImagesClick,
}: MessageBubbleProps) {
  const isMine = message.is_mine

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  // 1. System messages
  if (message.kind === 'system') {
    return (
      <div className="flex justify-center my-3">
        <div className="px-3 py-1 rounded-full bg-[#E9E7EF] dark:bg-[#2D2947] text-[11px] font-semibold text-[#77758A] dark:text-[#9B98B2] text-center max-w-sm">
          {message.body}
        </div>
      </div>
    )
  }

  // 2. Offer messages
  if (message.kind === 'offer' && message.offer_amount) {
    return (
      <div className={`flex my-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <OfferCard
          amount={message.offer_amount}
          body={message.body}
          isMine={isMine}
          createdAt={message.created_at}
          onAccept={onAcceptOffer}
          onReject={onRejectOffer}
          onCounter={onCounterOffer}
          onQuickResponse={onQuickResponse}
        />
      </div>
    )
  }

  // 3. Photo attachment messages ([IMAGE]:path or [IMAGES]:path1,path2)
  if (message.body.startsWith('[IMAGE]:') || message.body.startsWith('[IMAGES]:')) {
    const lines = message.body.split('\n')
    const isMulti = message.body.startsWith('[IMAGES]:')
    const rawPathsStr = lines[0].replace(isMulti ? '[IMAGES]:' : '[IMAGE]:', '').trim()
    const paths = rawPathsStr.split(',').map((p) => p.trim()).filter(Boolean)
    const imageUrls = paths.map((p) => (p.startsWith('http') ? p : getAdImageUrl(p)))
    const caption = lines.slice(1).join('\n').trim()

    const displayCount = Math.min(imageUrls.length, 4)
    const overflowCount = imageUrls.length - 4

    return (
      <div className={`flex my-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[85%] sm:max-w-sm rounded-3xl overflow-hidden border shadow-sm ${
            isMine
              ? 'bg-[#7657FF]/10 dark:bg-[#7657FF]/20 border-[#7657FF]/30'
              : 'bg-[#FFFFFF] dark:bg-[#17152B] border-[#E9E7EF] dark:border-[#2D2947]'
          }`}
        >
          {/* Single Photo Layout */}
          {imageUrls.length === 1 && (
            <div
              onClick={() => onImagesClick?.(imageUrls, 0, caption)}
              className="relative cursor-pointer group overflow-hidden bg-black/5 dark:bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrls[0]}
                alt={caption || 'Attached photo'}
                className="w-full max-h-72 object-cover transition-transform group-hover:scale-105 duration-200"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="p-2 rounded-full bg-black/60 backdrop-blur-xs flex items-center gap-1.5 text-xs font-bold">
                  <ZoomIn className="w-4 h-4" />
                  <span>View Photo</span>
                </div>
              </div>
            </div>
          )}

          {/* 2 Photos Layout (Side by side) */}
          {imageUrls.length === 2 && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-black/5 dark:bg-white/5">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => onImagesClick?.(imageUrls, idx, caption)}
                  className="aspect-square relative cursor-pointer overflow-hidden rounded-2xl group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 3 Photos Layout (1 top, 2 bottom) */}
          {imageUrls.length === 3 && (
            <div className="space-y-1 p-1 bg-black/5 dark:bg-white/5">
              <div
                onClick={() => onImagesClick?.(imageUrls, 0, caption)}
                className="h-40 relative cursor-pointer overflow-hidden rounded-2xl group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrls[0]}
                  alt="Photo 1"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                {imageUrls.slice(1).map((url, idx) => (
                  <div
                    key={idx + 1}
                    onClick={() => onImagesClick?.(imageUrls, idx + 1, caption)}
                    className="h-28 relative cursor-pointer overflow-hidden rounded-2xl group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Photo ${idx + 2}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4+ Photos Grid */}
          {imageUrls.length >= 4 && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-black/5 dark:bg-white/5">
              {imageUrls.slice(0, 4).map((url, idx) => {
                const isFourthAndHasMore = idx === 3 && overflowCount > 0
                return (
                  <div
                    key={idx}
                    onClick={() => onImagesClick?.(imageUrls, idx, caption)}
                    className="aspect-square relative cursor-pointer overflow-hidden rounded-2xl group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                      loading="lazy"
                    />
                    {isFourthAndHasMore && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center text-white font-black text-lg">
                        +{overflowCount + 1}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Caption & Timestamp & Professional Read Receipts */}
          <div className="p-3 space-y-1.5">
            {caption && (
              <p className="text-xs sm:text-sm text-[#17152B] dark:text-[#F7F6F2] leading-relaxed break-words">
                {caption}
              </p>
            )}
            <div
              className={`flex items-center justify-end gap-1.5 text-[10px] ${
                isMine ? 'text-[#7657FF] dark:text-[#8A6FFF]' : 'text-[#77758A] dark:text-[#9B98B2]'
              }`}
            >
              <span>{formatTime(message.created_at)}</span>
              {isMine && <ReadReceipt status={isSeen ? 'seen' : 'sent'} />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 4. Contact / Phone Number messages ([CONTACT]:phone\nnote)
  if (message.body.startsWith('[CONTACT]:')) {
    const lines = message.body.split('\n')
    const phone = lines[0].replace('[CONTACT]:', '').trim()
    const note = lines.slice(1).join('\n').trim()

    const digitsOnly = phone.replace(/\D/g, '')
    const waNumber = digitsOnly.startsWith('03')
      ? `92${digitsOnly.substring(1)}`
      : digitsOnly.startsWith('92')
      ? digitsOnly
      : `92${digitsOnly}`

    return (
      <div className={`flex my-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[85%] sm:max-w-sm p-4 rounded-3xl border space-y-3 shadow-sm ${
            isMine
              ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30'
              : 'bg-[#FFFFFF] dark:bg-[#17152B] border-[#E9E7EF] dark:border-[#2D2947]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isMine ? 'Aap Ka Bheja Hua Contact' : 'Direct Contact Number'}
              </span>
              <h4 className="text-base font-black text-[#17152B] dark:text-[#F7F6F2] tabular-nums tracking-wide">
                {phone}
              </h4>
            </div>
          </div>

          {note && (
            <p className="text-xs text-[#17152B] dark:text-[#F7F6F2] italic bg-black/5 dark:bg-white/5 p-2 rounded-xl">
              &ldquo;{note}&rdquo;
            </p>
          )}

          {/* Direct Action Buttons: WhatsApp & Call */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                'Assalam-o-Alaikum, MobileBazar ad ke hawale se rabta kiya hai.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${phone}`}
              className="py-2 px-3 rounded-xl bg-[#17152B] hover:bg-[#2A2744] dark:bg-[#2A2744] dark:hover:bg-[#39355C] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#77758A] dark:text-[#9B98B2] pt-1 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>Meet in safe public place</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{formatTime(message.created_at)}</span>
              {isMine && <ReadReceipt status={isSeen ? 'seen' : 'sent'} />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 5. Regular text messages (with inline phone detection & professional ticks)
  const pkPhoneMatch = message.body.match(/(03\d{2}[-\s]?\d{7}|\+92\s?3\d{2}[-\s]?\d{7})/)

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

        {/* If phone detected inside regular text, provide 1-click WhatsApp/Call button */}
        {pkPhoneMatch && (
          <div className="mt-2 pt-2 border-t border-white/20 dark:border-[#2D2947] flex items-center gap-2">
            <a
              href={`https://wa.me/92${pkPhoneMatch[0].replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                'Assalam-o-Alaikum, MobileBazar ad ke hawale se rabta kiya hai.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition-all"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${pkPhoneMatch[0].replace(/\s/g, '')}`}
              className="py-1 px-2.5 rounded-lg bg-black/20 hover:bg-black/30 text-white text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        )}

        <div
          className={`flex items-center justify-end gap-1.5 mt-1 text-[10px] ${
            isMine ? 'text-white/75' : 'text-[#77758A] dark:text-[#9B98B2]'
          }`}
        >
          <span>{formatTime(message.created_at)}</span>
          {isMine && <ReadReceipt status={isSeen ? 'seen' : 'sent'} />}
        </div>
      </div>
    </div>
  )
}
