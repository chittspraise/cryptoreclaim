import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerClient() {
  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = await cookies()
          return cookieStore.get(name)?.value
        },
        set: async (name: string, value: string, options: CookieOptions) => {
          const cookieStore = await cookies()
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          const cookieStore = await cookies()
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
