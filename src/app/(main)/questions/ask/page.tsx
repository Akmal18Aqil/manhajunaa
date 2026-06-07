import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import { createClient } from '@/lib/supabase/server'
import QuestionForm from '@/components/question/QuestionForm'

export default async function AskPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/login?next=/questions/ask')
  }

  const supabase = await createClient()
  const { data: tags } = await supabase
    .from('tags')
    .select('id, name, slug, color, icon')
    .order('name', { ascending: true })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Tulis Pertanyaan Baru
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Dapatkan jawaban ilmiah bersumber kitab turats mu'tabar dari para penuntut ilmu dan asatidzah.
        </p>
      </div>
      <QuestionForm tags={tags || []} />
    </div>
  )
}
