'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, PlusCircle, MessageSquare, User } from 'lucide-react'

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
    { label: 'Chats', href: '/inbox', icon: MessageSquare },
    { label: 'Account', href: '/dashboard', icon: User },
  ]

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-3 left-4 right-4 z-50 bg-[#FFFFFF]/92 dark:bg-[#17152B]/92 backdrop-blur-xl border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl px-3 py-2 shadow-xl safe-area-bottom"
    >
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)

          if (item.isCta) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6 min-w-[48px] min-h-[48px]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] text-white shadow-md flex items-center justify-center transition-transform active:scale-95 border-2 border-[#FFFFFF] dark:border-[#17152B]">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-[#7657FF] dark:text-[#8A6FFF] mt-0.5">
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
                  ? 'text-[#7657FF] dark:text-[#8A6FFF] font-bold'
                  : 'text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
