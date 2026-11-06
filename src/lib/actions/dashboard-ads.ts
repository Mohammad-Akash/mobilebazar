'use server'

// ==============================================================================
// Server Actions for Ad Lifecycle (Mark Sold, Delete, Repost / Renew, Edit)
// Strictly enforces verified ownership and revalidates paths
// ==============================================================================

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { fullAdSchema, type FullAdFormData } from '@/src/lib/validations/ad'

export interface ActionResult {
  success?: boolean
  error?: string
}

/**
 * Mark an active ad as sold via RPC mark_ad_sold
 */
export async function markAdSoldAction(adId: string): Promise<ActionResult> {
  const supabase = await createClient()

  // 1. Verify Authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Authentication required. Baraye meharbani login karein.' }
  }

  // 2. Call RPC mark_ad_sold
  const { error } = await supabase.rpc('mark_ad_sold', { p_ad_id: adId })

  if (error) {
    console.error('Error in mark_ad_sold RPC:', error)
    return { error: error.message || 'Ad ko sold mark karne mein masla aaya.' }
  }

  // 3. Revalidate paths
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/ads')
  revalidatePath('/ads')
  revalidatePath(`/ad/${adId}`)
  revalidatePath('/mobiles', 'layout')
  revalidatePath('/brands', 'layout')

  return { success: true }
}

/**
 * Soft delete an ad via RPC delete_ad
 */
export async function deleteAdAction(adId: string): Promise<ActionResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Authentication required. Baraye meharbani login karein.' }
  }

  const { error } = await supabase.rpc('delete_ad', { p_ad_id: adId })

  if (error) {
    console.error('Error in delete_ad RPC:', error)
    return { error: error.message || 'Ad delete karne mein masla aaya.' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/ads')
  revalidatePath('/ads')
  revalidatePath(`/ad/${adId}`)
  revalidatePath('/mobiles', 'layout')
  revalidatePath('/brands', 'layout')

  return { success: true }
}

/**
 * Repost / Renew an expired or sold ad via RPC renew_ad
 */
export async function renewAdAction(adId: string): Promise<ActionResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Authentication required. Baraye meharbani login karein.' }
  }

  const { error } = await supabase.rpc('renew_ad', { p_ad_id: adId })

  if (error) {
    console.error('Error in renew_ad RPC:', error)
    const msg = error.message || ''
    if (msg.includes('Maximum 10 active ads allowed')) {
      return {
        error:
          'Aapke pehle se 10 active ads hain. Mazeed ad repost karne ke liye purana ad sold ya delete karein.',
      }
    }
    return { error: msg || 'Ad repost karne mein masla aaya.' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/ads')
  revalidatePath('/ads')
  revalidatePath(`/ad/${adId}`)
  revalidatePath('/mobiles', 'layout')
  revalidatePath('/brands', 'layout')

  return { success: true }
}

/**
 * Update an existing active ad
 * Enforces ownership check, full zod validation, and calls replace_ad_images RPC
 */
export async function updateAdAction(
  adId: string,
  formData: FullAdFormData
): Promise<ActionResult> {
  const supabase = await createClient()

  // 1. Verify User
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Authentication required. Baraye meharbani login karein.' }
  }

  // 2. Validate with full zod schema
  const validation = fullAdSchema.safeParse(formData)
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || 'Validation error' }
  }

  const data = validation.data

  // 3. Verify that ad exists, belongs to caller, and is ACTIVE
  const { data: existingAd, error: fetchError } = await supabase
    .from('ads')
    .select('id, seller_id, status')
    .eq('id', adId)
    .single()

  if (fetchError || !existingAd) {
    return { error: 'Ad nahi mila.' }
  }

  if (existingAd.seller_id !== user.id) {
    return { error: 'Permission denied: Aap sirf apna ad edit kar sakte hain.' }
  }

  if (existingAd.status !== 'active') {
    return { error: 'Sirf active ad ko edit kiya ja sakta hai. Repost karein pehle.' }
  }

  // 4. Update core ad fields (status, seller_id, dates are strictly omitted)
  const updatePayload = {
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

  const { error: adUpdateError } = await supabase
    .from('ads')
    .update(updatePayload)
    .eq('id', adId)
    .eq('seller_id', user.id) // IDOR defense-in-depth

  if (adUpdateError) {
    console.error('Error updating ad row:', adUpdateError)
    return { error: 'Ad update karne mein masla aaya: ' + adUpdateError.message }
  }

  // 5. Replace images atomically via replace_ad_images RPC
  if (data.images && data.images.length > 0) {
    const { data: removedPaths, error: imgError } = await supabase.rpc(
      'replace_ad_images' as any,
      {
        p_ad_id: adId,
        p_paths: data.images,
      }
    )

    if (imgError) {
      console.error('Error in replace_ad_images RPC:', imgError)
      return { error: 'Photos update karne mein masla aaya: ' + imgError.message }
    }

    // Delete removed paths from storage bucket (including _md and _sm variants)
    if (removedPaths && Array.isArray(removedPaths) && removedPaths.length > 0) {
      const allVariantPaths = removedPaths.flatMap((p: string) => [
        p,
        p.endsWith('.webp') ? p.replace(/\.webp$/, '_md.webp') : `${p}_md`,
        p.endsWith('.webp') ? p.replace(/\.webp$/, '_sm.webp') : `${p}_sm`,
      ])
      supabase.storage
        .from('ad-images')
        .remove(allVariantPaths)
        .then(({ error: rmErr }) => {
          if (rmErr) console.warn('Failed to clean removed image variants from storage:', rmErr)
        })
    }
  }

  // 6. Update IMEI in ad_private (Upsert or Delete)
  if (data.imei && data.imei.trim()) {
    await supabase.from('ad_private').upsert({
      ad_id: adId,
      imei: data.imei.trim(),
    })
  } else {
    await supabase.from('ad_private').delete().eq('ad_id', adId)
  }

  // 7. Revalidate
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/ads')
  revalidatePath('/ads')
  revalidatePath(`/ad/${adId}`)
  revalidatePath('/mobiles', 'layout')
  revalidatePath('/brands', 'layout')

  return { success: true }
}

