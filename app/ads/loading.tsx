import { FiltersSkeleton } from '@/app/components/skeletons/FiltersSkeleton'
import { AdGridSkeleton } from '@/app/components/skeletons/AdGridSkeleton'
import { Skeleton } from '@/app/components/skeletons/Skeleton'

export default function AdsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header bar skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-8 w-60 rounded-xl" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <FiltersSkeleton />
        <div className="flex-1 w-full min-w-0">
          <AdGridSkeleton count={9} />
        </div>
      </div>
    </div>
  )
}
