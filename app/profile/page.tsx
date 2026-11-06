import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'
import { ProfileForm } from './ProfileForm'

export const instant = false

export default async function ProfilePage() {
  const supabase = await createClient()

  // 1. Server-side Authentication Verification
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/profile')
  }

  // 2. Fetch public profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, city_id, ads_count')
    .eq('id', user.id)
    .single()

  // 3. Fetch private profile (phone, whatsapp, verification)
  const { data: privateProfile } = await supabase
    .from('profile_private')
    .select('phone, whatsapp_number, is_phone_verified')
    .eq('id', user.id)
    .single()

  // 4. Fetch active cities for dropdown
  const { data: cities } = await supabase
    .from('cities')
    .select('id, name')
    .eq('is_active', true)
    .order('name')

  const initialData = {
    fullName: profile?.full_name || '',
    cityId: profile?.city_id || null,
    phone: privateProfile?.phone || null,
    whatsappNumber: privateProfile?.whatsapp_number || null,
    isPhoneVerified: privateProfile?.is_phone_verified || false,
    adsCount: profile?.ads_count || 0,
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ProfileForm initialData={initialData} cities={cities || []} />
    </div>
  )
}
