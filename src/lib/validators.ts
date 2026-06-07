import { z } from 'zod'

export const questionSchema = z.object({
  title: z.string().min(10).max(300),
  content: z.record(z.unknown()),
  contentText: z.string().min(20).max(10000),
  tagIds: z.array(z.string()).min(1).max(5),
})

export const answerSchema = z.object({
  content: z.record(z.unknown()),
  contentText: z.string().min(20).max(10000),
})

export const referenceSchema = z.object({
  kitabId: z.string().uuid(),
  jilid: z.string().optional(),
  bab: z.string().optional(),
  halaman: z.string(),
  teksArab: z.string().optional(),
  terjemah: z.string().optional(),
  catatan: z.string().optional(),
})

export const commentSchema = z.object({
  content: z.string().min(1).max(1000),
})

export const profileSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  gelar: z.string().max(200).optional(),
  kunyah: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  showGelar: z.boolean().optional(),
  showKunyah: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  displayName: z.string().min(1).max(100),
})
