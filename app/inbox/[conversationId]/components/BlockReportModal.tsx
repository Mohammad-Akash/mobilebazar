'use client'

import { useState, useTransition } from 'react'
import { blockUserAction, reportConversationAction } from '@/src/lib/actions/chat'
import { ShieldBan, Flag, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

interface BlockReportModalProps {
  conversationId: string
  otherUserId: string
  otherUserName: string
  mode: 'block' | 'report' | null
  onClose: () => void
  onSuccess: (action: 'blocked' | 'reported') => void
}

export function BlockReportModal({
  conversationId,
  otherUserId,
  otherUserName,
  mode,
  onClose,
  onSuccess,
}: BlockReportModalProps) {
  const [reason, setReason] = useState<'scam' | 'harassment' | 'spam' | 'other'>('scam')
  const [detail, setDetail] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!mode) return null

  const handleBlock = () => {
    setErrorMsg(null)
    startTransition(async () => {
      const res = await blockUserAction(otherUserId)
      if (!res.success) {
        setErrorMsg(res.message || 'User ko block nahi kiya ja saka.')
        return
      }
      onSuccess('blocked')
      onClose()
    })
  }

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    startTransition(async () => {
      const res = await reportConversationAction(conversationId, reason, detail)
      if (!res.success) {
        setErrorMsg(res.message || 'Report submit karne mein masla pesh aaya.')
        return
      }
      onSuccess('reported')
      onClose()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#17152B] rounded-3xl border border-[#E9E7EF] dark:border-[#2D2947] p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
          <div className="flex items-center gap-2">
            {mode === 'block' ? (
              <ShieldBan className="w-5 h-5 text-[#E45858]" />
            ) : (
              <Flag className="w-5 h-5 text-[#E45858]" />
            )}
            <h3 className="text-sm font-black text-[#17152B] dark:text-[#F7F6F2]">
              {mode === 'block' ? `Block ${otherUserName}` : `Report Conversation`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2]"
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

        {mode === 'block' ? (
          <div className="space-y-4">
            <p className="text-xs text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
              Kya aap waqai <strong className="text-[#17152B] dark:text-[#F7F6F2]">{otherUserName}</strong> ko block karna chahte hain? Block karne ke baad yeh user aap ko koi naya message nahi bhej sake ga. Unhe pata nahi chalega ke aap ne unhe block kiya hai.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 h-10 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBlock}
                disabled={isPending}
                className="flex-1 h-10 rounded-xl bg-[#E45858] hover:bg-[#D14343] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldBan className="w-4 h-4" />}
                <span>Block User</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReport} className="space-y-4">
            <p className="text-xs text-[#77758A] dark:text-[#9B98B2]">
              Aap ki report MobileBazar moderation team ko bhaiji jaye gi aur saboot ke tor par pichle messages verify kiye jayenge.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
                Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as 'scam' | 'harassment' | 'spam' | 'other')}
                className="w-full h-10 px-3 bg-[#F7F6F2] dark:bg-[#211E38] rounded-xl text-xs text-[#17152B] dark:text-[#F7F6F2] outline-none"
              >
                <option value="scam">Scam / Advance payment request</option>
                <option value="harassment">Abusive language / Harassment</option>
                <option value="spam">Commercial spam / Links</option>
                <option value="other">Other issue</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
                Details (Optional)
              </label>
              <textarea
                rows={3}
                maxLength={500}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Briefly describe what happened..."
                className="w-full p-3 bg-[#F7F6F2] dark:bg-[#211E38] rounded-xl text-xs text-[#17152B] dark:text-[#F7F6F2] outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 h-10 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 h-10 rounded-xl bg-[#E45858] hover:bg-[#D14343] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>Submit Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
