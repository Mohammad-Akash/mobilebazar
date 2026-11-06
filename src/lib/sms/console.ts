// ==============================================================================
// Console SMS Adapter (Development Only)
// Logs the OTP to console instead of sending a real SMS
// NEVER runs in production — guarded by NODE_ENV check in index.ts
// ==============================================================================

import type { SmsAdapter } from './types'

export const consoleSmsAdapter: SmsAdapter = {
  async send(to: string, _message: string): Promise<void> {
    // Log destination only — never log the actual OTP message
    console.log(`[SMS:console] Would send SMS to ${to.substring(0, 6)}****`)
  },
}

