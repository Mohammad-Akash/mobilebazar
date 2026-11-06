// ==============================================================================
// SMS Provider Index
// Selects the correct adapter based on SMS_PROVIDER env variable
// ==============================================================================

import type { SmsAdapter } from './types'
import { consoleSmsAdapter } from './console'
import { sendpkSmsAdapter } from './sendpk'

export function getSmsAdapter(): SmsAdapter {
  const provider = (process.env.SMS_PROVIDER || 'console').toLowerCase().trim()

  if (provider === 'sendpk') {
    return sendpkSmsAdapter
  }

  if (provider === 'console') {
    return consoleSmsAdapter
  }

  console.warn(`[SMS] Unknown SMS_PROVIDER "${provider}", falling back to console mock`)
  return consoleSmsAdapter
}

// Singleton adapter
export const smsAdapter: SmsAdapter = getSmsAdapter()
