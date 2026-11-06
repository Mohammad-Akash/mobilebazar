import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-4xl shadow-sm">
          📱
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Page Nahi Mila (404)
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Aap jo page dhoond rahe hain wo shayad delete ho chuka hai ya URL ghalat hai.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
          >
            Home par jayein
          </Link>
          <Link
            href="/ads"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Tamam Ads dekhein
          </Link>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">Popular Searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/ads?brand=apple"
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-full transition-colors"
            >
              iPhone in Pakistan
            </Link>
            <Link
              href="/ads?brand=samsung"
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-full transition-colors"
            >
              Samsung Mobiles
            </Link>
            <Link
              href="/ads?city=lahore"
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-full transition-colors"
            >
              Mobiles in Lahore
            </Link>
            <Link
              href="/ads?city=karachi"
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-full transition-colors"
            >
              Mobiles in Karachi
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

