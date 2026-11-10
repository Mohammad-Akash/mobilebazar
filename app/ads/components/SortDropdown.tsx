'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'newest'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams.toString())
    next.set('sort', e.target.value)
    next.delete('cursor') // reset pagination cursor on sort change
    router.push(`/ads?${next.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap">
        Sort:
      </span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="newest">Newest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  )
}

