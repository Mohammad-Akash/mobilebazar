import Link from 'next/link'
import { connection } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { logoutAction } from '@/app/auth/actions'

export async function Header() {
  await connection()
  const supabase = await createClient()

  // Always use getUser() on server, never getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let fullName: string | null = null

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    fullName = profile?.full_name || user.email?.split('@')[0] || 'User'
  }

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="font-extrabold text-xl tracking-tight text-emerald-600 dark:text-emerald-400">
              Mobile<span className="text-zinc-900 dark:text-zinc-100">Bazar</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Home
            </Link>
            <Link href="/favorites" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Saved Ads
            </Link>
          </nav>
        </div>

        {/* Action Controls & Auth State */}
        <div className="flex items-center gap-3">
          <Link
            href="/post-ad"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
          >
            <span>+</span> Post Ad
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
              >
                👤 {fullName}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 py-1.5 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 py-1.5 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline py-1.5 px-2"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

