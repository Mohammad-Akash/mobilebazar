import Link from 'next/link'
import { connection } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { logoutAction } from '@/app/auth/actions'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import {
  Smartphone,
  Search,
  Plus,
  Heart,
  User,
  ShieldCheck,
  Compass,
} from 'lucide-react'

export async function Header() {
  await connection()
  let user: { id: string; email?: string } | null = null
  let fullName: string | null = null

  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()

      fullName = profile?.full_name || user.email?.split('@')[0] || 'User'
    }
  } catch {
    // offline or no active session
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Exclusively Smartphones Tag */}
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Mobile<span className="text-blue-600">Bazar</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase -mt-1 hidden sm:block">
                Smartphones Only
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Link
              href="/ads"
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Phones</span>
            </Link>
            <Link
              href="/ads?pta=pta_approved"
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>PTA Approved</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Saved</span>
            </Link>
          </nav>
        </div>

        {/* Desktop Quick Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <form
            action="/ads"
            method="GET"
            className="w-full relative flex items-center"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              name="q"
              placeholder="Search iPhone, Samsung, Xiaomi..."
              className="w-full h-10 pl-10 pr-4 text-xs bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-blue-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
            />
          </form>
        </div>

        {/* Right Action Controls: ThemeToggle, Sell Button, User Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle />

          <Link
            href="/post-ad"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Sell Phone</span>
            <span className="sm:hidden">Sell</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs transition-colors"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span className="max-w-[100px] truncate">{fullName}</span>
              </Link>
              <form action={logoutAction} className="hidden sm:block">
                <button
                  type="submit"
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 py-1.5 px-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-block text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline py-1.5 px-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
