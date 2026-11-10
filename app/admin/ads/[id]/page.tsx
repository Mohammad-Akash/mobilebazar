import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { getAdminAdDetail } from '@/src/lib/admin/queries'
import { AdInspectionClient } from './AdInspectionClient'

export default async function AdminAdDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await connection()
  await requireStaff()
  const { id } = await params

  const data = await getAdminAdDetail(id)
  if (!data || !data.success || !data.ad) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <AdInspectionClient initialData={data} />
    </div>
  )
}
