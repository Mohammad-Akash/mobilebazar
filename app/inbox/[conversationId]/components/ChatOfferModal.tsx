'use client'

import { useState, useEffect } from 'react'
import { Tag, X, ArrowRightLeft, Loader2, AlertCircle } from 'lucide-react'

interface ChatOfferModalProps {
  isOpen: boolean
  onClose: () => void
  adTitle: string
  adPrice: number | null
  initialAmount?: number
  isCounter?: boolean
  onSendOffer: (amount: number, note: string) => Promise<boolean>
}

export function ChatOfferModal({
  isOpen,
  onClose,
  adTitle,
  adPrice,
  initialAmount,
  isCounter = false,
  onSendOffer,
}: ChatOfferModalProps) {
  const basePrice = adPrice && adPrice > 0 ? adPrice : 50000

  const [offerPrice, setOfferPrice] = useState<number>(() => {
    if (initialAmount && initialAmount > 0) return initialAmount
    return Math.round(basePrice * 0.9)
  })
  const [note, setNote] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sync initialAmount if changed
  useEffect(() => {
    if (initialAmount && initialAmount > 0) {
      setOfferPrice(initialAmount)
    } else if (adPrice && adPrice > 0) {
      setOfferPrice(Math.round(adPrice * 0.9))
    }
  }, [initialAmount, adPrice, isOpen])

  if (!isOpen) return null

  const minAllowed = Math.max(1000, Math.round(basePrice * 0.2))
  const maxAllowed = Math.round(basePrice * 1.8)

  const handleQuickPercent = (pct: number) => {
    if (adPrice && adPrice > 0) {
      setOfferPrice(Math.round(adPrice * (1 - pct / 100)))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!offerPrice || offerPrice <= 0) {
      setErrorMsg('Please enter a valid amount.')
      return
    }

    if (offerPrice < minAllowed || offerPrice > maxAllowed) {
      setErrorMsg(
        `Offer must be between Rs ${minAllowed.toLocaleString()} and Rs ${maxAllowed.toLocaleString()}.`
      )
      return
    }

    setIsSubmitting(true)
    try {
      const defaultNote = isCounter
        ? `Counter Offer: Rs ${offerPrice.toLocaleString()}`
        : `My offer is Rs ${offerPrice.toLocaleString()}`
      const finalNote = note.trim() ? `${defaultNote} — ${note.trim()}` : defaultNote

      const success = await onSendOffer(offerPrice, finalNote)
      if (success) {
        setNote('')
        onClose()
      } else {
        setErrorMsg('Failed to send offer. Please try again.')
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error sending offer')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#17152B] rounded-3xl border border-[#E9E7EF] dark:border-[#2D2947] p-6 shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-offer-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center shrink-0">
              {isCounter ? (
                <ArrowRightLeft className="w-4 h-4 stroke-[2.2]" />
              ) : (
                <Tag className="w-4 h-4 stroke-[2.2]" />
              )}
            </div>
            <div>
              <h3 id="chat-offer-modal-title" className="text-sm font-black text-[#17152B] dark:text-[#F7F6F2]">
                {isCounter ? 'Send Counter Offer' : 'Send An Offer'}
              </h3>
              <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] truncate max-w-[240px]">
                {adTitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#77758A] dark:text-[#9B98B2] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Asking Price Banner */}
        {adPrice && adPrice > 0 ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947]">
            <span className="text-xs text-[#77758A] dark:text-[#9B98B2] font-semibold">
              Original Asking Price:
            </span>
            <span className="text-sm font-black text-[#17152B] dark:text-[#F7F6F2] tabular-nums">
              Rs {adPrice.toLocaleString()}
            </span>
          </div>
        ) : null}

        {/* Offer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] mb-1.5">
              {isCounter ? 'Your Counter Offer (PKR)' : 'Your Offer Amount (PKR)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-[#77758A] dark:text-[#9B98B2]">
                Rs
              </span>
              <input
                type="number"
                min={minAllowed}
                max={maxAllowed}
                step={500}
                value={offerPrice || ''}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                required
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#121120] text-sm font-black text-[#17152B] dark:text-[#F7F6F2] outline-none focus:border-[#7657FF] dark:focus:border-[#8A6FFF] transition-colors"
                placeholder="0"
              />
            </div>
            {offerPrice > 0 && (
              <p className="mt-1 text-[11px] font-semibold text-[#7657FF] dark:text-[#8A6FFF]">
                Rs {offerPrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Quick Discount Chips */}
          {adPrice && adPrice > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#77758A] dark:text-[#9B98B2]">
                Quick Adjustments:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleQuickPercent(pct)}
                    className="py-1.5 px-2 rounded-xl text-[11px] font-bold border border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF] bg-[#FFFFFF] dark:bg-[#121120] text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] transition-all text-center"
                  >
                    -{pct}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional Note */}
          <div>
            <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] mb-1.5">
              Message / Note (Optional)
            </label>
            <textarea
              rows={2}
              maxLength={300}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. I can pick it up today with cash in hand. Deal?"
              className="w-full p-3 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#121120] text-xs text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] outline-none focus:border-[#7657FF] dark:focus:border-[#8A6FFF] resize-none leading-relaxed"
            />
          </div>

          {/* Error display */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-xs font-bold text-[#77758A] dark:text-[#9B98B2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !offerPrice || offerPrice <= 0}
              className="flex-1 py-2.5 rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : isCounter ? (
                <>
                  <ArrowRightLeft className="w-4 h-4 stroke-[2.2]" />
                  <span>Send Counter</span>
                </>
              ) : (
                <>
                  <Tag className="w-4 h-4 stroke-[2.2]" />
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
