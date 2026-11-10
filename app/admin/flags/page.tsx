import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { getAdminFlags } from '@/src/lib/admin/queries'
import { FlagsQueueClient } from './FlagsQueueClient'

export default async function AdminFlagsPage() {
  await connection()
  await requireStaff()

  const { flags, nextCursor } = await getAdminFlags({ unresolvedOnly: true, limit: 25 })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Spam Rules Flags Queue
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Automated signals generated in shadow mode, ordered by highest risk score first.
        </p>
      </div>

      <FlagsQueueClient initialFlags={flags} initialCursor={nextCursor} />
    </div>
  )
}
