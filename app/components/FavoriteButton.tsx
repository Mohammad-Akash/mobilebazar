'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleFavoriteAction } from '@/src/lib/actions/favorites'

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
        alert(res.error)
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
      title={isFavorited ? 'Favorites se hatayein' : 'Favorites mein shamil karein'}
      className={`p-2 rounded-full transition-all active:scale-90 flex items-center justify-center ${
        isFavorited
          ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-500 shadow-sm'
          : 'bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm'
      } ${className}`}
    >
      <span className="text-base leading-none select-none">
        {isFavorited ? '❤️' : '🤍'}
      </span>
    </button>
  )
}

