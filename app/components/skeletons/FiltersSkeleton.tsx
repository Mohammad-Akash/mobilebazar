import { Skeleton } from './Skeleton'

export function FiltersSkeleton() {
  return (
    <aside
      className="hidden lg:block w-72 shrink-0 bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-5 space-y-6"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading filters...</span>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E9E7EF] dark:border-[#2D2947]">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-12 h-3" />
      </div>

      {/* Brand Select */}
      <div className="space-y-2">
        <Skeleton className="w-14 h-3" />
        <Skeleton className="w-full h-11 rounded-xl" />
      </div>

      {/* Model Select */}
      <div className="space-y-2">
        <Skeleton className="w-14 h-3" />
        <Skeleton className="w-full h-11 rounded-xl" />
      </div>

      {/* City Select */}
      <div className="space-y-2">
        <Skeleton className="w-12 h-3" />
        <Skeleton className="w-full h-11 rounded-xl" />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Skeleton className="w-20 h-3" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-1/2 h-11 rounded-xl" />
          <Skeleton className="w-1/2 h-11 rounded-xl" />
        </div>
      </div>

      {/* PTA Status */}
      <div className="space-y-2">
        <Skeleton className="w-20 h-3" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-9 rounded-xl" />
          <Skeleton className="h-9 rounded-xl" />
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-2">
        <Skeleton className="w-full h-12 rounded-2xl" />
      </div>
    </aside>
  )
}
