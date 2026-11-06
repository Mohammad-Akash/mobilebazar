// ==============================================================================
// Ad Options Constants: Storage, RAM, Colors, Labels
// Shared between client and server
// ==============================================================================

// Fallback storage options (GB) when model doesn't specify
export const STORAGE_OPTIONS = [16, 32, 64, 128, 256, 512, 1024] as const

// Fallback RAM options (GB) when model doesn't specify
export const RAM_OPTIONS = [2, 3, 4, 6, 8, 12, 16] as const

// Common phone colors in Pakistan market
export const COLOR_OPTIONS = [
  'Black',
  'White',
  'Silver',
  'Gold',
  'Rose Gold',
  'Blue',
  'Deep Blue',
  'Midnight Blue',
  'Green',
  'Purple',
  'Deep Purple',
  'Red',
  'Grey',
  'Graphite',
  'Space Grey',
  'Starlight',
  'Natural Titanium',
  'Other',
] as const

// Friendly labels for enums (English + Roman Urdu)
export const CONDITION_LABELS: Record<string, string> = {
  new: 'Brand New (Bilkul Naya)',
  used: 'Used (Istemal Shuda)',
}

export const PTA_STATUS_LABELS: Record<string, string> = {
  pta_approved: 'PTA Approved ✅',
  non_pta: 'Non-PTA (Not Registered)',
  jv: 'JV (Joint Venture / Patched)',
  unknown: 'Unknown / Pata Nahi',
}

export const WARRANTY_LABELS: Record<string, string> = {
  none: 'No Warranty',
  in_warranty: 'In Warranty (Warranty Baqi Hai)',
}

export const CONTACT_PREF_LABELS: Record<string, string> = {
  phone: 'Phone Call Only',
  whatsapp: 'WhatsApp Only',
  both: 'Both (Phone + WhatsApp)',
}

// Ad limits
export const AD_LIMITS = {
  MAX_ACTIVE_ADS: 10,
  MAX_ADS_PER_DAY: 5,
  MAX_PHOTOS: 8,
  MIN_PHOTOS: 1,
  MIN_PRICE: 1000,
  MAX_PRICE: 2000000,
  MIN_TITLE_LENGTH: 10,
  MAX_TITLE_LENGTH: 100,
  MIN_DESC_LENGTH: 20,
  MAX_DESC_LENGTH: 2000,
} as const

