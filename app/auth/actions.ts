'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/src/lib/supabase/server'
import { checkRateLimit } from '@/src/lib/rate-limit'

// Validation Schemas with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required (min 2 characters)'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  cityId: z.string().uuid().or(z.literal('')).optional(),
  whatsappNumber: z
    .string()
    .regex(/^(\+923[0-9]{9}|03[0-9]{9})$/, 'Please enter a valid Pakistani number (e.g. 03001234567 or +923001234567)')
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
  const rl = await checkRateLimit('login')
  if (!rl.success) {
    return {
      error: `Too many attempts. Please try again in ${rl.retryAfterSeconds || 60} seconds.`,
    }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = formData.get('next') as string | null

  const validated = loginSchema.safeParse({ email, password })
  if (!validated.success) {
    return {
      error: 'Invalid input',
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
      message = 'Invalid email or password'
    } else if (error.message.includes('Email not confirmed')) {
      message = 'Please check your inbox to confirm your email address'
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
  const rl = await checkRateLimit('signup')
  if (!rl.success) {
    return {
      error: `Too many signup attempts. Please try again in ${rl.retryAfterSeconds || 60} seconds.`,
    }
  }

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
      error: 'Please fix the errors in the form',
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
      message = 'This email is already registered'
    } else if (error.message.includes('Password should be')) {
      message = 'Password is too weak'
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
  const whatsappNumber = formData.get('whatsappNumber') as string

  const validated = profileSchema.safeParse({
    fullName,
    cityId,
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

  // 2. Update private profile (whatsapp only - phone is OTP-verified only)
  const { error: privateError } = await supabase
    .from('profile_private')
    .update({
      whatsapp_number: validated.data.whatsappNumber || null,
    })
    .eq('id', user.id)

  if (privateError) {
    return { error: privateError.message }
  }

  revalidatePath('/profile')
  return { success: true }
}

