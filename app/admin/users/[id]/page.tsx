import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { getAdminUserDetail } from '@/src/lib/admin/queries'
import { UserDetailClient } from './UserDetailClient'

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await connection()
  const staff = await requireStaff()
  const { id } = await params

  const data = await getAdminUserDetail(id)
  if (!data || !data.success || !data.profile) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <UserDetailClient initialData={data} isAdmin={staff.role === 'admin'} />
    </div>
  )
}
