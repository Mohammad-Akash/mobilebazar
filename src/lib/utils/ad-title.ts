// ==============================================================================
// Auto-generate Ad Title based on selected phone specs
// Example: "iPhone 13 128GB PTA Approved" or "Samsung Galaxy S23 256GB Non-PTA"
// ==============================================================================

interface GenerateTitleParams {
  brandName?: string
  modelName?: string
  storageGb?: number | null
  ptaStatus?: string | null
}

export function generateAdTitle({
  brandName,
  modelName,
  storageGb,
  ptaStatus,
}: GenerateTitleParams): string {
  const parts: string[] = []

  const brand = brandName?.trim() || ''
  const model = modelName?.trim() || ''

  if (model) {
    // If model name doesn't start with brand name, prepend brand
    if (brand && !model.toLowerCase().startsWith(brand.toLowerCase())) {
      parts.push(brand)
    }
    parts.push(model)
  } else if (brand) {
    parts.push(brand)
  }

  // Format Storage: 1024GB -> 1TB
  if (storageGb && storageGb > 0) {
    if (storageGb >= 1024) {
      const tb = storageGb / 1024
      parts.push(`${tb}TB`)
    } else {
      parts.push(`${storageGb}GB`)
    }
  }

  // Format PTA Status
  if (ptaStatus) {
    switch (ptaStatus) {
      case 'pta_approved':
        parts.push('PTA Approved')
        break
      case 'non_pta':
        parts.push('Non-PTA')
        break
      case 'jv':
        parts.push('JV')
        break
      default:
        break
    }
  }

  return parts.join(' ').trim()
}

