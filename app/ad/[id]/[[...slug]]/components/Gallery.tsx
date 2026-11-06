'use client'

import { useState, useEffect } from 'react'
import { getAdImageUrl } from '@/src/lib/utils/image-url'

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
      <div className="relative aspect-[4/3] bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAdImageUrl(imageList[currentIndex].storage_path, 'md')}
          alt={`${adTitle} - photo ${currentIndex + 1}`}
          onClick={() => setIsFullscreen(true)}
          className="w-full h-full object-contain cursor-zoom-in"
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
          onError={(e) => {
            // Fallback to base image if _md variant returns 404 (e.g. legacy test ad)
            const target = e.currentTarget
            const fallback = getAdImageUrl(imageList[currentIndex].storage_path, 'base')
            if (target.src !== fallback) {
              target.src = fallback
            }
          }}
        />

        {/* Counter Badge */}
        {imageList.length > 1 && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold">
            {currentIndex + 1} / {imageList.length}
          </div>
        )}

        {/* Prev & Next Arrows (Visible on Desktop) */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
              }
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white items-center justify-center text-sm font-bold shadow-md transition-all"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
              }
              aria-label="Next photo"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white items-center justify-center text-sm font-bold shadow-md transition-all"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* 2. Desktop Thumbnails & Mobile Scroll Strip */}
      {imageList.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {imageList.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                currentIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-500/40'
                  : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
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
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-semibold">
              {currentIndex + 1} of {imageList.length}
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="text-white text-2xl font-bold px-3 py-1 bg-white/20 hover:bg-white/40 rounded-full"
            >
              ✕
            </button>
          </div>

          {/* Large Image */}
          <div className="flex-1 flex items-center justify-center p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAdImageUrl(imageList[currentIndex].storage_path, 'base')}
              alt="Fullscreen view"
              className="max-h-[80vh] max-w-[95vw] object-contain"
            />
          </div>

          {/* Navigation Controls in Fullscreen */}
          {imageList.length > 1 && (
            <div className="flex items-center justify-center gap-4 text-white">
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
                }
                className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-sm"
              >
                ← Peeche (Prev)
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
                }
                className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-sm"
              >
                Aage (Next) →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

