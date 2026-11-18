'use client'

import { useState } from 'react'
import { Tag, Check, X, ArrowRightLeft, Clock, CheckCircle2, XCircle } from 'lucide-react'

interface OfferCardProps {
  amount: number
  body?: string
  isMine: boolean
  createdAt?: string
  status?: 'pending' | 'accepted' | 'rejected'
  onAccept?: (amount: number) => void
  onReject?: (amount: number) => void
  onCounter?: (amount: number) => void
  onQuickResponse?: (reply: string) => void
}

export function OfferCard({
  amount,
  body,
  isMine,
  createdAt,
  status = 'pending',
  onAccept,
  onReject,
  onCounter,
  onQuickResponse,
}: OfferCardProps) {
  const [respondedStatus, setRespondedStatus] = useState<'pending' | 'accepted' | 'rejected'>(status)

  // Extract custom note from body if present
  let customNote = ''
  if (body) {
    if (body.includes('—')) {
      customNote = body.split('—').slice(1).join('—').trim()
    } else if (body.includes('-')) {
      customNote = body.split('-').slice(1).join('-').trim()
    } else if (!body.toLowerCase().startsWith('mera offer') && !body.toLowerCase().startsWith('counter offer')) {
      customNote = body
    }
  }

  const handleAccept = () => {
    setRespondedStatus('accepted')
    if (onAccept) {
      onAccept(amount)
    } else if (onQuickResponse) {
      onQuickResponse(`✅ Offer Accepted! I am ready to do the deal for Rs ${amount.toLocaleString()}. When and where can we meet?`)
    }
  }

  const handleReject = () => {
    setRespondedStatus('rejected')
    if (onReject) {
      onReject(amount)
    } else if (onQuickResponse) {
      onQuickResponse(`❌ Offer Declined: Thank you, but Rs ${amount.toLocaleString()} is too low for this device.`)
    }
  }

  const handleCounter = () => {
    if (onCounter) {
      onCounter(amount)
    } else if (onQuickResponse) {
      onQuickResponse(`Thank you, but I cannot accept Rs ${amount.toLocaleString()}. Please make a reasonable counter offer.`)
    }
  }

  const formatTime = (isoString?: string) => {
    if (!isoString) return ''
    try {
      const date = new Date(isoString)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  return (
    <div
      className={`p-4 rounded-3xl border space-y-3 max-w-sm w-full shadow-sm transition-all ${
        isMine
          ? 'bg-[#7657FF]/10 dark:bg-[#7657FF]/15 border-[#7657FF]/30 ml-auto'
          : 'bg-[#FFFFFF] dark:bg-[#17152B] border-[#E9E7EF] dark:border-[#2D2947]'
      }`}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isMine
                ? 'bg-[#7657FF] text-white'
                : 'bg-[#7657FF]/10 dark:bg-[#7657FF]/20 text-[#7657FF] dark:text-[#8A6FFF]'
            }`}
          >
            <Tag className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#7657FF] dark:text-[#8A6FFF]">
              {isMine ? 'Your Submitted Offer' : 'Offer Received'}
            </span>
            <h4 className="text-xl font-black text-[#17152B] dark:text-[#F7F6F2] tabular-nums tracking-tight">
              Rs {amount.toLocaleString()}
            </h4>
          </div>
        </div>

        {createdAt && (
          <span className="text-[10px] text-[#77758A] dark:text-[#9B98B2] tabular-nums">
            {formatTime(createdAt)}
          </span>
        )}
      </div>

      {/* Optional Note / Message */}
      {customNote && (
        <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-[#17152B] dark:text-[#F7F6F2] italic">
          &ldquo;{customNote}&rdquo;
        </div>
      )}

      {/* Description text */}
      <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
        {isMine
          ? 'Your offer has been sent to the seller. Waiting for their response.'
          : 'The buyer is ready to purchase the device at this price.'}
      </p>

      {/* Status Badges for completed responses */}
      {respondedStatus === 'accepted' && (
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>✅ Offer Accepted</span>
        </div>
      )}

      {respondedStatus === 'rejected' && (
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-bold text-red-700 dark:text-red-300">
          <XCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
          <span>❌ Offer Declined</span>
        </div>
      )}

      {/* Interactive Action Buttons for Recipient (Accept / Reject / Counter) */}
      {!isMine && respondedStatus === 'pending' && (
        <div className="pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947] space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Accept Button */}
            <button
              type="button"
              onClick={handleAccept}
              className="py-2 px-3 rounded-xl bg-[#159B72] hover:bg-[#12825F] active:scale-95 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Accept</span>
            </button>

            {/* Reject Button */}
            <button
              type="button"
              onClick={handleReject}
              className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 active:scale-95 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Reject</span>
            </button>
          </div>

          {/* Counter Offer Button */}
          <button
            type="button"
            onClick={handleCounter}
            className="w-full py-1.5 px-3 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] active:scale-95 text-[#7657FF] dark:text-[#8A6FFF] text-xs font-bold border border-[#E9E7EF] dark:border-[#2D2947] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 stroke-[2]" />
            <span>Make Counter Offer</span>
          </button>
        </div>
      )}

      {/* Status for Sender */}
      {isMine && respondedStatus === 'pending' && (
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#7657FF] dark:text-[#8A6FFF] pt-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Status: Pending response</span>
        </div>
      )}
    </div>
  )
}
