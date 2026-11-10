'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { AdminUserListItem } from '@/src/types/admin'
import { getAdminUsers } from '@/src/lib/admin/queries'

interface UsersListClientProps {
  initialUsers: AdminUserListItem[]
  initialQuery: string
  initialCursor: { createdAt: string; id: string } | null
  isAdmin: boolean
}

export function UsersListClient({
  initialUsers,
  initialQuery,
  initialCursor,
  isAdmin,
}: UsersListClientProps) {
  const router = useRouter()
  const [users, setUsers] = useState(initialUsers)
  const [cursor, setCursor] = useState(initialCursor)
  const [search, setSearch] = useState(initialQuery)
  const [loading, setLoading] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/admin/users?q=${encodeURIComponent(search)}`)
  }

  async function handleLoadMore() {
    if (!cursor || loading) return
    setLoading(true)
    try {
      const res = await getAdminUsers({
        search,
        cursorCreatedAt: cursor.createdAt,
        cursorId: cursor.id,
        limit: 20,
      })
      setUsers((prev) => [...prev, ...res.users])
      setCursor(res.nextCursor)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Search Input ────────────────────────────────────────────────────── */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isAdmin ? 'Search by name, email, or phone...' : 'Search by name...'}
          className="w-full h-10 px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="px-5 h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shrink-0"
        >
          Search
        </button>
      </form>

      {/* ── Users Table ─────────────────────────────────────────────────────── */}
      {users.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            No users found matching your search.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Live Ads</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 hover:underline"
                      >
                        {u.full_name || 'Anonymous User'}
                      </Link>
                      <p className="text-[11px] text-zinc-400 font-mono">{u.id}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {u.masked_phone}
                      {u.is_phone_verified && (
                        <span className="ml-1 text-emerald-600" title="Phone verified">✓</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {u.is_banned ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                          BANNED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          ACTIVE
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {u.ads_count}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 text-[11px]">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-bold rounded-lg transition-colors text-[11px]"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
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
                {loading ? 'Loading...' : 'Load More Users'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

