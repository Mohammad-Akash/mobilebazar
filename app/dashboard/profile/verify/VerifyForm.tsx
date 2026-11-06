'use client'

// ==============================================================================
// Phone Verification Page
// /dashboard/profile/verify
// Step 1: Enter Pakistani mobile number
// Step 2: Enter 6-digit OTP code
// ==============================================================================

import { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { sendOtp, verifyOtp } from '@/src/lib/actions/phone-verify'
import { normalizePakistaniPhone } from '@/src/lib/utils/phone'

type Step = 'phone' | 'otp'

const RESEND_COOLDOWN = 60 // seconds

export function VerifyPhoneForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('return_to') || '/dashboard/profile'

  const [step, setStep]       = useState<Step>('phone')
  const [phone, setPhone]     = useState('')
  const [otp, setOtp]         = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isPending, startTransition] = useTransition()

  // ── Resend countdown timer ──────────────────────────────────────────────
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  // ── Step 1: Send OTP ────────────────────────────────────────────────────
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

  // ── Step 2: Verify OTP ──────────────────────────────────────────────────
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

  // ── Resend OTP ──────────────────────────────────────────────────────────
  function handleResend() {
    if (cooldown > 0 || isPending) return
    setError('')
    setOtp('')
    startTransition(async () => {
      const result = await sendOtp({ phone })
      if (result.error) { setError(result.error); return }
      setCooldown(RESEND_COOLDOWN)
    })
  }

  // ── Success screen ──────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Phone Verify Ho Gaya!
        </h2>
        <p className="text-sm text-zinc-500">Redirect ho raha hai…</p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`w-3 h-3 rounded-full ${step === 'phone' ? 'bg-emerald-500' : 'bg-emerald-500'}`} />
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
        <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
      </div>

      {/* ── Step 1: Phone number ── */}
      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Phone Number Verify Karein
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Aap ka Pakistani mobile number darj karein. Ek verification code SMS se aayega.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-500 text-sm">
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
                className="flex-1 rounded-r-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="mt-1 text-xs text-zinc-400">Sirf Pakistani numbers (+92) allowed hain</p>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || !phone}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? 'Bhej raha hai…' : 'OTP Code Bhejein'}
          </button>
        </form>
      )}

      {/* ── Step 2: OTP code ── */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Code Darj Karein
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              6-digit code{' '}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {phone.replace(/(\d{4})(\d+)/, '$1****')}
              </span>{' '}
              par SMS se bheja gaya hai.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              maxLength={6}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-3 py-2.5 text-2xl tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || otp.length !== 6}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? 'Verify ho raha hai…' : 'Verify Karein'}
          </button>

          {/* Resend */}
          <div className="text-center text-sm text-zinc-500">
            Code nahi aaya?{' '}
            {cooldown > 0 ? (
              <span className="text-zinc-400">{cooldown}s mein dobara bhejein</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isPending}
                className="text-emerald-600 hover:underline font-medium disabled:opacity-50"
              >
                Dobara Bhejein
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => { setStep('phone'); setOtp(''); setError('') }}
            className="text-xs text-zinc-400 hover:text-zinc-600 text-center"
          >
            ← Number badlein
          </button>
        </form>
      )}
    </div>
  )
}

