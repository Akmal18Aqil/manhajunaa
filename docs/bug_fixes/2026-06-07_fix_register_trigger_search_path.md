# Bug Resolution: Database Error Saving New User Upon Registration
**Tanggal & Waktu:** 2026-06-07 11:41 (WIB)
**Status:** Resolved
**Komponen Terkait:** [003_triggers_functions.sql](file:///d:/01. Punya Anggota/Akmal/manhajunaa/supabase/migrations/003_triggers_functions.sql)

## 1. Gejala Bug (Symptoms)
Pendaftaran akun baru di halaman `/register` gagal dengan pesan error generic di sisi klien. Di log layanan Supabase Auth, tercatat error 500 database:
```json
{
  "error": "failed to close prepared statement: ERROR: current transaction is aborted, commands ignored until end of transaction block (SQLSTATE 25P02): ERROR: relation \"profiles\" does not exist (SQLSTATE 42P01)",
  "msg": "500: Database error saving new user",
  "path": "/signup"
}
```

## 2. Akar Masalah (Root Cause)
Trigger `trg_on_auth_user_created` memanggil fungsi `handle_new_user()` setelah baris baru ditambahkan pada tabel `auth.users` (yang berada di schema `auth`).
Fungsi `handle_new_user()` melakukan operasi insert ke tabel `profiles` menggunakan nama tabel tanpa kualifikasi schema (`profiles` alih-alih `public.profiles`). Karena trigger dijalankan dalam konteks schema `auth`, PostgreSQL mencari tabel `profiles` di schema `auth` (atau di search_path session yang sedang berjalan) dan gagal menemukannya, menghasilkan error `relation "profiles" does not exist (SQLSTATE 42P01)`.

## 3. Solusi Penyelesaian (Resolution)
Mengubah referensi tabel pada fungsi `handle_new_user` agar secara eksplisit menggunakan prefix schema `public` (`public.profiles`):
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
Perubahan ini di-deploy langsung ke database Supabase live dan dicatat dalam file migrasi [003_triggers_functions.sql](file:///d:/01. Punya Anggota/Akmal/manhajunaa/supabase/migrations/003_triggers_functions.sql).

## 4. Cara Pengujian (Verification Plan)
1. Lakukan operasi insert data user uji langsung ke `auth.users` dengan metadata lengkap (username & full_name).
2. Periksa apakah baris profil baru terbuat di `public.profiles`.
3. Hapus data user uji dari `auth.users` untuk membersihkan environment.
