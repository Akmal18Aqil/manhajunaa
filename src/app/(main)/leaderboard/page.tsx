import React from 'react'
import { createClient } from '@/lib/supabase/server'
import LeaderboardClient from './LeaderboardClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leaderboard Reputasi - Manhajuna',
  description: 'Daftar peringkat kontributor ilmiah terbaik berdasarkan reputasi dan kebermanfaatan fatwa rujukan di Manhajuna.',
}

export default async function LeaderboardPage() {
  const supabase = await createClient()
  
  // Fetch top 50 users ordered by reputation descending
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, display_name, role, reputation, level, avatar_url, is_verified, gelar')
    .order('reputation', { ascending: false })
    .limit(50)

  return (
    <div className="max-w-6xl mx-auto">
      <LeaderboardClient initialProfiles={profiles || []} />
    </div>
  )
}
