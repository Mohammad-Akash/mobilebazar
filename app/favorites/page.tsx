import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'

export const metadata: Metadata = {
  title: 'My Favorites',
  robots: {
    index: false,
    follow: false,
  },
}

export const instant = false

export default async function FavoritesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/favorites')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Mehfooz Shuda Ads / Saved Favorites
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Aapke bookmark kiye gaye mobile ads yahan nazar aayenge.
        </p>
      </div>
    </div>
  )
}
