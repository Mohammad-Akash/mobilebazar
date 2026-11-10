import { connection } from 'next/server'
import { requireAdmin } from '@/src/lib/admin/guard'
import { getAdminAuditLog } from '@/src/lib/admin/queries'
import { AuditLogClient } from './AuditLogClient'

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ target_type?: string; action?: string }>
}) {
  await connection()
  await requireAdmin()
  const { target_type, action } = await searchParams

  const { actions, nextCursor } = await getAdminAuditLog({
    targetType: target_type || null,
    action: action || null,
    limit: 30,
  })

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Staff Audit Trail (Immutable)
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Cryptographically protected append-only log of every moderation action, ban, and settings change.
        </p>
      </div>

      <AuditLogClient
        initialActions={actions}
        initialCursor={nextCursor}
        initialTargetType={target_type || ''}
      />
    </div>
  )
}
