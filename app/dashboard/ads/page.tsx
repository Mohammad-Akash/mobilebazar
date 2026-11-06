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

  const currentTab = (status === 'sold' || status === 'expired' ? status : 'active') as
    | 'active'
    | 'sold'
    | 'expired'

  // Fetch counts & ads concurrently
  const [counts, adsResult] = await Promise.all([
    getMyAdCounts(),
    getMyAds(currentTab, cursor),
  ])

  const tabs: { key: 'active' | 'sold' | 'expired'; label: string; count: number }[] = [
    { key: 'active', label: 'Active Ads', count: counts.active_count },
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
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

