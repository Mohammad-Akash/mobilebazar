// ==============================================================================
// Zod Schemas for Post Ad (Per-step and Full Consolidated Schema)
// Shared between Client and Server (Compatible with Zod v4)
// ==============================================================================

import { z } from 'zod'
import { validateIMEI } from '@/src/lib/utils/imei'
import { AD_LIMITS } from '@/src/lib/constants/ad-options'

// ------------------------------------------------------------------------------
// Step 1: Phone (Brand & Model)
// ------------------------------------------------------------------------------
export const step1PhoneSchema = z.object({
  brand_id: z.string().uuid({ message: 'Please select a brand' }),
  model_id: z.string().uuid({ message: 'Please select a model' }),
})

export type Step1PhoneData = z.infer<typeof step1PhoneSchema>

// ------------------------------------------------------------------------------
// Step 2: Specs (Condition, PTA, Storage, RAM, Color, Battery, Box, Warranty)
// ------------------------------------------------------------------------------
export const step2SpecsSchema = z
  .object({
    condition: z.enum(['new', 'used'], {
      message: 'Please select the phone condition',
    }),
    pta_status: z.enum(['pta_approved', 'non_pta', 'jv', 'unknown'], {
      message: 'Please select PTA status',
    }),
    storage_gb: z
      .number()
      .int()
      .positive({ message: 'Storage must be greater than 0 GB' }),
    ram_gb: z
      .number()
      .int()
      .positive({ message: 'RAM must be greater than 0 GB' })
      .nullable()
      .optional(),
    color: z.string().trim().max(50, { message: 'Color cannot exceed 50 characters' }).optional(),
    battery_health: z
      .number()
      .int()
      .min(0, { message: 'Battery health must be at least 0%' })
      .max(100, { message: 'Battery health cannot exceed 100%' })
      .nullable()
      .optional(),
    has_box: z.boolean().default(false),
    has_accessories: z.boolean().default(false),
    warranty_type: z.enum(['none', 'in_warranty'], {
      message: 'Please select warranty status',
    }),
    warranty_months_remaining: z
      .number()
      .int()
      .min(0)
      .max(36, { message: 'Warranty cannot exceed 36 months' })
      .default(0),
  })
  .superRefine((data, ctx) => {
    if (data.warranty_type === 'in_warranty' && (!data.warranty_months_remaining || data.warranty_months_remaining < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['warranty_months_remaining'],
        message: 'Please specify remaining warranty months (minimum 1 month)',
      })
    }
  })

export type Step2SpecsData = z.infer<typeof step2SpecsSchema>

// Helper functions for spam prevention (phone and url blocking)
export function containsPhoneNumber(text: string): boolean {
  const clean = text.replace(/[\u200B-\u200D\uFEFF]/g, '')
  // Match Pakistani mobile format (03XX-XXXXXXX or +923XXXXXXXXX)
  // Don't trigger on 15-digit IMEIs
  const phoneRegex = /(?:^|[^0-9])(?:0|\+?92)\s*[-.]?\s*(3[0-9]{2})\s*[-.]?\s*([0-9]{7})(?:[^0-9]|$)/
  if (phoneRegex.test(clean)) {
    // If the sequence is part of a 15-digit number, ignore
    if (/[0-9]{15}/.test(clean)) {
      return false
    }
    return true
  }
  return false
}

export function containsUrl(text: string): boolean {
  const urlRegex = /(?:https?:\/\/|www\.)[^\s]+|\b[a-zA-Z0-9-]+\.(?:com|pk|net|org|xyz|info)\b|\b(?:bit\.ly|wa\.me)\b/i
  return urlRegex.test(text)
}

// ------------------------------------------------------------------------------
// Step 3: Price & Details (Price, Negotiable, Title, Description, IMEI)
// ------------------------------------------------------------------------------
export const step3PriceSchema = z
  .object({
    price: z
      .number()
      .int({ message: 'Price must be a valid whole number' })
      .min(AD_LIMITS.MIN_PRICE, { message: `Price must be at least Rs ${AD_LIMITS.MIN_PRICE.toLocaleString()}` })
      .max(AD_LIMITS.MAX_PRICE, { message: `Price cannot exceed Rs ${AD_LIMITS.MAX_PRICE.toLocaleString()}` }),
    is_negotiable: z.boolean().default(true),
    title: z
      .string()
      .trim()
      .min(AD_LIMITS.MIN_TITLE_LENGTH, { message: `Title must be at least ${AD_LIMITS.MIN_TITLE_LENGTH} characters` })
      .max(AD_LIMITS.MAX_TITLE_LENGTH, { message: `Title cannot exceed ${AD_LIMITS.MAX_TITLE_LENGTH} characters` }),
    description: z
      .string()
      .trim()
      .min(AD_LIMITS.MIN_DESC_LENGTH, { message: `Description must be at least ${AD_LIMITS.MIN_DESC_LENGTH} characters` })
      .max(AD_LIMITS.MAX_DESC_LENGTH, { message: `Description cannot exceed ${AD_LIMITS.MAX_DESC_LENGTH} characters` }),
    imei: z
      .string()
      .trim()
      .optional()
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // Anti-spam checks: Phone numbers in title/desc
    if (containsPhoneNumber(data.title)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'Phone numbers are not allowed in the title. Buyers will contact you via the Contact button.',
      })
    }
    if (containsPhoneNumber(data.description)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Phone numbers are not allowed in the description. Buyers will contact you via the Contact button.',
      })
    }

    // Anti-spam checks: URLs in title/desc
    if (containsUrl(data.title)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'Website links and URLs are not allowed in the title.',
      })
    }
    if (containsUrl(data.description)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Website links and URLs are not allowed in the description.',
      })
    }

    if (data.imei && data.imei.length > 0) {
      const clean = data.imei.replace(/[\s-]/g, '')
      if (!/^\d{15}$/.test(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'IMEI number must be exactly 15 digits',
        })
      } else if (!validateIMEI(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'Invalid IMEI number (failed Luhn checksum)',
        })
      }
    }
  })

export type Step3PriceData = z.infer<typeof step3PriceSchema>

// ------------------------------------------------------------------------------
// Step 4: Photos (Uploaded storage paths: 1 to 8 images)
// ------------------------------------------------------------------------------
export const step4PhotosSchema = z.object({
  images: z
    .array(z.string().min(1, { message: 'Image path is required' }))
    .min(AD_LIMITS.MIN_PHOTOS, { message: `Please upload at least ${AD_LIMITS.MIN_PHOTOS} photo` })
    .max(AD_LIMITS.MAX_PHOTOS, { message: `You can upload up to ${AD_LIMITS.MAX_PHOTOS} photos` }),
})

export type Step4PhotosData = z.infer<typeof step4PhotosSchema>

// ------------------------------------------------------------------------------
// Step 5: Location & Contact Preference
// ------------------------------------------------------------------------------
export const step5LocationSchema = z.object({
  city_id: z.string().uuid({ message: 'Please select a city' }),
  area_id: z.string().uuid().nullable().optional(),
  contact_preference: z.enum(['phone', 'whatsapp', 'both'], {
    message: 'Please select your preferred contact method',
  }),
})

export type Step5LocationData = z.infer<typeof step5LocationSchema>

// ------------------------------------------------------------------------------
// Full Consolidated Ad Schema (For Final Validation & Server Action)
// ------------------------------------------------------------------------------
export const fullAdSchema = z
  .object({
    // Step 1
    brand_id: z.string().uuid({ message: 'Please select a brand' }),
    model_id: z.string().uuid({ message: 'Please select a model' }),

    // Step 2
    condition: z.enum(['new', 'used']),
    pta_status: z.enum(['pta_approved', 'non_pta', 'jv', 'unknown']),
    storage_gb: z.number().int().positive({ message: 'Storage must be a positive integer' }),
    ram_gb: z.number().int().positive().nullable().optional(),
    color: z.string().trim().max(50).optional(),
    battery_health: z.number().int().min(0).max(100).nullable().optional(),
    has_box: z.boolean().default(false),
    has_accessories: z.boolean().default(false),
    warranty_type: z.enum(['none', 'in_warranty']),
    warranty_months_remaining: z.number().int().min(0).max(36).default(0),

    // Step 3
    price: z.number().int().min(AD_LIMITS.MIN_PRICE).max(AD_LIMITS.MAX_PRICE),
    is_negotiable: z.boolean().default(true),
    title: z.string().trim().min(AD_LIMITS.MIN_TITLE_LENGTH).max(AD_LIMITS.MAX_TITLE_LENGTH),
    description: z.string().trim().min(AD_LIMITS.MIN_DESC_LENGTH).max(AD_LIMITS.MAX_DESC_LENGTH),
    imei: z.string().trim().optional().or(z.literal('')),

    // Step 4
    images: z
      .array(z.string().min(1))
      .min(AD_LIMITS.MIN_PHOTOS)
      .max(AD_LIMITS.MAX_PHOTOS),

    // Step 5
    city_id: z.string().uuid({ message: 'Please select a city' }),
    area_id: z.string().uuid().nullable().optional(),
    contact_preference: z.enum(['phone', 'whatsapp', 'both']),
  })
  .superRefine((data, ctx) => {
    // Phone in title/description check
    if (containsPhoneNumber(data.title)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'Phone numbers are not allowed in the title.',
      })
    }
    if (containsPhoneNumber(data.description)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Phone numbers are not allowed in the description.',
      })
    }

    // URL check
    if (containsUrl(data.title)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['title'],
        message: 'Website links and URLs are not allowed in the title.',
      })
    }
    if (containsUrl(data.description)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Website links and URLs are not allowed in the description.',
      })
    }

    // Warranty check
    if (data.warranty_type === 'in_warranty' && (!data.warranty_months_remaining || data.warranty_months_remaining < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['warranty_months_remaining'],
        message: 'Please specify remaining warranty months (minimum 1 month)',
      })
    }

    // IMEI Luhn check
    if (data.imei && data.imei.length > 0) {
      const clean = data.imei.replace(/[\s-]/g, '')
      if (!/^\d{15}$/.test(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'IMEI number must be exactly 15 digits',
        })
      } else if (!validateIMEI(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'Invalid IMEI number (failed Luhn checksum)',
        })
      }
    }
  })

export type FullAdFormData = z.infer<typeof fullAdSchema>
