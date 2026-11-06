'use server'

// ==============================================================================
// Server Action: createAd (Post Ad Submission with Validation & Rollback)
// Never trusts client, strictly verifies user session & storage paths
// ==============================================================================

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { fullAdSchema, type FullAdFormData } from '@/src/lib/validations/ad'

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
      error: 'Aap logged in nahi hain. Baraye meharbani pehle login karein.',
    }
  }

  // 2. Full Server-side Schema Validation (Zod)
  const validation = fullAdSchema.safeParse(formData)
  if (!validation.success) {
    const firstIssue = validation.error.issues[0]
    return {
      error: firstIssue ? firstIssue.message : 'Validation khata: Form data durust nahi hai.',
    }
  }

  const data = validation.data

  // 3. Storage Path Security Check
  // Ensure every single image path strictly starts with the authenticated user's ID
  const expectedPrefix = `${user.id}/`
  const hasInvalidPath = data.images.some((p) => !p.startsWith(expectedPrefix))

  if (hasInvalidPath) {
    return {
      error: 'Tasweer ki security check fail ho gayi (Ghair tasdeeq shuda folder path).',
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
        error: 'Ad post karne ki ijazat nahi hai. Mumkin hai aapka account restricted ya banned ho.',
      }
    }
    if (errorMsg.includes('User active ads limit exceeded')) {
      return {
        error: 'Aapke pehle se 10 active ads hain. Mazeed ad lagane ke liye purana ad mark sold ya delete karein.',
      }
    }
    if (errorMsg.includes('User rate limit exceeded')) {
      return {
        error: 'Aap 24 ghante mein ziyada se ziyada 5 ads post kar sakte hain. Kal dobara koshish karein.',
      }
    }
    if (errorMsg.includes('chk_ad_warranty')) {
      return {
        error: 'Warranty ki maloomat durust nahi hain.',
      }
    }

    return {
      error: 'Ad create karne mein masla aaya: ' + (adInsertError?.message || 'Unknown database error'),
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
      return { error: 'Ek ad par ziyada se ziyada 8 tasweerein shamil ki ja sakti hain.' }
    }
    return {
      error: 'Tasweerein save karne mein masla aaya. Ad rollback kar diya gaya hai. Baraye meharbani dobara try karein.',
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
        error: 'IMEI number save karne mein masla aaya. Ad rollback kar diya gaya hai.',
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

