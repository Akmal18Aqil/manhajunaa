'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

interface Kitab {
  id: string
  nama_arab: string
  nama_latin: string
  pengarang: string
  bidang: string | null
  penerbit: string | null
  tahun_cetak: string | null
  deskripsi: string | null
  cover_url: string | null
}

interface KitabClientProps {
  initialKitabs: Kitab[]
}

export default function KitabClient({ initialKitabs }: KitabClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBidang, setSelectedBidang] = useState('ALL')

  // Get unique categories (bidang) for filtering
  const categories = useMemo(() => {
    const set = new Set<string>()
    initialKitabs.forEach((k) => {
      if (k.bidang) set.add(k.bidang)
    })
    return ['ALL', ...Array.from(set).sort()]
  }, [initialKitabs])

  // Filter kitabs by search and category
  const filteredKitabs = useMemo(() => {
    return initialKitabs.filter((k) => {
      const matchesSearch =
        k.nama_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        k.nama_arab.includes(searchQuery) ||
        k.pengarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (k.deskripsi && k.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesBidang = selectedBidang === 'ALL' || k.bidang === selectedBidang

      return matchesSearch && matchesBidang
    })
  }, [initialKitabs, searchQuery, selectedBidang])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-primary-700 dark:text-primary-400">📚</span> Perpustakaan Kitab Kuning
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Daftar kitab-kitab muktabar yang dijadikan rujukan dan referensi fatwa/jawaban ilmiah di Manhajuna.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200/60 dark:border-gray-800/80">
        <div className="relative flex-1">
          <input
            id="kitab-search-input"
            type="text"
            placeholder="Cari judul kitab, pengarang, or deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <span className="absolute left-3 top-3.5 text-gray-400 text-sm">🔍</span>
        </div>
        <div className="w-full sm:w-48">
          <select
            id="bidang-filter-select"
            value={selectedBidang}
            onChange={(e) => setSelectedBidang(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 transition-all text-gray-700 dark:text-gray-300"
          >
            <option value="ALL">Semua Bidang</option>
            {categories.filter(c => c !== 'ALL').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Books */}
      {filteredKitabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKitabs.map((kitab) => (
            <div
              key={kitab.id}
              className="card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary-500/20 transition-all flex flex-col h-full group"
            >
              {/* Decorative Cover Section */}
              <div className="h-44 bg-gradient-to-br from-emerald-800 to-emerald-950 dark:from-emerald-900 dark:to-gray-950 p-4 flex flex-col justify-between relative overflow-hidden border-b border-gray-150 dark:border-gray-800">
                {/* Book design elements */}
                <div className="absolute right-0 top-0 w-32 h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-yellow-500 to-transparent pointer-events-none"></div>
                <div className="absolute left-2 top-0 bottom-0 w-1 bg-yellow-600/30"></div>
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-yellow-600/20"></div>

                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-semibold px-2 py-0.5 rounded bg-emerald-900/50 border border-emerald-700/30">
                    {kitab.bidang || 'Lainnya'}
                  </span>
                  <span className="text-[10px] text-yellow-400 font-serif">
                    {kitab.tahun_cetak || '-'}
                  </span>
                </div>

                <div className="text-center my-auto z-10 flex flex-col justify-center items-center py-2">
                  <h3 className="font-serif text-2xl text-yellow-100 font-bold leading-relaxed tracking-wide drop-shadow-sm line-clamp-1">
                    {kitab.nama_arab}
                  </h3>
                  <p className="text-sm font-semibold text-white/95 mt-1 tracking-wide line-clamp-1">
                    {kitab.nama_latin}
                  </p>
                </div>

                <div className="text-center z-10 mt-auto">
                  <span className="text-xs text-emerald-200/90 italic line-clamp-1">
                    Karya: {kitab.pengarang}
                  </span>
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <div>
                      <span className="font-medium">Penerbit:</span> {kitab.penerbit || '-'}
                    </div>
                    <div>
                      <span className="font-medium">Tahun:</span> {kitab.tahun_cetak || '-'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-4 leading-relaxed">
                    {kitab.deskripsi || 'Tidak ada deskripsi tambahan mengenai kitab ini.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center mt-auto">
                  <span className="inline-block text-[10px] font-semibold text-gray-400">
                    ID RUJUKAN: {kitab.nama_latin.replace(/\s+/g, '-').toLowerCase()}
                  </span>
                  <Link
                    href={`/questions?kitab=${kitab.id}`}
                    className="text-xs font-semibold text-primary-700 dark:text-primary-400 hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    Cari Fatwa &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 bg-white dark:bg-gray-900 border border-gray-250 dark:border-gray-800/80 rounded-xl">
          <span className="text-4xl block mb-2">📚</span>
          <div className="font-semibold text-lg">Kitab tidak ditemukan</div>
          <p className="text-sm text-gray-400 mt-1">Coba sesuaikan kata kunci atau bersihkan filter pencarian.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedBidang('ALL')
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-primary-700 hover:bg-primary-850 text-white rounded-lg shadow transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  )
}
