export function AdCardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col gap-3">
        {/* Price */}
        <div className="h-6 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md" />

        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
          <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-14 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  )
}

