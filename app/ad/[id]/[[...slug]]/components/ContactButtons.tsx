'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { getSellerContactAction } from '@/src/lib/actions/seller-contact'

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
        // Redirect to login page with callback
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

      // Open appropriate link
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
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300">
          {errorMsg}
        </div>
      )}

      {revealedPhone && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
          <span className="text-xs text-zinc-500 block font-medium">Seller Phone Number:</span>
          <a
            href={`tel:${revealedPhone}`}
            className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
          >
            📞 {revealedPhone}
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
            className={`py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
              isInactive
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-emerald-600/20'
            }`}
          >
            <span>📞</span>
            <span>{isPending ? 'Connecting...' : revealedPhone ? 'Call Seller' : 'Show Phone Number'}</span>
          </button>
        )}

        {/* WhatsApp Button */}
        {showWhatsappButton && (
          <button
            type="button"
            disabled={isPending || isInactive}
            onClick={() => handleContactClick('whatsapp')}
            className={`py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
              isInactive
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 active:scale-95 text-white shadow-green-600/20'
            }`}
          >
            <span>💬</span>
            <span>{isPending ? 'Connecting...' : 'Chat on WhatsApp'}</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-zinc-400 text-center">
        🔒 Security Note: Login is required to view seller&apos;s phone number.
      </p>
    </div>
  )
}

