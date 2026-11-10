'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminAuditAction } from '@/src/types/admin'
import { getAdminAuditLog } from '@/src/lib/admin/queries'

interface AuditLogClientProps {
  initialActions: AdminAuditAction[]
  initialCursor: { createdAt: string; id: number } | null
  initialTargetType: string
}

export function AuditLogClient({
  initialActions,
  initialCursor,
  initialTargetType,
}: AuditLogClientProps) {
  const router = useRouter()
  const [actions, setActions] = useState(initialActions)
  const [cursor, setCursor] = useState(initialCursor)
  const [targetType, setTargetType] = useState(initialTargetType)
  const [loading, setLoading] = useState(false)

  function handleFilterChange(type: string) {
    setTargetType(type)
    router.push(`/admin/audit?target_type=${encodeURIComponent(type)}`)
  }

  async function handleLoadMore() {
    if (!cursor || loading) return
    setLoading(true)
    try {
      const res = await getAdminAuditLog({
        targetType: targetType || null,
        cursorCreatedAt: cursor.createdAt,
        cursorId: cursor.id,
        limit: 30,
      })
      setActions((prev) => [...prev, ...res.actions])
      setCursor(res.nextCursor)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Filters ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['', 'ad', 'user', 'report', 'setting', 'term'].map((t) => (
          <button
            key={t}
            onClick={() => handleFilterChange(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
              targetType === t
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {t ? t : 'All Targets'}
          </button>
        ))}
      </div>

      {/* ── Audit Table ──────────────────────────────────────────────────────── */}
      {actions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            No audit log records found for this filter.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Reason & Notes</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {actions.map((act) => {
                  const isDangerous = act.action.includes('ban') || act.action.includes('remove')
                  return (
                    <tr key={act.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono font-bold text-[11px] uppercase px-2 py-0.5 rounded-md ${
                            isDangerous
                              ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                              : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                          }`}
                        >
                          {act.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className="font-bold text-zinc-500 uppercase text-[10px] block">
                          {act.target_type}
                        </span>
                        <span className="text-zinc-800 dark:text-zinc-200 truncate max-w-[120px] block">
                          {act.target_id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200">{act.actor_name || 'Staff'}</p>
                        <p className="font-mono text-[10px] text-zinc-400">{act.actor_id.slice(0, 8)}...</p>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-zinc-700 dark:text-zinc-300 font-medium truncate">
                          {act.reason ? `"${act.reason}"` : 'No reason provided'}
                        </p>
                        {act.metadata && Object.keys(act.metadata).length > 0 && (
                          <pre className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">
                            {JSON.stringify(act.metadata)}
                          </pre>
                        )}
                      </td>
                      <td className="py-3 px-4 text-zinc-400 text-[11px] whitespace-nowrap">
                        {new Date(act.created_at).toLocaleString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {cursor && (
            <div className="p-3 text-center border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-5 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-40"
              >
                {loading ? 'Loading...' : 'Load More Actions'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
