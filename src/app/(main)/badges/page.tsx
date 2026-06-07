import React from 'react'
import { createClient } from '@/lib/supabase/server'
import BadgesClient from './BadgesClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lencana Prestasi - Manhajuna',
  description: 'Daftar lencana dan penghargaan prestasi kontribusi ilmiah di platform Q&A Manhajuna.',
}

export default async function BadgesPage() {
  const supabase = await createClient()
  const { data: badges } = await supabase
    .from('badges')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto">
      <BadgesClient initialBadges={badges || []} />
    </div>
  )
}
