'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { getSellerContactAction } from '@/src/lib/actions/seller-contact'
import { Phone, MessageCircle, Lock, AlertCircle, Loader2 } from 'lucide-react'

interface ContactButtonsProps {
  adId: string
  adTitle: string
  adStatus: string
  contactPreference: string
}

export function ContactButtons({
  adId,
  adTitle,
  adStatus,
  contactPreference,
}: ContactButtonsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [revealedPhone, setRevealedPhone] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isInactive = adStatus !== 'active'

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
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
            Seller Verified Phone:
          </span>
          <a
            href={`tel:${revealedPhone}`}
            className="text-lg font-black text-emerald-600 dark:text-emerald-400 hover:underline tracking-wide inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{revealedPhone}</span>
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Call Button */}
        {showCallButton && (
          <button
            type="button"
            disabled={isPending || isInactive}
            onClick={() => handleContactClick('call')}
            className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
              isInactive
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 ring-2 ring-blue-600/20'
            }`}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Phone className="w-4 h-4" />
            )}
            <span>
              {isPending
                ? 'Connecting...'
                : revealedPhone
                ? 'Call Seller'
                : 'Show Phone Number'}
            </span>
          </button>
        )}

        {/* WhatsApp Button */}
        {showWhatsappButton && (
          <button
            type="button"
            disabled={isPending || isInactive}
            onClick={() => handleContactClick('whatsapp')}
            className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
              isInactive
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 ring-2 ring-emerald-600/20'
            }`}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4" />
            )}
            <span>{isPending ? 'Connecting...' : 'Chat on WhatsApp'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <Lock className="w-3 h-3" />
        <span>Login required to view seller details & prevent spam.</span>
      </div>
    </div>
  )
}
