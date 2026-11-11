'use client'

import { useState, useEffect } from 'react'
import { getAdImageUrl } from '@/src/lib/utils/image-url'
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react'

interface GalleryProps {
  images: { id: string; storage_path: string; position: number }[]
  adTitle: string
}

export function Gallery({ images, adTitle }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const imageList =
    images.length > 0
      ? images
      : [{ id: 'placeholder', storage_path: '', position: 0 }]

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
      {/* 1. Main Photo Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAdImageUrl(imageList[currentIndex].storage_path, 'md')}
          alt={`${adTitle} - photo ${currentIndex + 1}`}
          onClick={() => setIsFullscreen(true)}
          className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
          onError={(e) => {
            const target = e.currentTarget
            const fallback = getAdImageUrl(imageList[currentIndex].storage_path, 'base')
            if (target.src !== fallback) {
              target.src = fallback
            }
          }}
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
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-sm"
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
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
              }
              aria-label="Next photo"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white items-center justify-center text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 2. Thumbnails Strip */}
      {imageList.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {imageList.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all snap-start bg-slate-100 dark:bg-slate-900 ${
                currentIndex === idx
                  ? 'border-blue-600 ring-2 ring-blue-500/30'
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

      {/* 3. Fullscreen Modal */}
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
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image */}
          <div className="flex-1 flex items-center justify-center p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAdImageUrl(imageList[currentIndex].storage_path, 'base')}
              alt="Fullscreen view"
              className="max-h-[82vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Navigation Controls in Fullscreen */}
          {imageList.length > 1 && (
            <div className="flex items-center justify-center gap-4 text-white pb-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
                }
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-semibold text-sm flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
                }
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-semibold text-sm flex items-center gap-1.5 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
