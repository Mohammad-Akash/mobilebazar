// ==============================================================================
// SMS Adapter Interface
// All SMS providers implement this interface
// ==============================================================================

export interface SmsAdapter {
  /**
   * Send an SMS message to a phone number
   * @param to - E.164 format: +923001234567
   * @param message - SMS text (keep under 160 chars for single SMS)
   */
  send(to: string, message: string): Promise<void>
}

