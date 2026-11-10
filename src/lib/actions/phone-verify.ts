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
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Only numbers are allowed'),
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
  if (!user) return { error: 'Please log in first.' }

  // 1.5 Rate limit check (IP & User)
  const rl = await checkRateLimit('otp_send', user.id)
  if (!rl.success) {
    return {
      error: `Too many OTP requests. Please try again in ${rl.retryAfterSeconds || 60} seconds.`,
    }
  }

  // 2. Validate input
  const parsed = sendOtpSchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  // 3. Normalize to E.164
  const normalized = normalizePakistaniPhone(parsed.data.phone)
  if (!normalized) {
    return { error: 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567)' }
  }

  // 4. Call Supabase — this triggers the Send SMS Hook
  const { error } = await supabase.auth.updateUser({ phone: normalized })

  if (error) {
    console.error('[sendOtp Error]:', error.message, error)
    // Map Supabase error codes to friendly messages
    if (error.message?.includes('already registered') || error.message?.includes('unique')) {
      return { error: 'This phone number is already linked to another account.' }
    }
    if (error.message?.includes('rate') || error.message?.includes('limit')) {
      return { error: 'Too many requests. Please try again shortly.' }
    }
    if (
      error.message?.toLowerCase().includes('disabled') ||
      error.message?.toLowerCase().includes('unsupported') ||
      error.message?.toLowerCase().includes('provider')
    ) {
      return {
        error:
          'Phone provider is not enabled in Supabase. Please enable it under Dashboard > Authentication > Providers > Phone.',
      }
    }
    if (error.message?.includes('status code returned from hook: 500')) {
      return {
        error:
          'SMS gateway delivery failed. Please check SendPK account status or API key.',
      }
    }
    if (error.message?.includes('status code returned from hook: 422')) {
      return {
        error:
          'Invalid phone number format. Please enter a valid Pakistani mobile number (03XXXXXXXXX).',
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
  if (!user) return { error: 'Please log in first.' }

  // 1.5 Rate limit check
  const rl = await checkRateLimit('otp_verify', user.id)
  if (!rl.success) {
    return {
      error: `Too many incorrect attempts. Please try again in ${rl.retryAfterSeconds || 60} seconds.`,
    }
  }

  // 2. Validate
  const parsed = verifyOtpSchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  // 3. Normalize phone
  const normalized = normalizePakistaniPhone(parsed.data.phone)
  if (!normalized) return { error: 'Invalid phone number format.' }

  // 4. Verify OTP with Supabase
  const { error } = await supabase.auth.verifyOtp({
    phone: normalized,
    token: parsed.data.token,
    type: 'phone_change',
  })

  if (error) {
    if (error.message?.includes('expired')) {
      return { error: 'Verification code has expired. Please request a new code.' }
    }
    if (error.message?.includes('invalid')) {
      return { error: 'Invalid verification code. Please check and try again.' }
    }
    if (error.message?.includes('attempts')) {
      return { error: 'Too many failed attempts. Please request a new code.' }
    }
    return { error: 'Verification failed. Please try again.' }
  }

  // DB trigger (sync_phone_verification) will now automatically set:
  // profile_private.phone, profile_private.is_phone_verified = true
  // profiles.is_phone_verified = true

  return { success: true }
}

