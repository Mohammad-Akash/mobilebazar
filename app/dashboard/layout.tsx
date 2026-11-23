import { redirect } from 'next/navigation'
import Link from 'next/link'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'
import { Smartphone, Heart, User, PlusCircle, AlertOctagon, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'User Dashboard — MobileBazar',
  robots: {
    index: false,
    follow: false,
  },
}

export const instant = false

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await connection()
  const supabase = await createClient()

  // 1. Verify Authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/dashboard')
  }

  // 2. Fetch public profile and banned status
  const [profileRes, privateRes] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, avatar_url, created_at, ads_count')
      .eq('id', user.id)
      .single(),
    (supabase as any)
      .from('profile_private')
      .select('is_banned, role, ban_reason')
      .eq('id', user.id)
      .single(),
  ])

  const profile = profileRes.data
  const isBanned = privateRes.data?.is_banned || false
  const banReason = privateRes.data?.ban_reason || null
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@mobilebazar.pk'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-28 sm:pb-8 space-y-5 sm:space-y-6">
      {/* Banned Alert Banner */}
      {isBanned && (
        <div className="p-3.5 sm:p-4 bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 rounded-2xl sm:rounded-3xl text-red-900 dark:text-red-200 flex items-start gap-3 shadow-md">
          <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-red-600 mt-0.5" />
          <div className="space-y-1">
            <p className="font-extrabold text-sm sm:text-base">
              Your Account Has Been Suspended
            </p>
            <p className="text-xs text-red-700 dark:text-red-300">
              Reason: <span className="font-semibold">&quot;{banReason || 'Policy violations'}&quot;</span>
            </p>
            <p className="text-xs text-red-700 dark:text-red-300">
              You cannot post, edit, favorite, report, or reveal seller contacts. For appeals, contact{' '}
              <a href={`mailto:${supportEmail}`} className="underline font-bold">
                {supportEmail}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* User Header Summary Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center font-black text-xl sm:text-2xl border border-[#7657FF]/20 shrink-0 shadow-xs">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'User avatar'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>
                {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h1 className="text-lg sm:text-2xl font-black text-[#17152B] dark:text-[#F7F6F2] truncate">
                {profile?.full_name || 'MobileBazar User'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7657FF]/10 text-[#7657FF] dark:bg-[#8A6FFF]/20 dark:text-[#8A6FFF] border border-[#7657FF]/25">
                <ShieldCheck className="w-3 h-3 text-[#7657FF] dark:text-[#8A6FFF]" />
                <span>Verified Seller</span>
              </span>
            </div>
            <p className="text-xs text-[#77758A] dark:text-[#9B98B2] mt-0.5 font-mono truncate">{user.email}</p>
          </div>
        </div>

        <Link
          href="/post-ad"
          className="w-full sm:w-auto px-5 py-3 rounded-xl sm:rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] text-white font-bold text-xs sm:text-sm shadow-sm shadow-[#7657FF]/25 transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[44px]"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.2]" />
          <span>Sell Smartphone</span>
        </Link>
      </div>

      {/* Navigation Tabs (Mobile-first edge-to-edge scroll with scrollbar hidden) */}
      <nav className="flex items-center gap-1 sm:gap-2 border-b border-[#E9E7EF] dark:border-[#2D2947] pb-px overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <Link
          href="/dashboard/ads"
          className="px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-[#7657FF] text-[#7657FF] dark:text-[#8A6FFF] whitespace-nowrap flex items-center gap-2 shrink-0 min-h-[44px]"
        >
          <Smartphone className="w-4 h-4" />
          <span>My Phone Listings</span>
        </Link>
        <Link
          href="/favorites"
          className="px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap flex items-center gap-2 shrink-0 min-h-[44px]"
        >
          <Heart className="w-4 h-4" />
          <span>Saved Phones</span>
        </Link>
        <Link
          href="/profile"
          className="px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2] transition-colors whitespace-nowrap flex items-center gap-2 shrink-0 min-h-[44px]"
        >
          <User className="w-4 h-4" />
          <span>Profile & Verification</span>
        </Link>
      </nav>

      {/* Main Body */}
      <div>{children}</div>
    </div>
  )
}
