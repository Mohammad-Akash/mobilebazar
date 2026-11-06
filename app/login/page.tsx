'use client'

import { useActionState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loginAction, type AuthState } from '@/app/auth/actions'

function LoginForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/'
  const urlError = searchParams.get('error')

  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    loginAction,
    null
  )

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          MobileBazar Login
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Apne account mein dakhil hon / Sign in to your account
        </p>
      </div>

      {(state?.error || urlError) && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-700 dark:text-red-300">
          {state?.error || urlError}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

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
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-150 shadow-sm"
        >
          {isPending ? 'Checking details...' : 'Login Karein'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Account nahi hai?{' '}
        <Link
          href={`/signup${next !== '/' ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Naya Account Banayein (Signup)
        </Link>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-zinc-500">Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
