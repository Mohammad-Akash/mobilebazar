'use client'

import { useState, useEffect } from 'react'
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
  compactSticky?: boolean
}

export function ContactButtons({
  adId,
  adTitle,
  adPrice = 0,
  adStatus,
  contactPreference,
  isOwner = false,
  compactSticky = false,
}: ContactButtonsProps) {
  const router = useRouter()
  const [isChatStarting, setIsChatStarting] = useState(false)
  const [contactLoading, setContactLoading] = useState<'call' | 'whatsapp' | null>(null)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)

  const [revealedPhone, setRevealedPhone] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isInactive = adStatus !== 'active'
  const isBusy = isChatStarting || contactLoading !== null

  // Reset loading states when returning via browser back button or page cache
  useEffect(() => {
    setIsChatStarting(false)
    setContactLoading(null)

    const handlePageShow = () => {
      setIsChatStarting(false)
      setContactLoading(null)
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => {
      window.removeEventListener('pageshow', handlePageShow)
      setIsChatStarting(false)
      setContactLoading(null)
    }
  }, [])

  if (isOwner) {
    return (
      <div className="p-4 rounded-2xl bg-[#7657FF]/10 border border-[#7657FF]/20 text-center space-y-3">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>This is your listing</span>
          </span>
          <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2]">
            Buyers can contact you via chat, submit offers, or call using these options.
          </p>
        </div>

        <div className="pt-1 flex gap-2">
          <a
            href={`/dashboard/ads/${adId}/edit`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px]"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Edit Handset Ad</span>
          </a>
          <a
            href="/dashboard/ads"
            className="py-2.5 px-3 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] hover:bg-slate-50 dark:hover:bg-[#211E38] transition-colors flex items-center justify-center min-h-[44px]"
          >
            My Ads
          </a>
        </div>
      </div>
    )
  }

  const handleStartChat = async () => {
    if (isInactive || isBusy) return
    setErrorMsg(null)
    setIsChatStarting(true)

    try {
      // Do not send an automated message. Simply open or create the chat thread.
      const res = await startConversationAction(adId)

      if (res.code === 'AUTH_REQUIRED') {
        setIsChatStarting(false)
        const nextUrl = typeof window !== 'undefined' ? window.location.pathname : `/ad/${adId}`
        router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
        return
      }

      if (res.code === 'PHONE_NOT_VERIFIED') {
        setIsChatStarting(false)
        router.push('/dashboard/profile/verify')
        return
      }

      if (!res.success || !res.conversation_id) {
        setErrorMsg(res.message || 'Failed to start chat.')
        setIsChatStarting(false)
        return
      }

      router.push(`/inbox/${res.conversation_id}`)

      // Reset loading state after router push in case user returns with browser Back button
      setTimeout(() => {
        setIsChatStarting(false)
      }, 500)
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Chat error')
      setIsChatStarting(false)
    }
  }

  const handleContactClick = async (type: 'call' | 'whatsapp') => {
    if (isInactive || isBusy) return

    setErrorMsg(null)
    setContactLoading(type)
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    try {
      const res = await getSellerContactAction(adId, adTitle, currentUrl)

      if (res.requiresLogin) {
        setContactLoading(null)
        const nextUrl = typeof window !== 'undefined' ? window.location.pathname : '/ads'
        router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
        return
      }

      if (res.error) {
        setErrorMsg(res.error)
        setContactLoading(null)
        return
      }

      if (res.phone) {
        setRevealedPhone(res.phone)
      }

      setContactLoading(null)

      if (type === 'call' && res.telUrl) {
        window.location.href = res.telUrl
      } else if (type === 'whatsapp' && res.whatsappUrl) {
        window.open(res.whatsappUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error retrieving seller contact')
      setContactLoading(null)
    }
  }

  const showCallButton = contactPreference === 'phone' || contactPreference === 'both'
  const showWhatsappButton = contactPreference === 'whatsapp' || contactPreference === 'both'

  if (compactSticky) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isBusy || isInactive}
          onClick={handleStartChat}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] cursor-pointer min-h-[44px] ${
            isInactive
              ? 'bg-[#E9E7EF] dark:bg-[#211E38] text-[#77758A] cursor-not-allowed'
              : 'bg-[#7657FF] hover:bg-[#6343ED] text-white shadow-xs'
          }`}
        >
          {isChatStarting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MessageSquare className="w-4 h-4 stroke-[2.2]" />
          )}
          <span>{isChatStarting ? 'Opening...' : 'Chat'}</span>
        </button>

        <button
          type="button"
          disabled={isBusy || isInactive}
          onClick={() => setIsOfferModalOpen(true)}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border transition-all active:scale-[0.98] cursor-pointer min-h-[44px] ${
            isInactive
              ? 'border-[#E9E7EF] dark:border-[#2D2947] text-[#77758A] cursor-not-allowed'
              : 'border-[#7657FF] text-[#7657FF] dark:text-[#8A6FFF] hover:bg-[#7657FF]/10'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Offer</span>
        </button>

        {showCallButton && (
          <button
            type="button"
            disabled={isBusy || isInactive}
            onClick={() => handleContactClick('call')}
            title={revealedPhone ? `Call: ${revealedPhone}` : 'Call Seller'}
            className={`p-2.5 rounded-xl font-semibold text-xs flex items-center justify-center border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] min-w-[44px] min-h-[44px] cursor-pointer ${
              isInactive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {contactLoading === 'call' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Phone className="w-4 h-4 text-[#7657FF]" />
            )}
          </button>
        )}

        {showWhatsappButton && (
          <button
            type="button"
            disabled={isBusy || isInactive}
            onClick={() => handleContactClick('whatsapp')}
            title="Chat on WhatsApp"
            className={`p-2.5 rounded-xl font-semibold text-xs flex items-center justify-center border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] min-w-[44px] min-h-[44px] cursor-pointer ${
              isInactive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {contactLoading === 'whatsapp' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4 text-[#159B72]" />
            )}
          </button>
        )}

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
          disabled={isBusy || isInactive}
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
          disabled={isBusy || isInactive}
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
            disabled={isBusy || isInactive}
            onClick={() => handleContactClick('call')}
            className={`py-3 px-4 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] ${
              isInactive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {contactLoading === 'call' ? (
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
            disabled={isBusy || isInactive}
            onClick={() => handleContactClick('whatsapp')}
            className={`py-3 px-4 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] ${
              isInactive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {contactLoading === 'whatsapp' ? (
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
        <span>Verified phone &amp; login required to prevent spam.</span>
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
