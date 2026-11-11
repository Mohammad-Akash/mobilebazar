export function AdCardSkeleton() {
  return (
    <div className="flex flex-col bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl overflow-hidden shadow-xs animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="w-full aspect-[4/3] bg-[#F0EEE7] dark:bg-[#211E38]" />

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* Brand Kicker */}
        <div className="h-3 w-16 bg-[#F0EEE7] dark:bg-[#211E38] rounded" />

        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-[#F0EEE7] dark:bg-[#211E38] rounded-md" />
          <div className="h-4 w-2/3 bg-[#F0EEE7] dark:bg-[#211E38] rounded-md" />
        </div>

        {/* Specs */}
        <div className="h-3 w-32 bg-[#F0EEE7] dark:bg-[#211E38] rounded" />

        {/* Price & Footer */}
        <div className="pt-3 border-t border-[#E9E7EF] dark:border-[#2D2947] flex justify-between items-end">
          <div className="h-6 w-24 bg-[#F0EEE7] dark:bg-[#211E38] rounded-md" />
          <div className="h-3 w-16 bg-[#F0EEE7] dark:bg-[#211E38] rounded" />
        </div>
      </div>
    </div>
  )
}

