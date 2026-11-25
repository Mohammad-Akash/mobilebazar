import { AdCardSkeleton } from './AdCardSkeleton'

interface AdGridSkeletonProps {
  count?: number
  className?: string
}

export function AdGridSkeleton({ count = 9, className = '' }: AdGridSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 ${className}`}
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading smartphone listings...</span>
      {Array.from({ length: count }).map((_, i) => (
        <AdCardSkeleton key={i} />
      ))}
    </div>
  )
}
