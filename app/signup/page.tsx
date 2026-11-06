'use client'

import { useActionState, Suspense } from 'react'
import Link from 'next/link'
import { signupAction, type AuthState } from '@/app/auth/actions'

function SignupForm() {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    signupAction,
    null
  )

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          MobileBazar Par Naya Account
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Sign up to post ads and contact sellers
        </p>
      </div>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-700 dark:text-red-300">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Poora Naam / Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Muhammad Ali"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.fullName && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="apka-email@example.com"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.email && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Password (Kam az kam 8 characters)
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Password Dobara Likhein / Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-150 shadow-sm"
        >
          {isPending ? 'Account banaya ja raha hai...' : 'Register Karein'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Pehle se account hai?{' '}
        <Link
          href="/login"
          className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Login Karein
        </Link>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-zinc-500">Loading form...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
