import { Skeleton } from './Skeleton'

export function AdCardSkeleton() {
  return (
    <article
      className="flex flex-col bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl overflow-hidden shadow-xs"
      aria-hidden="true"
    >
      {/* 1. Phone Photo Viewport (16:9 / 4:3 matching real AdCard aspect-[4/3]) */}
      <Skeleton className="w-full aspect-[4/3] rounded-none !bg-[#F0EEE7] dark:!bg-[#211E38]" />

      {/* 2. Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Market Header */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Model Title */}
          <div className="space-y-1.5 mt-2">
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Specs Row */}
          <div className="mt-2.5 flex items-center gap-2">
            <Skeleton className="h-3 w-14" />
            <span className="text-[#77758A]/30">·</span>
            <Skeleton className="h-3 w-16" />
            <span className="text-[#77758A]/30">·</span>
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Price & Location Footer */}
        <div className="pt-3 border-t border-[#E9E7EF] dark:border-[#2D2947] flex items-end justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </article>
  )
}
