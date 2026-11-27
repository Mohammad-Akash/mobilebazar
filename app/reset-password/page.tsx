'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { resetPasswordAction, type AuthState } from '@/app/auth/actions'
import { PasswordStrengthMeter } from '@/app/components/auth/PasswordStrengthMeter'
import { ShieldCheck, Lock, ArrowRight, AlertCircle, Loader2, Eye, EyeOff, KeyRound } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    resetPasswordAction,
    null
  )

  return (
    <div className="min-h-[75dvh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-[0_16px_45px_rgba(23,21,43,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.45)] space-y-6 transition-all duration-300">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
            Set New Password
          </h1>
          <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2]">
            Choose a strong password to protect your MobileBazar account.
          </p>
        </div>

        {state?.error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>New Strong Password</span>
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
                <span>Updating password...</span>
              </>
            ) : (
              <>
                <span>Update Password</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-[#77758A] dark:text-[#9B98B2] pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947] flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline inline-flex items-center gap-1 min-h-[44px]"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Reset using 6-Digit OTP</span>
          </Link>
          <Link
            href="/login"
            className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] min-h-[44px] inline-flex items-center"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
