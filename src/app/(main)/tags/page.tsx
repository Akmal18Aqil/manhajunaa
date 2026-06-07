import React from 'react'
import { createClient } from '@/lib/supabase/server'
import TagsClient from './TagsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kategori & Tag - Manhajuna',
  description: 'Jelajahi berbagai tag kategori pembahasan fikih, nahwu, hadits, dan kontemporer di Manhajuna.',
}

export default async function TagsPage() {
  const supabase = await createClient()
  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto">
      <TagsClient initialTags={tags || []} />
    </div>
  )
}
