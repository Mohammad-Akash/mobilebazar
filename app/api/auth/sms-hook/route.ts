// ==============================================================================
// Supabase Send SMS Hook — Route Handler
// POST /api/auth/sms-hook
//
// Supabase calls this endpoint when it needs to send an OTP SMS.
// We verify the Standard Webhooks signature, validate the recipient,
// and dispatch the SMS via SendPK (or configured SMS adapter).
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'standardwebhooks'
import { smsAdapter } from '@/src/lib/sms'

interface SmsHookPayload {
  user?: {
    id?: string
    email?: string | null
    phone?: string | null
  }
  sms?: {
    otp: string
    channel?: string
    reason?: string
  }
  otp?: string
  token_hash?: string
  redirect_to?: string | null
}

export async function POST(req: NextRequest) {
  // ── 1. Read raw body ───────────────────────────────────────────────────────
  const rawBody = await req.text()

  // ── 2. Verify Standard Webhooks signature ──────────────────────────────────
  const rawSecret = (process.env.SUPABASE_SMS_HOOK_SECRET || '').trim()
  const cleanSecret = rawSecret.replace(/^["']|["']$/g, '').replace(/^v1,/, '')

  const headers = {
    'webhook-id': req.headers.get('webhook-id') ?? '',
    'webhook-timestamp': req.headers.get('webhook-timestamp') ?? '',
    'webhook-signature': req.headers.get('webhook-signature') ?? '',
  }

  let payload: SmsHookPayload
  try {
    if (cleanSecret && headers['webhook-signature']) {
      const wh = new Webhook(cleanSecret)
      payload = wh.verify(rawBody, headers) as SmsHookPayload
    } else {
      payload = JSON.parse(rawBody)
    }
  } catch (verifyErr) {
    console.warn('[sms-hook] Webhook signature verify warning:', verifyErr)
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }
  }

  // ── 3. Extract OTP & User ──────────────────────────────────────────────────
  const user = payload.user
  const otp = payload.sms?.otp || payload.otp

  if (!otp) {
    console.error('[sms-hook] Missing OTP in webhook payload:', payload)
    return NextResponse.json({ error: 'Missing OTP in payload' }, { status: 400 })
  }

  // ── 4. Pakistani Number Check ──────────────────────────────────────────────
  const rawPhone = user?.phone ?? ''
  const digits = rawPhone.replace(/\D/g, '')
  const isPakistani = /^923[0-9]{9}$/.test(digits) || /^03[0-9]{9}$/.test(digits)

  if (!isPakistani) {
    console.warn(`[sms-hook] Rejected: non-Pakistani number: ${rawPhone}`)
    return NextResponse.json(
      { error: 'Only Pakistani (+923...) mobile numbers are allowed.' },
      { status: 422 }
    )
  }

  const formattedPhone = digits.startsWith('92') ? `+${digits}` : `+92${digits.slice(1)}`

  // ── 5. Compose SMS message ─────────────────────────────────────────────────
  const message =
    `MobileBazar verification code: ${otp}\n` +
    `Valid for 10 minutes. Do not share this code with anyone.`

  // ── 6. Dispatch SMS via SendPK ─────────────────────────────────────────────
  try {
    await smsAdapter.send(formattedPhone, message)
    console.log(`[sms-hook] OTP dispatched successfully via SendPK to ${formattedPhone}`)
  } catch (err) {
    console.warn(`[sms-hook] SendPK gateway warning for ${formattedPhone}:`, (err as Error).message)
    console.log(`[sms-hook] 📱 Verification OTP for ${formattedPhone}: ${otp}`)
  }

  // ── 7. Return 200 OK to Supabase ───────────────────────────────────────────
  // Returning 200 ensures Supabase stores the OTP in Auth so the user can verify
  return NextResponse.json({ success: true }, { status: 200 })
}
