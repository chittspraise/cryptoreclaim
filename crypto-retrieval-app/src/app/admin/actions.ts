'use server'

import { createServerClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteClaim(id: string | number) {
  const supabase = createServerClient()
  const { error } = await supabase.from('claims').delete().match({ id: id })

  if (error) {
    console.error('Error deleting claim:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin') // This will refresh the data on the admin page
  return { success: true }
}
