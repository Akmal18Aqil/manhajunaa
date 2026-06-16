'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/actions/auth.actions'
import { getNotifications, markAsRead, markAllAsRead } from '@/lib/actions/notification.actions'
import ThemeToggle from '@/components/theme/ThemeToggle'
import Sidebar from '@/components/layout/Sidebar'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
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
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-xl dark:border-gray-800 dark:bg-[#0a0f18]/80 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Hamburger & Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 -ml-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          
          <Link href="/questions" className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-primary-700 dark:text-primary-500 font-arabic hidden sm:inline-block">منهجنا</span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">Manhajuna</span>
          </Link>
        </div>

        {/* Center: Search Bar (Desktop) & Mobile Toggle */}
        <div className="flex-1 max-w-xl mx-4 lg:mx-8 flex justify-end md:justify-center">
          {/* Desktop Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:block w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan, tag, atau kitab..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-1.5 pl-4 pr-10 text-sm text-gray-900 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-500 transition-all"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-primary-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          
          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>

        {/* Right: Actions / Profile */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Notification Bell Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-1.5 rounded-full text-gray-500 hover:text-primary-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-900 transition-colors relative focus:outline-none"
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
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Notifikasi</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-full">
                          {unreadCount} baru
                        </span>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto pr-1 divide-y divide-gray-100 dark:divide-gray-800">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-gray-400 italic">
                          Tidak ada notifikasi baru.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`w-full text-left px-4 py-3 text-xs transition-colors flex gap-3 items-start ${
                              n.is_read
                                ? 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400'
                                : 'bg-primary-50/30 dark:bg-primary-950/10 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 text-gray-900 dark:text-gray-300 font-medium'
                            }`}
                          >
                            <span className="text-lg shrink-0 mt-0.5">
                              {getNotificationIcon(n.type)}
                            </span>
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="font-bold text-gray-800 dark:text-gray-200 truncate leading-snug">
                                {n.title}
                              </div>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal line-clamp-2">
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
                      <div className="px-4 pt-2 pb-0.5 border-t border-gray-100 dark:border-gray-800">
                        <button
                          onClick={handleMarkAllAsRead}
                          className="w-full text-center py-1.5 text-[11px] font-bold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
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
                  className="flex items-center gap-2 pl-1.5 pr-1.5 md:pl-3 md:pr-1.5 py-1 rounded-full border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/50 dark:hover:bg-gray-800/50 transition-all group cursor-pointer shadow-sm shrink-0"
                  title="Lihat Profil Anda"
                >
                  <div className="hidden md:flex flex-col items-end text-right">
                    <span className="font-bold text-[13px] leading-none text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors whitespace-nowrap max-w-[120px] truncate">
                      {currentUser.display_name || currentUser.username}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-secondary-dark font-extrabold mt-1 whitespace-nowrap">
                      <span>🏆</span> {currentUser.reputation || 0} pts
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-primary-700 dark:text-primary-400 shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                </Link>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hidden md:block btn btn-secondary px-3 py-1.5 text-xs text-red-600 border border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20 shadow-sm shrink-0"
                >
                  Keluar
                </button>
              </div>
          ) : (
            <div className="flex items-center gap-2">
              <ThemeToggle />
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

      {/* Mobile Search Dropdown */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f18]">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan, tag, atau kitab..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm text-gray-900 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-500"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative flex w-64 max-w-sm flex-col bg-white dark:bg-[#0a0f18] h-full shadow-2xl overflow-y-auto z-10 transition-transform transform translate-x-0">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <Sidebar className="flex-1 w-full" />
            
            {currentUser && (
              <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex justify-center items-center gap-2 btn btn-secondary text-sm text-red-600 border-red-200 dark:border-red-900/50 dark:hover:bg-red-950/20 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Keluar Akun
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
