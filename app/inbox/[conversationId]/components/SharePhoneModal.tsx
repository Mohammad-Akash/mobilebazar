'use client'

import { useState } from 'react'
import { Phone, X, AlertCircle, MessageCircle, Send, ShieldCheck } from 'lucide-react'

interface SharePhoneModalProps {
  isOpen: boolean
  onClose: () => void
  onSendPhone: (phone: string, note?: string) => Promise<boolean>
}

export function SharePhoneModal({ isOpen, onClose, onSendPhone }: SharePhoneModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [note, setNote] = useState('Contact me via call or WhatsApp.')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  if (!isOpen) return null

  // Pakistani phone validator (03xx xxxxxxx or +923xxxxxxxxx)
  const cleanPhone = (val: string) => val.replace(/[\s\-\(\)]/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    const cleaned = cleanPhone(phoneNumber)
    const isValid = /^(03\d{9}|(\+92|92)3\d{9})$/.test(cleaned)

    if (!isValid) {
      setErrorMsg('Please enter a valid Pakistani mobile number (e.g. 03001234567).')
      return
    }

    setIsSending(true)
    try {
      const formatted = cleaned.startsWith('92')
        ? `+${cleaned}`
        : cleaned.startsWith('03')
        ? cleaned
        : `+92${cleaned}`

      const success = await onSendPhone(formatted, note.trim() || undefined)
      if (success) {
        onClose()
      } else {
        setErrorMsg('Failed to share phone number. Please try again.')
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#17152B] rounded-3xl border border-[#E9E7EF] dark:border-[#2D2947] p-6 shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 id="phone-modal-title" className="text-sm font-black text-[#17152B] dark:text-[#F7F6F2]">
                Share Contact Number
              </h3>
              <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2]">
                Send your number for direct calls or WhatsApp
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-[#77758A] dark:text-[#9B98B2] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Safety Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300">
          <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <span>
            Always practice safe transactions. Never send advance deposits and finalize deals in a public place.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] mb-1.5">
              Mobile Number (Call & WhatsApp)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#77758A] dark:text-[#9B98B2]">
                🇵🇰 +92
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="300 1234567"
                required
                className="w-full pl-18 pr-4 py-2.5 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#121120] text-sm font-bold text-[#17152B] dark:text-[#F7F6F2] outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] mb-1.5">
              Message / Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Call or WhatsApp me anytime"
              className="w-full px-4 py-2.5 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#121120] text-xs text-[#17152B] dark:text-[#F7F6F2] outline-none focus:border-[#7657FF] transition-colors"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="flex-1 py-2.5 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] text-xs font-bold text-[#77758A] dark:text-[#9B98B2] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !phoneNumber.trim()}
              className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4 stroke-[2]" />
              <span>{isSending ? 'Sending...' : 'Share Number'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
