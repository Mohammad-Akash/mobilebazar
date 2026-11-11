import { createClient } from '@/src/lib/supabase/server'
import type { ConversationListItem, ChatMessage } from '@/src/types/chat'

export async function getConversations(
  tab: 'all' | 'buying' | 'selling' = 'all',
  cursor?: string,
  limit: number = 20
): Promise<ConversationListItem[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ data: ConversationListItem[] | null; error: Error | null }>)(
    'list_conversations',
    {
      p_tab: tab,
      p_cursor: cursor || null,
      p_limit: limit,
    }
  )

  if (error) {
    console.error('Error fetching conversations:', error)
    return []
  }

  return (data || []) as ConversationListItem[]
}

export interface ConversationDetails {
  id: string
  ad_id: string
  buyer_id: string
  seller_id: string
  created_at: string
  last_message_at: string
  buyer_unread_count: number
  seller_unread_count: number
  isBuyer: boolean
  ad: {
    id: string
    title: string
    price: number | null
    status: string
    pta_status: string | null
    seller_id: string
    ad_images?: Array<{ storage_path: string; position: number }>
  } | null
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
    ad: conv.ad || null,
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
    console.error('Error fetching messages:', error)
    return []
  }

  // Reverse so oldest in the page is first for top-down chat stream
  return ((data || []) as ChatMessage[]).reverse()
}

export async function getUnreadChatTotal(): Promise<number> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  const { data, error } = await (supabase.rpc as unknown as (name: string) => Promise<{ data: number | null; error: Error | null }>)(
    'get_unread_chat_total'
  )

  if (error) {
    return 0
  }

  return Number(data || 0)
}
