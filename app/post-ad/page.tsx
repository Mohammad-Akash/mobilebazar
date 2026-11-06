import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'

export const instant = false

export default async function PostAdPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/post-ad')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center shadow-sm">
        <span className="text-4xl">📱</span>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-4">
          Naya Mobile Ad Post Karein
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Post Ad form Phase 3 mein activate hoga.
        </p>
      </div>
    </div>
  )
}
