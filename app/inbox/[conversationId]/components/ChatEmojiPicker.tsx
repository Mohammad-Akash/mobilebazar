'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Theme, EmojiClickData } from 'emoji-picker-react'
import { X, Loader2 } from 'lucide-react'

// Dynamic import with SSR disabled to ensure zero hydration mismatches
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => (
    <div className="w-80 h-96 flex flex-col items-center justify-center bg-white dark:bg-[#1A182F] rounded-2xl">
      <Loader2 className="w-6 h-6 animate-spin text-[#7657FF]" />
      <span className="text-xs text-[#77758A] mt-2">Loading Emojis...</span>
    </div>
  ),
})

interface ChatEmojiPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelectEmoji: (emoji: string) => void
}

export function ChatEmojiPicker({ isOpen, onClose, onSelectEmoji }: ChatEmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detect theme (dark or light)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(isDark)
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onSelectEmoji(emojiData.emoji)
  }

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-full left-0 mb-3 z-50 shadow-2xl rounded-3xl overflow-hidden border border-[#E9E7EF] dark:border-[#2D2947] animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      <div className="relative">
        {/* Floating close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-[#77758A] dark:text-[#9B98B2] transition-colors cursor-pointer"
          title="Close picker"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme={isDarkMode ? Theme.DARK : Theme.LIGHT}
          searchDisabled={false}
          lazyLoadEmojis={true}
          previewConfig={{ showPreview: false }}
          width={window.innerWidth < 400 ? window.innerWidth - 32 : 340}
          height={400}
        />
      </div>
    </div>
  )
}
