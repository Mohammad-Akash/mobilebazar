import { Skeleton } from '@/app/components/skeletons'

export default function PostAdLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Heading */}
      <Skeleton className="h-8 w-48 rounded-xl" />

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            {i < 3 && <Skeleton className="flex-1 h-1 w-12 rounded-full" />}
          </div>
        ))}
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-11 w-full rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Button */}
      <Skeleton className="h-12 w-full rounded-2xl" />
    </div>
  )
}
