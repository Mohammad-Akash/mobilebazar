import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // If CRON_SECRET is set, protect the route
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Missing Supabase config' }, { status: 500 })
    }

    // Call narrow notification RPC
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data: pending, error } = await supabase.rpc('get_pending_chat_email_notifications', {
      p_limit: 50,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const notifications = pending as Array<{
      conversation_id: string
      recipient_id: string
      recipient_name: string
      recipient_email: string
      ad_title: string
      unread_count: number
    }> | null

    // Return list of pending notifications to be dispatched
    return NextResponse.json({
      success: true,
      processed: notifications?.length || 0,
      notifications: (notifications || []).map((n) => ({
        recipient_name: n.recipient_name,
        ad_title: n.ad_title,
        unread_count: n.unread_count,
        conversation_id: n.conversation_id,
      })),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
