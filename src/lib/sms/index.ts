// ==============================================================================
// SMS Provider Index
// Selects the correct adapter based on SMS_PROVIDER env variable
// ==============================================================================

import type { SmsAdapter } from './types'
import { consoleSmsAdapter } from './console'

export function getSmsAdapter(): SmsAdapter {
  const provider = process.env.SMS_PROVIDER || 'console'

  if (provider === 'console') {
    return consoleSmsAdapter
  }

  // Future providers (e.g., netsol, jazzcash, twilio) can be connected here:
  // if (provider === 'netsol') return netsolSmsAdapter

  console.warn(`[SMS] Unknown SMS_PROVIDER "${provider}", falling back to console mock`)
  return consoleSmsAdapter
}

// Singleton adapter
export const smsAdapter: SmsAdapter = getSmsAdapter()
