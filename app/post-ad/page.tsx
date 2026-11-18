import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { createClient } from '@/src/lib/supabase/server'
import { getActiveBrands, getActiveCities } from '@/src/lib/data/reference'
import { PostAdWizard } from './PostAdWizard'

export const metadata: Metadata = {
  title: 'Post Free Mobile Ad',
  robots: {
    index: false,
    follow: false,
  },
}

export const instant = false

export default async function PostAdPage() {
  await connection()
  const supabase = await createClient()

  // 1. Server-side Authentication Verification
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/post-ad')
  }

  // 2. Verify Seller Contact Profile (User must have a verified phone)
  const { data: privateProfile } = await supabase
    .from('profile_private')
    .select('phone, is_phone_verified')
    .eq('id', user.id)
    .single()

  if (!privateProfile?.is_phone_verified) {
    redirect('/dashboard/profile/verify?return_to=/post-ad')
  }

  // 3. Pre-fetch reference data on server (eliminates waterfalls)
  const [brands, cities] = await Promise.all([
    getActiveBrands(),
    getActiveCities(),
  ])

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <PostAdWizard
        brands={brands}
        cities={cities}
        userId={user.id}
      />
    </div>
  )
}
