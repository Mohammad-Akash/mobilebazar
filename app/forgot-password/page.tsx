'use client'

import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  forgotPasswordAction,
  verifyRecoveryOtpAction,
  type AuthState,
} from '@/app/auth/actions'
import { createClient } from '@/src/lib/supabase/client'
import { OtpInput } from '@/app/components/auth/OtpInput'
import { PasswordStrengthMeter } from '@/app/components/auth/PasswordStrengthMeter'
import {
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
  RefreshCw,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Step 1: Request OTP / Reset action
  const [reqState, reqFormAction, isReqPending] = useActionState<AuthState | null, FormData>(
    forgotPasswordAction,
    null
  )

  // Step 2: Verify OTP + Set New Password action
  const [verifyState, verifyFormAction, isVerifyPending] = useActionState<AuthState | null, FormData>(
    verifyRecoveryOtpAction,
    null
  )

  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)
  const [resendMsg, setResendMsg] = useState<string | null>(null)
  const [resendErr, setResendErr] = useState<string | null>(null)

  useEffect(() => {
    if (reqState?.success && reqState?.email) {
      setEmail(reqState.email)
      setStep('verify')
      setCooldown(60)
      setResendMsg(null)
      setResendErr(null)
    }
  }, [reqState])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleResend = async () => {
    const activeEmail = email || reqState?.email
    if (!activeEmail || cooldown > 0 || resending) return
    setResending(true)
    setResendMsg(null)
    setResendErr(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(activeEmail, {
        redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
      })
      if (error) {
        setResendErr(
          error.message.toLowerCase().includes('rate limit')
            ? 'Email rate limit reached (2-4 emails/hour on free SMTP). Please wait a few minutes or check Spam.'
            : error.message
        )
      } else {
        setResendMsg(`New 6-digit OTP code sent to ${activeEmail}`)
        setCooldown(60)
      }
    } catch {
      setResendErr('Failed to resend OTP code. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-[75dvh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-[0_16px_45px_rgba(23,21,43,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.45)] space-y-6 transition-all duration-300">
        {step === 'verify' ? (
          /* ── STEP 2: ENTER OTP & NEW PASSWORD ──────────────────────── */
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <div className="w-13 h-13 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
                Enter 6-Digit OTP Code
              </h1>
              <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
                We sent a 6-digit code to{' '}
                <span className="font-bold text-[#17152B] dark:text-[#F7F6F2] break-all">{email}</span>.
                Enter the code below to reset your password.
              </p>
            </div>

            {resendMsg && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{resendMsg}</span>
              </div>
            )}

            {(verifyState?.error || resendErr) && (
              <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{verifyState?.error || resendErr}</span>
              </div>
            )}

            <form action={verifyFormAction} className="space-y-4">
              <input type="hidden" name="email" value={email} />

              {/* 6-Digit OTP Input */}
              <div className="space-y-2 text-center">
                <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">
                  Verification Code (OTP)
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  name="token"
                  disabled={isVerifyPending}
                  autoFocus
                />
                {verifyState?.fieldErrors?.token && (
                  <p className="text-xs text-red-500 font-semibold">
                    {verifyState.fieldErrors.token[0]}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
                  <span>New Strong Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Min 8 chars, uppercase, lowercase & symbol"
                    className="w-full px-4 pr-11 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrengthMeter password={newPassword} />
                {verifyState?.fieldErrors?.password && (
                  <p className="text-xs text-red-500 font-semibold">
                    {verifyState.fieldErrors.password[0]}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
                  <span>Confirm New Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
                />
                {verifyState?.fieldErrors?.confirmPassword && (
                  <p className="text-xs text-red-500 font-semibold">
                    {verifyState.fieldErrors.confirmPassword[0]}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifyPending || otp.length !== 6}
                className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition-all duration-150 shadow-sm shadow-[#7657FF]/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isVerifyPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying code & updating...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP & Set Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Resend & Change email controls */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || resending}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#EFECE4] dark:hover:bg-[#2A2645] border border-[#E9E7EF] dark:border-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] font-bold text-xs sm:text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {resending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#7657FF]" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-[#7657FF]" />
                )}
                <span>
                  {resending
                    ? 'Resending code...'
                    : cooldown > 0
                      ? `Resend Code (${cooldown}s)`
                      : 'Resend OTP Code'}
                </span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline cursor-pointer"
                >
                  Change Email
                </button>
                <Link
                  href="/login"
                  className="text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2]"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* ── STEP 1: REQUEST OTP ──────────────────────────────────── */
          <>
            <div className="text-center space-y-2">
              <div className="w-13 h-13 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
                Reset via OTP Code
              </h1>
              <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2]">
                Enter your registered Gmail address. We will send a 6-digit OTP code to verify and reset your password.
              </p>
            </div>

            {reqState?.error && (
              <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{reqState.error}</span>
              </div>
            )}

            <form action={reqFormAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#7657FF]" />
                  <span>Registered Gmail Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={email}
                  autoComplete="email"
                  placeholder="you@gmail.com"
                  className="w-full px-4 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
                />
              </div>

              <button
                type="submit"
                disabled={isReqPending}
                className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition-all duration-150 shadow-sm shadow-[#7657FF]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isReqPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending 6-digit OTP code...</span>
                  </>
                ) : (
                  <>
                    <span>Send 6-Digit OTP Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-[#77758A] dark:text-[#9B98B2] pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947]">
              <span>Remembered password?</span>
              <Link
                href="/login"
                className="font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline inline-flex items-center min-h-[44px]"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
