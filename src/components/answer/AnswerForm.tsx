'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitAnswer } from '@/lib/actions/question.actions'

interface AnswerFormProps {
  questionId: string
}

export default function AnswerForm({ questionId }: AnswerFormProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError(null)

    try {
      await submitAnswer({
        questionId,
        content: {
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: content }] }],
        },
        contentText: content,
      })
      setContent('')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Gagal menyimpan jawaban')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Jawaban Anda
      </h3>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis jawaban ilmiah Anda di sini. Rujuk kitab kuning yang valid jika memungkinkan..."
          rows={6}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm focus:outline-none"
        />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div>
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="btn btn-primary px-5 py-2 text-sm shadow-sm"
        >
          {loading ? 'Mengirim...' : 'Kirim Jawaban'}
        </button>
      </div>
    </form>
  )
}
