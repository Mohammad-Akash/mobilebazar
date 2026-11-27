'use client'

import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { signupAction, resendVerificationAction, type AuthState } from '@/app/auth/actions'
import { GoogleAuthButton } from '@/app/components/auth/GoogleAuthButton'
import { PasswordStrengthMeter } from '@/app/components/auth/PasswordStrengthMeter'
import {
  Smartphone,
  Mail,
  Lock,
  User,
  AtSign,
  ArrowRight,
  AlertCircle,
  Loader2,
  MailCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'

export function SignupFormSkeleton() {
  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-sm space-y-6 animate-pulse">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#E9E7EF] dark:bg-[#2D2947] mx-auto" />
        <div className="h-6 w-48 bg-[#E9E7EF] dark:bg-[#2D2947] rounded-lg mx-auto" />
        <div className="h-4 w-64 bg-[#F7F6F2] dark:bg-[#211E38] rounded-lg mx-auto" />
      </div>
      <div className="space-y-4">
        <div className="h-12 w-full bg-[#F7F6F2] dark:bg-[#211E38] rounded-2xl" />
        <div className="h-12 w-full bg-[#F7F6F2] dark:bg-[#211E38] rounded-2xl" />
        <div className="h-12 w-full bg-[#F7F6F2] dark:bg-[#211E38] rounded-2xl" />
        <div className="h-12 w-full bg-[#7657FF]/20 rounded-2xl" />
      </div>
    </div>
  )
}

export function SignupForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')

  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    signupAction,
    null
  )

  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)
  const [resendMsg, setResendMsg] = useState<string | null>(null)
  const [resendErr, setResendErr] = useState<string | null>(null)

  useEffect(() => {
    if (state?.success && state?.needsEmailVerification) {
      setCooldown(60)
      setResendMsg(null)
      setResendErr(null)
    }
  }, [state])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleResendVerification = async () => {
    if (!state?.email || cooldown > 0 || resending) return
    setResending(true)
    setResendMsg(null)
    setResendErr(null)
    try {
      const res = await resendVerificationAction(state.email)
      if (res.error) {
        setResendErr(res.error)
      } else {
        setResendMsg(`Verification email resent to ${state.email}`)
        setCooldown(60)
      }
    } finally {
      setResending(false)
    }
  }

  if (state?.success && state?.needsEmailVerification) {
    return (
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-lg space-y-6 text-center transition-all duration-300">
        <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
          <MailCheck className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
            Verify Your Email
          </h1>
          <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
            Account created! We have sent a verification link to{' '}
            <span className="font-bold text-[#17152B] dark:text-[#F7F6F2] break-all">
              {state.email}
            </span>
            .
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] text-xs text-[#77758A] dark:text-[#9B98B2] space-y-1.5 text-left">
          <p className="font-bold text-[#17152B] dark:text-[#F7F6F2]">Next Steps:</p>
          <p>1. Open your Gmail / email inbox.</p>
          <p>2. Click the confirmation link (check Spam/Promotions if not in Inbox).</p>
          <p>3. Once verified, sign in to your account.</p>
        </div>

        {resendMsg && (
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{resendMsg}</span>
          </div>
        )}

        {resendErr && (
          <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{resendErr}</span>
          </div>
        )}

        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={cooldown > 0 || resending}
            className="w-full min-h-[46px] py-3 px-4 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#EFECE4] dark:hover:bg-[#2A2645] border border-[#E9E7EF] dark:border-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] font-bold text-xs sm:text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {resending ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#7657FF]" />
            ) : (
              <RefreshCw className="w-4 h-4 text-[#7657FF]" />
            )}
            <span>
              {resending
                ? 'Resending...'
                : cooldown > 0
                  ? `Resend Verification Email (${cooldown}s)`
                  : 'Resend Verification Email'}
            </span>
          </button>

          <Link
            href="/login"
            className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white font-bold text-sm rounded-2xl transition duration-150 shadow-sm shadow-[#7657FF]/30 flex items-center justify-center gap-2"
          >
            <span>Go to Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-[0_16px_45px_rgba(23,21,43,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.45)] space-y-5 transition-all duration-300">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
          <Smartphone className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
          Join MobileBazar
        </h1>
        <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2]">
          Create your verified account to buy &amp; sell smartphones
        </p>
      </div>

      {state?.error && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Sign up with Google */}
      <GoogleAuthButton label="Sign up with Google" />

      <div className="relative flex items-center py-0.5">
        <div className="flex-grow border-t border-[#E9E7EF] dark:border-[#2D2947]" />
        <span className="shrink-0 mx-3 text-[11px] font-bold uppercase tracking-wider text-[#77758A] dark:text-[#9B98B2]">
          or register with email
        </span>
        <div className="flex-grow border-t border-[#E9E7EF] dark:border-[#2D2947]" />
      </div>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              autoComplete="name"
              placeholder="Muhammad Akash"
              className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
            />
            {state?.fieldErrors?.fullName && (
              <p className="text-[11px] text-red-500 font-semibold">{state.fieldErrors.fullName[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
              <AtSign className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>Username</span>
            </label>
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              autoComplete="username"
              placeholder="akash_pk"
              className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
            />
            {state?.fieldErrors?.username && (
              <p className="text-[11px] text-red-500 font-semibold">{state.fieldErrors.username[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {state?.fieldErrors?.email && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Strong Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Min 8 chars, A-z, 0-9 & symbol"
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
          <PasswordStrengthMeter password={password} />
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>Confirm Password</span>
            </span>
            {passwordsMatch && (
              <span className="text-[11px] text-[#159B72] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Matched
              </span>
            )}
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-4 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 font-semibold">
              {state.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition-all duration-150 shadow-sm shadow-[#7657FF]/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-[#77758A] dark:text-[#9B98B2] pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947]">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline inline-flex items-center min-h-[44px]"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
