import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'
import { VerifyPhoneForm } from './VerifyForm'

export const metadata: Metadata = {
  title: 'Phone Verify Karein',
  robots: { index: false, follow: false },
}

export const instant = false

export default async function VerifyPhonePage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/dashboard/profile/verify')

  // Already verified? Redirect back
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_phone_verified')
    .eq('id', user.id)
    .single()

  const { return_to } = await searchParams
  if (profile?.is_phone_verified) {
    redirect(return_to || '/dashboard/profile')
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-16 pb-10">
      <div className="w-full max-w-sm">
        <VerifyPhoneForm />
      </div>
    </div>
  )
}

