'use server'

// ==============================================================================
// Server Actions for Favorites (Toggle & Batch IDs Query)
// Enforces 200 cap and eliminates N+1 query overhead
// ==============================================================================

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'

export interface ToggleFavoriteResult {
  success?: boolean
  error?: string
  requiresLogin?: boolean
  isFavorited?: boolean
}

/**
 * Toggles favorite state of an ad for authenticated user
 */
export async function toggleFavoriteAction(adId: string): Promise<ToggleFavoriteResult> {
  const supabase = await createClient()

  // 1. Verify User
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { requiresLogin: true, error: 'Please log in to save this ad.' }
  }

  // 2. Check if already favorited
  const { data: existing } = await supabase
    .from('favorites')
    .select('ad_id')
    .eq('user_id', user.id)
    .eq('ad_id', adId)
    .maybeSingle()

  if (existing) {
    // Remove from favorites
    const { error: deleteError } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('ad_id', adId)

    if (deleteError) {
      console.error('Error removing favorite:', deleteError)
      return { error: 'Failed to remove from saved ads.' }
    }

    revalidatePath('/dashboard/favorites')
    revalidatePath(`/ad/${adId}`)
    return { success: true, isFavorited: false }
  } else {
    // Add to favorites
    const { error: insertError } = await supabase.from('favorites').insert({
      user_id: user.id,
      ad_id: adId,
    })

    if (insertError) {
      console.error('Error adding favorite:', insertError)
      const msg = insertError.message || ''
      if (msg.includes('200') || msg.includes('limit')) {
        return {
          error: 'You cannot save more than 200 ads. Please remove older saved ads first.',
        }
      }
      return { error: 'Failed to save ad.' }
    }

    revalidatePath('/dashboard/favorites')
    revalidatePath(`/ad/${adId}`)
    return { success: true, isFavorited: true }
  }
}

/**
 * Returns set of ad IDs that the current user has favorited (in a single query)
 * Returns empty array for anonymous users (Zero N+1!)
 */
export async function getFavoritedIdsAction(adIds: string[]): Promise<string[]> {
  if (!adIds || adIds.length === 0) return []

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('favorites')
    .select('ad_id')
    .eq('user_id', user.id)
    .in('ad_id', adIds)

  if (error || !data) return []

  return data.map((row) => row.ad_id)
}

