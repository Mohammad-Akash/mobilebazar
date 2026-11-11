import Link from 'next/link'
import type { Metadata } from 'next'
import { Smartphone, Home, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found — MobileBazar',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-3xl shadow-xs mx-auto">
          <Smartphone className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Phone Not Found (404)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
            The smartphone listing or page you are looking for has been sold, removed, or the link is expired.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            href="/ads"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Explore Phones</span>
          </Link>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">
            Popular Smartphone Searches:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/ads?brand=apple"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors"
            >
              Apple iPhone
            </Link>
            <Link
              href="/ads?brand=samsung"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors"
            >
              Samsung Galaxy
            </Link>
            <Link
              href="/ads?city=lahore"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors"
            >
              Lahore Mobiles
            </Link>
            <Link
              href="/ads?city=karachi"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors"
            >
              Karachi Mobiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
