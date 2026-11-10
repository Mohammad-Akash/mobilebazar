import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ad Posted Successfully',
  robots: {
    index: false,
    follow: false,
  },
}

export const instant = false

interface SuccessPageProps {
  searchParams: Promise<{ ad?: string }>
}

export default async function PostAdSuccessPage({ searchParams }: SuccessPageProps) {
  const { ad: adId } = await searchParams

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-4xl mb-4 text-emerald-600 animate-bounce">
          🎉
        </div>

        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Ad Posted Successfully!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Your ad is now live for buyers across Pakistan.
        </p>

        {adId && (
          <div className="my-4 p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl text-xs text-zinc-500 font-mono">
            Ad Reference ID: {adId}
          </div>
        )}

        <div className="mt-8 space-y-3">
          <Link
            href="/dashboard"
            className="w-full block py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            📊 View My Ads (Dashboard)
          </Link>

          <Link
            href="/post-ad"
            className="w-full block py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
          >
            + Post Another Ad
          </Link>
        </div>
      </div>
    </div>
  )
}

