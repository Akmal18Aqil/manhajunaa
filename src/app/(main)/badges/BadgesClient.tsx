'use client'

import React, { useState, useMemo } from 'react'

interface Badge {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  tier: 'GOLD' | 'SILVER' | 'BRONZE'
  criteria: any
  display_order: number | null
}

interface BadgesClientProps {
  initialBadges: Badge[]
}

export default function BadgesClient({ initialBadges }: BadgesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<'ALL' | 'GOLD' | 'SILVER' | 'BRONZE'>('ALL')

  // Filter badges by search query and tier
  const filteredBadges = useMemo(() => {
    return initialBadges.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTier = selectedTier === 'ALL' || b.tier === selectedTier

      return matchesSearch && matchesTier
    })
  }, [initialBadges, searchQuery, selectedTier])

  // Split badges into tiers for display
  const goldBadges = useMemo(() => filteredBadges.filter((b) => b.tier === 'GOLD'), [filteredBadges])
  const silverBadges = useMemo(() => filteredBadges.filter((b) => b.tier === 'SILVER'), [filteredBadges])
  const bronzeBadges = useMemo(() => filteredBadges.filter((b) => b.tier === 'BRONZE'), [filteredBadges])

  // Helper function to format criteria
  const formatCriteria = (criteria: any) => {
    if (!criteria) return '-'
    const type = criteria.type
    switch (type) {
      case 'first_question':
        return 'Mengajukan pertanyaan pertama kali'
      case 'first_answer':
        return 'Memberikan jawaban pertama kali'
      case 'first_reference':
        return 'Menambahkan referensi kitab kuning pertama kali'
      case 'upvotes':
        return `Menerima minimal ${criteria.count || 0} upvotes total`
      case 'validated_references':
        return `Memiliki ${criteria.count || 0} referensi divalidasi oleh Muraqi`
      case 'best_answers':
        return `Memiliki ${criteria.count || 0} jawaban terpilih sebagai terbaik`
      case 'reputation':
        return `Mencapai reputasi minimal ${criteria.min || 0} poin`
      default:
        return 'Kriteria kontribusi ilmiah'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-primary-700 dark:text-primary-400">🏅</span> Lencana & Pencapaian
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Lencana diberikan secara otomatis kepada anggota berdasarkan reputasi dan kualitas kontribusi ilmiahnya.
          </p>
        </div>
      </div>

      {/* Regulasi Lencana */}
      <div className="card p-5 bg-gradient-to-br from-primary-50/50 to-amber-50/20 dark:from-primary-950/5 dark:to-amber-950/2 border border-primary-100/50 dark:border-primary-900/30 rounded-xl space-y-3 shadow-sm">
        <h2 className="text-sm font-bold text-primary-850 dark:text-primary-450 flex items-center gap-2 uppercase tracking-wider">
          <span>📜</span> Regulasi & Ketentuan Lencana
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-650 dark:text-gray-450 leading-relaxed">
          <div className="space-y-1.5 p-3 bg-white/60 dark:bg-gray-950/20 rounded-lg border border-gray-150/40 dark:border-gray-850/40">
            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
              <span>🥇</span> Tier Emas (Gold)
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-normal">
              Diberikan khusus untuk pencapaian akademik & kontribusi mu'tabar tertinggi (Reputasi ≥ 5000, 25+ jawaban terbaik, atau 50+ referensi valid).
            </p>
          </div>
          <div className="space-y-1.5 p-3 bg-white/60 dark:bg-gray-950/20 rounded-lg border border-gray-150/40 dark:border-gray-850/40">
            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
              <span>🥈</span> Tier Perak (Silver)
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-normal">
              Diberikan kepada kontributor menengah yang aktif (100+ upvotes total, 5+ jawaban terbaik, atau 10+ referensi tervalidasi oleh Muraqi).
            </p>
          </div>
          <div className="space-y-1.5 p-3 bg-white/60 dark:bg-gray-950/20 rounded-lg border border-gray-150/40 dark:border-gray-850/40">
            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
              <span>🥉</span> Tier Perunggu (Bronze)
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-normal">
              Diberikan untuk penanda aktivitas awal (membuat pertanyaan pertama, jawaban pertama, referensi pertama, atau mendapat 10+ upvotes).
            </p>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 italic mt-1 font-medium">
          * Catatan: Lencana dievaluasi secara otomatis oleh sistem. Lencana yang didapat melalui kecurangan atau manipulasi suara akan dicabut oleh Muraqi/Mudir.
        </p>
      </div>

      {/* Stats Summary & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setSelectedTier('GOLD')}
          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
            selectedTier === 'GOLD'
              ? 'bg-yellow-500/10 border-yellow-500 text-yellow-800 dark:text-yellow-400 shadow-sm'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-yellow-400/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🥇</span>
            <div className="text-left">
              <div className="font-bold text-sm">Lencana Emas</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500">Pencapaian Tertinggi</div>
            </div>
          </div>
          <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
            {initialBadges.filter((b) => b.tier === 'GOLD').length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTier('SILVER')}
          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
            selectedTier === 'SILVER'
              ? 'bg-slate-500/10 border-slate-500 text-slate-800 dark:text-slate-400 shadow-sm'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-slate-400/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🥈</span>
            <div className="text-left">
              <div className="font-bold text-sm">Lencana Perak</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500">Kontributor Menengah</div>
            </div>
          </div>
          <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
            {initialBadges.filter((b) => b.tier === 'SILVER').length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTier('BRONZE')}
          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
            selectedTier === 'BRONZE'
              ? 'bg-amber-700/10 border-amber-600 text-amber-800 dark:text-amber-400 shadow-sm'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-amber-500/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🥉</span>
            <div className="text-left">
              <div className="font-bold text-sm">Lencana Perunggu</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500">Aktivitas & Memulai</div>
            </div>
          </div>
          <span className="text-lg font-bold text-amber-700 dark:text-amber-500">
            {initialBadges.filter((b) => b.tier === 'BRONZE').length}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200/60 dark:border-gray-800/80">
        <div className="relative flex-1">
          <input
            id="badge-search-input"
            type="text"
            placeholder="Cari lencana berdasarkan nama or deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>
        <div className="w-full sm:w-48">
          <select
            id="tier-filter-select"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value as any)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 transition-all text-gray-700 dark:text-gray-300"
          >
            <option value="ALL">Semua Tier</option>
            <option value="GOLD">🥇 Emas</option>
            <option value="SILVER">🥈 Perak</option>
            <option value="BRONZE">🥉 Perunggu</option>
          </select>
        </div>
      </div>

      {/* Badges Sections */}
      <div className="space-y-10">
        {/* Gold Badges */}
        {(selectedTier === 'ALL' || selectedTier === 'GOLD') && goldBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <span>🥇</span> Lencana Emas (Gold Tier)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {goldBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="card p-5 bg-white dark:bg-gray-900 border border-yellow-300/40 dark:border-yellow-900/30 rounded-xl hover:shadow-lg dark:hover:shadow-yellow-950/20 hover:border-yellow-400 transition-all flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-3xl shrink-0">
                    {badge.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-yellow-950 dark:text-yellow-300 line-clamp-1">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {badge.description}
                    </p>
                    <div className="pt-2 text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                      kriteria: {formatCriteria(badge.criteria)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Silver Badges */}
        {(selectedTier === 'ALL' || selectedTier === 'SILVER') && silverBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <span>🥈</span> Lencana Perak (Silver Tier)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {silverBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="card p-5 bg-white dark:bg-gray-900 border border-slate-300/40 dark:border-slate-800 rounded-xl hover:shadow-lg dark:hover:shadow-slate-950/20 hover:border-slate-400 transition-all flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="absolute right-0 top-0 w-24 h-24 bg-slate-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                  <div className="w-12 h-12 rounded-lg bg-slate-500/10 flex items-center justify-center text-3xl shrink-0">
                    {badge.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-300 line-clamp-1">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {badge.description}
                    </p>
                    <div className="pt-2 text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                      kriteria: {formatCriteria(badge.criteria)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bronze Badges */}
        {(selectedTier === 'ALL' || selectedTier === 'BRONZE') && bronzeBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-700 dark:text-amber-500 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <span>🥉</span> Lencana Perunggu (Bronze Tier)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bronzeBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="card p-5 bg-white dark:bg-gray-900 border border-amber-500/20 dark:border-amber-950/20 rounded-xl hover:shadow-lg dark:hover:shadow-amber-950/20 hover:border-amber-600 transition-all flex items-start gap-4 relative overflow-hidden group"
                >
                  <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform"></div>
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-3xl shrink-0">
                    {badge.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-amber-800 dark:text-amber-400 line-clamp-1">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {badge.description}
                    </p>
                    <div className="pt-2 text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                      kriteria: {formatCriteria(badge.criteria)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredBadges.length === 0 && (
          <div className="py-16 text-center text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <span className="text-4xl block mb-2">🏅</span>
            <div className="font-semibold text-lg">Lencana tidak ditemukan</div>
            <p className="text-sm text-gray-400 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTier('ALL')
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-primary-700 hover:bg-primary-850 text-white rounded-lg shadow transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
