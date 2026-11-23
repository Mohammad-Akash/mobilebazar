import { Skeleton } from '@/app/components/skeletons'

export default function InboxLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      {/* Header */}
      <Skeleton className="h-7 w-32 rounded-xl" />

      {/* Conversation items */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800"
        >
          {/* Avatar */}
          <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex justify-between items-center gap-2">
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="h-3 w-14 rounded-lg" />
            </div>
            <Skeleton className="h-3 w-3/4 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
