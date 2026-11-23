import { Skeleton } from './Skeleton'

export function AdDetailSkeleton() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-28 lg:pb-8"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading smartphone details...</span>

      {/* Visual Breadcrumb Navigation Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-12" />
        <span className="text-[#77758A]/30">/</span>
        <Skeleton className="h-3 w-20" />
        <span className="text-[#77758A]/30">/</span>
        <Skeleton className="h-3 w-36" />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photos Gallery & Specifications (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photos Gallery Viewport */}
          <div className="space-y-3">
            <Skeleton className="w-full aspect-[4/3] rounded-3xl" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-18 h-18 rounded-2xl" />
              <Skeleton className="w-18 h-18 rounded-2xl" />
              <Skeleton className="w-18 h-18 rounded-2xl" />
            </div>
          </div>

          {/* Specifications Table Card */}
          <div className="bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-6 space-y-4">
            <Skeleton className="h-5 w-48" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <Skeleton className="h-14 rounded-2xl" />
              <Skeleton className="h-14 rounded-2xl" />
              <Skeleton className="h-14 rounded-2xl" />
              <Skeleton className="h-14 rounded-2xl" />
              <Skeleton className="h-14 rounded-2xl" />
              <Skeleton className="h-14 rounded-2xl" />
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-6 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>

        {/* Right Column: Price, Contact, Seller & Safety (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Price & Primary Header Card */}
          <div className="bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-6 space-y-5">
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-40" />
            </div>

            <div className="space-y-2 border-t border-[#E9E7EF] dark:border-[#2D2947] pt-4">
              <Skeleton className="h-6 w-4/5" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E9E7EF] dark:border-[#2D2947]">
              <Skeleton className="h-7 w-24 rounded-xl" />
              <Skeleton className="h-7 w-32 rounded-xl" />
              <Skeleton className="h-7 w-24 rounded-xl" />
            </div>
          </div>

          {/* Contact Seller Button Skeleton */}
          <Skeleton className="w-full h-14 rounded-2xl" />

          {/* Seller Profile Card */}
          <div className="bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-5 flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>

          {/* Safety Tips Card */}
          <div className="bg-white dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-5 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  )
}
