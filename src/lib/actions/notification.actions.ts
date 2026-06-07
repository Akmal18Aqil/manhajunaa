'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getNotifications() {
  const supabase = (await createClient()) as any
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { notifications: [], unreadCount: 0 }
  }

  // Fetch recent notifications
  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching notifications:', error)
    return { notifications: [], unreadCount: 0 }
  }

  // Fetch unread count
  const { count, error: countError } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  if (countError) {
    console.error('Error fetching unread notification count:', countError)
    return { notifications: notifications || [], unreadCount: 0 }
  }

  return {
    notifications: notifications || [],
    unreadCount: count || 0,
  }
}

export async function markAsRead(id: string) {
  const supabase = (await createClient()) as any
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function markAllAsRead() {
  const supabase = (await createClient()) as any
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  if (error) throw error

  revalidatePath('/', 'layout')
  return { success: true }
}
