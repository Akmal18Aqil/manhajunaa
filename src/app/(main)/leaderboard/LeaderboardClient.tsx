'use client'

import React, { useState, useMemo } from 'react'

interface Profile {
  id: string
  username: string
  display_name: string | null
  role: 'ZAIR' | 'THALIB' | 'MUJIB' | 'MURAQI' | 'MUDIR' | null
  reputation: number | null
  level: number | null
  avatar_url: string | null
  is_verified: boolean | null
  gelar: string | null
}

interface LeaderboardClientProps {
  initialProfiles: Profile[]
}

export default function LeaderboardClient({ initialProfiles }: LeaderboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter profiles based on search
  const filteredProfiles = useMemo(() => {
    return initialProfiles.filter((p) => {
      const name = p.display_name || ''
      const username = p.username || ''
      const query = searchQuery.toLowerCase()
      return (
        name.toLowerCase().includes(query) ||
        username.toLowerCase().includes(query) ||
        (p.gelar && p.gelar.toLowerCase().includes(query))
      )
    })
  }, [initialProfiles, searchQuery])

  // Split top 3 and the rest (only when not searching for specific user)
  const isSearchActive = searchQuery.trim().length > 0

  const { topThree, remaining } = useMemo(() => {
    if (isSearchActive) {
      return { topThree: [], remaining: filteredProfiles }
    }
    return {
      topThree: filteredProfiles.slice(0, 3),
      remaining: filteredProfiles.slice(3),
    }
  }, [filteredProfiles, isSearchActive])

  // Role style mapping
  const getRoleBadge = (role: Profile['role']) => {
    switch (role) {
      case 'MUDIR':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/50">
            🕌 Mudir (Admin)
          </span>
        )
      case 'MURAQI':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            🛡️ Muraqi (Mod)
          </span>
        )
      case 'MUJIB':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            ✍️ Mujib (Ahli)
          </span>
        )
      case 'THALIB':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            📚 Thalib (Siswa)
          </span>
        )
      case 'ZAIR':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-50 dark:bg-gray-900/20 text-gray-500 dark:text-gray-400 border border-gray-150 dark:border-gray-800">
            👤 Zair (Tamu)
          </span>
        )
    }
  }

  // Get rank suffix/icon
  const getRankIndicator = (index: number) => {
    if (index === 0) return <span className="text-2xl">🥇</span>
    if (index === 1) return <span className="text-2xl">🥈</span>
    if (index === 2) return <span className="text-2xl">🥉</span>
    return <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-primary-700 dark:text-primary-400">🏆</span> Klasemen Reputasi
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Daftar asatidzah dan santri dengan kontribusi keilmuan serta rujukan fatwa terbaik di platform Manhajuna.
          </p>
        </div>
        <div className="relative max-w-xs w-full">
          <input
            id="user-search-input"
            type="text"
            placeholder="Cari nama atau username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      {/* Top 3 Podium (Only visible if search is not active) */}
      {!isSearchActive && topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 pb-2">
          {/* Rank 2 (Silver) */}
          {topThree[1] && (
            <div className="order-2 md:order-1 card bg-gradient-to-b from-slate-500/5 to-white dark:from-slate-500/5 dark:to-gray-900 p-6 border border-slate-300/40 dark:border-slate-800 rounded-2xl flex flex-col items-center text-center shadow-sm relative overflow-hidden group hover:shadow-md transition-all h-[240px] justify-center">
              <span className="absolute top-3 right-4 text-xs font-bold text-slate-400">Peringkat 2</span>
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-400 flex items-center justify-center text-2xl font-bold text-slate-500 mb-3 shrink-0 relative">
                🥈
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-500 text-white text-[10px] flex items-center justify-center font-bold">
                  Lvl {topThree[1].level || 1}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-gray-950 dark:text-gray-100 flex items-center justify-center gap-1">
                  {topThree[1].gelar && <span className="text-xs text-primary-700 font-serif font-semibold">{topThree[1].gelar}.</span>}
                  {topThree[1].display_name}
                </h3>
                <p className="text-xs text-gray-400">@{topThree[1].username}</p>
                <div className="pt-2">{getRoleBadge(topThree[1].role)}</div>
              </div>
              <div className="mt-4 font-bold text-lg text-slate-600 dark:text-slate-400">
                🏆 {topThree[1].reputation || 0} <span className="text-xs font-normal text-gray-400">reputasi</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold) */}
          {topThree[0] && (
            <div className="order-1 md:order-2 card bg-gradient-to-b from-yellow-500/10 to-white dark:from-yellow-500/10 dark:to-gray-900 p-6 border-2 border-yellow-400 dark:border-yellow-900/60 rounded-2xl flex flex-col items-center text-center shadow-md relative overflow-hidden group hover:shadow-lg transition-all h-[270px] justify-center scale-105">
              <span className="absolute top-3 right-4 text-xs font-bold text-yellow-600 dark:text-yellow-400">Peringkat 1</span>
              <div className="w-20 h-20 rounded-full bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-400 flex items-center justify-center text-3xl font-bold text-yellow-600 mb-3 shrink-0 relative shadow-sm">
                🥇
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-yellow-500 text-white text-[10px] flex items-center justify-center font-bold">
                  Lvl {topThree[0].level || 1}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-gray-950 dark:text-gray-100 flex items-center justify-center gap-1">
                  {topThree[0].gelar && <span className="text-xs text-primary-700 font-serif font-semibold">{topThree[0].gelar}.</span>}
                  {topThree[0].display_name}
                </h3>
                <p className="text-xs text-gray-400">@{topThree[0].username}</p>
                <div className="pt-2">{getRoleBadge(topThree[0].role)}</div>
              </div>
              <div className="mt-4 font-extrabold text-xl text-yellow-600 dark:text-yellow-400">
                🏆 {topThree[0].reputation || 0} <span className="text-xs font-normal text-gray-400">reputasi</span>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {topThree[2] && (
            <div className="order-3 md:order-3 card bg-gradient-to-b from-amber-700/5 to-white dark:from-amber-700/5 dark:to-gray-900 p-6 border border-amber-600/30 dark:border-amber-950/30 rounded-2xl flex flex-col items-center text-center shadow-sm relative overflow-hidden group hover:shadow-md transition-all h-[240px] justify-center">
              <span className="absolute top-3 right-4 text-xs font-bold text-amber-600">Peringkat 3</span>
              <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-600/60 flex items-center justify-center text-2xl font-bold text-amber-700 mb-3 shrink-0 relative">
                🥉
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                  Lvl {topThree[2].level || 1}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-gray-950 dark:text-gray-100 flex items-center justify-center gap-1">
                  {topThree[2].gelar && <span className="text-xs text-primary-700 font-serif font-semibold">{topThree[2].gelar}.</span>}
                  {topThree[2].display_name}
                </h3>
                <p className="text-xs text-gray-400">@{topThree[2].username}</p>
                <div className="pt-2">{getRoleBadge(topThree[2].role)}</div>
              </div>
              <div className="mt-4 font-bold text-lg text-amber-700 dark:text-amber-500">
                🏆 {topThree[2].reputation || 0} <span className="text-xs font-normal text-gray-400">reputasi</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Ranks list */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20">
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {isSearchActive ? 'Hasil Pencarian Anggota' : 'Daftar Kontributor Terpopuler'}
          </h2>
        </div>

        {filteredProfiles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left">
              <thead>
                <tr className="bg-gray-50/20 dark:bg-gray-950/10 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5 w-16">Peringkat</th>
                  <th className="px-6 py-3.5">Anggota</th>
                  <th className="px-6 py-3.5">Peran</th>
                  <th className="px-6 py-3.5 text-center w-24">Level</th>
                  <th className="px-6 py-3.5 text-right w-36">Reputasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900 text-sm">
                {(isSearchActive ? filteredProfiles : remaining).map((profile, index) => {
                  const actualRank = isSearchActive ? index : index + 3
                  return (
                    <tr
                      key={profile.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-950/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {getRankIndicator(actualRank)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950/10 border border-primary-100 dark:border-primary-900/30 flex items-center justify-center font-bold text-primary-700 dark:text-primary-400 shrink-0">
                            {profile.display_name ? profile.display_name.charAt(0).toUpperCase() : '👤'}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                              {profile.gelar && <span className="text-xs text-primary-700 font-serif font-semibold">{profile.gelar}.</span>}
                              {profile.display_name || 'Anggota'}
                              {profile.is_verified && (
                                <span className="text-[10px] text-blue-500" title="Terverifikasi">✔️</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400">@{profile.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(profile.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-gray-700 dark:text-gray-300">
                        {profile.level || 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-extrabold text-primary-700 dark:text-primary-400">
                        🏆 {profile.reputation || 0}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500">
            <span className="text-3xl block mb-2">👤</span>
            <div className="font-semibold">Anggota tidak ditemukan</div>
            <p className="text-xs text-gray-400 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
