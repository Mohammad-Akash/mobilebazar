'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, PlusCircle, Heart, User } from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()

  // Hide mobile bottom nav on post-ad wizard or ad edit page to give maximum screen real estate for form entry
  if (pathname?.startsWith('/post-ad') || pathname?.includes('/edit')) {
    return null
  }

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/ads', icon: Compass },
    { label: 'Sell Phone', href: '/post-ad', icon: PlusCircle, isCta: true },
    { label: 'Saved', href: '/favorites', icon: Heart },
    { label: 'Account', href: '/dashboard', icon: User },
  ]

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)

          if (item.isCta) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5 min-w-[56px] min-h-[56px]"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition-transform active:scale-95 border-2 border-white dark:border-slate-900">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  Sell
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] py-1 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
