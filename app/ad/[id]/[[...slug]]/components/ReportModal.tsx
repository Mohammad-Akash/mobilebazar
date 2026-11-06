'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { submitReportAction } from '@/src/lib/actions/report'

interface ReportModalProps {
  adId: string
  adTitle: string
  isOpen: boolean
  onClose: () => void
}

const REPORT_REASONS = [
  { value: 'fake_ad', label: 'Jaali / Fake Ad ya tasweerein' },
  { value: 'fraud_scam', label: 'Fraud ya Scam (Pehle advance maang raha hai)' },
  { value: 'already_sold', label: 'Yeh phone bik chuka hai' },
  { value: 'wrong_info', label: 'Ghalat qeemat ya specs (Wrong info)' },
  { value: 'prohibited_item', label: 'Ghair qanooni ya chori ka samaan' },
  { value: 'other', label: 'Koi doosri waja (Other)' },
] as const

export function ReportModal({ adId, adTitle, isOpen, onClose }: ReportModalProps) {
  const router = useRouter()
  const [reason, setReason] = useState<string>('fake_ad')
  const [details, setDetails] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    startTransition(async () => {
      const res = await submitReportAction({
        adId,
        reason: reason as any,
        details: details || undefined,
      })

      if (res.requiresLogin) {
        const nextUrl = typeof window !== 'undefined' ? window.location.pathname : '/ads'
        router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
        return
      }

      if (res.error) {
        setErrorMsg(res.error)
        return
      }

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setDetails('')
      }, 2500)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl relative space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚩</span>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
              Ishtehaar Report Karein
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-2">
            <span className="text-4xl block">✅</span>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              Shukriya, aap ki report darj kar li gayi hai.
            </h4>
            <p className="text-xs text-zinc-500">
              Humari team is ishtehaar ka jaiza legi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-zinc-500 line-clamp-1">
              Ad: <span className="font-medium text-zinc-700 dark:text-zinc-300">{adTitle}</span>
            </p>

            {errorMsg && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300">
                {errorMsg}
              </div>
            )}

            {/* Reason Radio Group */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Waja chunein (Reason)
              </label>
              <div className="space-y-1.5">
                {REPORT_REASONS.map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      reason === item.value
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={item.value}
                      checked={reason === item.value}
                      onChange={(e) => setReason(e.target.value)}
                      className="accent-emerald-600"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                Mazeed Tafseel (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Agar koi wazahat karni ho to yahan likhein (max 500 chars)..."
                className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
              <div className="text-right text-[10px] text-zinc-400 mt-0.5">
                {details.length}/500
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-extrabold shadow-sm transition-all"
              >
                {isPending ? 'Bhej rahe hain...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

