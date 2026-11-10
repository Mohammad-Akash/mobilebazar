import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { getAdminReports } from '@/src/lib/admin/queries'
import { ReportsQueueClient } from './ReportsQueueClient'

export default async function AdminReportsPage() {
  await connection()
  await requireStaff()

  const { reports, nextCursor } = await getAdminReports({ status: 'pending', limit: 20 })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Pending Reports Queue
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Reports grouped by advertisement, ordered by oldest unresolved report first.
        </p>
      </div>

      <ReportsQueueClient initialReports={reports} initialCursor={nextCursor} />
    </div>
  )
}
