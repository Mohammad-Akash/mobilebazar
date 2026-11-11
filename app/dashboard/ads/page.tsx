import Link from 'next/link'
import { connection } from 'next/server'
import { getMyAdCounts, getMyAds } from '@/src/lib/data/dashboard'
import { MyAdsClient } from './MyAdsClient'

export const instant = false

interface MyAdsPageProps {
  searchParams: Promise<{ status?: string; cursor?: string }>
}

export default async function MyAdsPage({ searchParams }: MyAdsPageProps) {
  await connection()
  const { status, cursor } = await searchParams

  const currentTab = (['sold', 'expired', 'under_review'].includes(status || '')
    ? status
    : 'active') as 'active' | 'sold' | 'expired' | 'under_review'

  // Fetch counts & ads concurrently
  const [counts, adsResult] = await Promise.all([
    getMyAdCounts(),
    getMyAds(currentTab, cursor),
  ])

  const tabs: { key: 'active' | 'sold' | 'expired' | 'under_review'; label: string; count: number }[] = [
    { key: 'active', label: 'Active Ads', count: counts.active_count },
    { key: 'under_review', label: 'Under Review', count: counts.under_review_count },
    { key: 'sold', label: 'Sold Ads', count: counts.sold_count },
    { key: 'expired', label: 'Expired Ads', count: counts.expired_count },
  ]

  return (
    <div className="space-y-6">
      {/* Sub-Tabs: Active / Sold / Expired */}
      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key
          return (
            <Link
              key={tab.key}
              href={`/dashboard/ads?status=${tab.key}`}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {tab.count}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Ads List with Action Dialogs */}
      <MyAdsClient initialAds={adsResult.ads} currentStatus={currentTab} />
    </div>
  )
}

