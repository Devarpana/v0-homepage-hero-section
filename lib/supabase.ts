import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** False when the env vars are missing (local dev without a .env.local, preview builds). */
export const isSupabaseConfigured = Boolean(url && anonKey)

const isBrowser = typeof window !== 'undefined'

/**
 * Created only when configured, so importing this module never throws. That used to fail
 * `next build` on any machine without the env vars set.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        // Sessions only make sense in the browser (admin login); server renders are anonymous.
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        detectSessionInUrl: false,
      },
    })
  : null

export const NOT_CONFIGURED_MESSAGE =
  'The store database is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'

/** For code paths that cannot work without a database (checkout, forms, admin). */
export function requireSupabase(): SupabaseClient {
  if (!supabase) throw new Error(NOT_CONFIGURED_MESSAGE)
  return supabase
}

/** Turns anything thrown or returned by supabase-js into a message safe to show a user. */
export function errorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (error instanceof Error && error.message) return error.message
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === 'string' && message) return message
  }
  return fallback
}
