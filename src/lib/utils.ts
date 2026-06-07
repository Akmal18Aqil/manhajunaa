import slugify from 'slugify'

export function createSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'id',
  })
}

export function getUserLevelInfo(reputation: number) {
  const levels = [
    { min: 0, max: 50, title: 'Thalib Jadid', color: '#808080' },
    { min: 51, max: 200, title: 'Thalib Mustawa 1', color: '#90EE90' },
    { min: 201, max: 500, title: 'Thalib Mustawa 2', color: '#228B22' },
    { min: 501, max: 1000, title: 'Al-Mujib al-Mubtadi\'', color: '#87CEEB' },
    { min: 1001, max: 2500, title: 'Al-Mujib al-Mutawassith', color: '#4169E1' },
    { min: 2501, max: 5000, title: 'Al-Mujib al-Mutaqaddim', color: '#FFD700' },
    { min: 5001, max: 10000, title: 'Al-Mufid', color: '#FF4500' },
    { min: 10001, max: Infinity, title: 'Al-\'Allamah', color: '#9932CC' },
  ]

  return levels.find(l => reputation >= l.min && reputation <= l.max) || levels[0]
}

export function getDisplayName(user: { username: string; display_name?: string; gelar?: string; show_gelar?: boolean }) {
  const base = user.display_name || user.username
  if (user.show_gelar && user.gelar) {
    return `${user.gelar} ${base}`
  }
  return base
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit yang lalu`
  if (hours < 24) return `${hours} jam yang lalu`
  if (days < 7) return `${days} hari yang lalu`

  return formatDate(date)
}

export function truncate(text: string, length: number = 100): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}

export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: unknown
  ) {
    super(message)
  }
}

export function createApiResponse<T>(success: boolean, data?: T, error?: { code: string; message: string; details?: unknown }) {
  if (success) {
    return { success: true, data }
  }
  return { success: false, error }
}
