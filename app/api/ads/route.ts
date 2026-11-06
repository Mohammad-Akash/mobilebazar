import { NextRequest, NextResponse } from 'next/server'
import { connection } from 'next/server'
import { searchParamsSchema } from '@/src/lib/validations/search'
import { searchAds } from '@/src/lib/data/ads'

export async function GET(request: NextRequest) {
  try {
    await connection()
    const searchParams = request.nextUrl.searchParams

    // Convert URLSearchParams to plain object
    const rawParams: Record<string, string> = {}
    searchParams.forEach((val, key) => {
      rawParams[key] = val
    })

    const parsed = searchParamsSchema.safeParse(rawParams)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid search parameters' }, { status: 400 })
    }

    const result = await searchAds(parsed.data)
    return NextResponse.json(result)
  } catch (err: unknown) {
    console.error('API /api/ads error:', err)
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 })
  }
}

