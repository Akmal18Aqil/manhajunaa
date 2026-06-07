import React from 'react'
import { createClient } from '@/lib/supabase/server'
import KitabClient from './KitabClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perpustakaan Kitab Kuning - Manhajuna',
  description: 'Telusuri khazanah kitab kuning klasik dan kontemporer yang dijadikan rujukan dan referensi fatwa di Manhajuna.',
}

export default async function KitabPage() {
  const supabase = await createClient()
  const { data: kitabs } = await supabase
    .from('kitab_master')
    .select('*')
    .order('nama_latin', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto">
      <KitabClient initialKitabs={kitabs || []} />
    </div>
  )
}
