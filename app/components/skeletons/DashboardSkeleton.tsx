import { Skeleton } from './Skeleton'

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading your dashboard...</span>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E9E7EF] dark:border-[#2D2947] pb-3 overflow-x-auto">
        <Skeleton className="h-10 w-28 rounded-2xl shrink-0" />
        <Skeleton className="h-10 w-32 rounded-2xl shrink-0" />
        <Skeleton className="h-10 w-28 rounded-2xl shrink-0" />
        <Skeleton className="h-10 w-28 rounded-2xl shrink-0" />
      </div>

      {/* Ads List Cards */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl p-4 flex gap-4 items-center"
          >
            <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shrink-0 !bg-[#F0EEE7] dark:!bg-[#211E38]" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              <Skeleton className="h-3 w-1/3" />
              <div className="flex items-center justify-between pt-1">
                <Skeleton className="h-5 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16 rounded-xl" />
                  <Skeleton className="h-8 w-16 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
