'use client'

import { useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { Loader2 } from 'lucide-react'

interface GoogleAuthButtonProps {
  next?: string
  label?: string
}

export function GoogleAuthButton({
  next = '/',
  label = 'Continue with Google',
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/'
      const redirectTo = `${window.location.origin}/auth/confirm?next=${encodeURIComponent(safeNext)}`

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (oauthError) {
        setError(oauthError.message)
        setIsLoading(false)
      }
    } catch {
      setError('Unable to connect to Google Sign-In. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full min-h-[48px] py-3 px-4 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#EFECE4] dark:hover:bg-[#2A2645] border border-[#E9E7EF] dark:border-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] font-bold text-sm transition-all duration-150 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer shadow-2xs"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-[#7657FF]" />
        ) : (
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
            />
          </svg>
        )}
        <span>{isLoading ? 'Connecting to Google...' : label}</span>
      </button>
      {error && (
        <p className="text-xs text-red-500 text-center font-medium">{error}</p>
      )}
    </div>
  )
}
