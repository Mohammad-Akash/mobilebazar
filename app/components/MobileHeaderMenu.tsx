'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import {
  Menu,
  X,
  Home,
  Smartphone,
  Compass,
  Sparkles,
  ShieldCheck,
  Heart,
  PlusCircle,
  MessageSquare,
  LayoutDashboard,
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
  const pathname = usePathname()

  // Close drawer automatically on route navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when drawer is open & handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile Hamburger Button with 44x44px minimum tap target */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="w-11 h-11 rounded-xl text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] active:scale-95 transition-all flex items-center justify-center cursor-pointer lg:hidden"
      >
        <Menu className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Side Navigation Drawer (Native App Style) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 flex"
        >
          {/* Backdrop Overlay - Clicking anywhere outside closes the drawer */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Left Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#FFFFFF] dark:bg-[#17152B] shadow-2xl border-r border-[#E9E7EF] dark:border-[#2D2947] flex flex-col z-10 animate-in slide-in-from-left duration-200 safe-top safe-bottom">
            {/* Drawer Header with Brand Logo & Prominent Close [X] Button */}
            <div className="px-4 py-3.5 border-b border-[#E9E7EF] dark:border-[#2D2947] flex items-center justify-between gap-3 shrink-0">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2 font-black text-base text-[#17152B] dark:text-[#F7F6F2]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#7657FF] flex items-center justify-center text-white shadow-xs">
                  <Smartphone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>
                  Mobile<span className="text-[#7657FF]">Bazar</span>
                </span>
              </Link>

              {/* Close [X] Button */}
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="w-10 h-10 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38] hover:bg-[#E9E7EF] dark:hover:bg-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] transition-colors flex items-center justify-center cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* User Profile Card (Prominent at top) */}
              {user ? (
                <div className="p-3.5 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#7657FF] text-white flex items-center justify-center font-black text-base shrink-0 shadow-xs">
                      {(fullName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-[#17152B] dark:text-[#F7F6F2] truncate">
                        {fullName || 'MobileBazar User'}
                      </p>
                      <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] truncate font-mono">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E9E7EF]/60 dark:border-[#2D2947]">
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] text-[11px] font-bold text-[#17152B] dark:text-[#F7F6F2] text-center hover:text-[#7657FF] transition-colors flex items-center justify-center gap-1"
                    >
                      <LayoutDashboard className="w-3 h-3 text-[#7657FF]" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={closeMenu}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] text-[11px] font-bold text-[#17152B] dark:text-[#F7F6F2] text-center hover:text-[#7657FF] transition-colors flex items-center justify-center gap-1"
                    >
                      <User className="w-3 h-3 text-[#7657FF]" />
                      <span>Profile</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] space-y-2.5">
                  <div>
                    <h4 className="text-xs font-black text-[#17152B] dark:text-[#F7F6F2]">
                      Welcome to MobileBazar
                    </h4>
                    <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2]">
                      Buy & sell verified handsets directly
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="py-2.5 px-3 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] text-center text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] hover:border-[#7657FF] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={closeMenu}
                      className="py-2.5 px-3 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-center text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Register</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Primary Call to Action: Post Ad */}
              <Link
                href="/post-ad"
                onClick={closeMenu}
                className="w-full py-3 px-4 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#7657FF]/25 transition-all"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Post Smartphone Ad (Free)</span>
              </Link>

              {/* Main Navigation Links */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#77758A] dark:text-[#9B98B2] px-2 block mb-1">
                  Explore Marketplace
                </span>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <Home className="w-4 h-4 text-[#7657FF]" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/ads"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#7657FF]" />
                  <span>Browse All Handsets</span>
                </Link>
                <Link
                  href="/ads?min_price=150000"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Flagship Tier (150K+)</span>
                </Link>
                <Link
                  href="/ads?pta=pta_approved"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#159B72]" />
                  <span>Official PTA Approved</span>
                </Link>
                <Link
                  href="/inbox"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#7657FF]" />
                  <span>Messages & Chats</span>
                </Link>
                <Link
                  href="/favorites"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
                >
                  <Heart className="w-4 h-4 text-[#E45858]" />
                  <span>Saved Units</span>
                </Link>
              </div>

              {/* Preferences & Appearance */}
              <div className="pt-3 border-t border-[#E9E7EF] dark:border-[#2D2947]">
                <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-[#F7F6F2] dark:bg-[#211E38]">
                  <span className="text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2]">
                    Appearance Mode
                  </span>
                  <ThemeToggle />
                </div>
              </div>

              {/* Log Out Option (Clean, Quiet at the Bottom) */}
              {user && (
                <div className="pt-2">
                  <form action={logoutAction} onSubmit={closeMenu}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#E45858] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
