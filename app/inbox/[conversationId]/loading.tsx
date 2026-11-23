import { Skeleton } from '@/app/components/skeletons'

export default function ThreadLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col h-[80vh]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Skeleton className="w-10 h-10 rounded-2xl shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32 rounded-lg" />
          <Skeleton className="h-3 w-20 rounded-lg" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 py-4 space-y-3 overflow-hidden">
        {[80, 60, 72, 50, 90].map((w, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <Skeleton
              className="h-10 rounded-2xl"
              style={{ width: `${w}%`, maxWidth: '320px' }}
            />
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Skeleton className="flex-1 h-12 rounded-2xl" />
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
      </div>
    </div>
  )
}
