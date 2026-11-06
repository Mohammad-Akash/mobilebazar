// ==============================================================================
// Supabase Send SMS Hook — Route Handler
// POST /api/auth/sms-hook
//
// Supabase calls this endpoint when it needs to send an OTP SMS.
// We verify the Standard Webhooks signature (using native crypto),
// validate the user, and dispatch SMS via our SMS provider adapter.
//
// Setup in Supabase Dashboard:
//   Authentication → Hooks → Send SMS → HTTP Hook
//   URL: https://your-domain.vercel.app/api/auth/sms-hook
//   Secret: generate a secret (or copy from Supabase), set as SUPABASE_SMS_HOOK_SECRET
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { smsAdapter } from '@/src/lib/sms'

interface SmsHookPayload {
  user: {
    id: string
    email?: string | null
    phone?: string | null
  }
  otp: string
  token_hash?: string
  redirect_to?: string | null
}

/**
 * Standard Webhooks Signature Verification using Node's native crypto
 */
function verifyStandardWebhook(
  payload: string,
  headers: { id: string; timestamp: string; signature: string },
  secret: string
): boolean {
  if (!headers.id || !headers.timestamp || !headers.signature || !secret) {
    return false
  }

  // 1. Timestamp freshness check (must be within 5 minutes / 300 seconds)
  const now = Math.floor(Date.now() / 1000)
  const ts = parseInt(headers.timestamp, 10)
  if (isNaN(ts) || Math.abs(now - ts) > 300) {
    return false
  }

  // 2. Extract key (Standard webhooks secret often has 'whsec_' prefix)
  let keyBuffer: Buffer
  if (secret.startsWith('whsec_')) {
    keyBuffer = Buffer.from(secret.slice(6), 'base64')
  } else {
    keyBuffer = Buffer.from(secret, 'utf-8')
  }

  // 3. Construct signature payload: `${msgId}.${timestamp}.${rawBody}`
  const signaturePayload = `${headers.id}.${headers.timestamp}.${payload}`
  const expectedHmac = crypto
    .createHmac('sha256', keyBuffer)
    .update(signaturePayload)
    .digest('base64')

  // 4. Compare with signatures in `webhook-signature` header (format: "v1,signature1 v1,signature2")
  const signatures = headers.signature.split(' ')
  for (const sig of signatures) {
    const parts = sig.split(',')
    if (parts.length === 2 && parts[0] === 'v1') {
      const providedSig = parts[1]
      try {
        const expectedBuf = Buffer.from(expectedHmac)
        const providedBuf = Buffer.from(providedSig)
        if (
          expectedBuf.length === providedBuf.length &&
          crypto.timingSafeEqual(expectedBuf, providedBuf)
        ) {
          return true
        }
      } catch {
        continue
      }
    }
  }

  return false
}

export async function POST(req: NextRequest) {
  // ── 1. Read raw body for signature verification ──────────────────────────
  const rawBody = await req.text()

  // ── 2. Verify Standard Webhooks signature ────────────────────────────────
  const hookSecret = process.env.SUPABASE_SMS_HOOK_SECRET
  if (!hookSecret) {
    console.error('[sms-hook] SUPABASE_SMS_HOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Hook not configured' }, { status: 500 })
  }

  const webhookId = req.headers.get('webhook-id') ?? ''
  const webhookTimestamp = req.headers.get('webhook-timestamp') ?? ''
  const webhookSignature = req.headers.get('webhook-signature') ?? ''

  const isVerified = verifyStandardWebhook(
    rawBody,
    {
      id: webhookId,
      timestamp: webhookTimestamp,
      signature: webhookSignature,
    },
    hookSecret
  )

  if (!isVerified) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
  }

  let payload: SmsHookPayload
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const { user, otp } = payload

  // ── 3. Guard: Reject phone-only accounts (user must have email) ──────────
  if (!user || !user.email) {
    console.warn(`[sms-hook] Rejected: user has no email registered`)
    return NextResponse.json(
      { error: 'Phone-only accounts are not permitted. Email required.' },
      { status: 422 }
    )
  }

  // ── 4. Guard: Pakistan numbers only (+92 prefix) ─────────────────────────
  // Supabase stores phone as e.g. "923001234567"
  const phone = user.phone ?? ''
  const isValidPakistani = /^923[0-9]{9}$/.test(phone)
  if (!isValidPakistani) {
    console.warn(`[sms-hook] Rejected: non-Pakistani number`)
    return NextResponse.json(
      { error: 'Only Pakistani (+923...) mobile numbers are allowed.' },
      { status: 422 }
    )
  }

  const formattedPhone = `+${phone}`

  // ── 5. Compose SMS message ────────────────────────────────────────────────
  // Bilingual, short, never logs OTP
  const message =
    `MobileBazar verification code: ${otp}\n` +
    `Yeh code kisi ko mat batayein. Yeh 10 minute valid hai.\n` +
    `Do not share this code with anyone.`

  // ── 6. Send SMS ───────────────────────────────────────────────────────────
  try {
    await smsAdapter.send(formattedPhone, message)
    console.log(`[sms-hook] OTP dispatched successfully to user ${user.id}`)
  } catch (err) {
    console.error(`[sms-hook] SMS send failed for user ${user.id}:`, (err as Error).message)
    return NextResponse.json(
      { error: 'Failed to send SMS. Please try again later.' },
      { status: 500 }
    )
  }

  // ── 7. Return empty 200 OK (required by Supabase) ────────────────────────
  return NextResponse.json({})
}
