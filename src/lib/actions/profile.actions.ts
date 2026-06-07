'use server'

import { createClient } from '@/lib/supabase/server'
import { profileSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'

export async function updateProfile(data: {
  displayName?: string
  bio?: string
  gelar?: string
  kunyah?: string
  showGelar?: boolean
  showKunyah?: boolean
  emailNotifications?: boolean
}) {
  const supabase = (await createClient()) as any
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const validated = profileSchema.parse(data)

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: validated.displayName,
      bio: validated.bio,
      gelar: validated.gelar,
      kunyah: validated.kunyah,
      show_gelar: validated.showGelar,
      show_kunyah: validated.showKunyah,
      email_notifications: validated.emailNotifications,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) throw error

  // Fetch username to revalidate their profile page
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  if (profile) {
    revalidatePath(`/users/${profile.username}`)
  }
  revalidatePath('/questions')
  
  return { success: true }
}

export async function changePassword(password: string) {
  const supabase = (await createClient()) as any
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  if (!password || password.length < 8) {
    throw new Error('Kata sandi minimal harus 8 karakter.')
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) throw error

  return { success: true }
}
