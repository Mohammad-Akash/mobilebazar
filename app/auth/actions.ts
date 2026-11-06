'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/src/lib/supabase/server'

// Validation Schemas with Zod
const loginSchema = z.object({
  email: z.string().email('Sahi email address likhein / Please enter a valid email'),
  password: z.string().min(8, 'Password kam az kam 8 characters ka hona chahiye / Minimum 8 characters'),
})

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Pura naam likhein / Full name is required (min 2 chars)'),
    email: z.string().email('Sahi email address likhein / Please enter a valid email'),
    password: z.string().min(8, 'Password kam az kam 8 characters ka hona chahiye / Minimum 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Dono passwords match nahi kar rahe / Passwords do not match',
    path: ['confirmPassword'],
  })

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  cityId: z.string().uuid().or(z.literal('')).optional(),
  phone: z
    .string()
    .regex(/^(\+923[0-9]{9}|03[0-9]{9})$/, 'Pakistani format zaroori hai (e.g. 03001234567 ya +923001234567)')
    .or(z.literal(''))
    .optional(),
  whatsappNumber: z
    .string()
    .regex(/^(\+923[0-9]{9}|03[0-9]{9})$/, 'Pakistani format zaroori hai (e.g. 03001234567 ya +923001234567)')
    .or(z.literal(''))
    .optional(),
})

// Helper to safely sanitize internal redirect path (prevents Open Redirect attacks)
function getSafeRedirectPath(rawPath: string | null | undefined): string {
  if (!rawPath || !rawPath.startsWith('/') || rawPath.startsWith('//')) {
    return '/'
  }
  return rawPath
}

export type AuthState = {
  error?: string
  success?: boolean
  fieldErrors?: Record<string, string[]>
}

export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = formData.get('next') as string | null

  const validated = loginSchema.safeParse({ email, password })
  if (!validated.success) {
    return {
      error: 'Data sahi nahi bhara gaya / Invalid input',
      fieldErrors: validated.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  })

  if (error) {
    let message = error.message
    if (error.message.includes('Invalid login credentials')) {
      message = 'Email ya password ghalat hai / Invalid email or password'
    } else if (error.message.includes('Email not confirmed')) {
      message = 'Email confirm nahi hui. Apni inbox check karein / Email not confirmed'
    }
    return { error: message }
  }

  revalidatePath('/', 'layout')
  const safeNext = getSafeRedirectPath(next)
  redirect(safeNext)
}

export async function signupAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const validated = signupSchema.safeParse({
    fullName,
    email,
    password,
    confirmPassword,
  })

  if (!validated.success) {
    return {
      error: 'Form mein galtiyan hain / Please fix form errors',
      fieldErrors: validated.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        full_name: validated.data.fullName,
      },
    },
  })

  if (error) {
    let message = error.message
    if (error.message.includes('User already registered')) {
      message = 'Yeh email pehle se registered hai / Email already in use'
    } else if (error.message.includes('Password should be')) {
      message = 'Password kamzor hai / Password is too weak'
    }
    return { error: message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function updateProfileAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName = formData.get('fullName') as string
  const cityId = formData.get('cityId') as string
  const phone = formData.get('phone') as string
  const whatsappNumber = formData.get('whatsappNumber') as string

  const validated = profileSchema.safeParse({
    fullName,
    cityId,
    phone,
    whatsappNumber,
  })

  if (!validated.success) {
    return {
      error: 'Invalid input in profile form',
      fieldErrors: validated.error.flatten().fieldErrors,
    }
  }

  // 1. Update public profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: validated.data.fullName,
      city_id: validated.data.cityId ? validated.data.cityId : null,
    })
    .eq('id', user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  // 2. Update private profile (phone, whatsapp)
  const { error: privateError } = await supabase
    .from('profile_private')
    .update({
      phone: validated.data.phone || null,
      whatsapp_number: validated.data.whatsappNumber || null,
    })
    .eq('id', user.id)

  if (privateError) {
    return { error: privateError.message }
  }

  revalidatePath('/profile')
  return { success: true }
}

