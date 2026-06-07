import React from 'react'
import Link from 'next/link'
import { getQuestions } from '@/lib/queries/questions'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import StatusBadge from '@/components/question/StatusBadge'

interface PageProps {
  searchParams: Promise<{
    page?: string
    status?: string
    sortBy?: string
    q?: string
    tag?: string
  }>
}

export default async function QuestionsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const page = Number(resolvedSearchParams.page) || 1
  const status = resolvedSearchParams.status || 'ALL'
  const sortBy = (resolvedSearchParams.sortBy as 'latest' | 'popular' | 'answered') || 'latest'
  const searchQuery = resolvedSearchParams.q || ''
  const tagQuery = resolvedSearchParams.tag || ''

  const { questions, total, totalPages } = await getQuestions(page, 15, status, sortBy, searchQuery, tagQuery)
  const currentUser = await getCurrentUser()
  const isLoggedIn = !!currentUser

  const getFilterUrl = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams()
    if (resolvedSearchParams.page) params.set('page', resolvedSearchParams.page)
    if (resolvedSearchParams.status) params.set('status', resolvedSearchParams.status)
    if (resolvedSearchParams.sortBy) params.set('sortBy', resolvedSearchParams.sortBy)
    if (resolvedSearchParams.q) params.set('q', resolvedSearchParams.q)
    if (resolvedSearchParams.tag) params.set('tag', resolvedSearchParams.tag)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    // Reset page on filter/sort change
    if (updates.page === undefined) {
      params.delete('page')
    }

    return `/questions?${params.toString()}`
  }

  // Premium active styles
  const tabClass = (currentVal: string, targetVal: string) =>
    `px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shrink-0 ${
      currentVal === targetVal
        ? 'bg-primary-700 text-white shadow-md shadow-primary-700/10 scale-[1.02]'
        : 'text-gray-600 hover:bg-gray-150/70 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white border border-transparent hover:border-gray-200/50 dark:hover:border-gray-800'
    }`

  const sortClass = (currentVal: string, targetVal: string) =>
    `px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
      currentVal === targetVal
        ? 'bg-primary-50 text-primary-700 border-primary-250 dark:bg-primary-950/20 dark:text-primary-400 dark:border-primary-900 z-10'
        : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-850 dark:border-gray-800'
    }`

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>📚</span>
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : tagQuery ? `Tag Kategori: "${tagQuery}"` : 'Semua Pertanyaan'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery
              ? `Ditemukan ${total} pertanyaan ilmiah yang cocok.`
              : tagQuery
              ? `Menampilkan ${total} pertanyaan dengan tag kategori "${tagQuery}".`
              : 'Jelajahi dan diskusikan fatwa serta hukum syariat bersumber kitab kuning mu\'tabar.'}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {(searchQuery || tagQuery) && (
            <Link
              href="/questions"
              className="btn btn-secondary px-4 py-2.5 text-sm"
            >
              Hapus Filter
            </Link>
          )}
          <Link
            href={isLoggedIn ? '/questions/ask' : `/login?next=/questions/ask`}
            className="btn btn-primary px-5 py-2.5 shadow-sm text-sm font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200"
          >
            Tulis Pertanyaan
          </Link>
        </div>
      </div>

      {/* Navigation Tabs (Status) & Sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Status Tabs (Horizontal Scrollable) */}
        <div className="flex items-center w-full lg:w-auto overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none gap-1 bg-gray-100/50 dark:bg-gray-900/40 p-1 rounded-xl border border-gray-150 dark:border-gray-850">
          <Link href={getFilterUrl({ status: 'ALL' })} className={tabClass(status, 'ALL')}>
            Semua
          </Link>
          <Link href={getFilterUrl({ status: 'HALL' })} className={tabClass(status, 'HALL')}>
            Pembahasan 🟡
          </Link>
          <Link href={getFilterUrl({ status: 'MAUQUF' })} className={tabClass(status, 'MAUQUF')}>
            Ditangguhkan 🟠
          </Link>
          <Link href={getFilterUrl({ status: 'TERSELESAIKAN' })} className={tabClass(status, 'TERSELESAIKAN')}>
            Terjawab 🟢
          </Link>
          <Link href={getFilterUrl({ status: 'MUGHLAQ' })} className={tabClass(status, 'MUGHLAQ')}>
            Ditutup 🔴
          </Link>
        </div>

        {/* Sorting Buttons */}
        <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Urutkan:</span>
          <div className="inline-flex rounded-md shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <Link href={getFilterUrl({ sortBy: 'latest' })} className={`${sortClass(sortBy, 'latest')} rounded-l-md border-r-0`}>
              Terbaru
            </Link>
            <Link href={getFilterUrl({ sortBy: 'popular' })} className={`${sortClass(sortBy, 'popular')} border-r-0`}>
              Populer
            </Link>
            <Link href={getFilterUrl({ sortBy: 'answered' })} className={`${sortClass(sortBy, 'answered')} rounded-r-md`}>
              Terjawab
            </Link>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="card p-16 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
            <span className="text-5xl mb-3 block">🔮</span>
            <div className="font-bold text-xl text-gray-900 dark:text-white">Tidak ada pertanyaan ditemukan</div>
            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
              {status !== 'ALL' || searchQuery
                ? 'Tidak ada pertanyaan dengan filter ini. Cobalah untuk membersihkan filter status atau kata kunci pencarian.'
                : 'Belum ada pertanyaan di platform ini. Mari mulai diskusi ilmiah dengan mengajukan pertanyaan pertama!'}
            </p>
            {(status !== 'ALL' || searchQuery) && (
              <Link
                href="/questions"
                className="mt-4 inline-block text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-400 hover:underline"
              >
                Reset Semua Filter & Pencarian
              </Link>
            )}
          </div>
        ) : (
          questions.map((q: any) => {
            const votesSum = (q.upvotes || 0) - (q.downvotes || 0)
            const hasAccepted = !!q.accepted_answer_id
            const timeAgo = new Date(q.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })

            return (
              <div
                key={q.id}
                className="card p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-5 hover:border-primary-500/30 dark:hover:border-primary-500/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
              >
                {/* Stats Section (StackOverflow premium layout) */}
                <div className="flex sm:flex-col gap-3 sm:gap-2 justify-between sm:justify-start items-center sm:items-stretch w-full sm:w-28 shrink-0 text-xs font-semibold pt-1">
                  
                  {/* Votes count */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-850/30 w-full text-center">
                    <span className={`text-base font-extrabold leading-none ${
                      votesSum > 0
                        ? 'text-primary-700 dark:text-primary-400'
                        : votesSum < 0
                        ? 'text-red-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {votesSum}
                    </span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">vote</span>
                  </div>
                  
                  {/* Answers count */}
                  {q.total_answers === 0 ? (
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-150 dark:border-gray-800 w-full text-center text-gray-400 dark:text-gray-500 bg-transparent">
                      <span className="text-base font-bold leading-none">0</span>
                      <span className="text-[9px] uppercase tracking-wider mt-1">jawaban</span>
                    </div>
                  ) : hasAccepted ? (
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-emerald-600 text-white shadow-sm w-full text-center">
                      <span className="text-base font-bold leading-none flex items-center gap-0.5 justify-center">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {q.total_answers}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider mt-1 opacity-90">terjawab</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/10 w-full text-center">
                      <span className="text-base font-bold leading-none">{q.total_answers}</span>
                      <span className="text-[9px] uppercase tracking-wider mt-1">jawaban</span>
                    </div>
                  )}

                  {/* Views count */}
                  <div className="flex items-center gap-1 justify-center text-gray-400 dark:text-gray-500 text-[10px] w-full mt-1">
                    <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{q.views || 0} tayangan</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 transition-colors leading-snug">
                        <Link href={`/questions/${q.slug}`}>{q.title}</Link>
                      </h3>
                      <div className="shrink-0 scale-90 origin-top-right">
                        <StatusBadge status={q.status} />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                      {q.content_text}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1.5 border-t border-gray-100/50 dark:border-gray-800/30">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {q.question_tags && q.question_tags.length > 0 ? (
                        q.question_tags.map((qt: any) => {
                          const t = qt.tags
                          if (!t) return null
                          return (
                            <Link
                              key={t.id}
                              href={getFilterUrl({ tag: t.slug })}
                              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400 border border-primary-100/30 dark:border-primary-900/50 transition-colors hover:bg-primary-100/55"
                            >
                              {t.icon} {t.name}
                            </Link>
                          )
                        })
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-50 text-gray-400 dark:bg-gray-800/20 dark:text-gray-500 border border-gray-150 dark:border-gray-800/50 italic">
                          🏷️ tanpa tag
                        </span>
                      )}
                    </div>

                    {/* Author Badge (Glassmorphic) */}
                    <div className="flex items-center gap-2.5 p-1.5 bg-gray-50/60 dark:bg-gray-850/40 rounded-lg border border-gray-150/40 dark:border-gray-800/50 text-xs">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-850 dark:text-primary-300 flex items-center justify-center font-bold border border-primary-200/50 dark:border-primary-800/50 shadow-sm">
                        {q.profiles?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-medium">ditanyakan oleh</span>
                        <span className="font-bold text-gray-900 dark:text-white leading-tight">
                          @{q.profiles?.username || 'user'}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-amber-500 text-[10px] leading-none">🏆</span>
                          <span className="font-extrabold text-gray-750 dark:text-gray-300 text-[10px] leading-none">
                            {q.profiles?.reputation || 0}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium leading-none">rep</span>
                        </div>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500 pl-1 border-l border-gray-200 dark:border-gray-800">
                        {timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <Link
            href={getFilterUrl({ page: Math.max(1, page - 1) })}
            className={`btn btn-secondary px-4 py-2 text-sm font-semibold transition-all ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-150'}`}
          >
            Sebelumnya
          </Link>
          <span className="text-sm font-medium text-gray-500 px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-2 rounded-lg">
            Halaman {page} dari {totalPages}
          </span>
          <Link
            href={getFilterUrl({ page: Math.min(totalPages, page + 1) })}
            className={`btn btn-secondary px-4 py-2 text-sm font-semibold transition-all ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-150'}`}
          >
            Berikutnya
          </Link>
        </div>
      )}
    </div>
  )
}
