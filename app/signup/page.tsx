'use client'

import { useActionState, Suspense } from 'react'
import Link from 'next/link'
import { signupAction, type AuthState } from '@/app/auth/actions'
import { Smartphone, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'

function SignupForm() {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    signupAction,
    null
  )

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 mx-auto flex items-center justify-center text-blue-600 dark:text-blue-400">
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
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Muhammad Ali"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.fullName && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.email && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Password (min. 8 characters)</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Confirm Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition duration-150 shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2"
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
          className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-slate-500">Loading form...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
