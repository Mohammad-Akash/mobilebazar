'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleFavoriteAction } from '@/src/lib/actions/favorites'

import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  adId: string
  initialIsFavorited?: boolean
  className?: string
}

export function FavoriteButton({
  adId,
  initialIsFavorited = false,
  className = '',
}: FavoriteButtonProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isPending, startTransition] = useTransition()

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating if button is inside a Link card
    e.stopPropagation()

    if (isPending) return

    // Optimistic flip
    const nextState = !isFavorited
    setIsFavorited(nextState)

    startTransition(async () => {
      const res = await toggleFavoriteAction(adId)

      if (res.requiresLogin) {
        // Rollback and redirect
        setIsFavorited(!nextState)
        const nextUrl = typeof window !== 'undefined' ? window.location.pathname : '/ads'
        router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
        return
      }

      if (res.error) {
        // Rollback
        setIsFavorited(!nextState)
        return
      }

      if (res.isFavorited !== undefined) {
        setIsFavorited(res.isFavorited)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={isFavorited ? 'Saved to collection' : 'Save handset'}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`w-8 h-8 rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center cursor-pointer ${
        isFavorited
          ? 'bg-[#FFFFFF] dark:bg-[#17152B] text-[#E45858] shadow-md border border-[#E9E7EF] dark:border-[#2D2947]'
          : 'bg-[#17152B]/40 hover:bg-[#17152B]/70 text-white backdrop-blur-md'
      } ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-transform duration-200 ${
          isFavorited ? 'fill-current scale-105' : 'stroke-[2]'
        }`}
      />
    </button>
  )
}

