'use server'

// ==============================================================================
// Server Action: createAd (Post Ad Submission with Validation & Rollback)
// Never trusts client, strictly verifies user session & storage paths
// ==============================================================================

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { fullAdSchema, type FullAdFormData } from '@/src/lib/validations/ad'
import { checkRateLimit } from '@/src/lib/rate-limit'

export interface CreateAdResult {
  success?: boolean
  adId?: string
  error?: string
}

export async function createAd(formData: FullAdFormData): Promise<CreateAdResult> {
  const supabase = await createClient()

  // 1. Verify User Authentication on Server
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      error: 'You are not logged in. Please log in first.',
    }
  }

  // 1.2 Rate limit check (Max 10 ad creation requests per hour)
  const rl = await checkRateLimit('post_ad', user.id)
  if (!rl.success) {
    return {
      error: `Too many requests. Please try again in ${rl.retryAfterSeconds || 60} seconds.`,
    }
  }

  // 1.5 Verify User Phone Verification
  const { data: privateProfile } = await supabase
    .from('profile_private')
    .select('is_phone_verified')
    .eq('id', user.id)
    .single()

  if (!privateProfile?.is_phone_verified) {
    return {
      error: 'Please verify your phone number before posting an ad.',
    }
  }

  // 2. Full Server-side Schema Validation (Zod)
  const validation = fullAdSchema.safeParse(formData)
  if (!validation.success) {
    const firstIssue = validation.error.issues[0]
    return {
      error: firstIssue ? firstIssue.message : 'Validation failed: Invalid form data.',
    }
  }

  const data = validation.data

  // 3. Storage Path Security Check
  // Ensure every single image path strictly starts with the authenticated user's ID
  const expectedPrefix = `${user.id}/`
  const hasInvalidPath = data.images.some((p) => !p.startsWith(expectedPrefix))

  if (hasInvalidPath) {
    return {
      error: 'Image security check failed (Unauthorized folder path).',
    }
  }

  // 4. Insert into 'ads' table
  // NOTE: id, status, is_featured, published_at etc. are omitted to respect column grants & defaults
  const adPayload = {
    seller_id: user.id, // Strictly bound to verified auth session
    brand_id: data.brand_id,
    model_id: data.model_id,
    city_id: data.city_id,
    area_id: data.area_id || null,
    title: data.title,
    description: data.description,
    price: data.price,
    is_negotiable: data.is_negotiable,
    condition: data.condition,
    pta_status: data.pta_status,
    storage_gb: data.storage_gb,
    ram_gb: data.ram_gb || null,
    color: data.color || null,
    battery_health: data.condition === 'used' ? data.battery_health : null,
    has_box: data.has_box,
    has_accessories: data.has_accessories,
    warranty_type: data.warranty_type,
    warranty_months_remaining:
      data.warranty_type === 'in_warranty' ? data.warranty_months_remaining : 0,
    contact_preference: data.contact_preference,
  }

  const { data: newAd, error: adInsertError } = await supabase
    .from('ads')
    .insert(adPayload)
    .select('id')
    .single()

  if (adInsertError || !newAd) {
    console.error('Error inserting ad:', adInsertError)

    // Translate common Postgres & RLS errors
    const errorMsg = adInsertError?.message || ''
    if (errorMsg.includes('permission denied') || errorMsg.includes('policy')) {
      return {
        error: 'You do not have permission to post an ad. Your account may be restricted or banned.',
      }
    }
    if (errorMsg.includes('User active ads limit exceeded')) {
      return {
        error: 'You already have 10 active ads. Please mark an existing ad as sold or delete it to post more.',
      }
    }
    if (errorMsg.includes('User rate limit exceeded')) {
      return {
        error: 'You can post a maximum of 5 ads per 24 hours. Please try again tomorrow.',
      }
    }
    if (errorMsg.includes('chk_ad_warranty')) {
      return {
        error: 'Invalid warranty information provided.',
      }
    }

    return {
      error: 'Failed to create ad: ' + (adInsertError?.message || 'Unknown database error'),
    }
  }

  const createdAdId = newAd.id

  // 5. Insert Images into 'ad_images'
  const imageRows = data.images.map((path, idx) => ({
    ad_id: createdAdId,
    storage_path: path,
    position: idx,
  }))

  const { error: imagesError } = await supabase.from('ad_images').insert(imageRows)

  if (imagesError) {
    console.error('Error inserting ad images, executing rollback:', imagesError)
    // Rollback: Soft-delete the created ad row so incomplete ads are never visible
    await supabase.rpc('delete_ad', { p_ad_id: createdAdId })

    const imgMsg = imagesError.message || ''
    if (imgMsg.includes('Maximum 8 images allowed')) {
      return { error: 'A maximum of 8 images can be uploaded per ad.' }
    }
    return {
      error: 'Failed to save photos. Ad was rolled back. Please try again.',
    }
  }

  // 6. Insert IMEI into 'ad_private' (if provided)
  if (data.imei && data.imei.trim()) {
    const { error: imeiError } = await supabase.from('ad_private').insert({
      ad_id: createdAdId,
      imei: data.imei.trim(),
    })

    if (imeiError) {
      console.error('Error inserting IMEI, executing rollback:', imeiError)
      await supabase.rpc('delete_ad', { p_ad_id: createdAdId })
      return {
        error: 'Failed to save IMEI number. Ad creation has been rolled back.',
      }
    }
  }

  // 7. On-demand cache revalidation for SEO and listing feeds
  revalidatePath('/')
  revalidatePath('/ads')
  revalidatePath(`/ad/${createdAdId}`)
  revalidatePath('/mobiles', 'layout')
  revalidatePath('/brands', 'layout')

  return {
    success: true,
    adId: createdAdId,
  }
}

