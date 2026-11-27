'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loginAction, type AuthState } from '@/app/auth/actions'
import { GoogleAuthButton } from '@/app/components/auth/GoogleAuthButton'
import {
  Smartphone,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react'

export function LoginFormSkeleton() {
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
        <div className="h-12 w-full bg-[#7657FF]/20 rounded-2xl" />
      </div>
    </div>
  )
}

export function LoginForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/'
  const urlError = searchParams.get('error')
  const urlMessage = searchParams.get('message')

  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    loginAction,
    null
  )

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl shadow-[0_16px_45px_rgba(23,21,43,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.45)] space-y-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 mx-auto flex items-center justify-center text-[#7657FF] dark:text-[#8A6FFF] shadow-xs">
          <Smartphone className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]">
          Welcome to MobileBazar
        </h1>
        <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2]">
          Sign in to your smartphone marketplace account
        </p>
      </div>

      {urlMessage && !state?.error && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{urlMessage}</span>
        </div>
      )}

      {(state?.error || urlError) && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state?.error || urlError}</span>
        </div>
      )}

      {/* Login with Google */}
      <GoogleAuthButton next={next} label="Continue with Google" />

      <div className="relative flex items-center py-0.5">
        <div className="flex-grow border-t border-[#E9E7EF] dark:border-[#2D2947]" />
        <span className="shrink-0 mx-3 text-[11px] font-bold uppercase tracking-wider text-[#77758A] dark:text-[#9B98B2]">
          or sign in with email
        </span>
        <div className="flex-grow border-t border-[#E9E7EF] dark:border-[#2D2947]" />
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

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
            className="w-full px-4 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF] transition-shadow"
          />
          {state?.fieldErrors?.email && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>Password</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 pr-11 py-3 min-h-[44px] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF] transition-shadow"
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
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{state.fieldErrors.password[0]}</p>
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
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-[#77758A] dark:text-[#9B98B2] pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947]">
        Don&apos;t have an account?{' '}
        <Link
          href={`/signup${next !== '/' ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline inline-flex items-center min-h-[44px]"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  )
}
