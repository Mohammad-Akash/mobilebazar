// ==============================================================================
// Chat Data Fetching Layer (Phase 6)
// Server-side queries for conversation lists, active thread, and message history
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'
import type { ConversationListItem, ChatMessage } from '@/src/types/chat'

export async function getConversationsList(
  filter: 'all' | 'buying' | 'selling' = 'all'
): Promise<ConversationListItem[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ data: ConversationListItem[] | null; error: Error | null }>)(
    'list_conversations',
    { p_limit: 50 }
  )

  if (error) {
    console.error('Error fetching conversations:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    return []
  }

  const list = (data || []) as ConversationListItem[]
  if (filter === 'buying') return list.filter((c) => c.is_buyer)
  if (filter === 'selling') return list.filter((c) => !c.is_buyer)
  return list
}

export const getConversations = getConversationsList

export interface ConversationDetails {
  id: string
  ad_id: string
  buyer_id: string
  seller_id: string
  created_at: string
  last_message_at: string
  buyer_unread_count: number
  seller_unread_count: number
  buyer_last_read_at?: string | null
  seller_last_read_at?: string | null
  other_last_read_at?: string | null
  isBuyer: boolean
  ad: {
    id: string
    title: string
    price: number | null
    status: string
    pta_status: string | null
    seller_id: string
    ad_images?: Array<{ storage_path: string; position: number }>
  }
  otherUser: {
    id: string
    full_name: string
    avatar_url: string | null
    is_phone_verified: boolean
  }
}

export async function getConversationDetails(conversationId: string): Promise<ConversationDetails | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Fetch conversation and joined ad info
  const { data: rawConv, error } = await (supabase as any)
    .from('conversations')
    .select(`
      id,
      ad_id,
      buyer_id,
      seller_id,
      created_at,
      last_message_at,
      buyer_unread_count,
      seller_unread_count,
      buyer_last_read_at,
      seller_last_read_at,
      ad:ads (
        id,
        title,
        price,
        status,
        pta_status,
        seller_id,
        ad_images (
          storage_path,
          position
        )
      )
    `)
    .eq('id', conversationId)
    .single()

  if (error || !rawConv) {
    return null
  }

  const conv = rawConv as any

  // Determine other user ID
  const isBuyer = conv.buyer_id === user.id
  const otherUserId = isBuyer ? conv.seller_id : conv.buyer_id

  // Fetch other user profile
  const { data: otherProfile } = await (supabase as any)
    .from('profiles')
    .select('id, full_name, avatar_url, is_phone_verified')
    .eq('id', otherUserId)
    .single()

  return {
    id: conv.id,
    ad_id: conv.ad_id,
    buyer_id: conv.buyer_id,
    seller_id: conv.seller_id,
    created_at: conv.created_at,
    last_message_at: conv.last_message_at,
    buyer_unread_count: conv.buyer_unread_count,
    seller_unread_count: conv.seller_unread_count,
    buyer_last_read_at: conv.buyer_last_read_at,
    seller_last_read_at: conv.seller_last_read_at,
    other_last_read_at: isBuyer ? conv.seller_last_read_at : conv.buyer_last_read_at,
    ad: conv.ad || {
      id: conv.ad_id,
      title: 'Handset Listing',
      price: null,
      status: 'sold',
      pta_status: null,
      ad_images: [],
    },
    isBuyer,
    otherUser: otherProfile || {
      id: otherUserId,
      full_name: 'MobileBazar User',
      avatar_url: null,
      is_phone_verified: false,
    },
  }
}

export async function getMessages(
  conversationId: string,
  cursorCreatedAt?: string,
  cursorId?: number,
  limit: number = 30
): Promise<ChatMessage[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ data: ChatMessage[] | null; error: Error | null }>)(
    'get_messages',
    {
      p_conversation_id: conversationId,
      p_cursor_created_at: cursorCreatedAt || null,
      p_cursor_id: cursorId || null,
      p_limit: limit,
    }
  )

  if (error) {
    console.error('Error fetching messages:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    return []
  }

  // get_messages RPC returns DESC (newest first) for keyset pagination.
  // We sort in ascending chronological order so chat renders oldest-to-newest.
  const rawList = (data || []) as ChatMessage[]
  return rawList.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime()
    const timeB = new Date(b.created_at).getTime()
    if (timeA !== timeB) return timeA - timeB
    return Number(a.id) - Number(b.id)
  })
}

export async function getUnreadChatCount(): Promise<number> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  const { data, error } = await (supabase.rpc as unknown as (name: string) => Promise<{ data: number | null; error: Error | null }>)(
    'get_unread_chat_total'
  )

  if (error || typeof data !== 'number') {
    return 0
  }

  return data
}
