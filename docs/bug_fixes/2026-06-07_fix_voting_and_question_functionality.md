# Bug Resolution: Perbaikan Fitur Pertanyaan, Sistem Voting & Sinkronisasi Reputasi

**Tanggal & Waktu:** 2026-06-07 11:07 (WIB)  
**Status:** Resolved  
**Komponen Terkait:**
- [QuestionForm.tsx](file:///d:/01. Punya Anggota/Akmal/manhajunaa/src/components/question/QuestionForm.tsx)
- [Navbar.tsx](file:///d:/01. Punya Anggota/Akmal/manhajunaa/src/components/layout/Navbar.tsx)
- [questions.ts](file:///d:/01. Punya Anggota/Akmal/manhajunaa/src/lib/queries/questions.ts)
- [page.tsx](file:///d:/01. Punya Anggota/Akmal/manhajunaa/src/app/(main)/questions/page.tsx)
- [page.tsx](file:///d:/01. Punya Anggota/Akmal/manhajunaa/src/app/(main)/questions/[slug]/page.tsx)
- [005_fix_reputation_vote_trigger.sql](file:///d:/01. Punya Anggota/Akmal/manhajunaa/supabase/migrations/005_fix_reputation_vote_trigger.sql)

---

## 1. Gejala Bug (Symptoms)
Terdapat beberapa masalah fungsionalitas dan ketidaksesuaian UI/UX pada fitur Pertanyaan dan Voting:
1. **Gagal Membuat Pertanyaan Baru**: Ketika mengisi form "Tulis Pertanyaan Baru", sistem selalu menampilkan error validasi Zod mengenai `tagIds` yang kosong, padahal UI tidak menyediakan pilihan tag untuk pengguna.
2. **Crash Server PGRST116**: Ketika menavigasi ke halaman detail pertanyaan menggunakan data buatan (mock) atau slug yang tidak ada di Supabase, halaman crash total dengan kode error `PGRST116`.
3. **Pencarian Tidak Fungsional**: Mengisi input cari di Navbar dan menekan enter tidak memfilter pertanyaan di halaman utama (halaman tetap menampilkan list penuh).
4. **Drift Reputasi Pengguna (Out-of-Sync)**: Mengubah suara (dari upvote ke downvote) atau menghapus vote tidak mengupdate poin reputasi penulis target dengan benar. Poin hanya terhitung pada INSERT awal.

---

## 2. Akar Masalah (Root Cause)
1. **Tag Picker Hilang**: Zod schema di `src/lib/validators.ts` mengharuskan `tagIds` berisi minimal 1 item (`.min(1)`), namun form input bertanya mengirim array kosong `[]` secara konstan tanpa UI pemilihan.
2. **Ketiadaan Error Handling di `.single()`**: Query Supabase menggunakan `.single()` untuk mengambil satu baris detail. Jika data tidak ada, Supabase mengembalikan status error `PGRST116` yang tidak ditangkap oleh server action/query, melainkan langsung dilempar (`throw`), sehingga merusak rendering Next.js.
3. **Ketidakselarasan Parameter Pencarian**: `Navbar.tsx` meredireksi ke `/questions?search=query`, sedangkan `page.tsx` membaca kata kunci pencarian menggunakan parameter URL `q` (`resolvedSearchParams.q`).
4. **Trigger Database Kurang Lengkap**: Fungsi trigger reputasi `apply_reputation_on_vote()` hanya terdaftar untuk trigger `AFTER INSERT ON votes`. Operasi `UPDATE` dan `DELETE` pada tabel `votes` tidak dipantau, menyebabkan status poin di tabel `profiles` tidak sinkron dengan aksi user.

---

## 3. Solusi Penyelesaian (Resolution)
1. **UI Multi-Select Tag**: 
   - Memodifikasi `AskPage` agar mengambil list tag master dari Supabase.
   - Menambahkan komponen pemilihan tag interaktif (badge toggle) di `QuestionForm.tsx` untuk membatasi input minimal 1 dan maksimal 5 tag.
2. **Penanganan Error PGRST116**:
   - Memodifikasi `getQuestionBySlug` agar menangkap error `PGRST116` dan mengembalikan `null`.
   - Di tingkat UI, menampilkan halaman "Pertanyaan tidak ditemukan" secara elegan tanpa crash.
3. **Sinkronisasi Parameter Pencarian**:
   - Mengubah rute pengiriman pencarian di `Navbar.tsx` agar menggunakan parameter URL `?q=`.
   - Mengembangkan pencarian real-time di `getQuestions` menggunakan full-text query PostgreSQL (`.or("title.ilike.%query%,content_text.ilike.%query%")`).
4. **Pembuatan Trigger Reputasi Baru**:
   - Menulis migration `005_fix_reputation_vote_trigger.sql` untuk memantau aksi `AFTER INSERT OR UPDATE OR DELETE ON votes`.
   - Menggunakan operator `TG_OP` untuk menghitung perbedaan poin reputasi penulis (Upvote Q: +5 / Downvote Q: -2, Upvote A: +10 / Downvote A: -5) dan menyinkronkan poin reputasi serta catatan log secara otomatis.
5. **Polishing UI/UX**:
   - Mengubah list pertanyaan menjadi Server Component dengan query Supabase sungguhan, filter status (Semua, Pembahasan, Ditangguhkan, Terjawab, Ditutup), pengurutan dinamis, dan pagination.
   - Menambahkan loading skeleton (`loading.tsx`) untuk transisi data yang mulus.
   - Menambahkan tombol "Kembali ke Pertanyaan" pada halaman detail pertanyaan.
   - Menggunakan box kutipan kaligrafi Arab RTL untuk referensi kitab kuning dan warna glow untuk jawaban terbaik (accepted answer).

---

## 4. Cara Pengujian (Verification Plan)
1. **Verifikasi Validasi**: Buka `/questions/ask`, pilih tag fikih, isi data, kirim, dan pastikan proses berhasil tanpa error Zod.
2. **Verifikasi Pencarian**: Ketik kata kunci di Navbar (misal: "usul"), tekan enter, pastikan URL berubah ke `?q=usul` dan list terfilter dengan benar.
3. **Verifikasi detail & 404**: Coba akses `/questions/hukum-wudhu-setelah-tidur-1111` (slug palsu), pastikan muncul tampilan "Pertanyaan tidak ditemukan" bukan error Next.js.
4. **Verifikasi Kompilasi**: Jalankan `npx tsc --noEmit` untuk menjamin tipe TypeScript aman 100%.
