import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { getAdminUsers } from '@/src/lib/admin/queries'
import { UsersListClient } from './UsersListClient'

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  await connection()
  const staff = await requireStaff()
  const { q = '' } = await searchParams

  const { users, nextCursor } = await getAdminUsers({ search: q, limit: 20 })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          User Management
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Search users, inspect trust history, and manage seller account restrictions.
        </p>
      </div>

      <UsersListClient
        initialUsers={users}
        initialQuery={q}
        initialCursor={nextCursor}
        isAdmin={staff.role === 'admin'}
      />
    </div>
  )
}
