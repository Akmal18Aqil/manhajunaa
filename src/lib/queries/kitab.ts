import { createClient } from '@/lib/supabase/client'

export async function getKitabMasterList() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('kitab_master')
    .select('id, nama_arab, nama_latin, pengarang')
    .order('nama_latin', { ascending: true })

  if (error) {
    console.error('Error fetching kitab_master:', error)
    return []
  }

  return data
}
