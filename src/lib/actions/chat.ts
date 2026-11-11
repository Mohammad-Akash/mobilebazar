'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'
import type { StartConversationResult, SendMessageResult } from '@/src/types/chat'

export async function startConversationAction(
  adId: string,
  initialMessage?: string,
  offerAmount?: number
): Promise<StartConversationResult> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, code: 'AUTH_REQUIRED', message: 'Chat shuru karne ke liye pehle login karein.' }
    }

    const { data, error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ data: StartConversationResult | null; error: Error | null }>)(
      'start_conversation',
      {
        p_ad_id: adId,
        p_initial_message: initialMessage || null,
        p_offer_amount: offerAmount || null,
      }
    )

    if (error) {
      return { success: false, code: 'RPC_ERROR', message: error.message }
    }

    const res = data as StartConversationResult
    if (res?.success && res.conversation_id) {
      revalidatePath('/inbox')
    }

    return res || { success: false, code: 'UNKNOWN_ERROR', message: 'Chat create nahi ho saki.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error occurred'
    return { success: false, code: 'EXCEPTION', message: msg }
  }
}

export async function sendMessageAction(
  conversationId: string,
  body: string,
  kind: 'text' | 'offer' = 'text',
  offerAmount?: number
): Promise<SendMessageResult> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, code: 'AUTH_REQUIRED', message: 'Login zaroori hai.' }
    }

    const cleanBody = body?.trim()
    if (!cleanBody || cleanBody.length === 0) {
      return { success: false, code: 'EMPTY_BODY', message: 'Message khali nahi ho sakta.' }
    }

    if (cleanBody.length > 1000) {
      return { success: false, code: 'TOO_LONG', message: 'Message 1000 characters se zyada nahi ho sakta.' }
    }

    const { data, error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ data: SendMessageResult | null; error: Error | null }>)(
      'send_message',
      {
        p_conversation_id: conversationId,
        p_body: cleanBody,
        p_kind: kind,
        p_offer_amount: offerAmount || null,
      }
    )

    if (error) {
      return { success: false, code: 'RPC_ERROR', message: error.message }
    }

    const res = data as SendMessageResult
    return res || { success: false, code: 'UNKNOWN_ERROR', message: 'Message deliver nahi ho saka.' }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error'
    return { success: false, code: 'EXCEPTION', message: msg }
  }
}

export async function markReadAction(conversationId: string): Promise<{ success: boolean }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false }

    const { error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ error: Error | null }>)(
      'mark_read',
      { p_conversation_id: conversationId }
    )

    if (!error) {
      revalidatePath('/inbox')
    }

    return { success: !error }
  } catch {
    return { success: false }
  }
}

export async function blockUserAction(targetUserId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, message: 'Login required' }

    const { error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ error: Error | null }>)(
      'block_user',
      { p_target_id: targetUserId }
    )

    if (error) {
      return { success: false, message: error.message }
    }

    revalidatePath('/inbox')
    return { success: true }
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Block failed' }
  }
}

export async function unblockUserAction(targetUserId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, message: 'Login required' }

    const { error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ error: Error | null }>)(
      'unblock_user',
      { p_target_id: targetUserId }
    )

    if (error) {
      return { success: false, message: error.message }
    }

    revalidatePath('/inbox')
    return { success: true }
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Unblock failed' }
  }
}

export async function reportConversationAction(
  conversationId: string,
  reason: string,
  detail?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, message: 'Login required' }

    const { error } = await (supabase.rpc as unknown as (name: string, params: object) => Promise<{ error: Error | null }>)(
      'report_conversation',
      {
        p_conversation_id: conversationId,
        p_reason: reason,
        p_detail: detail || null,
      }
    )

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true }
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Report failed' }
  }
}
