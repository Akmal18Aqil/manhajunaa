import React from 'react'
import Link from 'next/link'
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
      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/questions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-400 transition-colors uppercase tracking-wider group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Kembali ke Pertanyaan</span>
        </Link>
      </div>

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
