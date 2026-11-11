'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { sendOtp, verifyOtp } from '@/src/lib/actions/phone-verify'
import { normalizePakistaniPhone } from '@/src/lib/utils/phone'
import { Smartphone, KeyRound, CheckCircle2, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'

type Step = 'phone' | 'otp'

const RESEND_COOLDOWN = 60 // seconds

export function VerifyPhoneForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('return_to') || '/dashboard/profile'

  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const result = await sendOtp({ phone })
      if (result.error) {
        setError(result.error)
        return
      }
      setStep('otp')
      setCooldown(RESEND_COOLDOWN)
    })
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const normalized = normalizePakistaniPhone(phone) ?? phone
      const result = await verifyOtp({ phone: normalized, token: otp })
      if (result.error) {
        setError(result.error)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push(returnTo), 1500)
    })
  }

  function handleResend() {
    if (cooldown > 0 || isPending) return
    setError('')
    setOtp('')
    startTransition(async () => {
      const result = await sendOtp({ phone })
      if (result.error) {
        setError(result.error)
        return
      }
      setCooldown(RESEND_COOLDOWN)
    })
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">
          Mobile Number Verified!
        </h2>
        <p className="text-xs text-slate-500">Redirecting to your profile…</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Step Indicators */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs ${
            step === 'phone'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
          }`}
        >
          {step === 'otp' ? <CheckCircle2 className="w-4 h-4" /> : '1'}
        </div>
        <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              step === 'otp' ? 'w-full bg-blue-600' : 'w-1/2 bg-blue-600'
            }`}
          />
        </div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs ${
            step === 'otp'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}
        >
          2
        </div>
      </div>

      {/* Step 1: Phone number */}
      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <span>Verify Mobile Phone</span>
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Enter your Pakistani mobile number. A 6-digit OTP code will be sent via SMS via SendPK.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm">
                🇵🇰 +92
              </span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="3001234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength={12}
                className="flex-1 rounded-r-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-400">Only Pakistani mobile numbers (+92) supported</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || !phone}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending SMS Code…</span>
              </>
            ) : (
              <span>Send SMS Verification Code</span>
            )}
          </button>
        </form>
      )}

      {/* Step 2: OTP code */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-blue-600" />
              <span>Enter 6-Digit Code</span>
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              A 6-digit code was sent to{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {phone.replace(/(\d{4})(\d+)/, '$1****')}
              </span>{' '}
              via SMS.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
              SMS Security Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              maxLength={6}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 text-2xl tracking-[0.3em] text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || otp.length !== 6}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying…</span>
              </>
            ) : (
              <span>Confirm & Verify Number</span>
            )}
          </button>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setStep('phone')
                setOtp('')
                setError('')
              }}
              className="hover:text-blue-600 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Number</span>
            </button>

            {cooldown > 0 ? (
              <span className="text-slate-400">Resend in {cooldown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isPending}
                className="text-blue-600 hover:underline font-bold disabled:opacity-50"
              >
                Resend SMS Code
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
