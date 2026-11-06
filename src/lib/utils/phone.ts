// ==============================================================================
// Pakistani Phone Number Utilities
// Normalizes phone input to standard Pakistani E.164 format: +923XXXXXXXXX
// ==============================================================================

/**
 * Normalizes input to E.164: +923XXXXXXXXX
 * Accepts:
 *  - 03001234567
 *  - +923001234567
 *  - 923001234567
 *  - 0300-1234567 / 0300 1234567
 */
export function normalizePakistaniPhone(raw: string): string | null {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')

  // 03XXXXXXXXX -> 11 digits
  if (/^03[0-9]{9}$/.test(digits)) {
    return `+92${digits.slice(1)}`
  }

  // 923XXXXXXXXX -> 12 digits
  if (/^923[0-9]{9}$/.test(digits)) {
    return `+${digits}`
  }

  return null
}

/**
 * Validates if a phone is formatted as standard E.164 Pakistani mobile
 */
export function isValidPakistaniPhone(phone: string): boolean {
  return /^\+923[0-9]{9}$/.test(phone)
}

