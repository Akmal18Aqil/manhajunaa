export const QUESTION_STATUSES = {
  HALL: { label: 'Masih Dibahas', color: 'warning', icon: '🔄' },
  MAUQUF: { label: 'Ditangguhkan', color: 'mauquf', icon: '⏸️' },
  TERSELESAIKAN: { label: 'Terselesaikan', color: 'success', icon: '✅' },
  MUGHLAQ: { label: 'Ditutup', color: 'danger', icon: '🚫' },
}

export const REPUTATION_CHANGES = {
  UPVOTE_QUESTION: 5,
  DOWNVOTE_QUESTION: -2,
  UPVOTE_ANSWER: 10,
  DOWNVOTE_ANSWER: -5,
  ANSWER_ACCEPTED: 25,
  REFERENCE_VALIDATED: 15,
  GIVE_VOTE: 1,
}

export const USER_LEVELS = [
  { min: 0, max: 50, title: 'Thalib Jadid', color: '#808080' },
  { min: 51, max: 200, title: 'Thalib Mustawa 1', color: '#90EE90' },
  { min: 201, max: 500, title: 'Thalib Mustawa 2', color: '#228B22' },
  { min: 501, max: 1000, title: 'Al-Mujib al-Mubtadi\'', color: '#87CEEB' },
  { min: 1001, max: 2500, title: 'Al-Mujib al-Mutawassith', color: '#4169E1' },
  { min: 2501, max: 5000, title: 'Al-Mujib al-Mutaqaddim', color: '#FFD700' },
  { min: 5001, max: 10000, title: 'Al-Mufid', color: '#FF4500' },
  { min: 10001, max: Infinity, title: 'Al-\'Allamah', color: '#9932CC' },
]

export const PAGINATION_LIMIT = 20
export const SEARCH_LIMIT = 10
export const MAX_TAGS_PER_QUESTION = 5

export const ROLES = {
  ZAIR: 'Pengunjung',
  THALIB: 'Santri/Penanya',
  MUJIB: 'Penjawab Terverifikasi',
  MURAQI: 'Moderator',
  MUDIR: 'Administrator',
}
