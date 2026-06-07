'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/actions/auth.actions'
import { getNotifications, markAsRead, markAllAsRead } from '@/lib/actions/notification.actions'

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  return date.toLocaleDateString('id-ID')
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'NEW_ANSWER':
      return '❓'
    case 'NEW_COMMENT':
      return '💬'
    case 'UPVOTE':
      return '🏆'
    case 'ANSWER_ACCEPTED':
      return '✅'
    case 'BADGE_EARNED':
      return '🥇'
    default:
      return '🔔'
  }
}

interface NavbarProps {
  currentUser: {
    id: string
    username: string
    display_name: string | null
    role: string | null
    reputation: number | null
  } | null
}

export default function Navbar({ currentUser }: NavbarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentUser) return

    const loadNotifications = async () => {
      try {
        const res = await getNotifications()
        setNotifications(res.notifications)
        setUnreadCount(res.unreadCount)
      } catch (err) {
        console.error('Failed to load notifications:', err)
      }
    }

    loadNotifications()
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [currentUser])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = async (notif: any) => {
    setShowDropdown(false)
    if (!notif.is_read) {
      try {
        await markAsRead(notif.id)
        // Optimistic update
        setNotifications(prev =>
          prev.map(n => (n.id === notif.id ? { ...n, is_read: true } : n))
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      } catch (err) {
        console.error('Failed to mark notification as read:', err)
      }
    }
    if (notif.link) {
      router.push(notif.link)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/questions?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/questions')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <Link href="/questions" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-primary-700 dark:text-primary-500 font-arabic">منهجنا</span>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Manhajuna</span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-8 hidden sm:block">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan, tag, atau kitab..."
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-1.5 pl-4 pr-10 text-sm text-gray-900 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-500"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Actions / Profile */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              
              {/* Notification Bell Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-1.5 rounded-full text-gray-500 hover:text-primary-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-450 dark:hover:bg-gray-900 transition-colors relative focus:outline-none"
                  aria-label="Notifikasi"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 dark:bg-gray-950/95 backdrop-blur border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg py-2.5 z-50 overflow-hidden focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Notifikasi</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold text-red-650 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-full">
                          {unreadCount} baru
                        </span>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto pr-1 divide-y divide-gray-100 dark:divide-gray-850">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-gray-450 italic">
                          Tidak ada notifikasi baru.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`w-full text-left px-4 py-3 text-xs transition-colors flex gap-3 items-start ${
                              n.is_read
                                ? 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-650 dark:text-gray-400'
                                : 'bg-primary-50/30 dark:bg-primary-950/10 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 text-gray-900 dark:text-gray-250 font-medium'
                            }`}
                          >
                            <span className="text-lg shrink-0 mt-0.5">
                              {getNotificationIcon(n.type)}
                            </span>
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="font-bold text-gray-850 dark:text-gray-200 truncate leading-snug">
                                {n.title}
                              </div>
                              <p className="text-[11px] text-gray-550 dark:text-gray-450 leading-normal line-clamp-2">
                                {n.message}
                              </p>
                              <span className="text-[9px] text-gray-400 block font-medium">
                                {formatRelativeTime(n.created_at)}
                              </span>
                            </div>
                            {!n.is_read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2"></span>
                            )}
                          </button>
                        ))
                      )}
                    </div>

                    {unreadCount > 0 && (
                      <div className="px-4 pt-2 pb-0.5 border-t border-gray-100 dark:border-gray-850">
                        <button
                          onClick={handleMarkAllAsRead}
                          className="w-full text-center py-1.5 text-[11px] font-bold text-primary-750 dark:text-primary-400 hover:text-primary-850 dark:hover:text-primary-350 transition-colors"
                        >
                          Tandai Semua Sudah Dibaca
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Rep and Profile */}
              <Link 
                href={`/users/${currentUser.username}`}
                className="flex flex-col items-end text-sm hover:opacity-80 transition-opacity"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {currentUser.display_name || currentUser.username}
                </span>
                <span className="flex items-center gap-1 text-xs text-secondary-dark font-bold">
                  🏆 {currentUser.reputation || 0} pts
                </span>
              </Link>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn btn-secondary px-3 py-1.5 text-xs text-red-600 border border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-secondary px-3.5 py-1.5 text-sm">
                Masuk
              </Link>
              <Link href="/register" className="btn btn-primary px-3.5 py-1.5 text-sm">
                Daftar
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}
