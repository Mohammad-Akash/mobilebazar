import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/src/types/supabase'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zzcxgqtbmrdbaouegphx.supabase.co'
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key'

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

