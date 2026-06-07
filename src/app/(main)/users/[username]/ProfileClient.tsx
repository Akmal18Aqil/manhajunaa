'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateProfile, changePassword } from '@/lib/actions/profile.actions'
import StatusBadge from '@/components/question/StatusBadge'

interface Badge {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  tier: 'GOLD' | 'SILVER' | 'BRONZE'
}

interface Profile {
  id: string
  username: string
  display_name: string | null
  gelar: string | null
  kunyah: string | null
  show_gelar: boolean
  show_kunyah: boolean
  bio: string | null
  avatar_url: string | null
  role: string | null
  reputation: number
  level: number
  email_notifications: boolean
  created_at: string
}

interface ProfileClientProps {
  profile: Profile
  badges: Array<{ earned_at: string; badges: Badge | null }>
  questions: any[]
  answers: any[]
  isOwner: boolean
}

export default function ProfileClient({
  profile,
  badges,
  questions,
  answers,
  isOwner,
}: ProfileClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'edit' | 'security'>('profile')
  
  // Profile edit states
  const [displayName, setDisplayName] = useState(profile.display_name || '')
  const [bio, setBio] = useState(profile.bio || '')
  const [kunyah, setKunyah] = useState(profile.kunyah || '')
  const [gelar, setGelar] = useState(profile.gelar || '')
  const [showGelar, setShowGelar] = useState(profile.show_gelar)
  const [showKunyah, setShowKunyah] = useState(profile.show_kunyah)
  const [emailNotifications, setEmailNotifications] = useState(profile.email_notifications)
  
  // Security states
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // UI state feedback
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Badge tier counts
  const goldCount = badges.filter((b) => b.badges?.tier === 'GOLD').length
  const silverCount = badges.filter((b) => b.badges?.tier === 'SILVER').length
  const bronzeCount = badges.filter((b) => b.badges?.tier === 'BRONZE').length

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      await updateProfile({
        displayName: displayName.trim() || undefined,
        bio: bio.trim() || undefined,
        gelar: gelar.trim() || undefined,
        kunyah: kunyah.trim() || undefined,
        showGelar,
        showKunyah,
        emailNotifications,
      })
      setSuccessMsg('Profil Anda berhasil diperbarui.')
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err?.message || 'Gagal memperbarui profil.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.')
      return
    }

    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      await changePassword(password)
      setSuccessMsg('Kata sandi berhasil diperbarui.')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setErrorMsg(err?.message || 'Gagal memperbarui kata sandi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Main Credentials */}
      <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-250 dark:border-gray-800 rounded-xl relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
        {/* Glassmorphic decorative glow */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-primary-700/5 dark:bg-primary-500/5 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white font-extrabold text-3xl flex items-center justify-center border-4 border-gray-100 dark:border-gray-800 shadow-md shrink-0">
          {profile.username?.[0]?.toUpperCase() || 'U'}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left space-y-3 min-w-0">
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {profile.display_name || profile.username}
              </h1>
              {profile.show_kunyah && profile.kunyah && (
                <span className="text-sm font-semibold text-primary-750 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20 border border-primary-150 dark:border-primary-900/50 px-2.5 py-0.5 rounded-full">
                  Abu {profile.kunyah}
                </span>
              )}
              {profile.show_gelar && profile.gelar && (
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 px-2 py-0.5 rounded-md">
                  🎓 {profile.gelar}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              @{profile.username} · Anggota sejak {new Date(profile.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-semibold">
            {/* Reputation */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-850 border border-gray-150 dark:border-gray-800">
              <span className="text-amber-500 text-base">🏆</span>
              <div>
                <span className="text-gray-900 dark:text-white font-extrabold">{profile.reputation}</span>
                <span className="text-gray-400 dark:text-gray-500 font-medium ml-1">reputasi</span>
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-850 border border-gray-150 dark:border-gray-800">
              <span className="text-emerald-500 text-base">📈</span>
              <div>
                <span className="text-gray-900 dark:text-white font-extrabold">Level {profile.level}</span>
                <span className="text-gray-400 dark:text-gray-500 font-medium ml-1">pesantren</span>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-850 border border-gray-150 dark:border-gray-800">
              <span className="text-primary-700 dark:text-primary-400 text-base">👤</span>
              <div>
                <span className="text-gray-900 dark:text-white font-extrabold uppercase tracking-wide text-[10px]">{profile.role || 'THALIB'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 gap-1 overflow-x-auto pb-px">
        <button
          onClick={() => { setActiveTab('profile'); setErrorMsg(null); setSuccessMsg(null); }}
          className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'profile'
              ? 'border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-450'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          👤 Ringkasan Profil
        </button>
        {isOwner && (
          <>
            <button
              onClick={() => { setActiveTab('edit'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'edit'
                  ? 'border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-450'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              📝 Edit Profil
            </button>
            <button
              onClick={() => { setActiveTab('security'); setErrorMsg(null); setSuccessMsg(null); }}
              className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'security'
                  ? 'border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-450'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              🔒 Keamanan & Akun
            </button>
          </>
        )}
      </div>

      {/* Success & Error alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-250 text-sm text-emerald-800 rounded-lg dark:bg-emerald-950/20 dark:border-emerald-900/50">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-650 rounded-lg dark:bg-red-950/20 dark:border-red-900/50">
          {errorMsg}
        </div>
      )}

      {/* Tab Contents */}
      <div className="space-y-6">
        
        {/* PROFILE OVERVIEW TAB */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar: Bio & Badges */}
            <div className="space-y-6 lg:col-span-1">
              {/* Badges card */}
              <div className="card p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Lencana Prestasi</h3>
                <div className="flex gap-4 justify-around py-1.5 border-b border-gray-100 dark:border-gray-800">
                  <div className="text-center">
                    <span className="text-2xl block">🥇</span>
                    <span className="font-extrabold text-sm text-yellow-600">{goldCount}</span>
                    <span className="text-[10px] text-gray-400 block font-bold">EMAS</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl block">🥈</span>
                    <span className="font-extrabold text-sm text-slate-500">{silverCount}</span>
                    <span className="text-[10px] text-gray-400 block font-bold">PERAK</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl block">🥉</span>
                    <span className="font-extrabold text-sm text-amber-700">{bronzeCount}</span>
                    <span className="text-[10px] text-gray-400 block font-bold">PERUNGGU</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {badges.length === 0 ? (
                    <span className="text-xs text-gray-450 italic">Belum ada lencana yang diperoleh.</span>
                  ) : (
                    badges.map((b, idx) => {
                      const badge = b.badges
                      if (!badge) return null
                      return (
                        <div key={idx} className="flex items-center gap-2 p-1.5 bg-gray-50/50 dark:bg-gray-850/30 rounded border border-gray-150/50 dark:border-gray-850 text-xs">
                          <span className="text-lg">{badge.icon}</span>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-800 dark:text-gray-250 truncate">{badge.name}</div>
                            <div className="text-[10px] text-gray-450 truncate">{badge.description}</div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Biography card */}
              <div className="card p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Tentang Saya (Bio)</h3>
                <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {profile.bio || `${profile.display_name || profile.username} belum menuliskan biografi singkat.`}
                </p>
              </div>
            </div>

            {/* Right main column: Questions & Answers activities */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Questions asked by user */}
              <div className="card p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>❓</span> Pertanyaan ({questions.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1 divide-y divide-gray-100 dark:divide-gray-800/50">
                  {questions.length === 0 ? (
                    <div className="text-center py-8 text-gray-450 italic text-sm">Belum ada pertanyaan yang diajukan.</div>
                  ) : (
                    questions.map((q) => {
                      const netScore = (q.upvotes || 0) - (q.downvotes || 0)
                      return (
                        <div key={q.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs sm:text-sm">
                          <div className="min-w-0 flex-1 space-y-1">
                            <Link href={`/questions/${q.slug}`} className="font-bold text-gray-850 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 transition-colors leading-snug truncate block">
                              {q.title}
                            </Link>
                            <span className="text-[10px] text-gray-400">
                              ditanyakan pada {new Date(q.created_at).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Score badge */}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${netScore > 0 ? 'bg-emerald-50 text-emerald-700' : netScore < 0 ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`}>
                              {netScore} vote
                            </span>
                            {/* Answers badge */}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.total_answers > 0 ? 'bg-primary-50 text-primary-700 border border-primary-100' : 'bg-gray-50 text-gray-550'}`}>
                              {q.total_answers} jawaban
                            </span>
                            <StatusBadge status={q.status} />
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Answers posted by user */}
              <div className="card p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>💬</span> Jawaban ({answers.length})
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1 divide-y divide-gray-100 dark:divide-gray-800/50">
                  {answers.length === 0 ? (
                    <div className="text-center py-8 text-gray-450 italic text-sm">Belum ada jawaban yang diposting.</div>
                  ) : (
                    answers.map((a) => (
                      <div key={a.id} className="pt-3.5 first:pt-0 space-y-1.5 text-xs sm:text-sm">
                        <div className="flex items-start justify-between gap-3">
                          <Link href={`/questions/${a.questions?.slug}`} className="font-bold text-primary-750 dark:text-primary-400 hover:underline leading-snug line-clamp-1">
                            Re: {a.questions?.title}
                          </Link>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            dijawab {new Date(a.created_at).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed bg-gray-50/50 dark:bg-gray-850/20 p-2.5 rounded border border-gray-150/50 dark:border-gray-850/20">
                          {a.content_text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* EDIT PROFILE TAB */}
        {isOwner && activeTab === 'edit' && (
          <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm max-w-3xl mx-auto">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Tampilan</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Contoh: Muhammad Akhyar"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>

                {/* Email Notifications */}
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="emailNotifications" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                    Terima Notifikasi Email
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kunyah */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Gelar Kunyah (Panggilan Arab)</label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs dark:bg-gray-800 dark:border-gray-700">Abu</span>
                    <input
                      type="text"
                      value={kunyah}
                      onChange={(e) => setKunyah(e.target.value)}
                      placeholder="Fulan"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1.5">
                    <input
                      type="checkbox"
                      id="showKunyah"
                      checked={showKunyah}
                      onChange={(e) => setShowKunyah(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="showKunyah" className="text-[10px] font-bold text-gray-450 dark:text-gray-400 uppercase tracking-wider cursor-pointer">
                      Tampilkan di samping nama utama
                    </label>
                  </div>
                </div>

                {/* Gelar Akademik */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Gelar Keilmuan / Gelar Sosial</label>
                  <input
                    type="text"
                    value={gelar}
                    onChange={(e) => setGelar(e.target.value)}
                    placeholder="Contoh: Lc., M.A. atau Ustadz"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-sm"
                  />
                  <div className="flex items-center gap-2 pt-1.5">
                    <input
                      type="checkbox"
                      id="showGelar"
                      checked={showGelar}
                      onChange={(e) => setShowGelar(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="showGelar" className="text-[10px] font-bold text-gray-450 dark:text-gray-400 uppercase tracking-wider cursor-pointer">
                      Tampilkan gelar keilmuan secara publik
                    </label>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Biografi Singkat (Profil Singkat)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tuliskan latar belakang pendidikan, kajian keilmuan, atau keterangan profil lainnya..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary px-6 py-2.5 text-sm font-semibold shadow-sm"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SECURITY TAB */}
        {isOwner && activeTab === 'security' && (
          <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm max-w-xl mx-auto">
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Perbarui Kata Sandi</h3>
              
              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Kata Sandi Baru</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter..."
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru..."
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword}
                  className="btn btn-primary px-6 py-2.5 text-sm font-semibold shadow-sm"
                >
                  {loading ? 'Mengupdate...' : 'Perbarui Kata Sandi'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

    </div>
  )
}
