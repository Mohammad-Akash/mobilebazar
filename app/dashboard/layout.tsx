import { redirect } from 'next/navigation'
import Link from 'next/link'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Dashboard',
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Banned Alert Banner */}
      {isBanned && (
        <div className="p-4 bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 rounded-2xl text-red-900 dark:text-red-200 flex items-start gap-3 shadow-md">
          <span className="text-3xl shrink-0">🚫</span>
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
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-2xl border-2 border-emerald-500/20 shrink-0">
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
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {profile?.full_name || 'MobileBazar User'}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">{user.email}</p>
          </div>
        </div>

        <Link
          href="/post-ad"
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          + Post New Ad
        </Link>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-px overflow-x-auto">
        <Link
          href="/dashboard/ads"
          className="px-5 py-3 text-xs sm:text-sm font-extrabold border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 whitespace-nowrap"
        >
          📱 My Ads
        </Link>
        <Link
          href="/dashboard/favorites"
          className="px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap"
        >
          ❤️ Saved Ads
        </Link>
        <Link
          href="/dashboard/profile"
          className="px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap"
        >
          👤 Profile & Settings
        </Link>
      </nav>

      {/* Main Body */}
      <div>{children}</div>
    </div>
  )
}

