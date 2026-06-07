'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { castVote } from '@/lib/actions/question.actions'

interface VoteButtonsProps {
  targetId: string
  targetType: 'QUESTION' | 'ANSWER'
  upvotes: number
  downvotes: number
  isLoggedIn: boolean
  currentSlug?: string
  userVote?: number | null
}

export default function VoteButtons({
  targetId,
  targetType,
  upvotes,
  downvotes,
  isLoggedIn,
  currentSlug,
  userVote = null,
}: VoteButtonsProps) {
  const router = useRouter()
  const [votesCount, setVotesCount] = useState(upvotes - downvotes)
  const [currentUserVote, setCurrentUserVote] = useState<number | null>(userVote)
  const [loading, setLoading] = useState(false)

  // Keep state in sync with updated props from server
  useEffect(() => {
    setVotesCount(upvotes - downvotes)
    setCurrentUserVote(userVote)
  }, [upvotes, downvotes, userVote])

  const handleVote = async (value: 1 | -1) => {
    if (!isLoggedIn) {
      router.push(`/login?next=/questions/${currentSlug || ''}`)
      return
    }

    if (loading) return

    const oldVote = currentUserVote
    let netChange = 0

    if (value === 1) {
      if (oldVote === 1) {
        netChange = -1
        setCurrentUserVote(null)
      } else if (oldVote === -1) {
        netChange = 2
        setCurrentUserVote(1)
      } else {
        netChange = 1
        setCurrentUserVote(1)
      }
    } else {
      if (oldVote === -1) {
        netChange = 1
        setCurrentUserVote(null)
      } else if (oldVote === 1) {
        netChange = -2
        setCurrentUserVote(-1)
      } else {
        netChange = -1
        setCurrentUserVote(-1)
      }
    }

    setVotesCount((prev) => prev + netChange)
    setLoading(true)

    try {
      await castVote(targetId, targetType, value)
      router.refresh()
    } catch (err) {
      console.error('Vote failed:', err)
      // Rollback on failure
      setCurrentUserVote(oldVote)
      setVotesCount((prev) => prev - netChange)
    } finally {
      setLoading(false)
    }
  }

  const isUpvoted = currentUserVote === 1
  const isDownvoted = currentUserVote === -1

  return (
    <div className="flex flex-col items-center gap-1.5 py-2 shrink-0">
      {/* Upvote Arrow */}
      <button
        disabled={loading}
        onClick={() => handleVote(1)}
        className={`focus:outline-none transition-all duration-200 transform active:scale-95 ${
          isUpvoted
            ? 'text-primary-700 dark:text-primary-400 scale-110 font-bold'
            : 'text-gray-400 hover:text-primary-700 dark:hover:text-primary-400'
        }`}
        title="Bermanfaat (Upvote)"
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 14h6v8h4v-8h6L12 4 4 14z" />
        </svg>
      </button>

      {/* Net Votes Display */}
      <span className={`text-lg font-bold transition-all duration-200 ${
        isUpvoted
          ? 'text-primary-700 dark:text-primary-400'
          : isDownvoted
          ? 'text-red-600'
          : 'text-gray-800 dark:text-gray-200'
      }`}>
        {votesCount}
      </span>

      {/* Downvote Arrow */}
      <button
        disabled={loading}
        onClick={() => handleVote(-1)}
        className={`focus:outline-none transition-all duration-200 transform active:scale-95 ${
          isDownvoted
            ? 'text-red-650 dark:text-red-500 scale-110 font-bold'
            : 'text-gray-400 hover:text-red-600'
        }`}
        title="Kurang Bermanfaat (Downvote)"
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 10h-6V2h-4v8H4l8 10 8-10z" />
        </svg>
      </button>
    </div>
  )
}
