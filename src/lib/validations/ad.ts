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
  brand_id: z.string().uuid({ message: 'Baraye meharbani Brand select karein' }),
  model_id: z.string().uuid({ message: 'Baraye meharbani Model select karein' }),
})

export type Step1PhoneData = z.infer<typeof step1PhoneSchema>

// ------------------------------------------------------------------------------
// Step 2: Specs (Condition, PTA, Storage, RAM, Color, Battery, Box, Warranty)
// ------------------------------------------------------------------------------
export const step2SpecsSchema = z
  .object({
    condition: z.enum(['new', 'used'], {
      message: 'Phone ki condition select karein',
    }),
    pta_status: z.enum(['pta_approved', 'non_pta', 'jv', 'unknown'], {
      message: 'PTA status select karein',
    }),
    storage_gb: z
      .number()
      .int()
      .positive({ message: 'Storage 0 se zyada honi chahiye' }),
    ram_gb: z
      .number()
      .int()
      .positive({ message: 'RAM 0 se zyada honi chahiye' })
      .nullable()
      .optional(),
    color: z.string().trim().max(50, { message: 'Color 50 characters se bara nahi ho sakta' }).optional(),
    battery_health: z
      .number()
      .int()
      .min(0, { message: 'Battery health kam az kam 0% honi chahiye' })
      .max(100, { message: 'Battery health 100% se zyada nahi ho sakti' })
      .nullable()
      .optional(),
    has_box: z.boolean().default(false),
    has_accessories: z.boolean().default(false),
    warranty_type: z.enum(['none', 'in_warranty'], {
      message: 'Warranty status select karein',
    }),
    warranty_months_remaining: z
      .number()
      .int()
      .min(0)
      .max(36, { message: 'Warranty 36 maah se zyada nahi ho sakti' })
      .default(0),
  })
  .superRefine((data, ctx) => {
    if (data.warranty_type === 'in_warranty' && (!data.warranty_months_remaining || data.warranty_months_remaining < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['warranty_months_remaining'],
        message: 'Baqi warranty ke maah darj karein (kam az kam 1 maah)',
      })
    }
  })

export type Step2SpecsData = z.infer<typeof step2SpecsSchema>

// ------------------------------------------------------------------------------
// Step 3: Price & Details (Price, Negotiable, Title, Description, IMEI)
// ------------------------------------------------------------------------------
export const step3PriceSchema = z
  .object({
    price: z
      .number()
      .int({ message: 'Qeemat poori raqam honi chahiye' })
      .min(AD_LIMITS.MIN_PRICE, { message: `Qeemat kam az kam Rs ${AD_LIMITS.MIN_PRICE.toLocaleString()} honi chahiye` })
      .max(AD_LIMITS.MAX_PRICE, { message: `Qeemat Rs ${AD_LIMITS.MAX_PRICE.toLocaleString()} se zyada nahi ho sakti` }),
    is_negotiable: z.boolean().default(true),
    title: z
      .string()
      .trim()
      .min(AD_LIMITS.MIN_TITLE_LENGTH, { message: `Title kam az kam ${AD_LIMITS.MIN_TITLE_LENGTH} characters ka ho` })
      .max(AD_LIMITS.MAX_TITLE_LENGTH, { message: `Title ${AD_LIMITS.MAX_TITLE_LENGTH} characters se lamba na ho` }),
    description: z
      .string()
      .trim()
      .min(AD_LIMITS.MIN_DESC_LENGTH, { message: `Tafseel kam az kam ${AD_LIMITS.MIN_DESC_LENGTH} characters ki ho` })
      .max(AD_LIMITS.MAX_DESC_LENGTH, { message: `Tafseel ${AD_LIMITS.MAX_DESC_LENGTH} characters se lambi na ho` }),
    imei: z
      .string()
      .trim()
      .optional()
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.imei && data.imei.length > 0) {
      const clean = data.imei.replace(/[\s-]/g, '')
      if (!/^\d{15}$/.test(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'IMEI number theek 15 digits ka hona chahiye',
        })
      } else if (!validateIMEI(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'Ghalat IMEI number (Luhn check fail)',
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
    .array(z.string().min(1, { message: 'Tasweer ka path lazmi hai' }))
    .min(AD_LIMITS.MIN_PHOTOS, { message: `Kam az kam ${AD_LIMITS.MIN_PHOTOS} tasweer lagana lazmi hai` })
    .max(AD_LIMITS.MAX_PHOTOS, { message: `Ziyada se ziyada ${AD_LIMITS.MAX_PHOTOS} tasweerein laga sakte hain` }),
})

export type Step4PhotosData = z.infer<typeof step4PhotosSchema>

// ------------------------------------------------------------------------------
// Step 5: Location & Contact Preference
// ------------------------------------------------------------------------------
export const step5LocationSchema = z.object({
  city_id: z.string().uuid({ message: 'Shehar select karein' }),
  area_id: z.string().uuid().nullable().optional(),
  contact_preference: z.enum(['phone', 'whatsapp', 'both'], {
    message: 'Rabta karne ka tareeqa chunein',
  }),
})

export type Step5LocationData = z.infer<typeof step5LocationSchema>

// ------------------------------------------------------------------------------
// Full Consolidated Ad Schema (For Final Validation & Server Action)
// ------------------------------------------------------------------------------
export const fullAdSchema = z
  .object({
    // Step 1
    brand_id: z.string().uuid({ message: 'Brand select karein' }),
    model_id: z.string().uuid({ message: 'Model select karein' }),

    // Step 2
    condition: z.enum(['new', 'used']),
    pta_status: z.enum(['pta_approved', 'non_pta', 'jv', 'unknown']),
    storage_gb: z.number().int().positive({ message: 'Storage positive integer honi chahiye' }),
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
    city_id: z.string().uuid({ message: 'City select karein' }),
    area_id: z.string().uuid().nullable().optional(),
    contact_preference: z.enum(['phone', 'whatsapp', 'both']),
  })
  .superRefine((data, ctx) => {
    // Warranty check
    if (data.warranty_type === 'in_warranty' && (!data.warranty_months_remaining || data.warranty_months_remaining < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['warranty_months_remaining'],
        message: 'Baqi warranty ke maah darj karein (kam az kam 1 maah)',
      })
    }

    // IMEI Luhn check
    if (data.imei && data.imei.length > 0) {
      const clean = data.imei.replace(/[\s-]/g, '')
      if (!/^\d{15}$/.test(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'IMEI number theek 15 digits ka hona chahiye',
        })
      } else if (!validateIMEI(clean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['imei'],
          message: 'Ghalat IMEI number (Luhn check fail)',
        })
      }
    }
  })

export type FullAdFormData = z.infer<typeof fullAdSchema>
