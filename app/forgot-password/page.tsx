'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPasswordAction, type AuthState } from '@/app/auth/actions'
import { KeyRound, Mail, ArrowRight, ArrowLeft, AlertCircle, MailCheck, Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    forgotPasswordAction,
    null
  )

  return (
    <div className="min-h-[75dvh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-[0_16px_45px_rgba(23,21,43,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.45)] space-y-6 transition-all duration-300">
        {state?.success ? (
          <div className="text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
              <MailCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
                Check Your Gmail
              </h1>
              <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
                If an account exists for{' '}
                <span className="font-bold text-[#17152B] dark:text-[#F7F6F2]">{state.email}</span>,
                we have sent a password reset link. Click it to set a new strong password.
              </p>
            </div>
            <Link
              href="/login"
              className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
                Forgot Password?
              </h1>
              <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2]">
                Enter your email address and we&apos;ll send you a secure reset link.
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
                  <Mail className="w-3.5 h-3.5 text-[#7657FF]" />
                  <span>Registered Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition-all duration-150 shadow-sm shadow-[#7657FF]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-[#77758A] dark:text-[#9B98B2] pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947]">
              Remembered your password?{' '}
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
