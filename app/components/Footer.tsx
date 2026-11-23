'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Smartphone, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react'

const CURRENT_YEAR = 2026

export function Footer() {
  const pathname = usePathname()

  // Hide footer on active chat conversation to keep chat screen clean and full-height
  if (pathname?.startsWith('/inbox/') && pathname !== '/inbox') {
    return null
  }
  return (
    <footer className="border-t border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#121022] text-[#17152B] dark:text-[#F7F6F2] transition-colors safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Main Footer Grid: Stacked on Mobile, 4 Columns on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-black tracking-tight min-h-[44px]"
            >
              <div className="w-8 h-8 rounded-xl bg-[#7657FF] flex items-center justify-center text-white shadow-xs">
                <Smartphone className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span>
                Mobile<span className="text-[#7657FF]">Bazar</span>
              </span>
            </Link>
            <p className="text-xs text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
              Pakistan&apos;s dedicated smartphone exchange. 100% peer-to-peer mobile marketplace with official PTA status clarity and in-person inspection.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#159B72] font-semibold min-h-[44px]">
              <ShieldCheck className="w-4 h-4" />
              <span>PTA Verification Standard</span>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-[#17152B] dark:text-[#F7F6F2]">
              Explore Phones
            </p>
            <ul className="space-y-1 text-xs text-[#77758A] dark:text-[#9B98B2]">
              <li>
                <Link
                  href="/ads"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center"
                >
                  All Mobile Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/ads?min_price=150000"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Flagship Tier (150K+)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ads?pta=pta_approved"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center"
                >
                  Official PTA Approved
                </Link>
              </li>
              <li>
                <Link
                  href="/ads?condition=new"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center"
                >
                  Brand New In-Box
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 text-[#E45858]" />
                  <span>Saved Listings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Major Cities */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-[#17152B] dark:text-[#F7F6F2]">
              Major Hubs
            </p>
            <ul className="space-y-1 text-xs text-[#77758A] dark:text-[#9B98B2]">
              <li>
                <Link
                  href="/mobiles/lahore"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#7657FF]" />
                  <span>Phones in Lahore</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mobiles/karachi"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#7657FF]" />
                  <span>Phones in Karachi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mobiles/islamabad"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#7657FF]" />
                  <span>Phones in Islamabad</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mobiles/rawalpindi"
                  className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors min-h-[44px] inline-flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#7657FF]" />
                  <span>Phones in Rawalpindi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Actions & Trust */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-[#17152B] dark:text-[#F7F6F2]">
              Start Selling
            </p>
            <p className="text-xs text-[#77758A] dark:text-[#9B98B2]">
              Have a smartphone you want to upgrade or sell? List in under 2 minutes.
            </p>
            <Link
              href="/post-ad"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all shadow-sm active:scale-95 min-h-[44px]"
            >
              Post Free Phone Ad
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E9E7EF] dark:border-[#2D2947] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#77758A] dark:text-[#9B98B2]">
          <p>© {CURRENT_YEAR} MobileBazar Pakistan. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/ads" className="hover:text-[#7657FF] transition-colors min-h-[44px] inline-flex items-center">
              Directory
            </Link>
            <span>•</span>
            <Link href="/post-ad" className="hover:text-[#7657FF] transition-colors min-h-[44px] inline-flex items-center">
              Sell
            </Link>
            <span>•</span>
            <Link href="/inbox" className="hover:text-[#7657FF] transition-colors min-h-[44px] inline-flex items-center">
              Chats
            </Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-[#7657FF] transition-colors min-h-[44px] inline-flex items-center">
              My Account
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
