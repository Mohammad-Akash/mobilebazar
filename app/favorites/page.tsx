import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'
import { AdCard } from '@/app/components/AdCard'
import { ActiveAdRow } from '@/src/lib/data/ads'
import { Heart, Smartphone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Saved Smartphones — MobileBazar',
  description: 'View and manage your saved smartphone listings.',
  robots: {
    index: false,
    follow: false,
  },
}

export const instant = false

export default async function FavoritesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/favorites')
  }

  // 1. Fetch user's saved favorite IDs
  let favoritedAds: ActiveAdRow[] = []

  try {
    const { data: favRows } = await supabase
      .from('favorites')
      .select('ad_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (favRows && favRows.length > 0) {
      const adIds = favRows.map((f) => f.ad_id)
      const { data: adsData } = await supabase
        .from('active_ads_view')
        .select('*')
        .in('id', adIds)

      if (adsData && adsData.length > 0) {
        favoritedAds = adsData as ActiveAdRow[]
      }
    }
  } catch (err) {
    console.error('Error fetching favorites:', err)
  }

  // If no ads found in DB (e.g. testing), check if user favorited any mock
  if (favoritedAds.length === 0) {
    // Show empty state or top deals
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Listings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Favorite Smartphones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keep track of phones you are interested in and compare prices before buying.
          </p>
        </div>

        <Link
          href="/ads"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <span>Explore All Phones</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      {favoritedAds.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing {favoritedAds.length} saved phone(s)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoritedAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 mx-auto flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            No Saved Smartphones Yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Click the heart icon on any iPhone, Samsung, Xiaomi, or other phone listing to save it here for quick access later.
          </p>
          <div className="pt-2">
            <Link
              href="/ads"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Browse Smartphones Now</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
