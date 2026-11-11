'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowDownUp } from 'lucide-react'

export function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'newest'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams.toString())
    next.set('sort', e.target.value)
    next.delete('cursor')
    router.push(`/ads?${next.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 whitespace-nowrap">
        <ArrowDownUp className="w-3.5 h-3.5 text-slate-400" />
        <span>Sort by:</span>
      </span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer shadow-2xs"
      >
        <option value="newest">Newest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="popular">Popular Listings</option>
      </select>
    </div>
  )
}
