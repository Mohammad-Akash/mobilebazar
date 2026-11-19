'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BottomSheet } from '@/app/components/ui/BottomSheet'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import {
  Menu,
  Search,
  Compass,
  Sparkles,
  ShieldCheck,
  Heart,
  PlusCircle,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react'

interface MobileHeaderMenuProps {
  user: { id: string; email?: string } | null
  fullName: string | null
  logoutAction: () => Promise<void>
}

export function MobileHeaderMenu({
  user,
  fullName,
  logoutAction,
}: MobileHeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setIsOpen(false)
    router.push(`/ads?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile Hamburger Button with 44x44px minimum tap target */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile menu"
        className="w-11 h-11 rounded-xl text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] active:scale-95 transition-all flex items-center justify-center cursor-pointer lg:hidden"
      >
        <Menu className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Mobile Menu Drawer (using accessible BottomSheet) */}
      <BottomSheet
        isOpen={isOpen}
        onClose={closeMenu}
        title="Menu & Search"
        subtitle="Explore Pakistan's Smartphone Exchange"
      >
        <div className="space-y-5">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-[#77758A] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search iPhone, Galaxy, Pixel..."
              className="w-full h-12 pl-10 pr-4 text-base bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] focus:border-[#7657FF] rounded-2xl text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] focus:outline-none"
            />
          </form>

          {/* Quick Post CTA */}
          <Link
            href="/post-ad"
            onClick={closeMenu}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#7657FF]/25 transition-all"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Post Smartphone Ad (Free)</span>
          </Link>

          {/* Editorial Navigation Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#77758A] dark:text-[#9B98B2] px-1 block mb-1">
              Browse Categories
            </span>
            <Link
              href="/ads"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
            >
              <Compass className="w-4 h-4 text-[#7657FF]" />
              <span>Browse Catalog</span>
            </Link>
            <Link
              href="/ads?min_price=150000"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Flagship Tier (150K+)</span>
            </Link>
            <Link
              href="/ads?pta=pta_approved"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#159B72]" />
              <span>Official PTA Approved</span>
            </Link>
            <Link
              href="/favorites"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
            >
              <Heart className="w-4 h-4 text-[#E45858]" />
              <span>Saved Units</span>
            </Link>
          </div>

          {/* User Account / Auth Section */}
          <div className="pt-4 border-t border-[#E9E7EF] dark:border-[#2D2947] space-y-2">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#77758A] dark:text-[#9B98B2]">
                Account & Theme
              </span>
              <ThemeToggle />
            </div>

            {user ? (
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <User className="w-4 h-4 text-[#7657FF]" />
                  <div className="min-w-0">
                    <p className="truncate font-bold leading-none">{fullName}</p>
                    <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] mt-1 truncate">
                      {user.email}
                    </p>
                  </div>
                </Link>
                <form action={logoutAction} onSubmit={closeMenu}>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#E45858] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="py-3 px-4 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] text-center text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] hover:border-[#7657FF] transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="py-3 px-4 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-center text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  )
}
