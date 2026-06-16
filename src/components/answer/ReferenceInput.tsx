'use client'

import React from 'react'

export interface ReferenceData {
  kitabId: string
  jilid?: string
  bab?: string
  halaman: string
  teksArab?: string
  terjemah?: string
  catatan?: string
}

interface ReferenceInputProps {
  index: number
  reference: ReferenceData
  kitabList: Array<{ id: string, nama_arab: string, nama_latin: string, pengarang: string }>
  onChange: (index: number, field: keyof ReferenceData, value: string) => void
  onRemove: (index: number) => void
}

export default function ReferenceInput({ index, reference, kitabList, onChange, onRemove }: ReferenceInputProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 shadow-sm relative transition-all hover:shadow-md border-l-4 border-l-secondary-light dark:border-l-secondary-dark">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Referensi #{index + 1}
        </h5>
        <button 
          type="button" 
          onClick={() => onRemove(index)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          title="Hapus Referensi"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Kitab Utama <span className="text-red-500">*</span></label>
          <select 
            value={reference.kitabId}
            onChange={(e) => onChange(index, 'kitabId', e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-sm"
            required
          >
            <option value="">Pilih Kitab Turats dari direktori...</option>
            {kitabList.map(kitab => (
              <option key={kitab.id} value={kitab.id}>
                {kitab.nama_latin} ({kitab.nama_arab}) - {kitab.pengarang}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Jilid</label>
            <input 
              type="text" 
              value={reference.jilid || ''}
              onChange={(e) => onChange(index, 'jilid', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-sm"
              placeholder="Contoh: 1"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Bab</label>
            <input 
              type="text" 
              value={reference.bab || ''}
              onChange={(e) => onChange(index, 'bab', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-sm"
              placeholder="Contoh: Puasa"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Halaman <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              value={reference.halaman || ''}
              onChange={(e) => onChange(index, 'halaman', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-sm"
              placeholder="Contoh: 180"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Ibarat (Teks Arab Asli)</label>
          <textarea 
            dir="rtl"
            value={reference.teksArab || ''}
            onChange={(e) => onChange(index, 'teksArab', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-amber-50/30 dark:bg-amber-900/10 font-arabic text-xl leading-loose focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-inner placeholder-gray-400"
            placeholder="نص العبارة من الكتاب..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Terjemah / Pemahaman</label>
          <textarea 
            value={reference.terjemah || ''}
            onChange={(e) => onChange(index, 'terjemah', e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors shadow-sm"
            placeholder="Tuliskan terjemahan atau poin penting dari ibarat di atas..."
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
