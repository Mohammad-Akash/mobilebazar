// ==============================================================================
// IMEI Validation using Luhn Algorithm (Mod-10)
// Standard 15-digit IMEI check
// ==============================================================================

/**
 * Validates a 15-digit IMEI number using the Luhn algorithm.
 * Returns true if valid, false otherwise.
 */
export function validateIMEI(imei: string): boolean {
  if (!imei) return false

  // Strip spaces and dashes
  const clean = imei.replace(/[\s-]/g, '')

  // Must be exactly 15 digits
  if (!/^\d{15}$/.test(clean)) {
    return false
  }

  let sum = 0

  for (let i = 0; i < 15; i++) {
    let digit = parseInt(clean[i], 10)

    // In a 15-digit IMEI, double every second digit starting from index 1 (second digit)
    // i.e., indices 1, 3, 5, 7, 9, 11, 13
    if (i % 2 !== 0) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
  }

  return sum % 10 === 0
}

