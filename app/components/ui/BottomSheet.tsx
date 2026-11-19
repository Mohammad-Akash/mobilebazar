'use client'

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className = '',
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Manage body scroll locking & focus trapping
  useEffect(() => {
    if (!isOpen) return

    // Save previous active element for restoring focus on close
    previousActiveElement.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Basic focus trap within the bottom sheet
      if (e.key === 'Tab' && sheetRef.current) {
        const focusableElements = sheetRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Focus the first element or close button inside sheet
    const timer = setTimeout(() => {
      if (sheetRef.current) {
        const firstFocusable = sheetRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      }
    }, 50)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      className="fixed inset-0 z-50 flex flex-col justify-end lg:justify-center lg:items-center"
    >
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Content Container */}
      <div
        ref={sheetRef}
        className={`relative w-full lg:max-w-lg bg-[#FFFFFF] dark:bg-[#17152B] rounded-t-3xl lg:rounded-3xl shadow-2xl border-t lg:border border-[#E9E7EF] dark:border-[#2D2947] flex flex-col max-h-[88dvh] z-10 animate-in slide-in-from-bottom duration-200 ${className}`}
      >
        {/* Mobile Pull Handle Indicator */}
        <div className="w-full pt-3 pb-1 flex justify-center lg:hidden" aria-hidden="true">
          <div className="w-12 h-1.5 rounded-full bg-[#E9E7EF] dark:bg-[#2D2947]" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3.5 border-b border-[#E9E7EF] dark:border-[#2D2947] flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            {title && (
              <h3
                id="bottom-sheet-title"
                className="text-base font-black text-[#17152B] dark:text-[#F7F6F2] truncate"
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#77758A] dark:text-[#9B98B2] mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-11 h-11 -mr-2 rounded-xl text-[#77758A] dark:text-[#9B98B2] hover:text-[#17152B] dark:hover:text-[#F7F6F2] hover:bg-[#F7F6F2] dark:hover:bg-[#211E38] transition-colors flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Interior Body */}
        <div className="p-5 overflow-y-auto flex-1 overscroll-contain space-y-4">
          {children}
        </div>

        {/* Optional Sticky/Pinned Sheet Footer */}
        {footer && (
          <div className="p-4 border-t border-[#E9E7EF] dark:border-[#2D2947] bg-[#F7F6F2]/50 dark:bg-[#0E0D1A]/50 rounded-b-3xl shrink-0 safe-bottom">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
