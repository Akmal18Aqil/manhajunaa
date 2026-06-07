import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import ProfileClient from './ProfileClient'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    username: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  return {
    title: `@${username} - Profil Pengguna - Manhajuna`,
    description: `Profil dan riwayat kontribusi ilmiah dari @${username} di platform Manhajuna.`,
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = (await createClient()) as any

  // Get profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (profileError || !profile) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <span className="text-5xl block mb-3">🔍</span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pengguna tidak ditemukan</h3>
        <p className="text-sm text-gray-400 mt-2">
          Akun dengan nama pengguna @{username} tidak terdaftar di platform kami.
        </p>
        <div className="mt-5">
          <Link href="/questions" className="btn btn-primary text-sm px-5 py-2">
            Kembali ke Pertanyaan
          </Link>
        </div>
      </div>
    )
  }

  // Get earned badges
  const { data: userBadges } = await supabase
    .from('user_badges')
    .select('earned_at, badges (id, name, slug, description, icon, tier)')
    .eq('user_id', profile.id)

  // Get user's questions
  const { data: questions } = await supabase
    .from('questions')
    .select('id, title, slug, upvotes, downvotes, total_answers, status, created_at')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false })

  // Get user's answers
  const { data: answers } = await supabase
    .from('answers')
    .select('id, content_text, created_at, question_id, questions (title, slug)')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false })

  const currentUser = await getCurrentUser()
  const isOwner = currentUser?.id === profile.id

  return (
    <div className="max-w-5xl mx-auto">
      <ProfileClient
        profile={profile}
        badges={userBadges || []}
        questions={questions || []}
        answers={answers || []}
        isOwner={isOwner}
      />
    </div>
  )
}
