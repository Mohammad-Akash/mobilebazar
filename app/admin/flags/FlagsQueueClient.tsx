'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { AdminSpamFlag } from '@/src/types/admin'
import { getAdminFlags } from '@/src/lib/admin/queries'

interface FlagsQueueClientProps {
  initialFlags: AdminSpamFlag[]
  initialCursor: { createdAt: string; id: string } | null
}

export function FlagsQueueClient({ initialFlags, initialCursor }: FlagsQueueClientProps) {
  const [flags, setFlags] = useState(initialFlags)
  const [cursor, setCursor] = useState(initialCursor)
  const [loading, setLoading] = useState(false)

  async function handleLoadMore() {
    if (!cursor || loading) return
    setLoading(true)
    try {
      const res = await getAdminFlags({
        unresolvedOnly: true,
        cursorCreatedAt: cursor.createdAt,
        cursorId: cursor.id,
        limit: 25,
      })
      setFlags((prev) => [...prev, ...res.flags])
      setCursor(res.nextCursor)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {flags.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            🛡️ No unresolved spam flags found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {flags.map((flg) => (
            <div
              key={flg.id}
              className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-md">
                    {flg.flag_type}
                  </span>
                  <Link
                    href={`/admin/ads/${flg.ad_id}`}
                    className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 hover:underline"
                  >
                    {flg.ad_title}
                  </Link>
                </div>

                {flg.detail && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {flg.detail}
                  </p>
                )}

                <p className="text-[11px] text-zinc-400">
                  Seller: <span className="font-medium text-zinc-600 dark:text-zinc-300">{flg.seller_name}</span> • Flagged: {new Date(flg.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    Risk +{flg.score}
                  </span>
                </div>

                <Link
                  href={`/admin/ads/${flg.ad_id}`}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Review Ad →
                </Link>
              </div>
            </div>
          ))}

          {cursor && (
            <div className="text-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all disabled:opacity-40"
              >
                {loading ? 'Loading...' : 'Load More Flags'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

