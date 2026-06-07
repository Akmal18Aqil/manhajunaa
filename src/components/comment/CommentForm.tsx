'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addComment } from '@/lib/actions/question.actions'

interface CommentFormProps {
  targetId: string
  targetType: 'QUESTION' | 'ANSWER'
}

export default function CommentForm({ targetId, targetType }: CommentFormProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await addComment({
        content: content.trim(),
        targetId,
        targetType,
      })
      setContent('')
      setIsOpen(false)
      router.refresh()
    } catch (err) {
      console.error('Comment error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-gray-500 hover:text-primary-700 dark:hover:text-primary-400 mt-2 font-medium focus:outline-none"
      >
        tulis komentar...
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2 w-full">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar singkat..."
        required
        className="flex-1 px-3 py-1 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500"
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="btn btn-primary px-3 py-1 text-[10px] uppercase font-bold tracking-wider"
      >
        Kirim
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="btn btn-secondary px-3 py-1 text-[10px] uppercase font-bold tracking-wider"
      >
        Batal
      </button>
    </form>
  )
}
