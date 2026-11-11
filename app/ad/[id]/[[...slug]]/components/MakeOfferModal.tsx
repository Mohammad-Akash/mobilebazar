'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { startConversationAction } from '@/src/lib/actions/chat'
import { Tag, X, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'

interface MakeOfferModalProps {
  adId: string
  adTitle: string
  adPrice: number
  isOpen: boolean
  onClose: () => void
}

export function MakeOfferModal({
  adId,
  adTitle,
  adPrice,
  isOpen,
  onClose,
}: MakeOfferModalProps) {
  const router = useRouter()
  const [offerPrice, setOfferPrice] = useState<number>(Math.round(adPrice * 0.9))
  const [note, setNote] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!isOpen) return null

  const minAllowed = Math.round(adPrice * 0.3)
  const maxAllowed = Math.round(adPrice * 1.5)

  const handleQuickPercent = (pct: number) => {
    setOfferPrice(Math.round(adPrice * (1 - pct / 100)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (offerPrice < minAllowed || offerPrice > maxAllowed) {
      setErrorMsg(`Offer Rs ${minAllowed.toLocaleString()} se Rs ${maxAllowed.toLocaleString()} ke darmiyan honi chahiye.`)
      return
    }

    startTransition(async () => {
      const initialMessage = note.trim()
        ? `Offer: Rs ${offerPrice.toLocaleString()} - ${note.trim()}`
        : `Mera offer hai Rs ${offerPrice.toLocaleString()}. Kya aap deal karne ke liye tayyar hain?`

      const res = await startConversationAction(adId, initialMessage, offerPrice)

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
        setErrorMsg(res.message || 'Offer bhejne mein masla pesh aaya.')
        return
      }

      onClose()
      router.push(`/inbox/${res.conversation_id}`)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#17152B] rounded-3xl border border-[#E9E7EF] dark:border-[#2D2947] p-6 shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center">
              <Tag className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 id="offer-modal-title" className="text-sm font-black text-[#17152B] dark:text-[#F7F6F2]">
                Make an Offer
              </h3>
              <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] truncate max-w-[220px]">
                {adTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Price Asking Info */}
          <div className="flex items-center justify-between text-xs text-[#77758A] dark:text-[#9B98B2] bg-[#F7F6F2] dark:bg-[#211E38] p-3 rounded-xl">
            <span>Asking Price:</span>
            <span className="font-bold text-[#17152B] dark:text-[#F7F6F2] tabular-nums">
              Rs {adPrice.toLocaleString()}
            </span>
          </div>

          {/* Offer Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
              Aap Ka Offer (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#77758A]">
                Rs
              </span>
              <input
                type="number"
                min={minAllowed}
                max={maxAllowed}
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full h-11 pl-10 pr-4 text-sm font-bold bg-[#F7F6F2] dark:bg-[#211E38] rounded-xl border border-transparent focus:border-[#7657FF] text-[#17152B] dark:text-[#F7F6F2] outline-none tabular-nums"
                required
              />
            </div>
          </div>

          {/* Quick Offer Discounts */}
          <div className="space-y-1">
            <span className="text-[11px] text-[#77758A] dark:text-[#9B98B2] block">
              Quick Suggestions:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickPercent(5)}
                className="flex-1 py-1 px-2 text-xs font-semibold rounded-lg bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] transition-colors"
              >
                -5%
              </button>
              <button
                type="button"
                onClick={() => handleQuickPercent(10)}
                className="flex-1 py-1 px-2 text-xs font-semibold rounded-lg bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] transition-colors"
              >
                -10%
              </button>
              <button
                type="button"
                onClick={() => handleQuickPercent(15)}
                className="flex-1 py-1 px-2 text-xs font-semibold rounded-lg bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] transition-colors"
              >
                -15%
              </button>
              <button
                type="button"
                onClick={() => handleQuickPercent(20)}
                className="flex-1 py-1 px-2 text-xs font-semibold rounded-lg bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] transition-colors"
              >
                -20%
              </button>
            </div>
          </div>

          {/* Optional Message */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
              Message (Optional)
            </label>
            <textarea
              rows={2}
              maxLength={300}
              placeholder="e.g. Main aaj sham ko cash payment ke sath phone utha sakta hun."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 text-xs bg-[#F7F6F2] dark:bg-[#211E38] rounded-xl border border-transparent focus:border-[#7657FF] text-[#17152B] dark:text-[#F7F6F2] outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 h-11 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] text-xs font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 h-11 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Offer...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Send Offer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
