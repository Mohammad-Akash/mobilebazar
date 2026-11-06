import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Missing ad id' }, { status: 400 })
    }

    const supabase = await createClient()
    await supabase.rpc('increment_ad_views', { p_ad_id: id })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to increment view' }, { status: 500 })
  }
}
