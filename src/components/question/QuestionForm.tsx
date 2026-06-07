'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createQuestion } from '@/lib/actions/question.actions'

interface Tag {
  id: string
  name: string
  slug: string
  color?: string
  icon?: string
}

interface QuestionFormProps {
  tags?: Tag[]
}

export default function QuestionForm({ tags = [] }: QuestionFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId)
      } else {
        if (prev.length >= 5) return prev // max 5 tags
        return [...prev, tagId]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Front-end validations
    if (!title.trim() || title.trim().length < 10) {
      setError('Judul pertanyaan minimal harus 10 karakter.')
      return
    }
    if (!content.trim() || content.trim().length < 20) {
      setError('Detail penjelasan minimal harus 20 karakter.')
      return
    }
    if (selectedTagIds.length === 0) {
      setError('Pilih minimal 1 tag kategori untuk pertanyaan Anda.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createQuestion({
        title: title.trim(),
        content: {
          type: 'doc',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: content.trim() }] }],
        },
        contentText: content.trim(),
        tagIds: selectedTagIds,
      })

      if ((result as any).error) {
        setError((result as any).error.message)
      } else {
        router.push(`/questions/${(result as any).slug}`)
        router.refresh()
      }
    } catch (err: any) {
      // Parse validation error or format nicely
      let msg = 'Terjadi kesalahan saat menyimpan pertanyaan'
      if (err instanceof Error) {
        msg = err.message
      } else if (typeof err === 'object' && err !== null) {
        msg = JSON.stringify(err)
      }
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-250 dark:border-gray-800 rounded-lg shadow-sm max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-650 rounded-lg dark:bg-red-950/20 dark:border-red-900/50">
            {error.startsWith('[') ? (
              <ul className="list-disc pl-5 space-y-1">
                {JSON.parse(error).map((e: any, idx: number) => (
                  <li key={idx}>
                    <strong>{e.path?.join('.') || 'input'}</strong>: {e.message}
                  </li>
                ))}
              </ul>
            ) : (
              error
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-1">
            Judul Pertanyaan
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Tulis judul yang jelas, ringkas, dan mewakili inti persoalan hukum ilmiah Anda (min. 10 karakter).
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Apakah wudhu batal jika tidur dalam keadaan duduk tegak?"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-1">
            Detail Pertanyaan
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Jelaskan kronologi, latar belakang, serta keraguan yang Anda alami secara mendetail (min. 20 karakter).
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan kronologi dan keraguan Anda dengan jelas..."
            rows={8}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-1">
            Pilih Tag Kategori (1 - 5 Kategori)
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Pilih pembahasan yang relevan agar asatidzah dan santri dapat menemukan pertanyaan Anda dengan cepat.
          </p>
          
          {/* Selected tags display */}
          <div className="flex flex-wrap gap-2 p-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-950/20 mb-3 min-h-[46px] items-center">
            {selectedTagIds.length === 0 ? (
              <span className="text-xs text-gray-400 italic">Belum ada tag terpilih. Silakan pilih di daftar bawah.</span>
            ) : (
              selectedTagIds.map((id) => {
                const tag = tags.find((t) => t.id === id)
                if (!tag) return null
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-300 border border-primary-200/50 dark:border-primary-850"
                  >
                    <span>{tag.icon} {tag.name}</span>
                    <span className="text-gray-400 hover:text-red-500 font-normal">×</span>
                  </button>
                )
              })
            )}
          </div>

          {/* Tags list picker */}
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1 border border-gray-150 dark:border-gray-850 rounded-lg bg-white dark:bg-gray-900">
            {tags.map((tag) => {
              const isSelected = selectedTagIds.includes(tag.id)
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-primary-700 border-primary-700 text-white shadow-sm scale-[0.98]'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {tag.icon} {tag.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary px-6 py-2.5 text-sm shadow-sm"
          >
            {loading ? 'Mengirim...' : 'Kirim Pertanyaan'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/questions')}
            className="btn btn-secondary px-6 py-2.5 text-sm"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
