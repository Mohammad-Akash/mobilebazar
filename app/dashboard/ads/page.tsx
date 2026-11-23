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
      {/* Sub-Tabs: Active / Sold / Expired (Mobile edge-to-edge scroll) */}
      <div className="flex items-center gap-2 border-b border-[#E9E7EF] dark:border-[#2D2947] pb-3 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key
          return (
            <Link
              key={tab.key}
              href={`/dashboard/ads?status=${tab.key}`}
              className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all flex items-center gap-2 active:scale-95 min-h-[40px] ${
                isActive
                  ? 'bg-[#7657FF] text-white shadow-sm shadow-[#7657FF]/30'
                  : 'bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F0EEE7] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2]'
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

