import { connection } from 'next/server'
import { requireAdmin } from '@/src/lib/admin/guard'
import { createClient } from '@/src/lib/supabase/server'
import { TermsClient } from './TermsClient'

export default async function AdminTermsPage() {
  await connection()
  await requireAdmin()
  const supabase = await createClient()

  // Fetch active blocked terms
  const { data: terms } = await (supabase as any)
    .from('blocked_terms')
    .select('id, term, kind, is_active, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Blocked Terms & Spam Sandbox
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage hard-block keywords and test ad text against the active spam detection engine.
        </p>
      </div>

      <TermsClient initialTerms={terms || []} />
    </div>
  )
}
