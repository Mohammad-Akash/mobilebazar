import { notFound, redirect } from 'next/navigation'
import { connection } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { getActiveBrands, getActiveCities } from '@/src/lib/data/reference'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { EditAdForm } from './EditAdForm'

export const instant = false

interface EditAdPageProps {
  params: Promise<{ id: string }>
}

export default async function EditAdPage({ params }: EditAdPageProps) {
  await connection()
  const { id: adId } = await params

  // 1. UUID Validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(adId)) {
    notFound()
  }

  const supabase = await createClient()

  // 2. Verify Authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/dashboard/ads/${adId}/edit`)
  }

  // 3. Fetch Ad with ownership verification
  const { data: ad, error: adError } = await supabase
    .from('ads')
    .select('*')
    .eq('id', adId)
    .single()

  if (adError || !ad) {
    notFound()
  }

  // IDOR Protection: Must be the seller's own ad
  if (ad.seller_id !== user.id) {
    notFound()
  }

  // Must be active to edit
  if (ad.status !== 'active') {
    redirect('/dashboard/ads?status=sold&warning=repost_first_to_edit')
  }

  // 4. Fetch private IMEI and images concurrently
  const [privateRes, imagesRes, brands, cities] = await Promise.all([
    supabase.from('ad_private').select('imei').eq('ad_id', adId).single(),
    supabase.from('ad_images').select('storage_path, position').eq('ad_id', adId).order('position'),
    getActiveBrands(),
    getActiveCities(),
  ])

  const imei = privateRes.data?.imei || ''
  const images = imagesRes.data?.map((img) => img.storage_path) || []

  const initialData: FullAdFormData = {
    brand_id: ad.brand_id,
    model_id: ad.model_id,
    condition: ad.condition,
    pta_status: ad.pta_status,
    storage_gb: ad.storage_gb,
    ram_gb: ad.ram_gb || null,
    color: ad.color || '',
    battery_health: ad.battery_health,
    has_box: ad.has_box,
    has_accessories: ad.has_accessories,
    warranty_type: ad.warranty_type,
    warranty_months_remaining: ad.warranty_months_remaining || 0,
    price: ad.price,
    is_negotiable: ad.is_negotiable,
    title: ad.title,
    description: ad.description,
    imei: imei,
    images: images,
    city_id: ad.city_id,
    area_id: ad.area_id || null,
    contact_preference: ad.contact_preference,
  }

  return (
    <EditAdForm
      adId={ad.id}
      initialData={initialData}
      brands={brands}
      cities={cities}
      userId={user.id}
    />
  )
}

