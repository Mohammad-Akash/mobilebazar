// ==============================================================================
// SendPK SMS Adapter (Pakistan PTA-Approved Gateway)
// Docs: https://sendpk.com/api/sms.php
//
// Required env variables:
//   SENDPK_API_KEY    (from sendpk.com/dashboard/profile.php)
//   SENDPK_SENDER_ID  (from sendpk.com dashboard, e.g. '8584' or your approved Masking)
// ==============================================================================

import type { SmsAdapter } from './types'

export const sendpkSmsAdapter: SmsAdapter = {
  async send(to: string, message: string): Promise<void> {
    const apiKey = process.env.SENDPK_API_KEY
    const sender = process.env.SENDPK_SENDER_ID || '8584'

    if (!apiKey) {
      throw new Error('SENDPK_API_KEY is not configured in environment variables')
    }

    // SendPK expects recipient format without '+': 923XXXXXXXXX
    const mobile = to.replace(/^\+/, '').trim()

    const url = new URL('https://sendpk.com/api/sms.php')
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('sender', sender)
    url.searchParams.set('mobile', mobile)
    url.searchParams.set('message', message)
    url.searchParams.set('format', 'json')

    const res = await fetch(url.toString(), {
      method: 'GET',
    })

    const raw = await res.text()
    let data: any
    try {
      data = JSON.parse(raw)
    } catch {
      data = { raw }
    }

    if (data?.success === 'false' || (Array.isArray(data?.results) && data.results[0]?.error)) {
      const errorMsg = data?.results?.[0]?.error || data?.error || raw
      throw new Error(`SendPK delivery failed: ${errorMsg}`)
    }
  },
}

