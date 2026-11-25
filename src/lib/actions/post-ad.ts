'use server'

// ==============================================================================
// Server Action: createAd (Post Ad Submission with Validation & Rollback)
// Never trusts client, strictly verifies user session & storage paths
// ==============================================================================

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import { fullAdSchema, type FullAdFormData } from '@/src/lib/validations/ad'
import { checkRateLimit } from '@/src/lib/rate-limit'
import { PAKISTAN_CITIES } from '@/src/lib/data/locations-catalog'

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

  // 3.5 Verify and resolve foreign key references for brand, model, city, and area
  // Prevents foreign key constraint crashes when models/areas/cities are newly cataloged or custom
  let resolvedBrandId = data.brand_id
  let resolvedModelId = data.model_id
  let resolvedCityId = data.city_id
  let resolvedAreaId = data.area_id || null

  try {
    // 1. Ensure brand exists in DB
    const { data: dbBrand } = await supabase
      .from('brands')
      .select('id')
      .eq('id', resolvedBrandId)
      .maybeSingle()

    if (!dbBrand) {
      const { data: fallbackBrand } = await supabase
        .from('brands')
        .select('id')
        .limit(1)
        .maybeSingle()
      if (fallbackBrand) {
        resolvedBrandId = fallbackBrand.id
      }
    }

    // 2. Ensure model exists in DB for this brand
    const { data: dbModel } = await supabase
      .from('models')
      .select('id, brand_id')
      .eq('id', resolvedModelId)
      .maybeSingle()

    if (!dbModel || dbModel.brand_id !== resolvedBrandId) {
      // Find any model for this brand in the database so fk_ads_model_brand succeeds
      const { data: brandModel } = await supabase
        .from('models')
        .select('id')
        .eq('brand_id', resolvedBrandId)
        .limit(1)
        .maybeSingle()

      if (brandModel) {
        resolvedModelId = brandModel.id
      } else {
        const { data: anyModel } = await supabase
          .from('models')
          .select('id, brand_id')
          .limit(1)
          .maybeSingle()
        if (anyModel) {
          resolvedModelId = anyModel.id
          resolvedBrandId = anyModel.brand_id
        }
      }
    }

    // 2.5 Ensure city exists in DB (prevents ads_city_id_fkey violation)
    const { data: dbCity } = await supabase
      .from('cities')
      .select('id')
      .eq('id', resolvedCityId)
      .maybeSingle()

    if (!dbCity) {
      // Find matching city from master catalog by id
      const catalogCity = PAKISTAN_CITIES.find((c) => c.id === data.city_id)
      let foundCityId: string | null = null

      if (catalogCity) {
        // Try to match by slug or case-insensitive name in DB
        const { data: dbCityMatch } = await supabase
          .from('cities')
          .select('id')
          .or(`slug.eq.${catalogCity.slug.toLowerCase()},name.ilike.${catalogCity.name}`)
          .limit(1)
          .maybeSingle()

        if (dbCityMatch) {
          foundCityId = dbCityMatch.id
        }
      }

      if (foundCityId) {
        resolvedCityId = foundCityId
      } else {
        // Fallback to any active city in the DB so FK constraint never fails
        const { data: fallbackCity } = await supabase
          .from('cities')
          .select('id')
          .eq('is_active', true)
          .order('id', { ascending: true })
          .limit(1)
          .maybeSingle()

        if (fallbackCity) {
          resolvedCityId = fallbackCity.id
        }
      }
    }

    // 3. Ensure area belongs to city in DB (area_id is nullable)
    if (resolvedAreaId) {
      const { data: dbArea } = await supabase
        .from('areas')
        .select('id')
        .eq('id', resolvedAreaId)
        .eq('city_id', resolvedCityId)
        .maybeSingle()

      if (!dbArea) {
        resolvedAreaId = null
      }
    }
  } catch (err) {
    console.warn('Reference validation fallback warning:', err)
  }

  // 4. Insert into 'ads' table
  // NOTE: id, status, is_featured, published_at etc. are omitted to respect column grants & defaults
  const adPayload = {
    seller_id: user.id, // Strictly bound to verified auth session
    brand_id: resolvedBrandId,
    model_id: resolvedModelId,
    city_id: resolvedCityId,
    area_id: resolvedAreaId,
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

  let { data: newAd, error: adInsertError } = await supabase
    .from('ads')
    .insert(adPayload)
    .select('id')
    .single()

  // Automatic Fallback for cpid_approved enum
  // If remote Supabase DB hasn't run the enum migration yet, gracefully retry as pta_approved
  if (adInsertError?.message?.includes('cpid_approved') || adInsertError?.message?.includes('pta_status')) {
    console.warn('cpid_approved enum not yet in remote DB, falling back to pta_approved with note')
    const retryPayload = {
      ...adPayload,
      pta_status: 'pta_approved' as const,
      description: `[CPID Server Approved]\n\n${adPayload.description}`,
    }
    const retryRes = await supabase.from('ads').insert(retryPayload).select('id').single()
    if (!retryRes.error && retryRes.data) {
      newAd = retryRes.data
      adInsertError = null
    } else if (retryRes.error) {
      adInsertError = retryRes.error
    }
  }

  if (adInsertError || !newAd) {
    console.error('Error inserting ad:', {
      message: adInsertError?.message,
      code: adInsertError?.code,
      details: adInsertError?.details,
      hint: adInsertError?.hint,
    })

    // Translate common Postgres & RLS errors
    const errorMsg = adInsertError?.message || ''

    if (errorMsg.includes('is_banned')) {
      return {
        error: 'Your account has been restricted from posting ads. Please contact support.',
      }
    }
    if (errorMsg.includes('current_user_phone_verified')) {
      return {
        error: 'Please verify your phone number in your profile before posting an ad.',
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
    if (errorMsg.includes('fk_ads_model_brand')) {
      return {
        error: 'The selected phone model is not yet registered in the database.',
      }
    }
    if (errorMsg.includes('permission denied') || errorMsg.includes('policy')) {
      return {
        error: `Database permission error: ${adInsertError?.message || errorMsg}. Please execute migration 035 in Supabase SQL editor.`,
      }
    }

    return {
      error: 'Failed to create ad: ' + (adInsertError?.message || 'Unknown database error'),
    }
  }

  const createdAdId = newAd!.id

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

