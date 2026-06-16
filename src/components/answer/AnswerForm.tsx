'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { submitAnswer } from '@/lib/actions/question.actions'
import RichTextEditor from '@/components/editor/RichTextEditor'
import ReferenceInput, { ReferenceData } from './ReferenceInput'

interface AnswerFormProps {
  questionId: string
}

export default function AnswerForm({ questionId }: AnswerFormProps) {
  const router = useRouter()
  const [contentJson, setContentJson] = useState<any>('')
  const [contentText, setContentText] = useState('')
  const [references, setReferences] = useState<ReferenceData[]>([])
  const [kitabList, setKitabList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKitab = async () => {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data } = await supabase.from('kitab_master').select('id, nama_arab, nama_latin, pengarang').order('nama_latin')
      if (data) setKitabList(data)
    }
    fetchKitab()
  }, [])

  const handleAddReference = () => {
    setReferences([...references, { kitabId: '', halaman: '' }])
  }

  const handleReferenceChange = (index: number, field: keyof ReferenceData, value: string) => {
    const newRefs = [...references]
    newRefs[index] = { ...newRefs[index], [field]: value }
    setReferences(newRefs)
  }

  const handleRemoveReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contentText.trim()) return

    setLoading(true)
    setError(null)

    try {
      await submitAnswer({
        questionId,
        content: contentJson,
        contentText: contentText,
        references: references,
      })
      setContentJson('')
      setContentText('')
      setReferences([])
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Gagal menyimpan jawaban')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8 mb-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Jawaban Anda
      </h3>
      <div className="shadow-sm">
        <RichTextEditor
          content={contentJson}
          onChange={(json, _html, text) => {
            setContentJson(json)
            setContentText(text)
          }}
          placeholder="Tulis jawaban ilmiah Anda di sini..."
        />
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>📚</span> Referensi Kitab <span className="font-normal text-sm text-gray-500">(Opsional)</span>
          </h4>
          <button
            type="button"
            onClick={handleAddReference}
            className="text-xs font-bold text-primary-700 hover:text-white dark:text-primary-400 dark:hover:text-white flex items-center gap-1.5 bg-primary-50 hover:bg-primary-600 dark:bg-primary-900/30 dark:hover:bg-primary-600 px-3 py-2 rounded-md transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
            Tambah Referensi
          </button>
        </div>

        {references.length > 0 && (
          <div className="space-y-4 mb-4">
            {references.map((ref, index) => (
              <ReferenceInput
                key={index}
                index={index}
                reference={ref}
                kitabList={kitabList}
                onChange={handleReferenceChange}
                onRemove={handleRemoveReference}
              />
            ))}
          </div>
        )}
      </div>

      {error && <div className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-md">{error}</div>}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !contentText.trim()}
          className="btn btn-primary px-8 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          {loading ? 'Mengirim...' : 'Kirim Jawaban'}
        </button>
      </div>
    </form>
  )
}
