'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { getSellerContactAction } from '@/src/lib/actions/seller-contact'
import { startConversationAction } from '@/src/lib/actions/chat'
import { MakeOfferModal } from './MakeOfferModal'
import {
  Phone,
  MessageCircle,
  MessageSquare,
  Tag,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle,
} from 'lucide-react'

interface ContactButtonsProps {
  adId: string
  adTitle: string
  adPrice?: number
  adStatus: string
  contactPreference: string
  isOwner?: boolean
}

export function ContactButtons({
  adId,
  adTitle,
  adPrice = 0,
  adStatus,
  contactPreference,
  isOwner = false,
}: ContactButtonsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isChatStarting, setIsChatStarting] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)

  const [revealedPhone, setRevealedPhone] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isInactive = adStatus !== 'active'

  if (isOwner) {
    return (
      <div className="p-4 rounded-2xl bg-[#7657FF]/10 border border-[#7657FF]/20 text-center space-y-1">
        <span className="text-xs font-bold text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center gap-1.5">
          <CheckCircle className="w-4 h-4" />
          <span>Aap ka apna handset ishtehaar hai</span>
        </span>
        <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2]">
          Buyers aap se in buttons ke zariye chat, offer, ya call par rabta karenge.
        </p>
      </div>
    )
  }

  const handleStartChat = () => {
    if (isInactive) return
    setErrorMsg(null)
    setIsChatStarting(true)

    startTransition(async () => {
      try {
        const res = await startConversationAction(adId, 'Assalam o Alaikum, kya ye handset abhi available hai?')

        if (res.code === 'AUTH_REQUIRED') {
          const nextUrl = typeof window !== 'undefined' ? window.location.pathname : `/ad/${adId}`
          router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
          return
        }

        if (res.code === 'PHONE_NOT_VERIFIED') {
          router.push('/dashboard/profile/verify')
          return
        }

        if (!res.success || !res.conversation_id) {
          setErrorMsg(res.message || 'Chat shuru karne mein masla pesh aaya.')
          setIsChatStarting(false)
          return
        }

        router.push(`/inbox/${res.conversation_id}`)
      } catch (err: unknown) {
        setErrorMsg(err instanceof Error ? err.message : 'Chat error')
        setIsChatStarting(false)
      }
    })
  }

  const handleContactClick = (type: 'call' | 'whatsapp') => {
    if (isInactive) return

    setErrorMsg(null)
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    startTransition(async () => {
      const res = await getSellerContactAction(adId, adTitle, currentUrl)

      if (res.requiresLogin) {
        const nextUrl = typeof window !== 'undefined' ? window.location.pathname : '/ads'
        router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
        return
      }

      if (res.error) {
        setErrorMsg(res.error)
        return
      }

      if (res.phone) {
        setRevealedPhone(res.phone)
      }

      if (type === 'call' && res.telUrl) {
        window.location.href = res.telUrl
      } else if (type === 'whatsapp' && res.whatsappUrl) {
        window.open(res.whatsappUrl, '_blank', 'noopener,noreferrer')
      }
    })
  }

  const showCallButton = contactPreference === 'phone' || contactPreference === 'both'
  const showWhatsappButton = contactPreference === 'whatsapp' || contactPreference === 'both'

  return (
    <div className="space-y-3">
      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {revealedPhone && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-1">
          <span className="text-xs text-[#77758A] dark:text-[#9B98B2] font-medium block">
            Seller Verified Phone:
          </span>
          <a
            href={`tel:${revealedPhone}`}
            className="text-lg font-black text-[#159B72] hover:underline tracking-wide inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{revealedPhone}</span>
          </a>
        </div>
      )}

      {/* Row 1: In-App Chat & Make Offer (The OLX Experience) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          disabled={isPending || isChatStarting || isInactive}
          onClick={handleStartChat}
          className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer ${
            isInactive
              ? 'bg-[#E9E7EF] dark:bg-[#211E38] text-[#77758A] cursor-not-allowed'
              : 'bg-[#7657FF] hover:bg-[#6343ED] text-white shadow-[#7657FF]/25'
          }`}
        >
          {isChatStarting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MessageSquare className="w-4 h-4 stroke-[2.2]" />
          )}
          <span>{isChatStarting ? 'Opening Chat...' : 'Chat on MobileBazar'}</span>
        </button>

        <button
          type="button"
          disabled={isPending || isInactive}
          onClick={() => setIsOfferModalOpen(true)}
          className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all active:scale-[0.98] cursor-pointer ${
            isInactive
              ? 'border-[#E9E7EF] dark:border-[#2D2947] text-[#77758A] cursor-not-allowed'
              : 'border-[#7657FF] text-[#7657FF] dark:text-[#8A6FFF] hover:bg-[#7657FF]/10'
          }`}
        >
          <Tag className="w-4 h-4 stroke-[2]" />
          <span>Make an Offer</span>
        </button>
      </div>

      {/* Row 2: Call & WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {showCallButton && (
          <button
            type="button"
            disabled={isPending || isInactive}
            onClick={() => handleContactClick('call')}
            className={`py-3 px-4 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] ${
              isInactive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Phone className="w-3.5 h-3.5 text-[#7657FF]" />
            )}
            <span>
              {revealedPhone ? 'Call Seller' : 'Show Phone Number'}
            </span>
          </button>
        )}

        {showWhatsappButton && (
          <button
            type="button"
            disabled={isPending || isInactive}
            onClick={() => handleContactClick('whatsapp')}
            className={`py-3 px-4 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] ${
              isInactive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <MessageCircle className="w-3.5 h-3.5 text-[#159B72]" />
            )}
            <span>WhatsApp</span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#77758A] dark:text-[#9B98B2]">
        <Lock className="w-3 h-3" />
        <span>Verified phone & login required to prevent spam.</span>
      </div>

      {/* Make Offer Modal */}
      <MakeOfferModal
        adId={adId}
        adTitle={adTitle}
        adPrice={adPrice}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
    </div>
  )
}
