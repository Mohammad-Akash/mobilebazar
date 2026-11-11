import Link from 'next/link'
import { connection } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { logoutAction } from '@/app/auth/actions'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import { HeaderChatBadge } from '@/app/components/HeaderChatBadge'
import {
  Smartphone,
  Search,
  Plus,
  User,
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
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/85 dark:bg-[#17152B]/85 backdrop-blur-md border-b border-[#E9E7EF] dark:border-[#2D2947] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single Element) */}
        <div className="flex items-center gap-8 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 group whitespace-nowrap text-lg font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#7657FF] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Smartphone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span>
              Mobile<span className="text-[#7657FF]">Bazar</span>
            </span>
          </Link>

          {/* Zone 2: Editorial Navigation Links (Quiet, Single-Line, Clean Text) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#77758A] dark:text-[#9B98B2]">
            <Link
              href="/ads"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap"
            >
              Browse Catalog
            </Link>
            <Link
              href="/ads?min_price=150000"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap"
            >
              Flagship Tier
            </Link>
            <Link
              href="/ads?pta=pta_approved"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap"
            >
              PTA Certified
            </Link>
            <Link
              href="/favorites"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap"
            >
              Saved Units
            </Link>
          </nav>
        </div>

        {/* Search Experience (Editorial Minimalist Bar) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-auto">
          <form
            action="/ads"
            method="GET"
            className="w-full relative flex items-center"
          >
            <Search className="w-3.5 h-3.5 text-[#77758A] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              name="q"
              placeholder="Search by model, brand, or specs..."
              className="w-full h-9 pl-9 pr-4 text-xs bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#F0EEE7] dark:hover:bg-[#29263D] focus:bg-[#FFFFFF] dark:focus:bg-[#17152B] border border-transparent focus:border-[#7657FF] rounded-xl text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] focus:outline-none transition-all"
            />
          </form>
        </div>

        {/* Zone 3: Controls & Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          {user && <HeaderChatBadge />}

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] dark:hover:text-[#8A6FFF] py-1.5 px-3 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#7657FF]" />
                <span className="max-w-[100px] truncate">{fullName}</span>
              </Link>
              <form action={logoutAction} className="hidden sm:block">
                <button
                  type="submit"
                  className="text-xs font-medium text-[#77758A] hover:text-[#E45858] dark:text-[#9B98B2] dark:hover:text-[#E45858] py-1.5 px-2 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:text-[#7657FF] py-1.5 px-2.5 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Primary CTA Button: Sell Smartphone */}
          <Link
            href="/post-ad"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Post Smartphone</span>
            <span className="sm:hidden">Sell</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
