import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { getAdminAds } from '@/src/lib/admin/queries'
import { AdsQueueClient } from './AdsQueueClient'

export default async function AdminAdsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>
}) {
  await connection()
  await requireStaff()
  const { status = 'under_review', q = '' } = await searchParams

  const { ads, nextCursor } = await getAdminAds({
    status,
    search: q,
    limit: 20,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Ads Moderation Queue
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Review, approve, or remove classified ads across all statuses.
        </p>
      </div>

      <AdsQueueClient
        initialAds={ads}
        initialStatus={status}
        initialQuery={q}
        initialCursor={nextCursor}
      />
    </div>
  )
}
