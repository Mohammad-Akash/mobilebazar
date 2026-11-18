'use client'

import { useState, useEffect } from 'react'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  initialIndex?: number
  caption?: string | null
  onClose: () => void
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  caption,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Sync initialIndex
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const total = images.length
  const currentImage = images[currentIndex] || null

  useEffect(() => {
    if (!currentImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1))
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentImage, total, onClose])

  if (!currentImage || total === 0) return null

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Controls */}
      <div
        className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-auto px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tabular-nums">
          {total > 1 ? `${currentIndex + 1} / ${total}` : 'Photo'}
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href={currentImage}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Open original photo"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next Arrows for Multiple Photos */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer"
            title="Previous (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer"
            title="Next (Right arrow)"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Main Image Display */}
      <div
        className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={currentImage}
          src={currentImage}
          alt={caption || `Photo ${currentIndex + 1}`}
          className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-150"
        />

        {caption && (
          <p className="text-xs sm:text-sm font-medium text-white/90 text-center max-w-lg bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md">
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
