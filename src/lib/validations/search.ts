// ==============================================================================
// Search Params Validation & Keyset Cursor Helpers
// Safe parsing of URL query parameters and cursor encryption/decryption
// ==============================================================================

import { z } from 'zod'

export const searchParamsSchema = z.object({
  q: z.string().trim().max(80).optional(),
  brand: z.string().trim().max(80).optional(),
  model: z.string().trim().max(80).optional(),
  city: z.string().trim().max(100).optional(),
  area: z.string().trim().max(120).optional(),
  min_price: z.coerce.number().int().min(0).max(2000000).optional(),
  max_price: z.coerce.number().int().min(0).max(2000000).optional(),
  pta: z.enum(['pta_approved', 'non_pta', 'jv', 'unknown']).optional(),
  condition: z.enum(['new', 'used']).optional(),
  storage: z.coerce.number().int().positive().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc']).default('newest'),
  cursor: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
})

export type SearchParamsInput = z.infer<typeof searchParamsSchema>

export interface DecodedCursor {
  value: string
  id: string
}

/**
 * Encodes a keyset cursor into an opaque base64 string
 */
export function encodeCursor(value: string | number, id: string): string {
  try {
    const payload = JSON.stringify({ v: String(value), id })
    if (typeof window === 'undefined') {
      return Buffer.from(payload, 'utf-8').toString('base64url')
    }
    return btoa(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch {
    return ''
  }
}

/**
 * Decodes and rigorously validates a base64 keyset cursor
 * Returns null if invalid or tampered
 */
export function decodeCursor(cursorStr?: string | null): DecodedCursor | null {
  if (!cursorStr || cursorStr.trim() === '') return null

  try {
    let jsonStr = ''
    if (typeof window === 'undefined') {
      jsonStr = Buffer.from(cursorStr, 'base64url').toString('utf-8')
    } else {
      const base64 = cursorStr.replace(/-/g, '+').replace(/_/g, '/')
      jsonStr = atob(base64)
    }

    const parsed = JSON.parse(jsonStr)

    // Validate that 'id' is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!parsed || typeof parsed !== 'object' || !parsed.id || !uuidRegex.test(parsed.id)) {
      return null
    }

    if (parsed.v === undefined || parsed.v === null || String(parsed.v).trim() === '') {
      return null
    }

    return {
      value: String(parsed.v),
      id: String(parsed.id),
    }
  } catch {
    return null
  }
}

