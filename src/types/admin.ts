// ==============================================================================
// Admin Panel Types & Data Transfer Objects (Phase 8)
// ==============================================================================

export type StaffRole = 'user' | 'moderator' | 'admin'

export interface AdminQueueAd {
  id: string
  title: string
  price: number
  status: 'draft' | 'active' | 'under_review' | 'sold' | 'expired' | 'deleted'
  seller_id: string
  seller_name: string
  city_name: string
  brand_name: string
  model_name: string
  cover_image: string | null
  reports_count: number
  max_flag_score: number
  created_at: string
}

export interface AdminReportGroup {
  ad_id: string
  ad_title: string
  ad_status: 'draft' | 'active' | 'under_review' | 'sold' | 'expired' | 'deleted'
  seller_name: string
  pending_count: number
  distinct_reporters: number
  reasons: string[]
  oldest_report_at: string
}

export interface AdminSpamFlag {
  id: string
  ad_id: string
  ad_title: string
  ad_status: 'draft' | 'active' | 'under_review' | 'sold' | 'expired' | 'deleted'
  seller_name: string
  flag_type: string
  detail: string | null
  score: number
  outcome: 'confirmed' | 'false_positive' | null
  created_at: string
  resolved_at: string | null
}

export interface AdminUserListItem {
  id: string
  full_name: string
  role: StaffRole
  is_phone_verified: boolean
  is_banned: boolean
  masked_phone: string
  ads_count: number
  created_at: string
}

export interface AdminAuditAction {
  id: number
  actor_id: string
  actor_name: string
  action: string
  target_type: 'ad' | 'user' | 'report' | 'setting' | 'term'
  target_id: string
  reason: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export interface AdminStatsData {
  current_counts: {
    active_ads: number
    under_review_ads: number
    pending_reports: number
    unresolved_flags: number
    banned_users: number
  }
  trend: Array<{
    stat_date: string
    new_ads: number
    new_users: number
    removed_ads: number
    reports_filed: number
  }>
  top_cities: Array<{
    name: string
    active_ads_count: number
  }>
  top_brands: Array<{
    name: string
    active_ads_count: number
  }>
  flag_precision: Array<{
    flag_type: string
    confirmed_count: number
    false_positive_count: number
    unresolved_count: number
    precision_pct: number | null
  }>
}

