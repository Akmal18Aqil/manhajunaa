// Type definitions for Manhajuna Platform
export interface User {
  id: string
  email: string
  username: string
  display_name: string | null
  gelar: string | null
  kunyah: string | null
  bio: string | null
  avatar_url: string | null
  role: 'ZAIR' | 'THALIB' | 'MUJIB' | 'MURAQI' | 'MUDIR'
  reputation: number
  level: number
  is_verified: boolean
  is_banned: boolean
  created_at: string
  updated_at: string
}

export interface Question {
  id: string
  title: string
  slug: string
  content: Record<string, unknown>
  content_text: string
  user_id: string
  status: 'HALL' | 'MAUQUF' | 'TERSELESAIKAN' | 'MUGHLAQ'
  views: number
  upvotes: number
  downvotes: number
  total_answers: number
  accepted_answer_id: string | null
  mughlaq_reason: string | null
  created_at: string
  updated_at: string
  user?: User
  tags?: Tag[]
  answers?: Answer[]
}

export interface Answer {
  id: string
  content: Record<string, unknown>
  content_text: string
  question_id: string
  user_id: string
  is_accepted: boolean
  upvotes: number
  downvotes: number
  created_at: string
  updated_at: string
  user?: User
  references?: Reference[]
  comments?: Comment[]
}

export interface Reference {
  id: string
  answer_id: string
  kitab_id: string
  jilid: string | null
  bab: string | null
  halaman: string | null
  teks_arab: string | null
  terjemah: string | null
  catatan: string | null
  validation_status: 'PENDING' | 'VALID' | 'TIDAK_VALID'
  validated_by_id: string | null
  validated_at: string | null
  rejection_reason: string | null
  created_at: string
  kitab?: KitabMaster
}

export interface KitabMaster {
  id: string
  nama_arab: string
  nama_latin: string
  pengarang: string
  bidang: string | null
  penerbit: string | null
  tahun_cetak: string | null
  deskripsi: string | null
  cover_url: string | null
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  icon: string | null
  parent_id: string | null
  question_count: number
  created_at: string
}

export interface Comment {
  id: string
  content: string
  user_id: string
  target_id: string
  target_type: 'QUESTION' | 'ANSWER'
  parent_id: string | null
  created_at: string
  updated_at: string
  user?: User
  replies?: Comment[]
}

export interface Vote {
  id: string
  user_id: string
  target_id: string
  target_type: 'QUESTION' | 'ANSWER'
  value: 1 | -1
  created_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  question_id: string
  created_at: string
}

export interface Badge {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  tier: 'BRONZE' | 'SILVER' | 'GOLD'
  criteria: Record<string, unknown>
  display_order: number
  created_at: string
}

export interface UserBadge {
  id: string
  user_id: string
  badge_id: string
  earned_at: string
  badge?: Badge
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  link: string | null
  is_read: boolean
  image_url: string | null
  created_at: string
}

export interface ReputationLog {
  id: string
  user_id: string
  points: number
  reason: string
  reference_id: string | null
  created_at: string
}
