'use server'

// ==============================================================================
// Server Action: getSellerContactAction
// Securely retrieves seller phone and WhatsApp via get_seller_contact RPC
// Ensures NO phone numbers are ever leaked in HTML or public queries
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'

export interface ContactActionResult {
  success?: boolean
  error?: string
  requiresLogin?: boolean
  phone?: string | null
  whatsappUrl?: string | null
  telUrl?: string | null
  contactPreference?: string
}

/**
 * Normalizes a Pakistani phone number (e.g. "03001234567" or "+923001234567")
 * to international WhatsApp format: "923001234567"
 */
function normalizeToPkInternational(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('92')) {
    return digits
  }
  if (digits.startsWith('03')) {
    return '92' + digits.substring(1)
  }
  return digits
}

export async function getSellerContactAction(
  adId: string,
  adTitle: string,
  adUrl: string
): Promise<ContactActionResult> {
  const supabase = await createClient()

  // 1. Check server-side user session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: 'Please log in to view seller contact details.',
      requiresLogin: true,
    }
  }

  // 2. Invoke the secure RPC function get_seller_contact
  const { data, error } = await supabase.rpc('get_seller_contact', {
    p_ad_id: adId,
  })

  if (error || !data || data.length === 0) {
    console.error('Error in get_seller_contact RPC:', error)
    return {
      error: error?.message || 'Failed to retrieve seller contact details.',
    }
  }

  const contact = data[0]
  const rawPhone = contact.phone
  const rawWhatsapp = contact.whatsapp_number
  const pref = contact.contact_preference

  let telUrl: string | null = null
  let whatsappUrl: string | null = null

  if (rawPhone) {
    telUrl = `tel:${rawPhone.replace(/\s+/g, '')}`
  }

  if (rawWhatsapp) {
    const intlNumber = normalizeToPkInternational(rawWhatsapp)
    const textMsg = encodeURIComponent(
      `Assalam-o-Alaikum, I am contacting you regarding your ad on MobileBazar: "${adTitle}" (${adUrl})`
    )
    whatsappUrl = `https://wa.me/${intlNumber}?text=${textMsg}`
  }

  return {
    success: true,
    phone: rawPhone,
    telUrl,
    whatsappUrl,
    contactPreference: pref,
  }
}

