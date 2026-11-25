'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signupAction, type AuthState } from '@/app/auth/actions'
import { Smartphone, Mail, Lock, User, ArrowRight, AlertCircle, Loader2, MailCheck } from 'lucide-react'

export function SignupFormSkeleton() {
  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 animate-pulse">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 mx-auto" />
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto" />
        <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        </div>
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  )
}

export function SignupForm() {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    signupAction,
    null
  )

  if (state?.success && state?.needsEmailVerification) {
    return (
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-sm space-y-6 text-center">
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

        <div className="pt-2 space-y-3">
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

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF]">
          <Smartphone className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Join MobileBazar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Sign up to sell smartphones and connect with verified buyers
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
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Muhammad Ali"
            className="w-full px-4 py-3 min-h-[44px] border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {state?.fieldErrors?.fullName && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 min-h-[44px] border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {state?.fieldErrors?.email && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Password (min. 8 characters)</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-4 py-3 min-h-[44px] border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Confirm Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-4 py-3 min-h-[44px] border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[48px] py-3.5 px-4 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition duration-150 shadow-sm shadow-[#7657FF]/30 flex items-center justify-center gap-2 cursor-pointer"
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

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
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
