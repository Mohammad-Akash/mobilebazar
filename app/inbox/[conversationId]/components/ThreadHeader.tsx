'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MoreVertical, ShieldBan, Flag, CheckCircle2, Phone } from 'lucide-react'

interface ThreadHeaderProps {
  otherUserName: string
  otherUserAvatar?: string | null
  isPhoneVerified: boolean
  isOnline?: boolean
  lastSeenText?: string
  onActionClick: (mode: 'block' | 'report') => void
  onSharePhone?: () => void
}

export function ThreadHeader({
  otherUserName,
  isPhoneVerified,
  isOnline = false,
  lastSeenText,
  onActionClick,
  onSharePhone,
}: ThreadHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative flex items-center justify-between p-3.5 bg-[#FFFFFF] dark:bg-[#17152B] border-b border-[#E9E7EF] dark:border-[#2D2947] rounded-t-3xl">
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/inbox"
          className="p-1.5 rounded-xl text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors"
          title="Back to inbox"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* User initials / avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-[#7657FF]/15 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center font-black text-xs shrink-0">
            {(otherUserName || 'U')[0].toUpperCase()}
          </div>
          {/* Online badge dot on avatar */}
          {isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#17152B] rounded-full" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xs sm:text-sm font-black text-[#17152B] dark:text-[#F7F6F2] truncate">
              {otherUserName}
            </h2>
            {isPhoneVerified && (
              <span title="Verified Phone" className="inline-flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
              </span>
            )}
          </div>

          {/* Active status / Last Seen */}
          {isOnline ? (
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Now</span>
            </p>
          ) : (
            <p className="text-[10px] text-[#77758A] dark:text-[#9B98B2] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>{lastSeenText || 'Offline'}</span>
            </p>
          )}
        </div>
      </div>

      {/* Options Menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 rounded-xl text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors cursor-pointer"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl shadow-xl z-30 py-1.5 animate-in fade-in duration-150">
              {onSharePhone && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    onSharePhone()
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Share Phone Number</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onActionClick('report')
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold text-[#17152B] dark:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] flex items-center gap-2 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 text-[#E45858]" />
                <span>Report Chat</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onActionClick('block')
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold text-[#E45858] hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 cursor-pointer"
              >
                <ShieldBan className="w-3.5 h-3.5" />
                <span>Block User</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
