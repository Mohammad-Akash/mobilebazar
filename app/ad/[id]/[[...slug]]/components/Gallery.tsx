'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react'

interface GalleryProps {
  images: { id: string; storage_path: string; position: number }[]
  adTitle: string
}

export function Gallery({ images, adTitle }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const mobileScrollRef = useRef<HTMLDivElement>(null)

  const imageList =
    images.length > 0
      ? images
      : [{ id: 'placeholder', storage_path: '', position: 0 }]

  // Listen to mobile scroll to update dot indicator & slide index
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const { scrollLeft, clientWidth } = mobileScrollRef.current
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < imageList.length) {
        setCurrentIndex(newIndex)
      }
    }
  }

  // Keyboard navigation for full-screen view
  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'Escape') {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, imageList.length])

  return (
    <div className="space-y-3">
      {/* 1. Mobile Swipeable Gallery with CSS Scroll-Snap (sm:hidden) */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm sm:hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        >
          {imageList.map((img, idx) => (
            <div
              key={img.id || idx}
              onClick={() => {
                setCurrentIndex(idx)
                setIsFullscreen(true)
              }}
              className="w-full h-full shrink-0 snap-center relative flex items-center justify-center cursor-zoom-in"
            >
              <Image
                src={getAdImageUrl(img.storage_path, 'md')}
                alt={`${adTitle} - photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                priority={idx === 0}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Counter Badge on Mobile */}
        {imageList.length > 1 && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm pointer-events-none">
            <ImageIcon className="w-3 h-3" />
            <span>
              {currentIndex + 1} / {imageList.length}
            </span>
          </div>
        )}

        {/* Zoom Button on Mobile */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label="View full screen"
          className="absolute top-3 right-3 w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-slate-950/70 backdrop-blur-md text-white flex items-center justify-center shadow-sm"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Mobile Dot Indicators */}
        {imageList.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 pointer-events-none">
            {imageList.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === i ? 'w-4 bg-[#7657FF]' : 'w-1.5 bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Desktop Main Photo Container (hidden on mobile, visible on sm+) */}
      <div className="hidden sm:flex relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm items-center justify-center group">
        <Image
          src={getAdImageUrl(imageList[currentIndex].storage_path, 'md')}
          alt={`${adTitle} - photo ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 650px"
          priority={currentIndex === 0}
          className="object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
          onClick={() => setIsFullscreen(true)}
        />

        {/* Counter Badge */}
        {imageList.length > 1 && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>
              {currentIndex + 1} / {imageList.length}
            </span>
          </div>
        )}

        {/* Zoom Button */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label="View full screen"
          className="absolute top-4 right-4 w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-slate-950/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-sm"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Prev & Next Arrows (Desktop & Tablet) */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
              }
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
              }
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 3. Thumbnails Strip (Desktop sm:flex, hidden on mobile) */}
      {imageList.length > 1 && (
        <div className="hidden sm:flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {imageList.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all snap-start bg-slate-100 dark:bg-slate-900 cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#7657FF] ring-2 ring-[#7657FF]/30'
                  : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAdImageUrl(img.storage_path, 'sm')}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget
                  const fallback = getAdImageUrl(img.storage_path, 'base')
                  if (target.src !== fallback) {
                    target.src = fallback
                  }
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* 4. Fullscreen Modal */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                Photo {currentIndex + 1} of {imageList.length}
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">• {adTitle}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image in Fullscreen */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAdImageUrl(imageList[currentIndex].storage_path, 'base')}
              alt={`${adTitle} - photo ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain select-none"
            />
          </div>

          {/* Controls Footer */}
          <div className="flex items-center justify-between text-white max-w-sm mx-auto w-full">
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
              }
              aria-label="Previous photo"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono">
              {currentIndex + 1} / {imageList.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
              }
              aria-label="Next photo"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
