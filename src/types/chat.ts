export type MessageKind = 'text' | 'offer' | 'system'

export interface ChatMessage {
  id: number
  conversation_id: string
  sender_id: string
  kind: MessageKind
  body: string
  offer_amount: number | null
  created_at: string
  is_mine: boolean
}

export interface ConversationListItem {
  conversation_id: string
  ad_id: string
  ad_title: string
  ad_price: number | null
  ad_status: string
  ad_cover_image: string | null
  other_user_id: string
  other_user_name: string | null
  other_user_avatar: string | null
  last_message_at: string
  last_message_preview: string | null
  unread_count: number
  is_buyer: boolean
}

export interface StartConversationResult {
  success: boolean
  conversation_id?: string
  ad_id?: string
  code?: string
  message?: string
}

export interface SendMessageResult {
  success: boolean
  message_id?: number
  created_at?: string
  has_phone_number?: boolean
  code?: string
  message?: string
}

export type ChatReportReason = 'scam' | 'harassment' | 'spam' | 'other'
