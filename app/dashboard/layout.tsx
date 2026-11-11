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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Banned Alert Banner */}
      {isBanned && (
        <div className="p-4 bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 rounded-3xl text-red-900 dark:text-red-200 flex items-start gap-3 shadow-md">
          <AlertOctagon className="w-6 h-6 shrink-0 text-red-600 mt-0.5" />
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-2xl border border-blue-200 dark:border-blue-900 shrink-0 shadow-xs">
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

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {profile?.full_name || 'MobileBazar User'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                <span>Verified Seller</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{user.email}</p>
          </div>
        </div>

        <Link
          href="/post-ad"
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Sell Smartphone</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-px overflow-x-auto">
        <Link
          href="/dashboard/ads"
          className="px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 whitespace-nowrap flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          <span>My Phone Listings</span>
        </Link>
        <Link
          href="/favorites"
          className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <Heart className="w-4 h-4" />
          <span>Saved Phones</span>
        </Link>
        <Link
          href="/profile"
          className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap flex items-center gap-2"
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
