import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/src/lib/supabase/server'
import { logoutAction } from '@/app/auth/actions'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import { MobileHeaderMenu } from '@/app/components/MobileHeaderMenu'
import { HeaderAuthPill } from '@/app/components/HeaderAuthPill'
import {
  Smartphone,
  Search,
  Plus,
} from 'lucide-react'

export async function Header() {
  let user: { id: string; email?: string } | null = null
  let fullName: string | null = null

  try {
    const cookieStore = await cookies()
    const hasAuthCookie = cookieStore
      .getAll()
      .some((c) => c.name.startsWith('sb-') && c.name.includes('-auth-token'))

    if (hasAuthCookie) {
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
    }
  } catch {
    // offline or guest session
  }

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 dark:bg-[#17152B]/90 backdrop-blur-md border-b border-[#E9E7EF] dark:border-[#2D2947] transition-colors safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Mobile Menu Button + Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-8 shrink-0">
          {/* Mobile Drawer Trigger (Hamburger) */}
          <MobileHeaderMenu user={user} fullName={fullName} logoutAction={logoutAction} />

          <Link
            href="/"
            className="flex items-center gap-2 group whitespace-nowrap text-lg font-black tracking-tight text-[#17152B] dark:text-[#F7F6F2] py-2 min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#7657FF] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
              <Smartphone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span>
              Mobile<span className="text-[#7657FF]">Bazar</span>
            </span>
          </Link>

          {/* Zone 2: Editorial Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#77758A] dark:text-[#9B98B2]">
            <Link
              href="/ads"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap py-2 min-h-[44px] inline-flex items-center"
            >
              Browse Catalog
            </Link>
            <Link
              href="/ads?min_price=150000"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap py-2 min-h-[44px] inline-flex items-center"
            >
              Flagship Tier
            </Link>
            <Link
              href="/ads?pta=pta_approved"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap py-2 min-h-[44px] inline-flex items-center"
            >
              PTA Certified
            </Link>
            <Link
              href="/favorites"
              className="hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap py-2 min-h-[44px] inline-flex items-center"
            >
              Saved Units
            </Link>
          </nav>
        </div>

        {/* Search Experience (Desktop Minimalist Bar) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-auto">
          <form
            action="/ads"
            method="GET"
            className="w-full relative flex items-center"
          >
            <Search className="w-4 h-4 text-[#77758A] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              name="q"
              aria-label="Search smartphones by model, brand, or specs"
              placeholder="Search by model, brand, or specs..."
              className="w-full h-10 pl-10 pr-4 text-xs bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#F0EEE7] dark:hover:bg-[#29263D] focus:bg-[#FFFFFF] dark:focus:bg-[#17152B] border border-transparent focus:border-[#7657FF] rounded-xl text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] focus:outline-none transition-all"
            />
          </form>
        </div>

        {/* Zone 3: Controls & Primary Action */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center">
            <ThemeToggle />
          </div>

          {/* User state (server-provided for instant paint, client-synced) */}
          <HeaderAuthPill initialUser={user} initialFullName={fullName} logoutAction={logoutAction} />

          {/* Primary CTA Button: Sell Smartphone */}
          <Link
            href="/post-ad"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Post Smartphone</span>
            <span className="sm:hidden">Sell</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
