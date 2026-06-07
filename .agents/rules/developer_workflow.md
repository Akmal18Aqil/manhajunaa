---
trigger: always_on
description: Panduan pengembangan dan alur kerja AI untuk platform Manhajuna (Next.js + Supabase)
---

# Panduan Developer & Alur Kerja AI - Manhajuna

Dokumen ini berisi pedoman arsitektur, struktur proyek, dan standar pengkodean untuk platform **Manhajuna (منهجنا)** — Platform Tanya Jawab Ilmiah Islami Berbasis Reputasi.

## 1. Teknologi Inti (Tech Stack)
Setiap kontribusi kode harus mematuhi stack berikut:
- **Frontend + API**: Next.js 15+ (App Router) dengan Server Actions (lapisan bisnis) menggantikan server Express terpisah.
- **UI Library**: Tailwind CSS + shadcn/ui (Accessible, Dark mode support).
- **Editor**: TipTap (ProseMirror) dengan dukungan RTL (Right-to-Left) & Arabic fonts.
- **Backend Platform**: Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions).
- **Database**: Supabase PostgreSQL dengan Row Level Security (RLS) policies dan database triggers.
- **State Management**: TanStack React Query + Zustand.

## 2. Struktur Folder & Konvensi
Ikuti tata letak folder di bawah ini saat membuat file baru:
- `src/app/`: Lokasi route group, layout, dan halaman Next.js.
  - `(auth)/`: Login, register, forgot-password, OAuth callback.
  - `(main)/`: Layout utama dengan Navbar + Sidebar, `questions/`, `tags/`, `users/`, `dashboard/`, `leaderboard/`, `kitab/`.
- `src/components/`: Komponen UI modular (misal: `question/`, `answer/`, `vote/`, `comment/`, `layout/`).
- `src/lib/`:
  - `supabase/`: Inisialisasi client Supabase (`client.ts`, `server.ts`, `middleware.ts`, `admin.ts`).
  - `actions/`: Next.js Server Actions (misal: `question.actions.ts`, `vote.actions.ts`).
  - `queries/`: Operasi pembacaan data (misal: `questions.ts`).
  - `utils.ts`, `constants.ts`, `validators.ts` (Zod validation schemas).
- `supabase/migrations/`: SQL migration files untuk skema database, RLS policies, PostgreSQL functions, dan triggers.

## 3. Aturan Database & Supabase
- **Tanpa ORM**: Gunakan Supabase Typed Client secara langsung menggunakan type generator di `src/types/database.types.ts`.
- **Row Level Security (RLS)**: Semua tabel wajib mengaktifkan RLS. Gunakan RLS policies di `supabase/migrations/002_rls_policies.sql` untuk mengamankan data pengguna berdasarkan `auth.uid()` dan `get_user_role()`.
- **Logika Bisnis di Database (Triggers & Functions)**: 
  - Gunakan triggers untuk update counter (denormalized upvotes/downvotes), update level reputasi pengguna, generate `search_vector` untuk pencarian full-text, dan auto-create profil saat registrasi.
- **Pencarian (FTS)**: Gunakan Full-Text Search PostgreSQL dengan konfigurasi khusus teks Arab.

## 4. Alur Bisnis Utama & Status Pertanyaan
- **Status Pertanyaan**:
  - `HALL` (حَلّ - Kuning 🟡): Masih dalam pembahasan/baru.
  - `MAUQUF` (مَوْقُوف - Oranye 🟠): Ditangguhkan untuk kajian khusus/tim peneliti.
  - `TERSELESAIKAN` (حَلَّ - Hijau 🟢): Terjawab (Best Answer dipilih).
  - `MUGHLAQ` (مُغْلَق - Merah 🔴): Ditutup/Spam/Melanggar aturan.
- **Sistem Referensi**: Setiap jawaban Mujib (Ustadz) wajib menyertakan detail referensi dari `kitab_master` (jilid, halaman, kutipan teks asli Arab RTL, dan terjemahan Indonesia).

## 5. Panduan Desain & UI/UX
- **Palet Warna Utama**:
  - Primary (Hijau Islami): `#1B6B4A` / Hover: `#2E8B5E`
  - Secondary (Emas): `#C9A84C` (Badge/Aksen)
- **Teks Arab**: Wajib mendukung font khusus Arab (misal: *Scheherazade New* atau *Traditional Arabic*) dengan harakat lengkap, serta kontrol arah teks RTL (Right-to-Left).
