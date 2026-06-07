'use server'

import { createClient } from '@/lib/supabase/server'
import { registerSchema, loginSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(data: { email: string; password: string; username: string; displayName: string }) {
  const supabase = await createClient()

  const validated = registerSchema.parse(data)

  const { error: signUpError } = await supabase.auth.signUp({
    email: validated.email,
    password: validated.password,
    options: {
      data: {
        username: validated.username,
        full_name: validated.displayName,
      },
    },
  })

  if (signUpError) {
    return { error: { code: 'SIGNUP_FAILED', message: signUpError.message } }
  }

  return { success: true }
}

export async function signIn(data: { email: string; password: string }) {
  const supabase = await createClient()

  const validated = loginSchema.parse(data)

  const { error } = await supabase.auth.signInWithPassword({
    email: validated.email,
    password: validated.password,
  })

  if (error) {
    return { error: { code: 'LOGIN_FAILED', message: error.message } }
  }

  revalidatePath('/', 'layout')
  redirect('/questions')
}

export async function signOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile as any
}
