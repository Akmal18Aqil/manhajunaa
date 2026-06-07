---
trigger: always_on
description: Panduan penanganan bug (bug-fixing), pencatatan dokumentasi post-mortem (sejarah penyelesaian bug), dan pencegahan regresi.
---

# Alur Kerja Penanganan Bug & Dokumentasi Sejarah (Bug-Fixing Workflow)

Untuk menjaga stabilitas kode, mencegah regresi (bug lama muncul kembali), dan memberikan konteks historis bagi AI serta developer manusia, ikuti alur kerja berikut saat menangani bug di Manhajuna.

## 1. Tahap Analisis Sebelum Memperbaiki Bug (Pre-Fix)
Sebelum melakukan modifikasi kode untuk memperbaiki bug, AI **wajib** melakukan hal berikut:
1. Periksa direktori `docs/bug_fixes/` untuk mencari penyelesaian bug serupa di masa lalu.
2. Gunakan pencarian teks/keyword pada log lama jika gejalanya mirip (misal: "auth", "session drift", "arabic RTL", "database trigger").
3. Pelajari alasan teknis mengapa solusi sebelumnya diambil agar tidak merusak perbaikan lama.

## 2. Tahap Dokumentasi Setelah Bug Diperbaiki (Post-Fix)
Setiap kali bug berhasil diperbaiki dan diverifikasi, AI **wajib** membuat file dokumentasi penyelesaian di folder `docs/bug_fixes/` dengan format penamaan berikut:
`docs/bug_fixes/YYYY-MM-DD_[deskripsi_singkat_bug].md`

### Template Dokumentasi Bug (`docs/bug_fixes/TEMPLATE.md`)
Gunakan template berikut untuk setiap catatan penyelesaian bug:

```markdown
# Bug Resolution: [Deskripsi Singkat Bug]
**Tanggal & Waktu:** YYYY-MM-DD HH:MM (WIB)
**Status:** Resolved
**Komponen Terkait:** [misal: auth.actions.ts, rls_policies.sql, etc.]

## 1. Gejala Bug (Symptoms)
Jelaskan apa yang terjadi, perilaku yang salah, dan langkah-langkah untuk mereproduksinya (steps to reproduce).

## 2. Akar Masalah (Root Cause)
Jelaskan mengapa bug ini terjadi secara teknis (misal: "session cookie kedaluwarsa sebelum trigger Supabase selesai").

## 3. Solusi Penyelesaian (Resolution)
Jelaskan perubahan kode yang dilakukan untuk memperbaiki bug tersebut. Berikan cuplikan diff jika relevan.

## 4. Cara Pengujian (Verification Plan)
Bagaimana cara memverifikasi bahwa bug ini sudah benar-benar hilang dan tidak merusak fungsi lainnya.
```

## 3. Pemeliharaan Grafik Pengetahuan
Setelah menulis dokumentasi bug baru, jalankan `python -m graphify update .` agar dokumen bug tersebut masuk ke dalam Knowledge Graph sehingga AI dapat menemukannya melalui query semantik di masa mendatang.
