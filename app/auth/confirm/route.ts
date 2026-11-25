import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/src/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const code = searchParams.get('code')
  const rawNext = searchParams.get('next') ?? '/'

  // Prevent Open Redirect: Ensure `next` starts with a single slash
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/'

  const supabase = await createClient()

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      revalidatePath('/', 'layout')
      return NextResponse.redirect(new URL(next, request.url))
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      revalidatePath('/', 'layout')
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // Redirect to an error page or login with error
  return NextResponse.redirect(new URL('/login?error=Verification link expired or invalid', request.url))
}

