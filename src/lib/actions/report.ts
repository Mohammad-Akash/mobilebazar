// ==============================================================================
// Server Action: submitReportAction (Spam / Fraud Reporting)
// Adhere to Phase 7 guidelines:
// - Verified phone required (enforced by DB trigger)
// - Minimum account age required (enforced by DB trigger)
// - Max 5 reports per day (enforced by DB trigger)
// - Cannot report own ad (enforced by DB trigger)
// - Never leaks report counts or other reporters
// ==============================================================================

'use server'

import { z } from 'zod'
import { createClient } from '@/src/lib/supabase/server'
import { checkRateLimit } from '@/src/lib/rate-limit'

const reportSchema = z.object({
  adId: z.string().uuid({ message: 'Invalid Ad ID' }),
  reason: z.enum(
    ['fake_ad', 'already_sold', 'fraud_scam', 'wrong_info', 'prohibited_item', 'other'],
    { message: 'Please select a valid reason' }
  ),
  details: z
    .string()
    .trim()
    .max(500, { message: 'Details cannot exceed 500 characters' })
    .optional(),
})

export type ReportFormData = z.infer<typeof reportSchema>

export interface ReportResult {
  success?: boolean
  error?: string
  requiresLogin?: boolean
}

export async function submitReportAction(
  formData: ReportFormData
): Promise<ReportResult> {
  const supabase = await createClient()

  // 1. Authentication check
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      requiresLogin: true,
      error: 'Please log in to report this ad.',
    }
  }

  // 1.5 Rate limit check (IP)
  const rl = await checkRateLimit('report')
  if (!rl.success) {
    return {
      error: `Too many reports submitted. Please try again in ${rl.retryAfterSeconds || 60} seconds.`,
    }
  }

  // 2. Validate input
  const validation = reportSchema.safeParse(formData)
  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || 'Invalid input provided.',
    }
  }

  const { adId, reason, details } = validation.data

  // 3. Insert report into database
  // Note: Migration 011b granted: INSERT (ad_id, reporter_id, reason, details)
  const { error: insertError } = await supabase.from('reports').insert({
    ad_id: adId,
    reporter_id: user.id,
    reason: reason,
    details: details || null,
  })

  if (insertError) {
    // Unique violation (already reported by this user)
    if (insertError.code === '23505' || insertError.message.includes('unique')) {
      return {
        error: 'You have already reported this ad.',
      }
    }

    // Trigger validation error messages (from check_report_eligibility trigger in 022)
    return {
      error: insertError.message || 'Failed to submit report. Please try again.',
    }
  }

  // Return generic friendly success message without revealing threshold or counts
  return {
    success: true,
  }
}

