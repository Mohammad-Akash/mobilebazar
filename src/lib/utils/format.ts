// ==============================================================================
// Formatting Utilities for Pakistan Marketplace (Price, Relative Time, Badges)
// ==============================================================================

import {
  CONDITION_LABELS,
  PTA_STATUS_LABELS,
  WARRANTY_LABELS,
} from '@/src/lib/constants/ad-options'

/**
 * Formats price in Pakistani Rupees: e.g. 185000 -> "Rs 185,000"
 */
export function formatPrice(price: number | bigint): string {
  const num = typeof price === 'bigint' ? Number(price) : price
  return `Rs ${num.toLocaleString('en-PK')}`
}

/**
 * Formats storage capacity: 1024 -> "1TB", 128 -> "128GB"
 */
export function formatStorage(storageGb?: number | null): string {
  if (!storageGb || storageGb <= 0) return ''
  if (storageGb >= 1024) {
    return `${storageGb / 1024}TB`
  }
  return `${storageGb}GB`
}

/**
 * Formats relative time in friendly English
 * e.g. "Just now", "3 hours ago", "Yesterday", "4 days ago"
 */
export function formatRelativeTime(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) {
    return 'Yesterday'
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

/**
 * Friendly badge label for PTA status
 */
export function formatPtaBadge(ptaStatus?: string | null): { label: string; isApproved: boolean } {
  if (ptaStatus === 'pta_approved') {
    return { label: 'PTA Approved', isApproved: true }
  }
  if (ptaStatus === 'non_pta') {
    return { label: 'Non-PTA', isApproved: false }
  }
  if (ptaStatus === 'jv') {
    return { label: 'JV Patched', isApproved: false }
  }
  return { label: 'Unknown PTA', isApproved: false }
}

/**
 * Friendly label for Condition
 */
export function formatCondition(condition?: string | null): string {
  if (!condition) return ''
  return CONDITION_LABELS[condition] || condition
}

/**
 * Friendly label for Warranty
 */
export function formatWarranty(type?: string | null, months?: number | null): string {
  if (type === 'in_warranty' && months && months > 0) {
    return `${months} Month${months > 1 ? 's' : ''} Warranty`
  }
  return 'No Warranty'
}

