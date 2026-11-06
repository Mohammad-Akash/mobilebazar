// ==============================================================================
// Phone Verification Server Actions
// sendOtp()   → calls supabase.auth.updateUser({ phone }) which triggers SMS hook
// verifyOtp() → calls supabase.auth.verifyOtp({ phone, token, type: 'phone_change' })
// ==============================================================================

'use server'

import { z } from 'zod'
import { createClient } from '@/src/lib/supabase/server'
import { normalizePakistaniPhone } from '@/src/lib/utils/phone'
import { checkRateLimit } from '@/src/lib/rate-limit'

// ── Zod Schemas ──────────────────────────────────────────────────────────────
const sendOtpSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
})

const verifyOtpSchema = z.object({
  phone: z.string().min(1),
  token: z
    .string()
    .length(6, 'Code 6 digits ka hona chahiye')
    .regex(/^\d{6}$/, 'Sirf numbers allowed hain'),
})

// ── Result Types ─────────────────────────────────────────────────────────────
export interface OtpResult {
  success?: boolean
  error?: string
}

// ── sendOtp ───────────────────────────────────────────────────────────────────
export async function sendOtp(formData: { phone: string }): Promise<OtpResult> {
  const supabase = await createClient()

  // 1. Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Pehle login karein.' }

  // 1.5 Rate limit check (IP & User)
  const rl = await checkRateLimit('otp_send', user.id)
  if (!rl.success) {
    return {
      error: `Bohat zyada OTP requests. Baraye meharbani ${rl.retryAfterSeconds || 60} seconds baad koshish karein.`,
    }
  }

  // 2. Validate input
  const parsed = sendOtpSchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  // 3. Normalize to E.164
  const normalized = normalizePakistaniPhone(parsed.data.phone)
  if (!normalized) {
    return { error: 'Sahih Pakistani mobile number darj karein (e.g. 0300-1234567)' }
  }

  // 4. Call Supabase — this triggers the Send SMS Hook
  const { error } = await supabase.auth.updateUser({ phone: normalized })

  if (error) {
    console.error('[sendOtp Error]:', error.message, error)
    // Map Supabase error codes to friendly messages
    if (error.message?.includes('already registered') || error.message?.includes('unique')) {
      return { error: 'Ye number kisi doosre account se linked hai.' }
    }
    if (error.message?.includes('rate') || error.message?.includes('limit')) {
      return { error: 'Bohat zyada requests. Thodi der baad try karein.' }
    }
    if (
      error.message?.toLowerCase().includes('disabled') ||
      error.message?.toLowerCase().includes('unsupported') ||
      error.message?.toLowerCase().includes('provider')
    ) {
      return {
        error:
          'Supabase mein Phone Provider on nahi hai. Dashboard > Authentication > Providers > Phone enable karein.',
      }
    }
    return { error: `OTP error: ${error.message}` }
  }

  return { success: true }
}

// ── verifyOtp ─────────────────────────────────────────────────────────────────
export async function verifyOtp(formData: { phone: string; token: string }): Promise<OtpResult> {
  const supabase = await createClient()

  // 1. Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Pehle login karein.' }

  // 1.5 Rate limit check
  const rl = await checkRateLimit('otp_verify', user.id)
  if (!rl.success) {
    return {
      error: `Bohat zyada ghalat attempts. ${rl.retryAfterSeconds || 60} seconds baad koshish karein.`,
    }
  }

  // 2. Validate
  const parsed = verifyOtpSchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  // 3. Normalize phone
  const normalized = normalizePakistaniPhone(parsed.data.phone)
  if (!normalized) return { error: 'Phone number format galat hai.' }

  // 4. Verify OTP with Supabase
  const { error } = await supabase.auth.verifyOtp({
    phone: normalized,
    token: parsed.data.token,
    type: 'phone_change',
  })

  if (error) {
    if (error.message?.includes('expired')) {
      return { error: 'Code expire ho gaya. Naya code mangwayein.' }
    }
    if (error.message?.includes('invalid')) {
      return { error: 'Code galat hai. Dobara check karein.' }
    }
    if (error.message?.includes('attempts')) {
      return { error: 'Bohat zyada ghalat koshishein. Naya code mangwayein.' }
    }
    return { error: 'Verification fail hui. Dobara koshish karein.' }
  }

  // DB trigger (sync_phone_verification) will now automatically set:
  // profile_private.phone, profile_private.is_phone_verified = true
  // profiles.is_phone_verified = true

  return { success: true }
}

