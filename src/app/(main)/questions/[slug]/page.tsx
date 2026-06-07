import React from 'react'
import Link from 'next/link'
import { getQuestionBySlug } from '@/lib/queries/questions'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import { updateQuestionStatus } from '@/lib/actions/question.actions'
import StatusBadge from '@/components/question/StatusBadge'
import VoteButtons from '@/components/vote/VoteButtons'
import AnswerForm from '@/components/answer/AnswerForm'
import CommentForm from '@/components/comment/CommentForm'

export default async function QuestionDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getQuestionBySlug(slug)
  const currentUser = await getCurrentUser()
  const isLoggedIn = !!currentUser

  if (!data) {
    return (
      <div className="card p-12 text-center text-gray-500">
        <span className="text-4xl mb-2 block">🔍</span>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Pertanyaan tidak ditemukan</h3>
        <p className="text-sm text-gray-400 mt-1">Halaman yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <div className="mt-4">
          <Link href="/questions" className="btn btn-primary text-sm px-4 py-2">Kembali ke Pertanyaan</Link>
        </div>
      </div>
    )
  }

  async function handleChangeStatus(formData: FormData) {
    'use server'
    const status = String(formData.get('status')) as 'HALL' | 'MAUQUF' | 'TERSELESAIKAN' | 'MUGHLAQ'
    const questionId = String(formData.get('questionId'))
    await updateQuestionStatus(questionId, status)
  }

  const timeAgo = new Date(data.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Back Button */}
      <div className="mb-2">
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

      {/* Question Header */}
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {data.title}
          </h1>
          <div className="shrink-0">
            <StatusBadge status={data.status} />
          </div>
        </div>
        
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
          <span>Ditanyakan pada <strong className="text-gray-750 dark:text-gray-300">{timeAgo}</strong></span>
          <span>·</span>
          <span>Dilihat <strong className="text-gray-750 dark:text-gray-300">{data.views || 0} kali</strong></span>
          <span>·</span>
          <span>Status: <strong className="text-primary-700 dark:text-primary-400">{data.status}</strong></span>
        </div>
      </div>

      {/* Main Question Column */}
      <div className="flex gap-4 sm:gap-6 items-start">
        {/* Voting System */}
        <VoteButtons
          targetId={data.id}
          targetType="QUESTION"
          upvotes={data.upvotes || 0}
          downvotes={data.downvotes || 0}
          isLoggedIn={isLoggedIn}
          currentSlug={slug}
          userVote={data.userVotes?.[data.id] || null}
        />

        {/* Question Text Content */}
        <div className="flex-1 min-w-0">
          <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-250 leading-relaxed text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800/80 p-5 rounded-lg">
            {data.content_text}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {data.question_tags?.map((qt: any) => (
              <span
                key={qt.tags?.id}
                className="px-2.5 py-0.5 rounded text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50"
              >
                {qt.tags?.name}
              </span>
            ))}
          </div>

          {/* Author info & metadata */}
          <div className="flex justify-end mt-4">
            <div className="bg-primary-50/30 dark:bg-primary-950/10 border border-primary-100/30 dark:border-primary-900/10 rounded-md p-3 w-52 text-xs flex gap-2">
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <span className="text-gray-450 dark:text-gray-400">penanya</span>
                <span className="font-semibold text-gray-900 dark:text-white truncate">
                  @{data.profiles?.username}
                </span>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-850 rounded border border-gray-150 dark:border-gray-850 px-1.5 py-0.5 justify-center w-14 shrink-0">
                <span className="font-bold text-secondary-dark text-xs leading-none">
                  🏆 {data.profiles?.reputation || 0}
                </span>
                <span className="text-[8px] text-gray-400">rep</span>
              </div>
            </div>
          </div>

          {/* Question Comments */}
          <div className="mt-6 border-t border-gray-100 dark:border-gray-900 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
              Komentar Diskusi
            </h4>
            <div className="space-y-3 pl-2 border-l-2 border-gray-200 dark:border-gray-800">
              {data.comments?.map((c: any) => (
                <div key={c.id} className="text-xs text-gray-700 dark:text-gray-350 py-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    @{c.profiles?.username}
                  </span>
                  :{' '}
                  <span>{c.content}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-2">
                    · {new Date(c.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              ))}
              
              {/* Write comment */}
              {isLoggedIn ? (
                <CommentForm targetId={data.id} targetType="QUESTION" />
              ) : (
                <Link
                  href={`/login?next=/questions/${slug}`}
                  className="text-xs text-primary-700 dark:text-primary-400 hover:underline inline-block mt-2 font-medium"
                >
                  Masuk untuk menulis komentar
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Moderation Controls (only for Muraqi/Mudir) */}
      {currentUser && (currentUser.role === 'MURAQI' || currentUser.role === 'MUDIR') && (
        <div className="card p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg mt-6">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Panel Moderasi (Muraqi)</h4>
          <form action={handleChangeStatus} className="flex items-center gap-2">
            <input type="hidden" name="questionId" value={data.id} />
            <select
              name="status"
              defaultValue={data.status}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm focus:outline-none"
            >
              <option value="HALL">HALL (Pembahasan)</option>
              <option value="MAUQUF">MAUQUF (Ditangguhkan)</option>
              <option value="TERSELESAIKAN">TERSELESAIKAN (Terjawab)</option>
              <option value="MUGHLAQ">MUGHLAQ (Ditutup)</option>
            </select>
            <button type="submit" className="btn btn-secondary px-4 py-1.5 text-sm">
              Ubah Status
            </button>
          </form>
        </div>
      )}

      {/* Answers Section */}
      <section className="mt-8 border-t border-gray-250 dark:border-gray-800/80 pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          {data.answers.length} Jawaban
        </h2>

        <div className="space-y-6">
          {data.answers.map((a: any) => {
            const answerTime = new Date(a.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })

            return (
              <div
                key={a.id}
                className={`flex gap-4 items-start p-6 rounded-xl border bg-white dark:bg-gray-900 transition-all duration-300 ${
                  a.is_accepted
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/5 dark:shadow-emerald-950/2 bg-emerald-50/5 dark:bg-emerald-950/5 ring-1 ring-emerald-500/20'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-305 dark:hover:border-gray-700'
                }`}
              >
                {/* Answer Votes */}
                <VoteButtons
                  targetId={a.id}
                  targetType="ANSWER"
                  upvotes={a.upvotes || 0}
                  downvotes={a.downvotes || 0}
                  isLoggedIn={isLoggedIn}
                  currentSlug={slug}
                  userVote={data.userVotes?.[a.id] || null}
                />

                {/* Answer Content */}
                <div className="flex-1 min-w-0">
                  {a.is_accepted && (
                    <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-extrabold mb-3 bg-emerald-100/60 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-250/50 dark:border-emerald-900/40">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Jawaban Terbaik (Dipilih Penanya)</span>
                    </div>
                  )}

                  <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    {a.content_text}
                  </div>

                  {/* References */}
                  {a.references && a.references.length > 0 && (
                    <div className="mt-4 bg-gray-50/50 dark:bg-gray-850/40 border border-gray-150 dark:border-gray-850 rounded-xl p-4 sm:p-5">
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <span>📜</span> Referensi Kitab Turats
                      </h4>
                      <div className="space-y-4">
                        {a.references.map((r: any) => (
                          <div key={r.id} className="text-xs border-b border-gray-150/40 dark:border-gray-800/30 pb-3 last:border-b-0 last:pb-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="font-bold text-primary-750 dark:text-primary-400 text-sm flex items-center gap-1">
                                <span>📖</span> {r.kitab_master?.nama_latin} <span className="font-normal text-gray-400">({r.kitab_master?.nama_arab})</span>
                              </div>
                              <span className={`inline-block text-[9px] uppercase font-extrabold tracking-wider rounded-md px-2 py-0.5 border ${
                                r.validation_status === 'VALID'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50'
                                  : r.validation_status === 'TIDAK_VALID'
                                  ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50'
                                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50'
                              }`}>
                                {r.validation_status === 'VALID' ? '✓ Valid' : r.validation_status === 'TIDAK_VALID' ? '✗ Tidak Valid' : '⏳ Pending'}
                              </span>
                            </div>
                            <div className="text-gray-450 dark:text-gray-555 mt-1 font-medium pl-5">
                              Karya: {r.kitab_master?.pengarang} {r.jilid ? `· Jilid: ${r.jilid}` : ''} {r.bab ? `· Bab: ${r.bab}` : ''} · Halaman: {r.halaman}
                            </div>
                            {r.teks_arab && (
                              <div className="text-right text-lg sm:text-xl font-serif font-bold text-gray-900 dark:text-white mt-3 mb-2 p-3 bg-amber-50/15 dark:bg-amber-950/5 border-r-4 border-amber-300 dark:border-amber-900 leading-loose rounded-l-md font-arabic" dir="rtl">
                                {r.teks_arab}
                              </div>
                            )}
                            {r.terjemah && (
                              <div className="text-gray-650 dark:text-gray-450 italic mt-1.5 pl-5 border-l-2 border-gray-205 dark:border-gray-800">
                                "{r.terjemah}"
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Answer Author metadata */}
                  <div className="flex justify-end mt-4">
                    <div className="bg-gray-50/50 dark:bg-gray-850/50 border border-gray-150 dark:border-gray-800 rounded-md p-2.5 w-48 text-xs flex gap-2">
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <span className="text-gray-450 dark:text-gray-555">menjawab · {answerTime}</span>
                        <span className="font-semibold text-gray-900 dark:text-white truncate">
                          @{a.profiles?.username}
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded border border-gray-150 dark:border-gray-800 px-1 py-0.5 justify-center w-12 shrink-0">
                        <span className="font-bold text-secondary-dark text-[11px] leading-none">
                          🏆 {a.profiles?.reputation || 0}
                        </span>
                        <span className="text-[7.5px] text-gray-400">rep</span>
                      </div>
                    </div>
                  </div>

                  {/* Answer Comments */}
                  <div className="mt-4 border-t border-gray-100 dark:border-gray-900 pt-3">
                    <div className="space-y-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                      {/* Comments placeholder */}
                      {/* Add comment inside Answers */}
                      {isLoggedIn ? (
                        <CommentForm targetId={a.id} targetType="ANSWER" />
                      ) : (
                        <Link
                          href={`/login?next=/questions/${slug}`}
                          className="text-[11px] text-primary-700 dark:text-primary-400 hover:underline inline-block mt-1"
                        >
                          Masuk untuk menulis komentar
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Answer Submission Section */}
      <section className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
        {isLoggedIn ? (
          <AnswerForm questionId={data.id} />
        ) : (
          <div className="card p-6 text-center border-dashed border-2 border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
              Ingin berkontribusi jawaban ilmiah?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Silakan masuk atau daftar akun baru untuk memposting jawaban Anda.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href={`/login?next=/questions/${slug}`} className="btn btn-primary text-sm px-5 py-2">
                Masuk
              </Link>
              <Link href="/register" className="btn btn-secondary text-sm px-5 py-2">
                Daftar
              </Link>
            </div>
          </div>
        )}
      </section>

    </div>
  )
}
