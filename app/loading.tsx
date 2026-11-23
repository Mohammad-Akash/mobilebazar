import { Skeleton } from '@/app/components/skeletons/Skeleton'

export default function RootLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-3/4 max-w-xl rounded-2xl" />
        <Skeleton className="h-5 w-1/2 max-w-md" />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-2xl bg-[#E9E7EF] dark:bg-[#2D2947] motion-safe:animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
