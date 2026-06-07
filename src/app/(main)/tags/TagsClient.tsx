'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

interface Tag {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  icon: string | null
  parent_id: string | null
  question_count: number
}

interface TagsClientProps {
  initialTags: Tag[]
}

export default function TagsClient({ initialTags }: TagsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter tags by search query
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return initialTags
    const query = searchQuery.toLowerCase()
    return initialTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(query) ||
        (tag.description && tag.description.toLowerCase().includes(query)) ||
        tag.slug.toLowerCase().includes(query)
    )
  }, [initialTags, searchQuery])

  // Group tags hierarchically
  const hierarchicalData = useMemo(() => {
    const parents = initialTags.filter((t) => !t.parent_id)
    const children = initialTags.filter((t) => t.parent_id)

    return parents.map((parent) => {
      // Find direct children
      const directChildren = children.filter((c) => c.parent_id === parent.id)
      
      // Find nested children (grand-children), e.g. wudhu under thaharah under fikih
      const allChildren: Tag[] = [...directChildren]
      
      directChildren.forEach((child) => {
        const grandChildren = children.filter((c) => c.parent_id === child.id)
        allChildren.push(...grandChildren)
      })

      return {
        parent,
        subtags: allChildren,
      }
    })
  }, [initialTags])


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-primary-700 dark:text-primary-400">🏷️</span> Tag & Kategori
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gunakan tag untuk menelusuri pertanyaan berdasarkan kategori pembahasan hukum Islam yang spesifik.
          </p>
        </div>
        <div className="relative max-w-xs w-full">
          <input
            id="tag-search-input"
            type="text"
            placeholder="Cari tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      {searchQuery.trim() ? (
        // Search Results View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <div
                key={tag.id}
                style={{ borderTopColor: tag.color || '#1B6B4A' }}
                className="card p-5 bg-white dark:bg-gray-900 border-t-4 border-x border-b border-gray-200 dark:border-gray-800 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50">
                      {tag.icon && <span className="mr-0.5">{tag.icon}</span>}
                      {tag.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {tag.question_count} pertanyaan
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {tag.description || 'Tidak ada deskripsi untuk tag ini.'}
                  </p>
                </div>
                <Link
                  href={`/questions?tag=${tag.slug}`}
                  className="text-xs font-semibold text-primary-700 dark:text-primary-400 hover:underline inline-flex items-center gap-1 mt-auto self-start"
                >
                  Lihat pertanyaan &rarr;
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <span className="text-3xl block mb-2">🔍</span>
              <div className="font-semibold">Tidak ada tag yang cocok</div>
              <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain atau cari kategori utama.</p>
            </div>
          )}
        </div>
      ) : (
        // Hierarchical Grouped View
        <div className="space-y-8">
          {hierarchicalData.map(({ parent, subtags }) => (
            <div
              key={parent.id}
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Parent Banner */}
              <div
                style={{ borderLeftColor: parent.color || '#1B6B4A' }}
                className="p-5 border-l-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-b border-gray-150 dark:border-gray-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{parent.icon || '🏷️'}</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {parent.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Kategori Utama
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl">
                    {parent.description}
                  </p>
                </div>
                <Link
                  href={`/questions?tag=${parent.slug}`}
                  className="btn bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 text-xs px-4 py-2 self-start sm:self-center shrink-0"
                >
                  Lihat {parent.question_count} Pertanyaan
                </Link>
              </div>

              {/* Sub-tags Grid */}
              <div className="p-5">
                {subtags.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subtags.map((child) => (
                      <div
                        key={child.id}
                        className="p-4 rounded-lg border border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-900/20 hover:bg-white dark:hover:bg-gray-900 hover:border-primary-500/30 dark:hover:border-primary-500/20 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="inline-flex items-center font-semibold text-xs text-primary-800 dark:text-primary-400">
                              {child.icon && <span className="mr-1">{child.icon}</span>}
                              {child.name}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {child.question_count} Q
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                            {child.description || 'Tidak ada deskripsi.'}
                          </p>
                        </div>
                        <Link
                          href={`/questions?tag=${child.slug}`}
                          className="text-[11px] font-semibold text-primary-700 dark:text-primary-400 hover:underline mt-auto self-start"
                        >
                          Telusuri &rarr;
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-xs text-gray-400 dark:text-gray-500 italic">
                    Belum ada sub-kategori di bawah {parent.name}.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
