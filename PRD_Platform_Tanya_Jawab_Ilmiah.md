# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Platform Tanya Jawab Ilmiah Islami Berbasis Reputasi

| **Dokumen** | **Detail** |
|-------------|------------|
| **Nama Proyek** | **Manhajuna** (منهجنا) — *Platform Tanya Jawab Ilmiah Islami* |
| **Versi Dokumen** | 1.0 |
| **Status** | Draft |
| **Product Manager** | [Nama PM] |
| **Tanggal** | 28 Mei 2026 |
| **Timeline Target** | Q3 2026 – Q1 2027 |

---

## DAFTAR ISI

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Latar Belakang & Problem Statement](#2-latar-belakang--problem-statement)
3. [Tujuan & Objektif](#3-tujuan--objektif)
4. [Target Pengguna (Persona)](#4-target-pengguna-persona)
5. [Fitur Utama (Epic & Story)](#5-fitur-utama-epic--story)
6. [Sistem Reputasi & Badge](#6-sistem-reputasi--badge)
7. [Alur Kerja (Workflow)](#7-alur-kerja-workflow)
8. [Sistem Status Pertanyaan](#8-sistem-status-pertanyaan)
9. [Sistem Referensi & Kutipan Kitab](#9-sistem-referensi--kutipan-kitab)
10. [Rich Text Editor (Word-like)](#10-rich-text-editor-word-like)
11. [Dashboard Pengguna](#11-dashboard-pengguna)
12. [Persyaratan Fungsional](#12-persyaratan-fungsional)
13. [Persyaratan Non-Fungsional](#13-persyaratan-non-fungsional)
14. [Spesifikasi Teknis](#14-spesifikasi-teknis)
15. [UI/UX Guidelines](#15-uiux-guidelines)
16. [Hirarki Database](#16-hirarki-database)
17. [Roadmap & Timeline](#17-roadmap--timeline)
18. [Metrik Kesuksesan (OKR/KPI)](#18-metrik-kesuksesan-okrkpi)
19. [Risiko & Mitigasi](#19-risiko--mitigasi)
20. [Glosarium](#20-glosarium)
21. [Perencanaan Program untuk Developer](#21-perencanaan-program-untuk-developer)
22. [UI/UX Detail — Semua Halaman & Sistem Desain](#22-uiux-detail--semua-halaman--sistem-desain)
23. [Error Handling, Validasi & UX States](#23-error-handling-validasi--ux-states)
24. [Seed Data Specification](#24-seed-data-specification)

---

## 1. RINGKASAN EKSEKUTIF

**Manhajuna** adalah platform tanya jawab ilmiah berbasis web yang mengadopsi mekanisme reputasi ala StackOverflow, namun dikhususkan untuk diskusi keilmuan Islam — khususnya bidang **Fikih, Ushul Fikih, Nahwu, Sharaf, diskusi Waqiiyah (kasus kontemporer), dan pelajaran keislaman lainnya.**

Platform ini menjembatani para **penuntut ilmu (thalib)** dengan **ahli/ustadz (mujib)** dalam ekosistem yang terstruktur, transparan, dan berbasis referensi kitab kuning (turats). Setiap jawaban **wajib menyertakan referensi** dari kitab mu'tabar, dengan opsi menyertakan teks asli Arab dan terjemah Indonesia.

Sistem reputasi dan badge memberikan insentif bagi pengguna untuk berkontribusi secara berkualitas, sementara status pertanyaan **(HALL, MAUQUF, TERSELESAIKAN)** memberikan kejelasan alur diskusi.

---

## 2. LATAR BELAKANG & PROBLEM STATEMENT

### 2.1 Problem Statement

| **Masalah** | **Dampak** |
|-------------|------------|
| Tidak ada platform Q&A khusus ilmu Islam yang terstruktur seperti StackOverflow | Diskusi ilmiah tersebar di grup WhatsApp/Telegram yang tidak terarsir dan sulit dicari ulang |
| Jawaban sering tanpa referensi kitab mu'tabar | Sulit memverifikasi keabsahan jawaban |
| Tidak ada sistem reputasi | Tidak ada insentif kualitas, siapa pun bisa menjawab tanpa pertanggungjawaban ilmiah |
| Status pertanyaan tidak jelas | Pertanyaan lama masih beredar tanpa status apakah sudah terjawab, masih diteliti, atau gugur |
| Tidak ada integrasi kutipan kitab kuning standar | Referensi sulit dilacak ke sumber aslinya (jilid, halaman, penerbit) |

### 2.2 Riset Pasar

| **Platform** | **Kelebihan** | **Kekurangan** |
|-------------|---------------|----------------|
| StackOverflow | Sistem reputasi matang, struktur Q&A jelas | Bahasa Inggris, umum, tidak spesifik Islam |
| Reddit (r/Islam) | Diskusi bebas | Tidak terstruktur, tanpa reputasi |
| Grup WhatsApp/Telegram | Interaktif, real-time | Tidak terarsip, sulit dicari, kualitas campuran |
| Forum Kitab Kuning (offline) | Otoritatif | Terbatas offline, tidak scalable |
| Tanya Ustadz (web existing) | Jawaban dari ustadz | Tidak ada sistem Q&A terbuka, tanpa reputasi |

**Kesimpulan:** Belum ada platform yang menggabungkan **struktur Q&A StackOverflow + sistem reputasi + referensi kitab kuning terstruktur + status pertanyaan Islami (hall, mauquf, terselesaikan).**

---

## 3. TUJUAN & OBJEKTIF

### 3.1 Visi
Menjadi **rujukan utama diskusi ilmiah Islam online** dengan standar referensi kitab kuning tertinggi.

### 3.2 Misi
1. Menyediakan platform tanya jawab ilmiah Islam yang terstruktur, terverifikasi, dan terarsip.
2. Membangun ekosistem reputasi ilmiah yang mendorong kualitas jawaban berbasis kitab mu'tabar.
3. Mendigitalisasi referensi kitab kuning dalam format terstruktur (Arab + Terjemah).

### 3.3 Objektif SMART

| **Objektif** | **Target (12 Bulan Pertama)** |
|--------------|-------------------------------|
| Pengguna Terdaftar | 50.000 akun |
| Pertanyaan Terjawab | 5.000 pertanyaan dengan status TERSELESAIKAN |
| Referensi Kitab Tersimpan | 10.000+ entri referensi kitab kuning |
| Jawaban dengan Referensi | 90% dari total jawaban |
| DAU (Daily Active Users) | 2.500 user/hari |
| Kepuasan Pengguna (CSAT) | ≥ 85% |

---

## 4. TARGET PENGGUNA (PERSONA)

### 4.1 Persona Utama

| **Persona** | **Deskripsi** | **Kebutuhan Utama** |
|-------------|---------------|---------------------|
| **Thalib (Santri/Mahasantri)** | Santri pondok, mahasiswa IAIN/UIN/PTKIN, atau umum yang ingin bertanya | Mendapat jawaban ilmiah dengan referensi, belajar dari diskusi ulama |
| **Mujib (Pengajar/Ustadz)** | Ustadz, dosen, kiai yang menjawab pertanyaan | Platform untuk berdakwah ilmiyah, membangun reputasi, referensi digital |
| **Muraqi (Moderator)** | Admin/moderator yang menjaga kualitas konten | Tools moderasi, validasi referensi, manajemen status |
| **Muthali' (Pembaca Pasif)** | Pengguna yang hanya membaca tanpa bertanya | Akses ke arsip pertanyaan-jawaban berkualitas |

### 4.2 Role & Hak Akses

| **Role** | **Hak Akses** |
|----------|---------------|
| **Zair (Pengunjung)** | Membaca pertanyaan & jawaban, mencari |
| **Thalib (Terdaftar)** | Semua hak Zair + bertanya, menjawab, berkomentar, vote, bookmark |
| **Mujib (Terverifikasi)** | Semua hak Thalib + prioritas jawaban, edit referensi, badge khusus |
| **Muraqi (Moderator)** | Semua hak Mujib + hapus/laporkan, ubah status pertanyaan, validasi pengguna |
| **Mudir (Admin)** | Full akses sistem, manajemen pengguna, pengaturan platform |

---

## 5. FITUR UTAMA (EPIC & STORY)

### EPIC 1: Manajemen Pertanyaan & Jawaban

| **Story ID** | **User Story** | **Prioritas** | **Estimasi** |
|-------------|---------------|---------------|--------------|
| F-001 | Sebagai Thalib, saya ingin **mengajukan pertanyaan** dengan judul, konten, tag kategori (Fikih, Nahwu, Ushul, Waqiiyah, DLL) | P0 | 3 hari |
| F-002 | Sebagai Thalib, saya ingin **memilih jawaban terbaik** yang akan menandai pertanyaan sebagai TERSELESAIKAN | P0 | 2 hari |
| F-003 | Sebagai Mujib, saya ingin **menjawab pertanyaan** dengan editor rich text dan menyertakan referensi | P0 | 4 hari |
| F-004 | Sebagai pengguna, saya ingin **vote up/down** pada pertanyaan dan jawaban | P0 | 2 hari |
| F-005 | Sebagai pengguna, saya ingin **berkomentar** untuk klarifikasi | P1 | 2 hari |
| F-006 | Sebagai pengguna, saya ingin **bookmark** pertanyaan untuk dibaca nanti | P1 | 1 hari |

### EPIC 2: Sistem Status Pertanyaan (HALL-MAUQUF-TERSELESAIKAN)

| **Story ID** | **User Story** | **Prioritas** | **Estimasi** |
|-------------|---------------|---------------|--------------|
| F-007 | Sebagai pengguna, saya ingin melihat **status pertanyaan** (HALL/MAUQUF/TERSELESAIKAN) di card dan detail | P0 | 2 hari |
| F-008 | Sebagai Muraqi/Mujib, saya ingin **mengubah status** pertanyaan menjadi MAUQUF (ditangguhkan karena perlu kajian lebih lanjut) | P0 | 1 hari |
| F-009 | Sebagai sistem, pertanyaan baru **otomatis berstatus HALL** (masih berjalan/dibahas) | P0 | 0.5 hari |
| F-010 | Sebagai Thalib, saya bisa **menandai TERSELESAIKAN** dengan memilih jawaban terbaik | P0 | 1 hari |

### EPIC 3: Sistem Reputasi & Badge

| **Story ID** | **User Story** | **Prioritas** | **Estimasi** |
|-------------|---------------|---------------|--------------|
| F-011 | Sebagai pengguna, saya ingin **mendapatkan poin reputasi** untuk setiap kontribusi positif | P0 | 3 hari |
| F-012 | Sebagai pengguna, saya ingin **mendapatkan badge** berdasarkan pencapaian | P0 | 2 hari |
| F-013 | Sebagai pengguna, saya ingin **melihat leaderboard** berdasarkan reputasi | P2 | 2 hari |
| F-014 | Sebagai pengguna, saya ingin **menampilkan gelar akademik** di profil (opsional) | P1 | 1 hari |

### EPIC 4: Sistem Referensi & Kutipan Kitab

| **Story ID** | **User Story** | **Prioritas** | **Estimasi** |
|-------------|---------------|---------------|--------------|
| F-015 | Sebagai Mujib, saya ingin **menambahkan referensi kitab** saat menjawab (nama kitab, jilid, halaman, penerbit) | P0 | 3 hari |
| F-016 | Sebagai Mujib, saya ingin **menyertakan teks Arab** kutipan kitab kuning + **terjemah Indonesia** | P0 | 2 hari |
| F-017 | Sebagai pengguna, saya ingin **melihat daftar referensi** yang digunakan dalam suatu jawaban | P1 | 1 hari |
| F-018 | Sebagai Muraqi, saya ingin memvalidasi referensi yang dicantumkan | P1 | 2 hari |
| F-019 | Sebagai pengguna, saya ingin **mencari berdasarkan kitab** (menampilkan semua pertanyaan yang merujuk kitab tertentu) | P2 | 2 hari |

### EPIC 5: Rich Text Editor (Word-like)

| **Story ID** | **User Story** | **Prioritas** | **Estimasi** |
|-------------|---------------|---------------|--------------|
| F-020 | Sebagai pengguna, saya ingin **editor WYSIWYG** seperti Microsoft Word untuk menulis pertanyaan/jawaban | P0 | 4 hari |
| F-021 | Sebagai pengguna, saya ingin **menyisipkan teks Arab** dengan support Arabic script (RTL) | P0 | 2 hari |
| F-022 | Sebagai pengguna, saya ingin **menyisipkan tabel, bullet, numbering, bold, italic, underline** | P1 | 2 hari |
| F-023 | Sebagai pengguna, saya ingin **insert link, image, blockquote** untuk kutipan | P1 | 2 hari |
| F-024 | Sebagai pengguna, saya ingin **auto-save draft** saat menulis | P2 | 2 hari |

### EPIC 6: Dashboard Pengguna

| **Story ID** | **User Story** | **Prioritas** | **Estimasi** |
|-------------|---------------|---------------|--------------|
| F-025 | Sebagai Thalib, saya ingin **dashboard pribadi** yang menampilkan aktivitas saya | P0 | 3 hari |
| F-026 | Sebagai pengguna, saya ingin mengedit profil (bio, foto, gelar, username) dengan mudah | P1 | 2 hari |
| F-027 | Sebagai pengguna, saya ingin melihat **riwayat pertanyaan, jawaban, bookmark, reputasi** | P1 | 2 hari |
| F-028 | Sebagai pengguna, saya ingin **notifikasi** (ada jawaban baru, komentar, vote) | P1 | 2 hari |

---

## 6. SISTEM REPUTASI & BADGE

### 6.1 Poin Reputasi

| **Aksi** | **Poin** | **Keterangan** |
|----------|----------|----------------|
| Menerima upvote pada pertanyaan | +5 | Pertanyaan berkualitas |
| Menerima upvote pada jawaban | +10 | Jawaban bermanfaat |
| Jawaban dipilih sebagai terbaik | +25 | + additional 15 (total 40) |
| Menerima downvote pada pertanyaan | -2 | |
| Menerima downvote pada jawaban | -5 | |
| Memberi upvote | +1 | Untuk setiap vote yang diberikan |
| Menerima "Referensi Valid" dari Muraqi | +15 | Referensi terverifikasi |
| Pertanyaan dihapus oleh moderator | -10 | |
| Jawaban dihapus oleh moderator | -20 | |
| Jawaban tanpa referensi (jika wajib) | -10 | Dikenakan setelah warning |

### 6.2 Level Reputasi & Gelar

| **Range Poin** | **Gelar (Title)** | **Warna** |
|----------------|-------------------|-----------|
| 0 – 50 | **Thalib Jadid** (Santri Baru) | Abu-abu |
| 51 – 200 | **Thalib Mustawa 1** | Hijau Muda |
| 201 – 500 | **Thalib Mustawa 2** | Hijau |
| 501 – 1000 | **Al-Mujib al-Mubtadi`** (Penjawab Pemula) | Biru Muda |
| 1001 – 2500 | **Al-Mujib al-Mutawassith** (Penjawab Madya) | Biru |
| 2501 – 5000 | **Al-Mujib al-Mutaqaddim** (Penjawab Lanjutan) | Emas |
| 5001 – 10000 | **Al-Mufid** (Yang Banyak Memberi Faedah) | Merah |
| 10001+ | **Al-`Allamah** (Sang Cendekiawan) | Ungu |

### 6.3 Badge

| **Badge** | **Syarat** | **Tipe** |
|-----------|-----------|----------|
| **Badge Perunggu** | | |
| 🥉 Penanya Pertama | Mengajukan 1 pertanyaan | Perunggu |
| 🥉 Penjawab Pertama | Menjawab 1 pertanyaan | Perunggu |
| 🥉 Referensi Pertama | Menambahkan 1 referensi kitab | Perunggu |
| 🥉 Vote 10 | Mendapat 10 upvotes total | Perunggu |
| **Badge Perak** | | |
| 🥈 Referensi Valid x10 | 10 referensi divalidasi Muraqi | Perak |
| 🥈 Jawaban Terbaik x5 | 5 jawaban dipilih sebagai terbaik | Perak |
| 🥈 100 Upvotes | Mendapat 100 upvotes total | Perak |
| **Badge Emas** | | |
| 🥇 Referensi Valid x50 | 50 referensi divalidasi | Emas |
| 🥇 Jawaban Terbaik x25 | 25 jawaban terbaik | Emas |
| 🥇 1000 Upvotes | Mendapat 1000 upvotes total | Emas |
| 🥇 Al-Mufid | Reputasi ≥ 5000 | Emas |

### 6.4 Opsi Nama & Gelar

Pengguna dapat memilih format tampilan nama:

| **Format** | **Contoh Tampilan** |
|------------|-------------------|
| Username Only | `@akhhmad_fauzi` |
| Username + Gelar Akademik | `Dr. Akhmad Fauzi, Lc., M.Ag.` |
| Username + Gelar Non-Akademik | `Al-Ustadz Akhmad Fauzi` |
| Username + Kunyah | `Abu Hudzaifah` |
| Kustom | Sesuai keinginan (tunduk pada validasi) |

> **Catatan:** Gelar akademik harus melalui verifikasi dokumen oleh Muraqi. Gelar non-akademik (seperti Al-Ustadz, Asy-Syaikh) diverifikasi berdasarkan kontribusi ilmiah (level reputasi ≥ Mujib Mutawassith).

---

## 7. ALUR KERJA (WORKFLOW)

### 7.1 Alur Bertanya

```
[Thalib] → Membuat Pertanyaan (Judul, Isi, Tag, Kategori)
    ↓
[Sistem] → Cek duplikasi (similar question detection)
    ↓
[Otomatis] → Status: HALL (Masih Dibahas)
    ↓
[Sistem] → Notifikasi ke pengguna dengan expertise di tag terkait
    ↓
[Mujib] → Memberikan jawaban (wajib menyertakan referensi kitab)
    ↓
[Thalib/Muraqi] → Review jawaban
    ↓
[Thalib] → Pilih jawaban terbaik → Status → TERSELESAIKAN
```

### 7.2 Alur Status Mauquf

```
[Pertanyaan Status: HALL]
    ↓
[Muraqi/Mujib Senior] → Menilai pertanyaan memerlukan kajian lebih lanjut
    ↓
[Memberi komentar alasan MAUQUF]
    ↓
[Status → MAUQUF] (ditangguhkan sementara)
    ↓
[Tim Kajian Khusus] → Meneliti
    ↓
[Hasil ditemukan] → Status → TERSELESAIKAN (dengan jawaban resmi)
    [Atau]
[Tidak dapat diselesaikan] → Status tetap MAUQUF (archived)
```

### 7.3 Alur Referensi

```
[Mujib menjawab]
    ↓
[Klik "Tambah Referensi"]
    ↓
[Form Referensi]
    ├─ Nama Kitab (autocomplete dari database kitab)
    ├─ Pengarang
    ├─ Jilid/Bab
    ├─ Halaman (nomor halaman cetakan tertentu)
    ├─ Penerbit & Tahun Cetak
    ├─ Teks Arab (kutipan asli kitab kuning)
    └─ Terjemah Indonesia (kutipan terjemahan)
    ↓
[Referensi tersimpan & ditampilkan di sidebar jawaban]
    ↓
[Muraqi] → Validasi referensi (centang/approved)
    ↓
[Badge referensi valid jika memenuhi syarat]
```

---

## 8. SISTEM STATUS PERTANYAAN

### 8.1 Definisi Status

| **Status** | **Label** | **Warna** | **Makna** | **Icon** |
|------------|-----------|-----------|-----------|----------|
| **HALL** | حَلّ | 🟡 **Kuning** | Masih dalam pembahasan, belum ada jawaban yang diterima | 🔄 |
| **MAUQUF** | مَوْقُوف | 🟠 **Oranye** | Ditangguhkan; memerlukan kajian lebih lanjut dari ahlinya | ⏸️ |
| **TERSELESAIKAN** | حَلَّ | 🟢 **Hijau** | Telah terjawab dan ada jawaban yang diterima/dipilih | ✅ |
| **MUGHLAQ** | مُغْلَق | 🔴 **Merah** | Ditutup oleh moderator (melanggar aturan, spam, dll.) | 🚫 |

### 8.2 Aturan Transisi Status

```
                    ┌──────────────────────────────┐
                    │         HALL (Baru)           │
                    │    Otomatis saat dibuat       │
                    └──────────┬───────────────────┘
                               │
              ┌────────────────┼────────────────────┐
              │                │                     │
              ▼                ▼                     ▼
    ┌──────────────┐  ┌──────────────┐   ┌──────────────────┐
    │ TERSELESAIKAN│  │   MAUQUF     │   │   MUGHLAQ        │
    │ Jawaban      │  │ Perlu kajian │   │ Melanggar aturan │
    │ diterima     │  │ lebih lanjut │   │                  │
    └──────────────┘  └──────────────┘   └──────────────────┘
```

### 8.3 Tampilan Status di UI

- **Halaman Daftar Pertanyaan**: Setiap card pertanyaan menampilkan badge status dengan warna dan ikon yang khas.
- **Filter by Status**: Pengguna bisa memfilter daftar pertanyaan berdasarkan status.
- **Halaman Detail Pertanyaan**: Status ditampilkan prominently di header, di samping judul.

---

## 9. SISTEM REFERENSI & KUTIPAN KITAB

### 9.1 Entitas Data Referensi

| **Field** | **Tipe** | **Contoh** |
|-----------|----------|------------|
| Nama Kitab | Text (autocomplete) | *Fat-hul Mu'in*
| Nama Pengarang | Text | *Syekh Zainuddin Al-Malibari*
| Jilid / Juz | Number (opsional) | Jilid 2
| Bab / Kitab | Text (opsional) | Kitab Ash-Shiyam
| Halaman | Number | Hal. 145
| Penerbit | Text (opsional) | Darul Fikr
| Tahun Cetak | Number (opsional) | 1420 H / 1999 M
| Teks Arab | Textarea (Arabic, RTL) | ...وَاللَّهُ أَعْلَمُ بِالصَّوَابِ
| Terjemah Indonesia | Textarea | *Dan Allah lebih mengetahui yang benar*
| Status Validasi | Enum | PENDING / VALID / TIDAK_VALID

### 9.2 Database Kitab (Master Data)

Platform akan menyediakan **master data kitab kuning populer** yang dapat dipilih pengguna:

| **Kitab** | **Pengarang** | **Bidang** |
|-----------|---------------|------------|
| Fat-hul Mu'in | Syekh Zainuddin Al-Malibari | Fikih Syafi'i |
| Fathul Qarib | Ibnu Qasim Al-Ghuzzi | Fikih Syafi'i |
| Al-Bajuri | Syekh Ibrahim Al-Bajuri | Fikih Syafi'i |
| I'anatuth Thalibin | Abu Bakr Syatha | Fikih Syafi'i |
| Al-Mahalli | Imam Jalaluddin Al-Mahalli | Fikih Syafi'i |
| Al-Mughni | Ibnu Qudamah | Fikih Hanbali |
| Al-Umm | Imam Asy-Syafi'i | Fikih Syafi'i |
| Bidayatul Mujtahid | Ibnu Rusyd | Fikih Perbandingan |
| Al-Asybah wan Nadha'ir | Imam As-Suyuthi | Qawa'id Fiqhiyyah |
| Alfiyah Ibnu Malik | Ibnu Malik | Nahwu |
| Syarh Ibnu Aqil | Ibnu Aqil | Nahwu |
| Al-Jurumiyyah | Ibnu Ajurrum | Nahwu |
| Al-Ajurumiyah | — | Nahwu (dasar) |
| Jam'ul Jawami' | Imam Subki | Ushul Fikih |
| Al-Waraqat | Imam Al-Juwaini | Ushul Fikih |
| Lubbul Ushul | Syekh Nawawi Al-Bantani | Ushul Fikih |
| (dan seterusnya — database dapat terus diperbarui secara kontributif) |

### 9.3 Tampilan Referensi di Jawaban

Setiap jawaban akan memiliki **panel/sidebar "Referensi"** yang mencantumkan semua rujukan yang digunakan:

```
┌──────────────────────────────────────┐
│  📚 REFERENSI (3)                    │
│                                      │
│  [1] Fathul Mu'in, Jil. 2, Hal. 145 │
│       نَوْمُهُ نَاقِضٌ لِلْوُضُوءِ   │
│       "Tidurnya membatalkan wudhu"   │
│       ✅ (Tervalidasi)               │
│                                      │
│  [2] Al-Bajuri, Jil. 1, Hal. 98     │
│       وَلَا نَقْضَ بِالشَّكِّ        │
│       "Tidak batal karena keraguan"  │
│       ⏳ (Menunggu Validasi)          │
│                                      │
│  [3] I'anatuth Thalibin, Hal. 210   │
│       ...وَاللَّهُ أَعْلَمُ          │
│       "Wallahu a'lam"               │
│       ✅ (Tervalidasi)               │
└──────────────────────────────────────┘
```

### 9.4 Pencarian Berdasarkan Kitab

Fitur ini memungkinkan pengguna mencari semua pertanyaan yang merujuk pada kitab tertentu → berguna untuk riset dan kajian tematik.

---

## 10. RICH TEXT EDITOR (WORD-LIKE)

### 10.1 Spesifikasi Editor

Platform menggunakan **TinyMCE** atau **Quill.js** atau **TipTap (ProseMirror)** dengan konfigurasi Word-like:

| **Fitur Editor** | **Ada** | **Keterangan** |
|-----------------|---------|----------------|
| Bold / Italic / Underline / Strikethrough | ✅ | Toolbar standar |
| Heading (H1-H4) | ✅ | Untuk struktur konten |
| Bullet List & Numbered List | ✅ | Daftar |
| Blockquote | ✅ | Untuk kutipan |
| Text Alignment | ✅ | Left, Center, Right, Justify |
| Insert Link | ✅ | Hyperlink |
| Insert Image | ✅ | Upload atau URL |
| Table | ✅ | Tabel dengan merge cell |
| RTL / LTR Toggle | ✅ | ***KRITIS*** untuk teks Arab |
| Arabic Font Support | ✅ | Traditional Arabic, Scheherazade New, dll. |
| Keyboard Shortcuts | ✅ | Ctrl+B, Ctrl+I, dll. |
| Code Block | ✅ | Untuk teks Arab dengan diakritik (harakat) |
| Superscript / Subscript | ✅ | Untuk catatan kaki |
| Undo / Redo | ✅ | Riwayat perubahan |
| Auto-save Draft | ✅ | LocalStorage / session |
| Word Count | ✅ | Hitung kata/karakter |
| Paste from Word | ✅ | Membersihkan format tidak perlu |

### 10.2 Integrasi Arabic Script

Editor harus mendukung **mode RTL (Right-to-Left)** yang dapat di-toggle dengan mudah karena pengguna perlu menulis:

- Teks **Arab** dengan harakat/syakkal (dari kitab kuning) → mode RTL
- Teks **Indonesia** atau campuran → mode LTR
- **Campuran** Arab-Indonesia dalam satu paragraf (inline bidirectional)

### 10.3 Toolbar Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [B] [I] [U] [S] | [H1] [H2] [H3] | [🔗] [🖼️] [📋]        │
│ [•] [1.] [❝] [≡] | [↔ RTL/LTR] [🔤 Arabic] | ↩️  ↪️       │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. DASHBOARD PENGGUNA

### 11.1 Halaman Dashboard

Setiap pengguna yang login memiliki dashboard pribadi dengan tampilan:

| **Seksi** | **Konten** |
|-----------|------------|
| **Sidebar Kiri** | Avatar, Nama/Gelar, Bio singkat, Level & Badge |
| **Statistik** | Total pertanyaan, total jawaban, total referensi, poin reputasi |
| **Tab: Pertanyaan Saya** | Daftar pertanyaan pengguna dengan status dan jumlah jawaban |
| **Tab: Jawaban Saya** | Daftar jawaban pengguna dengan vote count |
| **Tab: Bookmark** | Pertanyaan yang dibookmark |
| **Tab: Reputasi** | Timeline perubahan reputasi (aksi + poin + timestamp) |
| **Tab: Notifikasi** | Bell icon + daftar notifikasi |
| **Tab: Pengaturan** | Edit profil, ubah password, preferensi notifikasi |

### 11.2 Edit Profil (Word-like Experience)

Halaman edit profil menggunakan **interface yang familiar seperti Microsoft Word / Google Docs**:

- **Inline Editing**: Klik langsung pada field untuk mengedit
- **Preview Real-time**: Melihat perubahan sebelum menyimpan
- **Foto Profil**: Crop & resize dengan GUI (seperti crop tool Word)
- **Bio Editor**: Rich text (bisa format sederhana)

### 11.3 Notifikasi

| **Tipe Notifikasi** | **Trigger** |
|--------------------|-------------|
| 🔔 Pertanyaan Dijawab | Saat pertanyaan user mendapatkan jawaban baru |
| 💬 Komentar Baru | Saat ada komentar pada pertanyaan/jawaban user |
| 👍 Upvote Diterima | Saat pertanyaan/jawaban user mendapat upvote |
| ✅ Jawaban Terpilih | Saat jawaban user dipilih sebagai terbaik |
| 🏅 Badge Baru | Saat user mendapatkan badge baru |
| 📚 Referensi Tervalidasi | Saat referensi user divalidasi Muraqi |
| ⚠️ Peringatan Moderasi | Saat konten user dilaporkan/dihapus |

---

## 12. PERSYARATAN FUNGSIONAL

| **ID** | **Fungsional** | **Deskripsi** |
|--------|---------------|---------------|
| FR-01 | Registrasi & Login | Email dan password, dengan opsi OAuth (Google) |
| FR-02 | Manajemen Profil | Edit nama, gelar, bio, foto, sosmed, preferensi |
| FR-03 | CRUD Pertanyaan | Buat, baca, edit (window terbatas 30 menit), hapus (jika belum ada jawaban) |
| FR-04 | CRUD Jawaban | Buat, baca, edit (window 30 menit + riwayat edit) |
| FR-05 | Voting | Upvote & downvote dengan pembatasan (1 vote/user) |
| FR-06 | Komentar | Bersarang (nested) maksimal 2 level |
| FR-07 | Status Management | Ubah status HALL → MAUQUF → TERSELESAIKAN |
| FR-08 | Referensi Kitab | CRUD referensi, autocomplete kitab, validasi |
| FR-09 | Pencarian | Full-text search (judul, isi, tag, kitab, pengarang) |
| FR-10 | Filter & Sortir | Filter by status, kategori, tag, tanggal. Sort by votes, date, activity |
| FR-11 | Tag Management | Buat dan kelola tag (hierarki: Fikih → Thaharah → Wudhu) |
| FR-12 | Notifikasi | Real-time notifikasi (WebSocket/Push) |
| FR-13 | Bookmark | Simpan pertanyaan favorit per user |
| FR-14 | Leaderboard | Top users by reputasi (mingguan, bulanan, all-time) |
| FR-15 | Laporan/Report | Laporkan konten tidak sesuai |
| FR-16 | Riwayat Edit | Track perubahan jawaban dengan diff viewer |
| FR-17 | Ekspor PDF | Ekspor pertanyaan + jawaban ke PDF |
| FR-18 | Dark Mode | Toggle theme terang/gelap |

---

## 13. PERSYARATAN NON-FUNGSIONAL

| **ID** | **Aspek** | **Target** | **Keterangan** |
|--------|-----------|-----------|----------------|
| NFR-01 | **Performance** | Page Load < 2 detik | Untuk 10k pertanyaan |
| NFR-02 | **Concurrency** | Mendukung 500 user simultan | Scalable horizontal |
| NFR-03 | **Availability** | 99.5% uptime | Kecuali maintenance terjadwal |
| NFR-04 | **Security** | XSS Protection, CSRF, SQL Injection prevention | Input sanitasi ketat |
| NFR-05 | **Data Privacy** | Zona waktu, preferensi bahasa | GDPR-like compliance |
| NFR-06 | **SEO** | Indexable oleh search engine | Server-side rendering |
| NFR-07 | **Mobile Responsive** | 100% fitur di mobile | Mobile-first approach |
| NFR-08 | **Accessibility** | WCAG 2.1 Level AA | Aksesibilitas |
| NFR-09 | **Backup** | Daily backup database | Retention 30 hari |
| NFR-10 | **Arabic Support** | Full Unicode + RTL | Tampilan teks Arab sempurna |

---

## 14. SPESIFIKASI TEKNIS

### 14.1 Stack Rekomendasi

> **Filosofi**: Satu platform (Supabase) menggantikan seluruh backend infrastuktur — database, auth, storage, realtime, search, dan background jobs. Next.js menjadi satu-satunya server dengan Server Actions sebagai lapisan bisnis.

| **Lapisan** | **Teknologi** | **Alasan** |
|-------------|--------------|------------|
| **Frontend + API** | **Next.js 15+ (App Router)** | SSR/RSC untuk SEO, Server Actions gantikan REST API, performa tinggi |
| **UI Library** | **Tailwind CSS + shadcn/ui** | Konsisten, cepat, accessible, dark mode built-in |
| **Editor** | **TipTap (ProseMirror)** | Extensible, Word-like, RTL Arabic support |
| **Backend Platform** | **Supabase** | PostgreSQL + Auth + Storage + Realtime + Edge Functions dalam satu platform |
| **Database** | **Supabase PostgreSQL** | Full PostgreSQL (hosted), Row Level Security, pg_trgm, unaccent |
| **Auth** | **Supabase Auth** | Email/password, OAuth Google, magic link, session via httpOnly cookie |
| **Storage** | **Supabase Storage** | Bucket untuk avatar & gambar, CDN built-in, policy per bucket |
| **Realtime** | **Supabase Realtime** | PostgreSQL changes listener, gantikan WebSocket/Socket.io |
| **Search** | **PostgreSQL FTS** | `tsvector` + `pg_trgm` + `unaccent` + konfigurasi Arabic custom |
| **Background Jobs** | **Supabase Edge Functions** | Deno runtime, badge awarding, email notifikasi via Resend |
| **State Management** | **TanStack React Query + Zustand** | Server cache + client state |
| **Deployment** | **Vercel + Supabase Cloud** | Zero-config, auto-scaling, region Singapore |

### 14.2 Kenapa Supabase Cukup sebagai Backend?

| **Kebutuhan** | **Solusi Supabase** |
|---|---|
| PostgreSQL database | ✅ Hosted PostgreSQL penuh (termasuk extensions) |
| Auth (email, OAuth) | ✅ Built-in multi-provider auth |
| JWT & session | ✅ Otomatis dikelola, httpOnly cookie |
| Role-based access | ✅ Row Level Security (RLS) policies |
| File upload & CDN | ✅ Supabase Storage + CDN |
| Notifikasi realtime | ✅ Supabase Realtime channels |
| Full-text search | ✅ PostgreSQL FTS dengan Arabic config |
| Background jobs | ✅ Edge Functions (Deno) |
| Email transaksional | ✅ Built-in SMTP / integrasi Resend |
| Caching | ✅ Next.js ISR + `unstable_cache` |

### 14.3 Struktur Database (Core Entities)

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  profiles   │───▶│  questions   │◀───│    tags     │
│ (auth.users)│    └──────┬───────┘    └─────────────┘
└─────────────┘           │
       │                  ▼
       │           ┌──────────────┐
       ├──────────▶│   answers    │
       │           └──────┬───────┘
       │                  │
       │                  ▼
       │           ┌──────────────┐    ┌──────────────┐
       ├──────────▶│  references  │───▶│ kitab_master │
       │           └──────────────┘    └──────────────┘
       │
       ▼
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│    votes    │    │   comments   │    │  user_badges │
└─────────────┘    └──────────────┘    └──────────────┘
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│  bookmarks  │    │notifications │    │reputation_log│
└─────────────┘    └──────────────┘    └──────────────┘
```

Semua relasi dikelola PostgreSQL native (FK + CASCADE). RLS policy menggantikan role middleware.

---

## 15. UI/UX GUIDELINES

### 15.1 Design Principles

1. **Ilmiah & Khidmat**: Nuansa Islami yang profesional — warna hijau, emas, putih, dengan kaligrafi minimalis.
2. **Familiar**: Tampilan seperti StackOverflow (familiar bagi developer) + nuansa Islami.
3. **Jelas & Terstruktur**: Setiap elemen memiliki hierarki visual yang jelas.
4. **Mobile-First**: Responsif di segala perangkat, terutama smartphone (mayoritas pengguna).

### 15.2 Color Palette

| **Warna** | **Kode Hex** | **Penggunaan** |
|-----------|-------------|----------------|
| Primary (Hijau Islami) | `#1B6B4A` | Navbar, tombol utama, link |
| Primary Light | `#2E8B5E` | Hover, aksen |
| Secondary (Emas) | `#C9A84C` | Badge, icon, aksen premium |
| Background | `#F9FAFB` | Latar utama |
| Card Background | `#FFFFFF` | Card, konten |
| Text Primary | `#111827` | Judul, konten utama |
| Text Secondary | `#6B7280` | Deskripsi, metadata |
| Success (Hijau) | `#10B981` | Status TERSELESAIKAN |
| Warning (Kuning) | `#F59E0B` | Status HALL |
| Danger (Merah) | `#EF4444` | Status MUGHLAQ, error |
| Mauquf (Oranye) | `#F97316` | Status MAUQUF |

### 15.3 Layout Utama

```
┌──────────────────────────────────────────────────────────┐
│  🌙 Manhajuna  🔍 Cari...  [Tags] [Users]  [Login] [Daftar] │  ← NAVBAR
├──────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────────────────────────────┐ │
│  │ 🏠 Home    │  │  Pertanyaan Terbaru              │ │
│  │ ❓ Questions│  │                                    │ │
│  │ 🏅 Badges  │  │  ┌──────────────────────────────┐ │ │
│  │ 📚 Kitab   │  │  │ 🟡 HALL                       │ │ │
│  │ 👥 Users   │  │  │ Bagaimana hukum ...?          │ │ │
│  │            │  │  │ fikih · thaharah · wudhu      │ │ │
│  │ [FILTER]   │  │  │ 5 jawaban · 12 votes         │ │ │
│  │ □ HALL     │  │  │ @user · 2 jam lalu           │ │ │
│  │ □ MAUQUF   │  │  └──────────────────────────────┘ │ │
│  │ □ TERSELES.│  │  ┌──────────────────────────────┐ │ │
│  │ □ MUGHLAQ  │  │  │ 🟢 TERSELESAIKAN             │ │ │
│  │            │  │  │ Hukum jual beli ...          │ │ │
│  │            │  │  │ muamalah · jual beli         │ │ │
│  │            │  │  │ 3 jawaban · 25 votes         │ │ │
│  │            │  │  │ @faqih · 5 jam lalu          │ │ │
│  │            │  │  └──────────────────────────────┘ │ │
│  │            │  │                                    │ │
│  └────────────┘  └────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│  Footer: Tentang | Kebijakan | Syarat & Ketentuan        │
└──────────────────────────────────────────────────────────┘
```

### 15.4 Halaman Detail Pertanyaan

```
┌──────────────────────────────────────────────────────────┐
│  🟡 HALL  [Judul Pertanyaan]                             │
│  Tags: fikih · thaharah · wudhu                          │
│  @user · 2 jam lalu · 128 views                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [Isi pertanyaan — rich text]                            │
│  "Assalamu'alaikum... bagaimanakah hukum..."             │
│                                                          │
│  ▲ 12 ▼     [Jawab]  [Bookmark]  [Laporkan]             │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ~~ 3 Jawaban ~~                                        │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Jawaban 1  — @ustadz_faqih  🥇 Jawaban Terbaik   │ │
│  │ +25 / -3        🏅 Mujib Mutaqaddim (3500 pts)   │ │
│  │                                                    │ │
│  │ [Jawaban rich text dengan referensi]               │ │
│  │                                                    │ │
│  │ ┌─ 📚 REFERENSI ─────────────────────────────────┐ │ │
│  │ │ [1] Fathul Mu'in, Hal. 145                    │ │ │
│  │ │     نَوْمُهُ نَاقِضٌ لِلْوُضُوءِ             │ │ │
│  │ │     ✅ Tervalidasi                            │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  │ ── Komentar (2) ──                                │ │
│  │ @user2: Apakah ada dalil lain?                    │ │
│  │ @ustadz_faqih: Iya, dalam Al-Bajuri...             │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## 16. HIRARKI DATABASE

### Tabel Core

| **Entity** | **Key Fields** | **Relasi** |
|-----------|----------------|------------|
| **User** | id, email, passwordHash, username, displayName, gelar, bio, avatar, role, reputation, createdAt | — |
| **Question** | id, title, content (JSON rich text), slug, userId, status (HALL/MAUQUF/TERSELESAIKAN/MUGHLAQ), views, upvotes, downvotes, acceptedAnswerId, createdAt, updatedAt | User (FK), Tags (M:N) |
| **Answer** | id, content (JSON rich text), questionId, userId, isAccepted, upvotes, downvotes, createdAt, updatedAt | Question (FK), User (FK) |
| **Reference** | id, kitabId, answerId, jilid, halaman, teksArab, terjemah, validationStatus, createdAt | KitabMaster (FK), Answer (FK) |
| **KitabMaster** | id, namaArab, namaLatin, pengarang, bidang, penerbit, tahunCetak | — |
| **Tag** | id, name, slug, description, parentId | Self-referencing (hierarki) |
| **Vote** | id, userId, targetId, targetType (question/answer), value (+1/-1), createdAt | User (FK) |
| **Comment** | id, content, userId, targetId, targetType, parentId, createdAt | User (FK) |
| **Badge** | id, name, type (bronze/silver/gold), icon, description, criteria | — |
| **UserBadge** | id, userId, badgeId, earnedAt | User (FK), Badge (FK) |
| **Bookmark** | id, userId, questionId, createdAt | User (FK), Question (FK) |
| **Notification** | id, userId, type, message, isRead, link, createdAt | User (FK) |

### Index Strategy

| **Index** | **Tujuan** |
|-----------|-----------|
| idx_question_status | Filter by status cepat |
| idx_question_created | Sortir by waktu |
| idx_vote_target | Vote count per target |
| idx_reference_kitab | Pencarian by kitab |
| idx_user_reputation | Leaderboard |
| idx_search (GIN/trigram) | Full-text search |

---

## 17. ROADMAP & TIMELINE

### Fase 1: Foundation (Q3 2026 — 3 Bulan)

| **Sprint** | **Fokus** | **Deliverable** |
|-----------|-----------|-----------------|
| Sprint 1-2 | Setup & Auth | Infrastruktur, database, auth, user management |
| Sprint 3-4 | Q&A Core | CRUD pertanyaan & jawaban, vote, komentar |
| Sprint 5 | Status System | HALL/MAUQUF/TERSELESAIKAN workflow |
| Sprint 6 | Rich Text Editor | Integrasi editor WYSIWYG + Arabic RTL support |

**Milestone 1:** ✅ Core Q&A berfungsi — pengguna bisa bertanya, menjawab, vote, dengan status dasar.

### Fase 2: Reputasi & Referensi (Q4 2026 — 3 Bulan)

| **Sprint** | **Fokus** | **Deliverable** |
|-----------|-----------|-----------------|
| Sprint 7-8 | Reputation System | Poin, level, gelar otomatis |
| Sprint 9 | Badge System | Bronze/Silver/Gold badges + earn logic |
| Sprint 10 | Reference System | Tambah referensi, master kitab, validasi |
| Sprint 11 | Search | Full-text search + filter + pagination |

**Milestone 2:** ✅ Sistem reputasi dan referensi lengkap.

### Fase 3: Dashboard & Community (Q1 2027 — 3 Bulan)

| **Sprint** | **Fokus** | **Deliverable** |
|-----------|-----------|-----------------|
| Sprint 12-13 | Dashboard | Dashboard user, profil, statistik, riwayat |
| Sprint 14 | Notifikasi | Real-time notifikasi, preferensi |
| Sprint 15 | Moderation Tools | Report system, Muraqi panel, bulk actions |

**Milestone 3:** ✅ Dashboard dan tools komunitas siap.

### Fase 4: Polish & Launch (Q1 2027 — Bulan Terakhir)

| **Sprint** | **Fokus** | **Deliverable** |
|-----------|-----------|-----------------|
| Sprint 16 | Performance | Load testing, optimasi query, caching |
| Sprint 17 | Security | Security audit, penetration testing |
| Sprint 18 | Beta Launch | Beta terbatas, bug fixing, feedback loop |

**Milestone 4:** 🚀 **Public Launch**

### Fase 5: Post-Launch (Q2 2027 — Ongoing)

| **Fitur** | **Prioritas** |
|-----------|--------------|
| Leaderboard & Kompetisi Mingguan | P1 |
| Ekspor PDF Pertanyaan + Jawaban | P1 |
| Dark Mode | P2 |
| Integrasi PDF Kitab Digital (tautan langsung) | P2 |
| API Publik untuk Developer | P2 |
| Mobile App (React Native / Flutter) | P3 |
| AI-powered similar question detection | P3 |
| Forum Diskusi (non-Q&A) | P3 |

---

## 18. METRIK KESUKSESAN (OKR/KPI)

| **Objective** | **Key Result** |
|--------------|----------------|
| **Adopsi Pengguna** | 50.000 pengguna terdaftar dalam 12 bulan |
| **Konten Berkualitas** | 5.000 pertanyaan terjawab dengan TERSELESAIKAN |
| **Engagement** | DAU ≥ 2.500 dengan rata-rata session ≥ 8 menit |
| **Kualitas Jawaban** | ≥ 90% jawaban memiliki minimal 1 referensi kitab |
| **Referensi Tervalidasi** | ≥ 5.000 referensi kitab tervalidasi oleh Muraqi |
| **Retensi** | 40% pengguna kembali dalam 30 hari setelah registrasi |
| **Kepuasan** | CSAT ≥ 85% dari survei bulanan |

---

## 19. RISIKO & MITIGASI

| **Risiko** | **Dampak** | **Probabilitas** | **Mitigasi** |
|-----------|-----------|------------------|--------------|
| Konten tidak berkualitas / asal-asalan | Tinggi | Medium | Sistem reputasi ketat, review oleh Muraqi, batas harian pertanyaan untuk user baru |
| Plagiarisme jawaban | Medium | Medium | Deteksi duplikasi konten, riwayat edit transparan |
| Konflik ilmiah/debat tidak produktif | Medium | Tinggi | Sistem komentar terstruktur, fitur "sanggahan ilmiah" dengan referensi, intervensi Muraqi |
| Pertanyaan sensitif (khilafiyah besar) | Tinggi | Medium | Filter otomatis, review manual oleh Muraqi, status MAUQUF untuk topik sensitif |
| Server overload | Tinggi | Rendah | Auto-scaling, CDN, caching layer |
| Penyalahgunaan gelar/claim keahlian palsu | Medium | Medium | Verifikasi dokumen untuk gelar akademik, gelar non-akademik berdasarkan level reputasi |

### Aturan Konten Sensitif

Topik-topik berikut memerlukan **approval khusus Muraqi** sebelum dipublikasikan:

- Khilafiyah antar madzhab (ibadah praktis yang kontroversial)
- Topik politik kontemporer yang terkait agama
- Fatwa yang menyangkut kemaslahatan umum
- Kritik terhadap tokoh/ulama tertentu

---

## 20. GLOSARIUM

| **Istilah** | **Arti** |
|------------|----------|
| **Thalib** | Penuntut ilmu, pengguna yang bertanya |
| **Mujib** | Penjawab, pemberi jawaban |
| **Muraqi** | Moderator, pengawas kualitas konten |
| **Mudir** | Admin sistem |
| **HALL** | حَلّ — status pertanyaan masih dalam pembahasan |
| **MAUQUF** | مَوْقُوف — status ditangguhkan |
| **TERSELESAIKAN** | Status pertanyaan telah terjawab |
| **MUGHLAQ** | مُغْلَق — status ditutup oleh moderator |
| **Kitab Kuning / Turats** | Kitab klasik Islam berbahasa Arab (tanpa harakat) yang menjadi rujukan di pesantren |
| **Kitab Mu'tabar** | Kitab yang diakui otoritasnya di kalangan ulama Ahlussunnah wal Jama'ah |
| **Waqiiyah** | Masalah/kasus kontemporer yang memerlukan kajian fikih |
| **Khilafiyah** | Perbedaan pendapat di kalangan ulama/madzhab |
| **Kunyah** | Nama panggilan Arab diawali "Abu" (bapak dari) atau "Ummu" (ibu dari) |
| **Syakk** | Keraguan (istilah dalam fikih) |

---

## 21. PERENCANAAN PROGRAM UNTUK DEVELOPER

### 21.1 Arsitektur Proyek (Single App)

Proyek menggunakan **satu aplikasi Next.js** (bukan monorepo terpisah). Backend sepenuhnya dihandle oleh **Supabase** — tidak ada server Express.js terpisah. Struktur lebih sederhana, lebih cepat di-setup, dan lebih mudah di-maintain.

```
manhajuna/                          # Root project (satu folder)
├── src/                            # Seluruh source code
│   ├── app/                        # Next.js App Router
│   ├── components/                 # UI Components
│   ├── lib/                        # Utilities & Supabase clients
│   ├── hooks/                      # Custom React hooks
│   ├── store/                      # Zustand state management
│   └── types/                      # TypeScript types (auto-generated)
│
├── supabase/                       # ← Supabase project config
│   ├── migrations/                 # SQL schema migrations
│   ├── functions/                  # Edge Functions (Deno)
│   ├── seed.sql                    # Data awal (kitab, tag, badge)
│   └── config.toml                 # Supabase local config
│
├── public/                         # Static assets
│   └── fonts/                      # Arabic fonts
├── .github/
│   └── workflows/                  # CI/CD pipelines
├── middleware.ts                   # Next.js Edge Middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Keuntungan vs monorepo sebelumnya:**
- Tidak perlu Docker untuk development (Supabase CLI `supabase start` cukup)
- 1 `package.json` → tidak perlu Turborepo, `pnpm workspaces`
- Deploy lebih mudah: Vercel otomatis detect Next.js
- Tidak ada context-switching antara dua codebase

### 21.2 Struktur Lengkap Folder (Next.js + Supabase)

```
manhajuna/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (auth)/                       # Route group — halaman auth
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── callback/route.ts         # OAuth callback handler Supabase
│   │   ├── (main)/                       # Route group — halaman utama
│   │   │   ├── layout.tsx                # Layout dengan Navbar + Sidebar
│   │   │   ├── questions/
│   │   │   │   ├── page.tsx              # Daftar pertanyaan (SSR + filter)
│   │   │   │   ├── [slug]/page.tsx       # Detail pertanyaan
│   │   │   │   └── ask/page.tsx          # Form buat pertanyaan
│   │   │   ├── tags/
│   │   │   │   ├── page.tsx              # Daftar semua tag
│   │   │   │   └── [slug]/page.tsx       # Tag detail + pertanyaan
│   │   │   ├── users/[username]/page.tsx # Profil publik user
│   │   │   ├── dashboard/page.tsx        # Dashboard pribadi (protected)
│   │   │   ├── leaderboard/page.tsx      # Leaderboard reputasi
│   │   │   └── kitab/page.tsx            # Direktori kitab kuning
│   │   ├── api/                          # Next.js API Routes (minimal)
│   │   │   ├── search/route.ts           # Full-text search endpoint
│   │   │   └── webhooks/
│   │   │       └── supabase/route.ts     # Supabase webhook handler
│   │   ├── layout.tsx                    # Root layout
│   │   ├── providers.tsx                 # QueryClient, Theme, Supabase providers
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/                       # UI Components (sama seperti sebelumnya)
│   │   ├── ui/                           # shadcn/ui atoms
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Avatar.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── question/
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── QuestionDetail.tsx
│   │   │   ├── QuestionForm.tsx
│   │   │   ├── StatusBadge.tsx           # Badge HALL/MAUQUF/TERSELESAIKAN
│   │   │   └── SimilarQuestions.tsx
│   │   ├── answer/
│   │   │   ├── AnswerCard.tsx
│   │   │   ├── AnswerForm.tsx
│   │   │   ├── ReferenceSidebar.tsx
│   │   │   └── ReferenceForm.tsx
│   │   ├── vote/VoteButton.tsx
│   │   ├── comment/CommentThread.tsx
│   │   ├── user/
│   │   │   ├── UserProfile.tsx
│   │   │   ├── UserCard.tsx
│   │   │   ├── ReputationBadge.tsx
│   │   │   └── DisplayName.tsx
│   │   ├── notification/NotificationBell.tsx
│   │   └── editor/
│   │       ├── RichEditor.tsx
│   │       ├── ArabicToolbar.tsx
│   │       └── ReferencePicker.tsx
│   │
│   ├── lib/
│   │   ├── supabase/                     # ← BARU: Supabase clients
│   │   │   ├── client.ts                 # Browser client (untuk CSR)
│   │   │   ├── server.ts                 # Server client (SSR/Server Actions)
│   │   │   ├── middleware.ts             # updateSession helper
│   │   │   └── admin.ts                 # Service role client (webhook/edge fn)
│   │   ├── actions/                      # ← BARU: Next.js Server Actions
│   │   │   ├── question.actions.ts       # createQuestion, updateStatus, deleteQuestion
│   │   │   ├── answer.actions.ts         # submitAnswer, acceptAnswer
│   │   │   ├── vote.actions.ts           # castVote (optimistic)
│   │   │   ├── comment.actions.ts        # addComment, deleteComment
│   │   │   ├── reference.actions.ts      # addReference, validateReference
│   │   │   ├── user.actions.ts           # updateProfile, uploadAvatar
│   │   │   └── bookmark.actions.ts       # toggleBookmark
│   │   ├── queries/                      # ← BARU: Server-side data fetching
│   │   │   ├── questions.ts              # getQuestions, getQuestionBySlug
│   │   │   ├── answers.ts                # getAnswersByQuestion
│   │   │   ├── users.ts                  # getProfile, getLeaderboard
│   │   │   ├── kitab.ts                  # searchKitab (autocomplete)
│   │   │   └── search.ts                 # fullTextSearch
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validators.ts                 # Zod schemas
│   │
│   ├── hooks/                            # Custom React hooks (client-side)
│   │   ├── useSupabaseRealtime.ts        # ← BARU: Realtime notifications
│   │   ├── useAuth.ts                    # Supabase session hook
│   │   ├── useVote.ts                    # Vote dengan optimistic update
│   │   ├── useDebounce.ts
│   │   ├── useInfiniteScroll.ts
│   │   └── useNotification.ts
│   │
│   ├── store/
│   │   ├── authStore.ts                  # Supabase user session
│   │   ├── editorStore.ts                # Draft autosave
│   │   └── uiStore.ts                    # Theme, sidebar
│   │
│   └── types/
│       └── database.types.ts             # ← AUTO-GENERATED: supabase gen types
│
├── supabase/                             # ← BARU: Supabase project
│   ├── migrations/
│   │   ├── 001_initial_schema.sql        # Semua tabel core
│   │   ├── 002_rls_policies.sql          # Row Level Security
│   │   ├── 003_functions.sql             # PostgreSQL functions
│   │   ├── 004_triggers.sql              # Vote counters, reputation, level
│   │   └── 005_search_config.sql         # Full-text search Arabic
│   ├── functions/                        # Supabase Edge Functions (Deno)
│   │   ├── check-badges/index.ts         # Award badge setelah aksi
│   │   ├── send-notification/index.ts    # Email notifikasi via Resend
│   │   └── process-moderation/index.ts   # Auto-flag konten sensitif
│   ├── seed.sql                          # 40+ kitab, tag hierarki, badge data
│   └── config.toml
│
├── public/
│   └── fonts/                            # Scheherazade New, Traditional Arabic
├── middleware.ts                         # Next.js Edge Middleware (auth)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 21.3 Supabase Database Schema (SQL)

Seluruh schema database didefinisikan dalam SQL migration files di folder `supabase/migrations/`. Tidak ada ORM — menggunakan PostgreSQL native dengan Supabase typed client.

#### migrations/001_initial_schema.sql

```sql
-- ─── EXTENSIONS ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- Trigram search
CREATE EXTENSION IF NOT EXISTS "unaccent";   -- Normalisasi karakter
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- UUID generation

-- ─── ENUM TYPES ──────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('ZAIR', 'THALIB', 'MUJIB', 'MURAQI', 'MUDIR');
CREATE TYPE question_status AS ENUM ('HALL', 'MAUQUF', 'TERSELESAIKAN', 'MUGHLAQ');
CREATE TYPE vote_target AS ENUM ('QUESTION', 'ANSWER');
CREATE TYPE validation_status AS ENUM ('PENDING', 'VALID', 'TIDAK_VALID');
CREATE TYPE notification_type AS ENUM (
  'NEW_ANSWER', 'NEW_COMMENT', 'UPVOTE', 'ANSWER_ACCEPTED',
  'BADGE_EARNED', 'REFERENCE_VALIDATED', 'MOD_WARNING', 'STATUS_CHANGED'
);
CREATE TYPE badge_tier AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- ─── PROFILES (extends Supabase auth.users) ──────────────
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username        TEXT UNIQUE NOT NULL,
  display_name    TEXT,
  gelar           TEXT,
  kunyah          TEXT,
  show_gelar      BOOLEAN DEFAULT false,
  show_kunyah     BOOLEAN DEFAULT false,
  bio             TEXT,
  avatar_url      TEXT,
  role            user_role DEFAULT 'THALIB',
  reputation      INT DEFAULT 0,
  level           INT DEFAULT 1,
  is_verified     BOOLEAN DEFAULT false,
  is_banned       BOOLEAN DEFAULT false,
  banned_until    TIMESTAMPTZ,
  email_notifications BOOLEAN DEFAULT true,
  dark_mode       BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  last_login_at   TIMESTAMPTZ
);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_reputation ON profiles(reputation DESC);

-- ─── KITAB MASTER ────────────────────────────────────────
CREATE TABLE kitab_master (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_arab   VARCHAR(300) NOT NULL,
  nama_latin  VARCHAR(300) NOT NULL,
  pengarang   VARCHAR(300) NOT NULL,
  bidang      TEXT,
  penerbit    TEXT,
  tahun_cetak TEXT,
  deskripsi   TEXT,
  cover_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_kitab_nama_latin ON kitab_master(nama_latin);
CREATE INDEX idx_kitab_bidang ON kitab_master(bidang);
-- Trigram index untuk autocomplete
CREATE INDEX idx_kitab_trgm ON kitab_master USING GIN (nama_latin gin_trgm_ops);

-- ─── TAGS (dengan hierarki) ───────────────────────────────
CREATE TABLE tags (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(100) UNIQUE NOT NULL,
  slug          VARCHAR(120) UNIQUE NOT NULL,
  description   TEXT,
  color         TEXT,
  icon          TEXT,
  parent_id     UUID REFERENCES tags(id),
  question_count INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_parent ON tags(parent_id);

-- ─── QUESTIONS ────────────────────────────────────────────
CREATE TABLE questions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             VARCHAR(300) NOT NULL,
  slug              VARCHAR(400) UNIQUE NOT NULL,
  content           JSONB NOT NULL,        -- TipTap JSON
  content_text      TEXT NOT NULL,         -- Plain text untuk search
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status            question_status DEFAULT 'HALL',
  views             INT DEFAULT 0,
  upvotes           INT DEFAULT 0,         -- Denormalized counter
  downvotes         INT DEFAULT 0,         -- Denormalized counter
  total_answers     INT DEFAULT 0,
  accepted_answer_id UUID UNIQUE,
  mughlaq_reason    TEXT,
  muraqi_id         UUID REFERENCES profiles(id),
  search_vector     TSVECTOR,              -- Full-text search vector
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_slug ON questions(slug);
CREATE INDEX idx_questions_user ON questions(user_id);
CREATE INDEX idx_questions_created ON questions(created_at DESC);
CREATE INDEX idx_questions_status_created ON questions(status, created_at DESC);
CREATE INDEX idx_questions_search ON questions USING GIN(search_vector);

-- ─── ANSWERS ──────────────────────────────────────────────
CREATE TABLE answers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content     JSONB NOT NULL,
  content_text TEXT NOT NULL,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_accepted BOOLEAN DEFAULT false,
  upvotes     INT DEFAULT 0,
  downvotes   INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_answers_user ON answers(user_id);
CREATE INDEX idx_answers_votes ON answers(upvotes DESC);

-- ─── QUESTION_TAGS ────────────────────────────────────────
CREATE TABLE question_tags (
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  tag_id      UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, tag_id)
);

-- ─── REFERENCES ───────────────────────────────────────────
CREATE TABLE "references" (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id         UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  kitab_id          UUID NOT NULL REFERENCES kitab_master(id),
  jilid             TEXT,
  bab               TEXT,
  halaman           TEXT,
  teks_arab         TEXT,
  terjemah          TEXT,
  catatan           TEXT,
  validation_status validation_status DEFAULT 'PENDING',
  validated_by_id   UUID REFERENCES profiles(id),
  validated_at      TIMESTAMPTZ,
  rejection_reason  TEXT,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_refs_kitab ON "references"(kitab_id);
CREATE INDEX idx_refs_answer ON "references"(answer_id);
CREATE INDEX idx_refs_validation ON "references"(validation_status);

-- ─── VOTES ────────────────────────────────────────────────
CREATE TABLE votes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id   UUID NOT NULL,
  target_type vote_target NOT NULL,
  value       SMALLINT NOT NULL CHECK (value IN (1, -1)),
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, target_id, target_type)  -- 1 vote per user per target
);
CREATE INDEX idx_votes_target ON votes(target_id, target_type);

-- ─── COMMENTS ─────────────────────────────────────────────
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content     TEXT NOT NULL,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id   UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('QUESTION', 'ANSWER')),
  parent_id   UUID REFERENCES comments(id),  -- max 2 level
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_comments_target ON comments(target_id, target_type);

-- ─── BADGES ───────────────────────────────────────────────
CREATE TABLE badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) UNIQUE NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT NOT NULL,
  tier        badge_tier NOT NULL,
  criteria    JSONB NOT NULL,  -- { type: 'upvotes', count: 100 }
  display_order INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_badges (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id  UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

-- ─── BOOKMARKS ────────────────────────────────────────────
CREATE TABLE bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, question_id)
);

-- ─── NOTIFICATIONS ────────────────────────────────────────
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type       notification_type NOT NULL,
  title      VARCHAR(200) NOT NULL,
  message    TEXT NOT NULL,
  link       TEXT,
  is_read    BOOLEAN DEFAULT false,
  image_url  TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- ─── REPUTATION LOG ───────────────────────────────────────
CREATE TABLE reputation_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  points       INT NOT NULL,
  reason       TEXT NOT NULL,  -- 'UPVOTE_ANSWER', 'ANSWER_ACCEPTED', dll
  reference_id UUID,           -- ID terkait (question/answer)
  created_at   TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_rep_log_user ON reputation_logs(user_id);
CREATE INDEX idx_rep_log_created ON reputation_logs(created_at DESC);
```

#### migrations/002_rls_policies.sql — Row Level Security

RLS **menggantikan** `auth.middleware.ts` dan `role.middleware.ts` dari Express. Setiap akses database sudah otomatis terproteksi:

```sql
-- Aktifkan RLS di semua tabel
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Helper function: ambil role user dari auth.uid()
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_banned_user()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(is_banned, false) FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (id = auth.uid());

-- QUESTIONS: semua bisa baca, user terautentikasi bisa buat
CREATE POLICY "questions_public_read" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_auth_insert" ON questions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND NOT is_banned_user());
CREATE POLICY "questions_owner_or_mod_update" ON questions FOR UPDATE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "questions_mod_delete" ON questions FOR DELETE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));

-- ANSWERS: sama dengan questions
CREATE POLICY "answers_public_read" ON answers FOR SELECT USING (true);
CREATE POLICY "answers_auth_insert" ON answers FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND NOT is_banned_user());
CREATE POLICY "answers_owner_or_mod_update" ON answers FOR UPDATE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));
CREATE POLICY "answers_mod_delete" ON answers FOR DELETE
  USING (user_id = auth.uid() OR get_user_role() IN ('MURAQI', 'MUDIR'));

-- VOTES: user hanya bisa manage vote sendiri
CREATE POLICY "votes_own_all" ON votes FOR ALL USING (user_id = auth.uid());

-- REFERENCES: publik baca, owner insert, Muraqi validasi
CREATE POLICY "refs_public_read" ON "references" FOR SELECT USING (true);
CREATE POLICY "refs_owner_insert" ON "references" FOR INSERT
  WITH CHECK (auth.uid() = (SELECT user_id FROM answers WHERE id = answer_id));
CREATE POLICY "refs_owner_or_muraqi_update" ON "references" FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM answers WHERE id = answer_id)
    OR get_user_role() IN ('MURAQI', 'MUDIR')
  );

-- NOTIFICATIONS: hanya user sendiri yang bisa lihat
CREATE POLICY "notif_own_only" ON notifications FOR ALL USING (user_id = auth.uid());

-- BOOKMARKS: hanya user sendiri
CREATE POLICY "bookmarks_own_only" ON bookmarks FOR ALL USING (user_id = auth.uid());

-- KITAB & TAGS & BADGES: publik baca, Muraqi/Mudir yang bisa edit
ALTER TABLE kitab_master ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kitab_public_read" ON kitab_master FOR SELECT USING (true);
CREATE POLICY "kitab_muraqi_write" ON kitab_master FOR ALL
  USING (get_user_role() IN ('MURAQI', 'MUDIR'));
```

#### migrations/004_triggers.sql — Otomasi via DB Triggers

Logika bisnis yang sebelumnya ada di `reputation.service.ts` dan `vote.service.ts` Express, kini dipindah ke PostgreSQL triggers:

```sql
-- TRIGGER 1: Update vote counters (denormalized) setiap ada vote
CREATE OR REPLACE FUNCTION update_vote_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'QUESTION' THEN
      UPDATE questions SET
        upvotes   = upvotes   - CASE WHEN OLD.value = 1 THEN 1 ELSE 0 END,
        downvotes = downvotes - CASE WHEN OLD.value = -1 THEN 1 ELSE 0 END
      WHERE id = OLD.target_id;
    ELSE
      UPDATE answers SET
        upvotes   = upvotes   - CASE WHEN OLD.value = 1 THEN 1 ELSE 0 END,
        downvotes = downvotes - CASE WHEN OLD.value = -1 THEN 1 ELSE 0 END
      WHERE id = OLD.target_id;
    END IF;
  ELSE
    IF NEW.target_type = 'QUESTION' THEN
      UPDATE questions SET
        upvotes   = upvotes   + CASE WHEN NEW.value = 1 THEN 1 ELSE 0 END,
        downvotes = downvotes + CASE WHEN NEW.value = -1 THEN 1 ELSE 0 END
      WHERE id = NEW.target_id;
    ELSE
      UPDATE answers SET
        upvotes   = upvotes   + CASE WHEN NEW.value = 1 THEN 1 ELSE 0 END,
        downvotes = downvotes + CASE WHEN NEW.value = -1 THEN 1 ELSE 0 END
      WHERE id = NEW.target_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_vote_counters
  AFTER INSERT OR UPDATE OR DELETE ON votes
  FOR EACH ROW EXECUTE FUNCTION update_vote_counters();

-- TRIGGER 2: Update level pengguna berdasarkan reputation
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level := CASE
    WHEN NEW.reputation BETWEEN 0 AND 50      THEN 1  -- Thalib Jadid
    WHEN NEW.reputation BETWEEN 51 AND 200    THEN 2  -- Mustawa 1
    WHEN NEW.reputation BETWEEN 201 AND 500   THEN 3  -- Mustawa 2
    WHEN NEW.reputation BETWEEN 501 AND 1000  THEN 4  -- Al-Mujib al-Mubtadi'
    WHEN NEW.reputation BETWEEN 1001 AND 2500 THEN 5  -- Al-Mujib al-Mutawassith
    WHEN NEW.reputation BETWEEN 2501 AND 5000 THEN 6  -- Al-Mujib al-Mutaqaddim
    WHEN NEW.reputation BETWEEN 5001 AND 10000 THEN 7 -- Al-Mufid
    ELSE 8                                            -- Al-'Allamah
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_level
  BEFORE UPDATE OF reputation ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_level();

-- TRIGGER 3: Update search_vector saat question dibuat/diubah
CREATE OR REPLACE FUNCTION update_question_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.content_text, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_question_search
  BEFORE INSERT OR UPDATE OF title, content_text ON questions
  FOR EACH ROW EXECUTE FUNCTION update_question_search_vector();

-- TRIGGER 4: Auto-create profile saat user register via Supabase Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- TRIGGER 5: Update total_answers di questions
CREATE OR REPLACE FUNCTION update_answer_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE questions SET total_answers = total_answers + 1 WHERE id = NEW.question_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE questions SET total_answers = total_answers - 1 WHERE id = OLD.question_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_answer_count
  AFTER INSERT OR DELETE ON answers
  FOR EACH ROW EXECUTE FUNCTION update_answer_count();
```

### 21.4 Server Actions (Pengganti Express Controllers)

Semua business logic yang sebelumnya ada di Express controllers/services kini menjadi **Next.js Server Actions** — fungsi TypeScript yang dijalankan di server, dipanggil langsung dari komponen React.

#### lib/supabase/server.ts — Supabase Server Client

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

#### lib/actions/question.actions.ts

```typescript
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { questionSchema } from '@/lib/validators'
import { slugify } from '@/lib/utils'

export async function createQuestion(data: {
  title: string; content: object; contentText: string; tagIds: string[]
}) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  const validated = questionSchema.parse(data)

  const { data: question, error } = await supabase
    .from('questions')
    .insert({
      title: validated.title,
      content: validated.content,
      content_text: validated.contentText,
      user_id: user.id,
      status: 'HALL',
      slug: slugify(validated.title) + '-' + Date.now(),
    })
    .select('id, slug')
    .single()

  if (error) throw error

  // Tambah tags
  if (validated.tagIds.length > 0) {
    await supabase.from('question_tags').insert(
      validated.tagIds.map(tagId => ({ question_id: question.id, tag_id: tagId }))
    )
  }

  revalidatePath('/questions')
  return { success: true, slug: question.slug }
}

export async function updateQuestionStatus(
  questionId: string,
  status: 'HALL' | 'MAUQUF' | 'TERSELESAIKAN' | 'MUGHLAQ',
  reason?: string
) {
  const supabase = await createClient()
  // RLS otomatis enforce hanya MURAQI/MUDIR yang bisa ubah status
  const { error } = await supabase
    .from('questions')
    .update({ status, mughlaq_reason: reason, updated_at: new Date().toISOString() })
    .eq('id', questionId)

  if (error) throw new Error('Insufficient permissions')
  revalidatePath('/questions')
}

export async function acceptAnswer(answerId: string, questionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Cek apakah user adalah pemilik pertanyaan
  const { data: question } = await supabase
    .from('questions').select('user_id').eq('id', questionId).single()
  if (question?.user_id !== user.id) throw new Error('Bukan pemilik pertanyaan')

  await supabase.from('questions').update({
    status: 'TERSELESAIKAN',
    accepted_answer_id: answerId
  }).eq('id', questionId)

  await supabase.from('answers').update({ is_accepted: true }).eq('id', answerId)

  revalidatePath(`/questions`)
}
```

#### lib/actions/vote.actions.ts

```typescript
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function castVote(
  targetId: string,
  targetType: 'QUESTION' | 'ANSWER',
  value: 1 | -1
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Cek apakah sudah ada vote sebelumnya
  const { data: existing } = await supabase
    .from('votes')
    .select('id, value')
    .eq('user_id', user.id)
    .eq('target_id', targetId)
    .single()

  if (existing) {
    if (existing.value === value) {
      // Vote sama → hapus (toggle off)
      await supabase.from('votes').delete().eq('id', existing.id)
    } else {
      // Vote berbeda → update
      await supabase.from('votes').update({ value }).eq('id', existing.id)
    }
  } else {
    // Vote baru
    await supabase.from('votes').insert({ user_id: user.id, target_id: targetId, target_type: targetType, value })
  }
  // DB trigger otomatis update counter di questions/answers
  revalidatePath('/questions')
}
```

#### hooks/useSupabaseRealtime.ts — Realtime Notifikasi

```typescript
'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useNotificationsRealtime(
  userId: string | undefined,
  onNew: (notification: Notification) => void
) {
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => onNew(payload.new as Notification)
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId])
}
// Menggantikan WebSocket/Socket.io sepenuhnya — zero server config
```


| DELETE | `/comments/:id` | Hapus komentar | ✅ (owner/Muraqi) |

#### References

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/answers/:id/references` | Daftar referensi jawaban | ❌ |
| POST | `/answers/:id/references` | Tambah referensi ke jawaban | ✅ (owner) |
| PATCH | `/references/:id` | Edit referensi | ✅ (owner) |
| DELETE | `/references/:id` | Hapus referensi | ✅ (owner/Muraqi) |
| PATCH | `/references/:id/validate` | Validasi referensi (Muraqi only) | ✅ (Muraqi) |

#### Kitab Master

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/kitab` | Daftar semua kitab | ❌ |
| GET | `/kitab/:id` | Detail kitab | ❌ |
| GET | `/kitab/search` | Cari kitab (autocomplete) | ❌ |
| POST | `/kitab` | Tambah kitab baru | ✅ (Muraqi) |
| PATCH | `/kitab/:id` | Edit data kitab | ✅ (Muraqi) |
| DELETE | `/kitab/:id` | Hapus kitab | ✅ (Muraqi) |

#### Users & Dashboard

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/users/:username` | Profil publik user | ❌ |
| GET | `/users/:username/questions` | Pertanyaan user tertentu | ❌ |
| GET | `/users/:username/answers` | Jawaban user tertentu | ❌ |
| GET | `/users/:username/badges` | Badge user tertentu | ❌ |
| GET | `/dashboard/stats` | Statistik dashboard user saat ini | ✅ |
| GET | `/dashboard/questions` | Pertanyaan user saat ini | ✅ |
| GET | `/dashboard/answers` | Jawaban user saat ini | ✅ |
| GET | `/dashboard/bookmarks` | Bookmark user saat ini | ✅ |
| GET | `/dashboard/reputation` | Riwayat reputasi user saat ini | ✅ |
| GET | `/dashboard/notifications` | Notifikasi user saat ini | ✅ |
| PATCH | `/dashboard/notifications/:id/read` | Tandai notifikasi sudah dibaca | ✅ |

#### Tags

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/tags` | Daftar semua tag | ❌ |
| GET | `/tags/:slug` | Detail tag + questions | ❌ |
| POST | `/tags` | Buat tag baru | ✅ (Muraqi) |

#### Search

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/search` | Full-text search | ❌ |
| GET | `/search/suggestions` | Search suggestions (autocomplete) | ❌ |

#### Leaderboard

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/leaderboard` | Top users by reputasi | ❌ |
| GET | `/leaderboard/weekly` | Top users minggu ini | ❌ |
| GET | `/leaderboard/monthly` | Top users bulan ini | ❌ |

#### Admin (Mudir only)

| **Method** | **Endpoint** | **Deskripsi** | **Auth** |
|------------|-------------|---------------|----------|
| GET | `/admin/users` | Daftar semua user | ✅ (Mudir) |
| PATCH | `/admin/users/:id/role` | Ubah role user | ✅ (Mudir) |
| POST | `/admin/users/:id/ban` | Ban user | ✅ (Mudir) |
| GET | `/admin/reports` | Daftar laporan konten | ✅ (Mudir) |
| GET | `/admin/stats` | Statistik platform | ✅ (Mudir) |

### 21.6 Response API Format

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Judul pertanyaan wajib diisi",
    "details": [
      { "field": "title", "message": "Minimal 10 karakter" }
    ]
  }
}
```

### 21.7 Environment Variables

> **Drastis lebih sederhana**: Dari 15+ variabel (2 server) menjadi **5 variabel** (satu Next.js + Supabase). Tidak perlu DATABASE_URL, REDIS_URL, JWT secrets, SMTP, atau S3/R2 credentials terpisah.

#### `.env.local` (satu file, satu proyek)

```env
# ─── Supabase (menggantikan semua infra di bawah) ───────────────
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."

# Server-only — JANGAN expose ke client!
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."

# ─── App ────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Manhajuna"

# ─── Email (opsional — Supabase built-in cukup untuk dev) ────────
RESEND_API_KEY="re_xxxx"     # Untuk Edge Function send-notification

# ─── Rate Limiting (opsional, production) ────────────────────────
UPSTASH_REDIS_REST_URL="https://xxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxxx"
```

**Yang tidak lagi diperlukan** (semuanya dihandle Supabase):
- ~~`DATABASE_URL`~~ — Supabase mengelola PostgreSQL
- ~~`REDIS_URL`~~ — Diganti ISR + `unstable_cache` + pgBouncer  
- ~~`JWT_SECRET`, `JWT_REFRESH_SECRET`~~ — Supabase Auth
- ~~`SMTP_*`, `EMAIL_FROM`~~ — Supabase Auth built-in email
- ~~`STORAGE_*`~~ — Supabase Storage
- ~~`ELASTICSEARCH_URL`~~ — PostgreSQL FTS

### 21.8 Komponen Utama Frontend (React Component Tree)

```
<App>
  <Providers>                          // ThemeProvider, QueryClientProvider, AuthProvider
    <Navbar>                           // Logo, SearchBar, NavLinks, AuthButtons/UserMenu
      <SearchBar />                    // Autocomplete search
      <NotificationBell />             // Dropdown notifikasi
      <UserMenu />                     // Avatar, ReputationBadge, Logout
    </Navbar>
    
    <MainLayout>
      <Sidebar>                        // Navigasi + Filter
        <NavLinks />                   // Home, Questions, Tags, Users, Kitab
        <StatusFilter />               // Checkbox: HALL, MAUQUF, TERSELESAIKAN
        <TagCloud />                   // Popular tags
      </Sidebar>
      
      <MainContent>
        {children}                     // Halaman spesifik route
      </MainContent>
    </MainLayout>
    
    <Footer />
  </Providers>
</App>
```

**Halaman Detail Pertanyaan:**

```
<QuestionDetailPage>
  <QuestionHeader>                      // Judul + StatusBadge + metadata
    <StatusBadge status="HALL" />       // 🟡 / 🟢 / 🟠 / 🔴
    <VoteButton />                      // ▲ upvote ▼ downvote
    <BookmarkButton />
    <ShareButton />
  </QuestionHeader>
  
  <QuestionContent>                     // Rich text dari editor
    <RichTextRenderer content={...} />
  </QuestionContent>
  
  <QuestionMeta>                        // Tags, asked by, viewed
    <TagList tags={[...]} />
    <UserCard user={user} />
  </QuestionMeta>
  
  <AnswerSection>
    <AnswerSortTabs />                  // Votes, Newest, Oldest
    <AnswerCard>                        // Untuk setiap jawaban
      <VoteButton />
      <AnswerContent>
        <RichTextRenderer />
        <ReferenceSidebar>              // Panel referensi kitab
          <ReferenceItem kitab={...} />  // Nama kitab, halaman, teks Arab, terjemah
        </ReferenceSidebar>
      </AnswerContent>
      <UserCard user={author} />
      <AcceptAnswerButton />            // Hanya untuk pemilik Q
      <CommentThread comments={...} />
    </AnswerCard>
  </AnswerSection>
  
  <AnswerForm>                          // Form jawaban
    <RichEditor />                      // WYSIWYG editor
    <ReferenceForm>                     // Form tambah referensi
      <KitabAutocomplete />
      <ArabicInput />                   // RTL input
      <IndonesianInput />
    </ReferenceForm>
  </AnswerForm>
</QuestionDetailPage>
```

### 21.9 State Management Strategy

| **State Type** | **Tool** | **Contoh** |
|---------------|----------|-----------|
| Server State | **TanStack React Query** | Data pertanyaan, jawaban, user, tags |
| Client State (Global) | **Zustand** | Theme (dark/light), sidebar toggle, editor draft |
| Client State (Local) | **React useState/useReducer** | Form state, modal open/close, dropdown |
| Auth State | **Supabase `useUser()` hook** | Session user, role dari `profiles` table |
| Form State | **React Hook Form + Zod** | Validasi form real-time |

### 21.10 Authentication & Authorization Flow (Supabase Auth)

```
1. User register/login → supabase.auth.signUp() / signInWithPassword()
2. Supabase otomatis generate JWT (access + refresh token)
3. Token disimpan di httpOnly cookie via @supabase/ssr (zero config)
4. Setiap request: Next.js middleware panggil updateSession() dari Supabase
5. Session auto-refresh: Supabase handle transparently di Edge Middleware
6. Role-based access: RLS policy di database cek get_user_role() dari auth.uid()
7. OAuth Google: supabase.auth.signInWithOAuth({ provider: 'google' })
```

**Frontend Route Protection (middleware.ts):**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session (WAJIB di setiap middleware)
  const { data: { user } } = await supabase.auth.getUser()

  const protectedRoutes = ['/dashboard', '/questions/ask']
  const isProtected = protectedRoutes.some(r => request.nextUrl.pathname.startsWith(r))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### 21.11 Security Layer (Pengganti Express Middleware)

| **Keamanan** | **Express (Sebelumnya)** | **Supabase + Next.js (Sekarang)** |
|---|---|---|
| CORS | `cors` middleware | Next.js header config |
| Security headers | `helmet` | `next.config.ts` + Cloudflare |
| Auth verifikasi | `auth.middleware.ts` (JWT manual) | Supabase Auth + httpOnly cookie |
| Role-based access | `role.middleware.ts` | PostgreSQL RLS policies |
| Rate limiting | `express-rate-limit` | Next.js middleware + Upstash |
| Request validation | Zod middleware | Zod di Server Actions |
| XSS sanitization | `sanitizer.middleware.ts` | DOMPurify di editor + RLS |
| File upload security | Multer validation | Supabase Storage bucket policy |
| SQL injection | Prisma parameterized queries | Supabase client (auto-parameterized) |

### 21.12 Logging & Monitoring

| **Tool** | **Penggunaan** |
|----------|---------------|
| **Next.js built-in logging** | Server Action errors, request logs |
| **Sentry** | Error tracking frontend + server (production) |
| **Supabase Dashboard** | Database query performance, auth logs, RLS violations |
| **Vercel Analytics** | Page performance, Core Web Vitals |
| **Upstash** | Rate limiting metrics (opsional) |

### 21.13 Testing Strategy

| **Level** | **Tools** | **Cakupan** |
|-----------|-----------|-------------|
| **Unit Test** | **Vitest** | Server Actions, utils, validators |
| **Integration Test** | **Vitest + Supabase test client** | Database queries, RLS policies |
| **E2E Test** | **Playwright** | User flows: register → tanya → jawab → vote |
| **Component Test** | **React Testing Library** | UI components, behavior |

**Target coverage:** ≥ 80%

### 21.14 Scripts Package.json (Single App)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write src/",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit",
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop",
    "supabase:migrate": "supabase db push",
    "supabase:reset": "supabase db reset",
    "supabase:types": "supabase gen types typescript --linked > src/types/database.types.ts",
    "supabase:seed": "supabase db reset --db-url $DATABASE_URL",
    "supabase:functions:serve": "supabase functions serve",
    "supabase:functions:deploy": "supabase functions deploy"
  }
}
```

**Catatan**: Tidak ada lagi `backend package.json` terpisah. Satu `package.json` untuk seluruh proyek.

### 21.15 Deployment Architecture (Vercel + Supabase)

```
                    ┌─────────────────────────────────────────┐
                    │           Cloudflare (CDN + DNS)        │
                    │          manhajuna.com                  │
                    └──────────────┬──────────────────────────┘
                                   │
               ┌───────────────────┴──────────────────┐
               │                                      │
        ┌──────▼──────┐                    ┌──────────▼──────────┐
        │   Vercel    │                    │   Supabase Cloud    │
        │  (Next.js)  │◄──────────────────►│  (Singapore region) │
        │             │  Supabase client   │                     │
        │ - SSR pages │                    │ - PostgreSQL DB     │
        │ - API Routes│                    │ - Auth service      │
        │ - Edge Fn   │                    │ - Storage (CDN)     │
        │ - ISR cache │                    │ - Realtime (WS)     │
        └─────────────┘                    │ - Edge Functions    │
                                           └─────────────────────┘
```

**Setup lokal untuk developer:**

```bash
# Install Supabase CLI
npm install -g supabase

# Start Supabase lokal (PostgreSQL + Auth + Storage)
supabase start
# → Supabase running on http://localhost:54321
# → Studio: http://localhost:54323

# Run Next.js
npm run dev
# → http://localhost:3000
```

**Tidak perlu Docker Compose manual** — Supabase CLI mengelola semua container secara otomatis.

### 21.16 Checklist Implementasi Developer

#### Sprint 1: Foundation & Setup

- [ ] Buat Supabase project (region Singapore)
- [ ] Install Supabase CLI + `supabase init`
- [ ] Inisialisasi Next.js 15 (App Router + TypeScript)
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Run `supabase start` (local dev)
- [ ] Jalankan `001_initial_schema.sql` migration
- [ ] Jalankan `002_rls_policies.sql`
- [ ] Setup `src/lib/supabase/client.ts` + `server.ts` + `middleware.ts`
- [ ] Setup Next.js `middleware.ts` (auth session refresh)
- [ ] Setup ESLint + Prettier + Husky

#### Sprint 2: Auth

- [ ] Supabase Auth: email/password register & login
- [ ] OAuth Google via Supabase (`/app/(auth)/callback/route.ts`)
- [ ] Trigger `handle_new_user` → auto-create profile
- [ ] Halaman `/login`, `/register`, `/forgot-password`
- [ ] `useAuth` hook (Supabase session)
- [ ] Protected routes via middleware

#### Sprint 3-4: Q&A Core

- [ ] Server Action: `createQuestion`, `getQuestions`, `getQuestionBySlug`
- [ ] Server Action: `submitAnswer`, `getAnswersByQuestion`
- [ ] Server Action: `castVote` (dengan DB trigger counter)
- [ ] Server Action: `addComment`, `deleteComment`
- [ ] Frontend: QuestionCard, QuestionDetail, QuestionForm
- [ ] Frontend: AnswerCard, AnswerForm
- [ ] Frontend: VoteButton (optimistic update dengan `useOptimistic`)
- [ ] Frontend: CommentThread
- [ ] Pagination cursor-based + infinite scroll

#### Sprint 5: Status System

- [ ] Server Action: `updateQuestionStatus` (RLS enforce MURAQI/MUDIR)
- [ ] Server Action: `acceptAnswer` → auto status TERSELESAIKAN
- [ ] Frontend: StatusBadge (HALL/MAUQUF/TERSELESAIKAN/MUGHLAQ)
- [ ] Frontend: StatusFilter di sidebar
- [ ] Test RLS: non-Muraqi tidak bisa ubah status

#### Sprint 6: Rich Text Editor

- [ ] Integrasi TipTap editor
- [ ] Toolbar: B/I/U, heading, list, table, blockquote
- [ ] RTL/LTR toggle untuk teks Arab
- [ ] Arabic font support (Scheherazade New)
- [ ] Insert image → Supabase Storage upload
- [ ] Auto-save draft (localStorage via Zustand)

#### Sprint 7-8: Reputation System

- [ ] Jalankan `004_triggers.sql` (update_user_level trigger)
- [ ] Supabase Edge Function: `process-reputation` (award poin setelah aksi)
- [ ] Frontend: ReputationBadge component
- [ ] Frontend: Level progress bar
- [ ] Frontend: Reputation timeline di dashboard

#### Sprint 9: Badge System

- [ ] Seed data: semua badge (bronze/silver/gold) di `seed.sql`
- [ ] Supabase Edge Function: `check-badges` (cek & award badge)
- [ ] DB Webhook: trigger `check-badges` setelah vote/answer
- [ ] Frontend: Badge display (profil & card)
- [ ] Notification: Badge earned (via Supabase Realtime)

#### Sprint 10: Reference System

- [ ] Seed data: 40+ kitab kuning di `seed.sql`
- [ ] Server Action: `addReference`, `validateReference`
- [ ] Kitab autocomplete via `pg_trgm` similarity search
- [ ] Frontend: ReferenceForm (kitab picker + Arab + terjemah)
- [ ] Frontend: ReferenceSidebar (tampilan di jawaban)
- [ ] Arabic RTL input untuk teks Arab kutipan

#### Sprint 11: Search

- [ ] Jalankan `005_search_config.sql` (search vector triggers)
- [ ] API Route: `/api/search` (PostgreSQL FTS + filter)
- [ ] Supabase RPC: `search_questions(query, filters)` function
- [ ] Frontend: SearchBar dengan dropdown suggestions
- [ ] Frontend: Search result page + filter by status/tag/date

#### Sprint 12-13: Dashboard

- [ ] Frontend: Dashboard layout dengan tabs
- [ ] Tabs: My Questions, My Answers, Bookmarks
- [ ] Tabs: Reputation History (dari `reputation_logs`)
- [ ] Tabs: Notification list
- [ ] Profile edit (inline editing)
- [ ] Avatar upload → Supabase Storage

#### Sprint 14: Realtime Notifications

- [ ] `useNotificationsRealtime` hook (Supabase Realtime)
- [ ] Frontend: NotificationBell dengan badge count
- [ ] Frontend: Notification dropdown
- [ ] Mark as read / mark all as read
- [ ] Supabase Edge Function: `send-notification` (email via Resend)

#### Sprint 15: Moderation Tools

- [ ] Server Action: `reportContent`, `moderateContent`
- [ ] Supabase Edge Function: `process-moderation` (auto-flag)
- [ ] Frontend: Report button
- [ ] Frontend: Muraqi dashboard (review queue)
- [ ] Audit log (tambah kolom `moderator_id` + `moderated_at`)

#### Sprint 16-17: Performance & Security

- [ ] Supabase types: `supabase gen types typescript --linked`
- [ ] Next.js ISR untuk halaman questions list (revalidate 60 detik)
- [ ] `unstable_cache` untuk leaderboard (TTL 5 menit)
- [ ] Image optimization (next/image + Supabase Storage CDN)
- [ ] Bundle analysis (`@next/bundle-analyzer`)
- [ ] RLS audit: test semua policy dengan Supabase policy tester
- [ ] Load testing (k6): target 500 concurrent users

#### Sprint 18: Beta Launch

- [ ] Deploy Supabase: `supabase db push --linked`
- [ ] Deploy Next.js: Vercel (connect GitHub repo)
- [ ] Set environment variables di Vercel
- [ ] Deploy Edge Functions: `supabase functions deploy`
- [ ] Custom domain + Cloudflare proxy
- [ ] Supabase email templates (Arabic-friendly)
- [ ] Monitoring: Sentry + Vercel Analytics
- [ ] Beta user onboarding

### 21.17 Rekomendasi Tools & Libraries

| **Kebutuhan** | **Library/Tool** | **Alasan** |
|--------------|-----------------|-----------|
| **Backend Platform** | **Supabase** | PostgreSQL + Auth + Storage + Realtime + Edge Functions |
| **Auth** | **Supabase Auth** | Built-in, OAuth, session otomatis |
| **Database Client** | **@supabase/supabase-js** | Type-safe, realtime, storage |
| **SSR Cookie** | **@supabase/ssr** | Session management di Next.js App Router |
| **Rich Text Editor** | **TipTap** (ProseMirror) | Extensible, RTL support, Word-like |
| **Arabic RTL** | `@tiptap/extension-text-align` + CSS | Full RTL editing support |
| **Form Validation** | **React Hook Form + Zod** | Type-safe, performant |
| **API Client Caching** | **TanStack React Query** | Caching, optimistic updates, pagination |
| **State Management** | **Zustand** | Minimal boilerplate, TypeScript native |
| **CSS Framework** | **Tailwind CSS v4** + **shadcn/ui** | Konsisten, accessible |
| **Table/Data Grid** | **TanStack Table** | Sorting, filtering untuk dashboard |
| **Date Handling** | **date-fns** | Ringan, banyak fungsi |
| **Charts** | **Recharts** | Untuk statistik dashboard & leaderboard |
| **PDF Export** | **jsPDF** + **html2canvas** | Ekspor pertanyaan & jawaban |
| **File Upload** | **Supabase Storage** | Upload image, bucket policy built-in |
| **Toast** | **sonner** | Notifikasi ringan, beautiful |
| **Testing** | **Vitest** + **React Testing Library** | Cepat, modern |
| **E2E** | **Playwright** | Multi-browser, reliable |
| **Realtime** | **Supabase Realtime** | WebSocket tanpa server tambahan |
| **Background Jobs** | **Supabase Edge Functions** | Deno, badge check, email |
| **Email** | **Resend** (via Edge Function) | Developer-friendly, deliverability tinggi |
| **Rate Limiting** | **Next.js middleware** + **Upstash** | Edge-based, zero cold start |
| **Search** | **PostgreSQL FTS** + `pg_trgm` | Built-in, tidak perlu server tambahan |
| **Image Optimization** | **next/image** + Supabase CDN | Resize, format otomatis |

### 21.18 Git Branching Strategy

```
main              ← Production-ready code
  ├── develop     ← Integration branch
  │    ├── feat/auth
  │    ├── feat/questions
  │    ├── feat/editor
  │    ├── feat/reputation
  │    ├── feat/references
  │    ├── feat/dashboard
  │    ├── fix/*       ← Bug fixes
  │    └── refactor/*  ← Refactoring
  ├── release/v1.0.0
  └── hotfix/*         ← Urgent production fixes
```

**Commit Convention:** [Conventional Commits](https://www.conventionalcommits.org/)

```
feat: add reputation calculation trigger
fix: correct Arabic RTL rendering in editor
refactor: migrate vote logic to db trigger
chore: update supabase types from schema
docs: update API endpoints documentation
test: add vitest for question server action
style: format code with prettier
perf: add GIN index on search_vector column
```

### 21.19 Code Quality Tools

| **Tool** | **Fungsi** | **Config File** |
|----------|-----------|----------------|
| **ESLint** | Linting JavaScript/TypeScript | `.eslintrc.js` |
| **Prettier** | Code formatter | `.prettierrc` |
| **Husky** | Git hooks (pre-commit, pre-push) | `.husky/` |
| **lint-staged** | Lint hanya file yang diubah | `lint-staged.config.js` |
| **Commitlint** | Validasi commit message | `commitlint.config.js` |
| **tsc --noEmit** | Type checking | `tsconfig.json` |
| **supabase gen types** | Sync TypeScript types dari DB schema | `src/types/database.types.ts` |

### 21.20 Analisis Performa & Optimasi

| **Area** | **Strategi** |
|----------|-------------|
| **Database** | Index pada kolom frequently queried (status, created_at, user_id, slug) |
| **Database** | Denormalisasi upvote/downvote counters via DB triggers (hindari COUNT query) |
| **Database** | Pagination cursor-based untuk infinite scroll |
| **Database** | N+1 problem → Supabase `.select()` dengan join yang optimal |
| **Caching** | Next.js ISR (`revalidate: 60`) untuk halaman questions list publik |
| **Caching** | `unstable_cache` untuk leaderboard (TTL 5 menit) dan tag cloud (TTL 1 jam) |
| **Caching** | Supabase built-in connection pooling (pgBouncer) — tidak perlu Redis |
| **Frontend** | Next.js SSR untuk halaman yang butuh SEO (questions detail) |
| **Frontend** | `next/image` untuk optimasi gambar + Supabase Storage CDN |
| **Frontend** | Dynamic import untuk TipTap editor (komponen berat) |
| **Frontend** | Bundle size monitoring dengan `@next/bundle-analyzer` |
| **CDN** | Cloudflare sebagai CDN + DDoS protection + edge caching |
| **API** | Response compression via Vercel/Next.js built-in |
| **Realtime** | Supabase Realtime hanya subscribe channel yang perlu (unsubscribe on unmount) |
| **Search** | GIN index pada `search_vector` + `pg_trgm` untuk autocomplete |

---

## LAMPIRAN

### A. User Flow Diagram

```
[Landing Page] → [Browse Questions] → [View Question Detail] → [Read Answers]
       ↓                                                         ↓
  [Register/Login] ←─────────────────────────────────────── [Login to Answer]
       ↓
  [Dashboard] → [Ask Question] → [Fill Form + Editor] → [Publish → Status: HALL]
       ↓
  [Answer Question] → [Write Answer + Add References] → [Publish]
       ↓
  [Receive Notifications] ← [Votes, Comments, Badges]
```

### B. Mockup Wireframe (Referensi)

Layout mengadaptasi StackOverflow dengan modifikasi:

1. **Header**: Logo (kaligrafi) + Search bar + Navigation + Auth buttons
2. **Left Sidebar**: Navigasi utama + Filter by Status
3. **Main Content**: Daftar pertanyaan (card style) atau detail pertanyaan
4. **Right Sidebar**: Trending tags, top users, stats (optional)
5. **Footer**: Links, copyright, kontak

### C. Aturan Moderasi

1. Setiap pertanyaan/jawaban baru dicek otomatis oleh sistem (filter kata kunci).
2. Pengguna baru (< 50 reputasi) memiliki limit: 3 pertanyaan/hari, 5 jawaban/hari.
3. Jawaban tanpa referensi akan mendapat **reminder otomatis** dari sistem.
4. Setelah 3 reminder, jawaban tanpa referensi akan disembunyikan (hidden) hingga referensi ditambahkan.
5. Tindakan moderasi bersifat transparan — alasan diumumkan di kolom komentar.

### D. Contoh Kasus Penggunaan

**Skenario 1: Santri bertanya**
1. Akhmad (Thalib, santri pondok) login ke Manhajuna.
2. Klik "Ajukan Pertanyaan" → pilih kategori **Fikih** → tag **Thaharah**.
3. Menulis judul: "Hukum air musta'mal untuk berwudhu kembali?"
4. Menulis konten dengan editor: menjelaskan kasusnya.
5. Submit → Status otomatis **HALL**.
6. Notifikasi ke 15 user dengan expertise di tag Thaharah.

**Skenario 2: Ustadz menjawab dengan referensi**
1. Ustadz Faqih (Mujib, level Mutaqaddim) mendapat notifikasi.
2. Membuka pertanyaan → membaca isi.
3. Klik "Jawab" → editor rich text → menulis jawaban.
4. Klik "Tambah Referensi" → pilih kitab "Fathul Mu'in" → Jilid 1 → Halaman 45.
5. Mengetik teks Arab: وَلَا يَضُرُّ اسْتِعْمَالُ الْمَاءِ الْمُسْتَعْمَلِ...
6. Mengetik terjemah: "Tidak mengapa penggunaan air musta'mal..."
7. Submit jawaban.
8. Muraqi memvalidasi referensi → ✅ Tervalidasi.
9. Ustadz Faqih mendapat +15 poin validasi referensi.

**Skenario 3: Moderasi**
1. Pertanyaan masuk dengan topik sensitif (khilafiyah qunut subuh).
2. Sistem otomatis flag → masuk queue Muraqi.
3. Muraqi membaca → memutuskan **MAUQUF** sementara dengan alasan tertulis.
4. Notifikasi ke penanya: "Pertanyaan Anda ditangguhkan karena memerlukan kajian lebih lanjut. Tim akan merespon maksimal 3x24 jam."

---

## 22. UI/UX DETAIL — SEMUA HALAMAN & SISTEM DESAIN

### 22.1 Sistem Desain Foundation

#### Typography

| **Skala** | **Font** | **Size** | **Weight** | **Line Height** | **Penggunaan** |
|-----------|----------|----------|-----------|-----------------|----------------|
| **H1** | Poppins | 36px | 700 | 1.2 | Page title, hero section |
| **H2** | Poppins | 28px | 700 | 1.3 | Section title |
| **H3** | Poppins | 24px | 600 | 1.4 | Subsection, card title |
| **H4** | Poppins | 20px | 600 | 1.4 | Component title |
| **Body Large** | Inter | 16px | 400 | 1.6 | Main content, paragraph |
| **Body** | Inter | 14px | 400 | 1.5 | Default body text |
| **Small** | Inter | 12px | 400 | 1.4 | Helper text, metadata |
| **Caption** | Inter | 11px | 400 | 1.4 | Timestamps, badges |
| **Mono** | JetBrains Mono | 13px | 400 | 1.5 | Code blocks, references |

**Font downloads:**
- Poppins: Google Fonts
- Inter: Google Fonts  
- JetBrains Mono: Google Fonts
- Scheherazade New: Google Fonts (Arabic support dengan harakat)

#### Spacing Grid

Platform menggunakan **8px base unit**:

| **Spacing** | **Pixel** | **Penggunaan** |
|------------|-----------|----------------|
| `xs` | 4px | Micro-spacing (input padding, icon margin) |
| `sm` | 8px | Component padding, small gaps |
| `md` | 16px | Section padding, card gap |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Large section spacing |
| `2xl` | 48px | Page margin, hero spacing |

#### Border Radius

- **Sharp**: `0px` (input borders)
- **Subtle**: `4px` (cards, small components)
- **Rounded**: `8px` (buttons, containers)
- **Pill**: `24px` (tags, badges, FAB)

#### Shadows

| **Level** | **CSS** | **Penggunaan** |
|----------|---------|----------------|
| **Subtle** | `0 1px 2px rgba(0,0,0,0.05)` | Hover state |
| **Small** | `0 2px 4px rgba(0,0,0,0.1)` | Card default |
| **Medium** | `0 4px 6px rgba(0,0,0,0.1)` | Modal, dropdown |
| **Large** | `0 10px 15px rgba(0,0,0,0.1)` | Overlay, popup |

### 22.2 Component Specifications

#### Button Variants

| **Variant** | **Background** | **Text Color** | **Border** | **Hover BG** | **Penggunaan** |
|------------|-----------------|----------------|-----------|--------------|----------------|
| **Primary** | #1B6B4A | White | None | #2E8B5E | Submit, CTA utama |
| **Secondary** | #F3F4F6 | #111827 | #E5E7EB | #E5E7EB | Action sekunder |
| **Tertiary** | Transparent | #1B6B4A | #1B6B4A | #F3F4F6 | Link-like button |
| **Danger** | #EF4444 | White | None | #DC2626 | Delete, reject |
| **Success** | #10B981 | White | None | #059669 | Confirm, approve |
| **Ghost** | Transparent | #6B7280 | 1px #D1D5DB | #F3F4F6 | Optional actions |

**Button Sizes:**

| **Size** | **Padding** | **Font** | **Icon** | **Penggunaan** |
|----------|-------------|---------|---------|----------------|
| **LG** | 12px 24px | 16px | 20px | CTA utama |
| **MD** | 10px 16px | 14px | 16px | Default/general |
| **SM** | 8px 12px | 12px | 14px | Compact, inline |
| **XS** | 4px 8px | 11px | 12px | Tiny, badge-like |

#### Input Field

```
┌──────────────────────────────────────┐
│ Label (14px, #111827)                │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ Placeholder text (13px, #9CA3AF) │ │  ← Focus: border #1B6B5A, shadow subtle
│ └────────────────────────────────┘  │
│                                      │
│ Helper text (12px, #6B7280) ✓        │  ← Green jika valid
│ Error message (12px, #EF4444) ✗      │  ← Red jika error
└──────────────────────────────────────┘
```

**Padding:** 10px 12px (height ~40px)
**Border:** 1px solid #D1D5DB
**Border-radius:** 4px
**Font:** Inter 14px

#### Select/Dropdown

Dropdown autocomplete untuk:
- Kitab selection (pg_trgm full-text search)
- Tag selection (hierarki)
- User search (mention @username)

```
┌───────────────────────────────────┐
│ Tulis untuk mencari... ▼ ✕        │  ← Clear button
├───────────────────────────────────┤
│ ✓ Fikih Syafi'i (dipilih)        │
│ □ Nahwu Dasar                     │
│ □ Ushul Fikih                     │
└───────────────────────────────────┘
```

#### Tag/Badge Component

| **Tipe** | **Bg** | **Text** | **Border** | **Icon** | **Closable** |
|----------|--------|---------|-----------|----------|--------------|
| **Category Tag** | #EDF2F7 | #1B6B4A | None | None | ❌ |
| **Status Badge** | Warna per status | White | None | Icon | ❌ |
| **User Badge** | #FEF3C7 | #92400E | None | ⭐ | ❌ |
| **Filter Tag** | #F3F4F6 | #111827 | #E5E7EB | None | ✅ |

**Sizes:**
- **LG**: padding 8px 12px, font 14px (category, filter)
- **MD**: padding 6px 10px, font 13px (status in list)
- **SM**: padding 4px 8px, font 11px (badge, reputation)

### 22.3 Halaman Utama & Detail

#### A. Halaman HOME / BROWSE QUESTIONS

```
┌─────────────────────────────────────────────────────────────┐
│ 🌙 Manhajuna    🔍 Cari pertanyaan... ▼  [Urutkan: Terbaru]  │
│ [Login] [Daftar]                                            │
├─────────┬───────────────────────────────────┬──────────────┤
│ FILTER  │   DAFTAR PERTANYAAN               │ TRENDING     │
│ ────────┤                                   │              │
│ Status: │ ┌─ 🟡 HALL ─────────────────────┐ │ Tags:       │
│ ☑ HALL  │ │ Bagaimana hukum gaji haram?  │ │ □ Fikih     │
│ ☑ MAUQUF│ │ fikih · muamalah · gaji       │ │ □ Nahwu     │
│ ☑ TERL. │ │ 7 jawaban · 24 upvotes       │ │ □ Ushul     │
│ ☐ MUGL. │ │ @user · 2 jam lalu           │ │ □ Waqiiyah  │
│         │ └─────────────────────────────── │ │             │
│ ────────┤                                   │ │ Top Users:  │
│ Kategori│ ┌─ 🟢 TERSELESAIKAN ──────────┐ │ │ 1. @ustadz  │
│ ☑ Fikih │ │ Boleh tidur pakai alas kaki?│ │ │    (8500 pts)│
│ ☑ Nahwu │ │ fikih · thaharah             │ │ │ 2. @faqih   │
│ ☑ Ushul │ │ 3 jawaban · 45 upvotes ✅   │ │ │    (7200 pts)│
│         │ │ @ustadz · 5 jam lalu         │ │ │             │
│ [Lihat  │ └─────────────────────────────── │ │             │
│  Lebih] │                                   │ │             │
│         │ [Halaman 1 of 50] [Next]         │ │             │
└─────────┴───────────────────────────────────┴──────────────┘
│ Footer: Tentang | Kebijakan | Kontak                       │
└──────────────────────────────────────────────────────────────┘
```

**State: Empty List (Tidak ada pertanyaan)**
```
┌──────────────────────────────────┐
│  📭  Belum ada pertanyaan        │
│                                  │
│  "Jadilah yang pertama bertanya" │
│                                  │
│  [Ajukan Pertanyaan Pertama] ←   │
└──────────────────────────────────┘
```

#### B. Halaman ASK QUESTION (Form Bertanya)

```
┌──────────────────────────────────────────────────────────┐
│ ← Ajukan Pertanyaan Baru                                 │
│ 📝 Susun pertanyaan yang jelas untuk mendapat jawab baik │
├──────────────────────────────────────────────────────────┤
│ Judul Pertanyaan                                         │
│ ┌──────────────────────────────────────────────────────┐│
│ │ Minimal 10 karakter...                               ││
│ │ Contoh: "Bagaimana hukum membeli barang riba?"      ││
│ └──────────────────────────────────────────────────────┘│
│ 📝 Tulis dengan jelas dan terstruktur (20/500 karakter) │
│                                                          │
│ Detail Pertanyaan (Rich Text Editor)                     │
│ [B][I][U] [H2][•] [1.] [❝] | [RTL] [🔤 Arab]  ↩️ ↪️    │
│ ┌──────────────────────────────────────────────────────┐│
│ │ Assalamu'alaikum...                                  ││
│ │ Saya ingin bertanya tentang...                       ││
│ └──────────────────────────────────────────────────────┘│
│ ⚠️ Mohon jangan tambahkan jawaban di sini. Gunakan       │
│    bidang "Jawaban" di bawah.                           │
│                                                          │
│ Kategori (Wajib)                                         │
│ [Pilih Kategori ▼]   Contoh: Fikih, Nahwu, Ushul      │
│                                                          │
│ Tag (Minimal 1, Maksimal 5)                             │
│ ┌──────────────────────────────────────────────────────┐│
│ │ + Tambah tag... ▼                                    ││
│ │                                                      ││
│ │ [✕ thaharah] [✕ wudhu] [✕ najis]                    ││
│ └──────────────────────────────────────────────────────┘│
│ Saran: thaharah • wudhu • tayammum • istihalah        │
│                                                          │
│ Apakah pertanyaan ini sensitif?                         │
│ [◯ Tidak] [◯ Ya - memerlukan review khusus]            │
│ (Khilafiyah, topik politis, dll)                        │
│                                                          │
│ [❌ Batal]  [✅ Tinjau Pertanyaan]                      │
└──────────────────────────────────────────────────────────┘

### Preview Sebelum Submit:
[Judul Pertanyaan]
🟡 HALL · fikih · thaharah · wudhu
[Konten preview...]
```

#### C. Halaman QUESTION DETAIL

```
┌─────────────────────────────────────────────────────────────┐
│ ← Kembali ke Pertanyaan | [Bagikan] [Laporkan]           │
├─────────────────────────────────────────────────────────────┤
│ ▲ 32 ▼     🟡 HALL    [Bookmark] [Lainnya ...]             │
│                                                             │
│ Judul Pertanyaan: Bagaimana hukum membeli barang riba?    │
│ fikih · muamalah · riba · jual beli                        │
│                                                             │
│ Oleh @akhmad_fauzi · Thalib Mustawa 1 (143 pts) · 2 jam  │
│ 128 views · Dijawab: 4 · Status: Menunggu                 │
├─────────────────────────────────────────────────────────────┤
│ ISI PERTANYAAN (Rich Text)                                │
│ ────────────────────────────────────────────────────────   │
│ Assalamu'alaikum warahmatullahi wabarakatuh...           │
│                                                             │
│ Saya ingin bertanya tentang hukum syara' ketika membeli   │
│ barang yang dijual dengan sistem ... [dibaca]              │
├─────────────────────────────────────────────────────────────┤
│ ~~ 4 JAWABAN ~~    [Urutkan: Paling Berguna ▼]             │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ ▲ 45 ▼  🥇 JAWABAN TERBAIK ✅                        │ │
│ │                                                        │ │
│ │ @ustadz_faqih · Al-Mufid (7200 pts)                 │ │
│ │ Verified Scholar · 1 jam lalu · [Edit] [Hapus]     │ │
│ │                                                        │ │
│ │ Jawaban:                                              │ │
│ │ Hukum membeli barang dengan sistem tersebut adalah... │ │
│ │                                                        │ │
│ │ 📚 REFERENSI (2)                                      │ │
│ │ ┌──────────────────────────────────────────────────┐ │ │
│ │ │ [1] Fathul Mu'in, Jil. 1, Hal. 180              │ │ │
│ │ │      وَلَا رِبَا بِالْبَيْعِ الْمَشْرُوطِ      │ │ │
│ │ │      ✅ Tervalidasi oleh Muraqi                 │ │ │
│ │ │                                                  │ │ │
│ │ │ [2] Al-Asybah wan Nadha'ir, Hal. 156            │ │ │
│ │ │      قَاعِدَةٌ: الْعَقْدُ يَنْبَنِي عَلَى ... │ │ │
│ │ │      ⏳ Menunggu validasi                        │ │ │
│ │ └──────────────────────────────────────────────────┘ │ │
│ │                                                        │ │
│ │ ── 3 Komentar ──                                      │ │
│ │ @user1: Apakah ada kondisi tertentu?                │ │
│ │ @ustadz_faqih: Ya, jika... [baca lanjut]          │ │
│ │ @user2: Berapa harga standar...                     │ │
│ │ [Lihat semua komentar] [Balas]                      │ │
│ │                                                        │ │
│ │ [✅ Terima Jawaban Ini]  [👍 Upvote] [👎 Downvote] │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ ▲ 8 ▼                                                 │ │
│ │ @santri_baru · Thalib Jadid (28 pts) · 45 min       │ │
│ │ Jawaban ini membantu [👍 Upvote] [👎 Downvote]     │ │
│ │                                                        │ │
│ │ (Isi jawaban 2...)                                   │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
│ [Halaman 1 of 2] [Halaman berikutnya]                     │
├─────────────────────────────────────────────────────────────┤
│ FORM JAWABAN (Jika sudah login)                            │
│ ────────────────────────────────────────────────────────   │
│ Tulis Jawaban Anda (Rich Text Editor)                      │
│ [B][I] ... [RTL] [🔤 Arab] ...  Auto-save: Tersimpan     │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Assalamu'alaikum... [min 50 karakter]               │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                             │
│ Tambah Referensi Kitab (Minimum 1)                         │
│ [+ Tambah Referensi Kitab]                                │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Kitab: [Fathul Mu'in ▼]                            │  │
│ │ Jilid: 1    Halaman: 180                            │  │
│ │ Penerbit: Darul Fikr    Tahun: 2005                │  │
│ │                                                      │  │
│ │ Teks Arab (Harakat):                                │  │
│ │ وَلَا يَضُرُّ [RTL]                                │  │
│ │                                                      │  │
│ │ Terjemah Indonesia:                                 │  │
│ │ "Tidak mengapa..."                                  │  │
│ │                                                      │  │
│ │ [✕ Hapus] [✓ Simpan Referensi]                     │  │
│ └──────────────────────────────────────────────────────┘  │
│ Saran: Gunakan minimal 1 referensi dari kitab mu'tabar   │
│                                                             │
│ [❌ Batal]  [✅ Posting Jawaban]                          │
└─────────────────────────────────────────────────────────────┘
```

#### D. Halaman DASHBOARD / PROFILE SAYA

```
┌─────────────────────────────────────────────────────────────┐
│ Dashboard Saya                     [⚙️ Pengaturan]           │
├─────────────────────────────────────────────────────────────┤
│ ┌─ PROFIL ──────────────────────────────┐                  │
│ │                                       │                  │
│ │ [Avatar: 120x120px] ┌── Akhmad Fauzi  │                  │
│ │                     │ @akhmad_fauzi   │                  │
│ │                     │ Dr. Akhmad Fauzi, Lc., M.Ag.      │
│ │                     │ Thalib Mustawa 2 · 246 pts        │
│ │                     │ "Mencari ilmu adalah ibadah"      │
│ │                     │ ┌ Edit Profil ┐                   │
│ │                     └────────────────┘                  │
│ │ Bergabung: 5 Mei 2026 · Last seen: now                  │
│ └───────────────────────────────────────┘                  │
│                                                             │
│ ┌─ STATISTIK ──────────────────────────────────────────┐  │
│ │ Pertanyaan: 8   │ Jawaban: 12  │ Referensi: 15      │  │
│ │ Badge: 7        │ Bookmark: 23 │ Reputasi: 246 pts  │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                             │
│ TAB: [Pertanyaan Saya] [Jawaban Saya] [Bookmark]          │
│      [Reputasi] [Badge] [Notifikasi]                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ PERTANYAAN SAYA (8)                                        │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ ✓ [Bagaimana hukum...] · fikih                      │   │
│ │   🟢 TERSELESAIKAN · 4 jawaban · 32 upvotes       │   │
│ │                                                     │   │
│ │ ✓ [Perbedaan antara...] · nahwu                     │   │
│ │   🟡 HALL · 2 jawaban · 8 upvotes                 │   │
│ │                                                     │   │
│ │ ✗ [Apakah boleh...] · waqiiyah                      │   │
│ │   🟠 MAUQUF · Ditangguhkan · 1 upvote             │   │
│ └─────────────────────────────────────────────────────┘   │
│ [Muat Lebih Banyak]                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ TAB: REPUTASI (Timeline)                                   │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Hari ini:                                           │   │
│ │ +10 pts    Jawaban diterima sebagai terbaik       │   │
│ │ +5 pts     Upvote pada jawaban                     │   │
│ │ -2 pts     Downvote pada pertanyaan                │   │
│ │                                                     │   │
│ │ Kemarin:                                            │   │
│ │ +15 pts    Referensi divalidasi oleh Muraqi       │   │
│ │ +10 pts    Jawaban menerima upvote (x2)           │   │
│ │ ...                                                 │   │
│ └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

#### E. Halaman LEADERBOARD

```
┌──────────────────────────────────────────────────────┐
│ Leaderboard Reputasi     [Minggu ini] [Bulan ini]   │
├──────────────────────────────────────────────────────┤
│ 🥇 1. @ustadz_faqih        8500 pts  ⭐⭐⭐         │
│      Al-Mufid · Verified Ustadz                     │
│      +250 pts minggu ini                            │
│                                                      │
│ 🥈 2. @kiai_suryan         7200 pts  ⭐⭐          │
│      Al-Mujib al-Mutaqaddim · Verified              │
│      +180 pts minggu ini                            │
│                                                      │
│ 🥉 3. @dr_fauzan          5600 pts  ⭐⭐          │
│      Al-Mujib al-Mutawassith · Dosen IAIN          │
│      +120 pts minggu ini                            │
│                                                      │
│ 4.  @santri_akhir         2300 pts  ⭐             │
│     Al-Mujib al-Mubtadi' · +85 pts                 │
│                                                      │
│ 5.  @teacher_ali          1800 pts                  │
│     Thalib Mustawa 2 · +60 pts                     │
│                                                      │
│ [Lihat Lebih Banyak]                                │
│ Anda #47 · 246 pts · +15 minggu ini                │
└──────────────────────────────────────────────────────┘
```

#### F. Halaman LOGIN & REGISTER

**LOGIN:**
```
┌─────────────────────────────────────┐
│ Manhajuna  🌙                       │
│                                     │
│ Masuk Akun Anda                    │
│                                     │
│ Email                              │
│ ┌───────────────────────────────┐ │
│ │ nama@email.com                │ │
│ └───────────────────────────────┘ │
│                                     │
│ Kata Sandi                         │
│ ┌───────────────────────────────┐ │
│ │ ••••••••••  [👁️ Lihat]        │ │
│ └───────────────────────────────┘ │
│ Lupa kata sandi?                   │
│                                     │
│ [Masuk dengan Google] ← OAuth      │
│                                     │
│ [🔒 Masuk]                         │
│                                     │
│ Belum punya akun? [Daftar sekarang] │
│ Syarat & Kebijakan Privacy         │
└─────────────────────────────────────┘
```

### 22.4 Loading, Empty, Error States

#### Loading Skeleton

```
┌────────────────────────────────┐
│ ▓▓▓▓▓ (animate)                │
│                                │
│ ▓▓▓▓▓ ▓▓▓▓▓ ▓▓▓▓▓             │
│ ▓▓▓▓ ▓▓▓▓ ▓▓▓                  │
│                                │
│ ▓▓▓▓▓ ▓▓▓▓▓ ▓▓▓▓▓             │
│ ▓▓▓▓ ▓▓▓▓ ▓▓▓                  │
└────────────────────────────────┘
```

#### Empty States

| **Halaman** | **Ilustrasi** | **Teks** | **CTA** |
|------------|---------------|---------|---------|
| **No Questions** | 📭 | "Jadilah yang pertama bertanya" | [Ajukan Pertanyaan] |
| **No Bookmarks** | 🔖 | "Anda belum memiliki bookmark" | [Jelajahi Pertanyaan] |
| **No Notifications** | 🔔 | "Tidak ada notifikasi baru" | — |
| **No Search Results** | 🔍 | "Tidak ditemukan pertanyaan untuk '[query]'" | [Coba search lain] |

---

## 23. ERROR HANDLING, VALIDASI & UX STATES

### 23.1 Input Validation Rules

#### Validasi Pertanyaan

| **Field** | **Rule** | **Error Message** | **Real-time** |
|-----------|----------|-------------------|---------------|
| **Judul** | Min 10 karakter, Max 300 | "Judul harus antara 10-300 karakter" | Saat blur |
| **Judul** | Tidak boleh hanya angka/simbol | "Judul harus mengandung minimal 1 kata" | Saat blur |
| **Judul** | Tidak ada XSS tags | "Tag HTML tidak diizinkan" | Server-side |
| **Isi** | Min 50 karakter, Max 30000 | "Isi pertanyaan wajib antara 50-30000 karakter" | Saat blur |
| **Kategori** | Wajib dipilih | "Pilih minimal 1 kategori" | Saat submit |
| **Tag** | Min 1, Max 5 | "Pilih 1-5 tag" | Real-time |
| **Tag** | Tidak duplicate | "Tag sudah dipilih" | Real-time |

**UI Real-time Validation:**

```
Judul Pertanyaan
┌──────────────────────────────────┐
│ Bagaimana huk...                 │  ← Valid (20/300 chars)
└──────────────────────────────────┘
✓ Panjang judul sesuai

Judul Pertanyaan
┌──────────────────────────────────┐
│ abc                              │  ← Error (3/300 chars)
└──────────────────────────────────┘
✗ Judul terlalu pendek (min 10 karakter)
```

#### Validasi Jawaban & Referensi

| **Field** | **Rule** | **Error Message** |
|-----------|----------|-------------------|
| **Konten Jawaban** | Min 50 karakter | "Jawaban terlalu pendek (min 50 karakter)" |
| **Referensi** | Min 1 referensi | "Jawaban wajib memiliki minimal 1 referensi kitab" |
| **Teks Arab** | Valid Unicode Arab | "Teks Arab mengandung karakter tidak valid" |
| **Kitab** | Must exist in DB | "Kitab tidak ditemukan dalam database" |
| **Halaman** | Positif integer | "Nomor halaman harus angka positif" |

**UI Feedback Referensi:**

```
Tambah Referensi
┌────────────────────────────────────┐
│ Kitab: [Fathul Mu'in ✓ Ditemukan] │  ← Valid
│ Jilid: [1 ✓]                      │  ← Valid
│ Halaman: [abc ✗ Harus angka]      │  ← Error
│ Teks Arab: [✓ Terdeteksi]         │  ← Valid
│ Terjemah: [✓ Terisi]              │  ← Valid
│                                    │
│ [❌ Hapus]  [✓ Simpan Referensi]  │
└────────────────────────────────────┘
```

### 23.2 Error States & Error Messages

#### Error Message Categories

**1. Validation Errors (400)**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak sesuai format",
    "details": [
      {
        "field": "title",
        "value": "abc",
        "message": "Judul harus minimal 10 karakter",
        "hint": "Contoh: 'Bagaimana hukum membeli barang dengan sistem...?'"
      },
      {
        "field": "tags",
        "value": [],
        "message": "Minimal harus pilih 1 tag",
        "hint": "Pilih tag yang relevan: fikih, nahwu, ushul, dll"
      }
    ]
  }
}
```

**UI Rendering (Inline Errors):**

```
Judul Pertanyaan
┌─────────────────────────────────┐
│ abc                       [ℹ️ i] │ ← Info icon
└─────────────────────────────────┘
✗ Judul terlalu pendek
Contoh: "Bagaimana hukum membeli dengan sistem...?"
```

**2. Authentication Errors (401)**

| **Situasi** | **Error Message** | **UI Action** |
|------------|-------------------|---------------|
| **Tidak login** | "Silakan login untuk melakukan aksi ini" | Redirect ke login |
| **Session expired** | "Sesi Anda telah berakhir, silakan login kembali" | Modal logout + redirect |
| **Invalid token** | "Token tidak valid, silakan refresh halaman" | Auto-refresh |
| **Account banned** | "Akun Anda telah dilarang sementara sampai [tanggal]" | Show ban page |

**3. Authorization Errors (403)**

| **Situasi** | **Error Message** | **UI Action** |
|-----------|-------------------|---------------|
| **Bukan pemilik** | "Anda tidak memiliki hak mengubah jawaban orang lain" | Disable button |
| **Bukan moderator** | "Hanya Muraqi yang dapat validasi referensi" | Hide button |
| **Terlalu sering** | "Anda telah mencapai limit posting (3 pertanyaan/hari)" | Disable button + countdown |

**UI Toast:**

```
┌─────────────────────────────────────┐
│ ✗ Tidak Berhak Mengakses             │
│                                     │
│ Hanya Muraqi yang dapat melakukan   │
│ aksi ini. Role Anda saat ini: Thalib│
│                                     │
│ [OK] [Hubungi Admin]               │
└─────────────────────────────────────┘
```

**4. Network Errors (500, 503)**

| **Error** | **Message** | **Retry Strategy** |
|-----------|-----------|-------------------|
| **Server Error** | "Terjadi kesalahan server. Tim kami telah diberitahu. Coba lagi?" | Exponential backoff (3x) |
| **Timeout** | "Koneksi timeout. Periksa internet Anda dan coba lagi." | User manual retry |
| **Offline** | "Koneksi internet Anda terputus" | Auto-retry saat online |

**UI Offline State:**

```
┌──────────────────────────────────┐
│ ⚠️ OFFLINE MODE                  │
│                                  │
│ Anda sedang offline. Beberapa   │
│ fitur mungkin tidak tersedia.   │
│                                  │
│ Anda masih bisa:                │
│ • Membaca halaman yang dimuat   │
│ • Menulis draft (disimpan lokal) │
│                                  │
│ [Refresh] atau [Keluar]          │
└──────────────────────────────────┘
```

### 23.3 Toast/Notification UX

#### Toast Success

```
┌────────────────────────────────────────┐
│ ✓ Jawaban berhasil diposting!          │
│                                        │
│ Jawaban Anda telah diterbitkan.       │
│ Tunggu Muraqi memvalidasi referensi.  │
│                                        │
│           [Tutup]  [Lihat Jawaban]    │
└────────────────────────────────────────┘
```

Position: **Bottom-right**, Auto-dismiss: **5 detik**

#### Toast Warning

```
┌────────────────────────────────────────┐
│ ⚠️ Draft Belum Tersimpan               │
│                                        │
│ Anda memiliki perubahan yang belum    │
│ disimpan. Pastikan klik "Simpan"      │
│ sebelum meninggalkan halaman.         │
│                                        │
│           [Simpan] [Abaikan]          │
└────────────────────────────────────────┘
```

Position: **Top-center**, **Tidak auto-dismiss**

#### Toast Error

```
┌────────────────────────────────────────┐
│ ✗ Gagal Memposting Jawaban             │
│                                        │
│ Error: Referensi tidak valid           │
│ → Pastikan kitab ada dalam database   │
│                                        │
│ [Detail Error]  [Tutup]  [Coba Lagi]  │
└────────────────────────────────────────┘
```

Position: **Top-center**, **5-10 detik**

### 23.4 Form Error Recovery

#### Scenario: Duplikasi Pertanyaan Terdeteksi

```
┌────────────────────────────────────────────┐
│ ⚠️ PERTANYAAN SERUPA DITEMUKAN             │
│                                            │
│ "Bagaimana hukum membeli barang dengan    │
│ sistem riba?" sudah pernah ditanya        │
│                                            │
│ Similar Questions:                         │
│ • [Hukum membeli barang riba...] (4 ans)  │
│ • [Boleh tidak jual beli riba?] (2 ans)   │
│                                            │
│ Apakah Anda ingin:                         │
│ [Lihat Jawaban Existing] [Lanjutkan Posting] │
└────────────────────────────────────────────┘
```

Triggered **sebelum submit** via client-side similarity check (cosine similarity)

#### Scenario: Referensi Tidak Valid

```
┌──────────────────────────────────────────┐
│ ⚠️ REFERENSI TIDAK VALID                  │
│                                          │
│ [✗] Kitab "Fat-hul Muin" tidak ditemukan│
│     Saran: "Fathul Mu'in" (typo?)       │
│                                          │
│ [✓] Halaman 180 ✓                        │
│ [✓] Teks Arab ✓                          │
│ [✓] Terjemah ✓                           │
│                                          │
│ Perbaiki referensi sebelum melanjutkan  │
│                                          │
│ [Perbaiki] [Hapus Referensi]            │
└──────────────────────────────────────────┘
```

**Validasi real-time** saat user memilih kitab di autocomplete

### 23.5 Optimistic Updates & Rollback

#### Vote Upvote (Optimistic)

**Sebelum server response:**

```
User klik upvote:
1. UI update instantly: counter 24 → 25, tombol highlight
2. Server call di background: `castVote(answerId, 1)`
3. If success: ✓ Keep updated
4. If error: ⚠️ Rollback counter 25 → 24 + error toast
```

**Code (pseudo):**

```typescript
const { mutate: voteAnswer } = useMutation({
  mutationFn: (value: 1 | -1) => castVote(answerId, value),
  onMutate: async (value) => {
    // Optimistic update
    queryClient.setQueryData(['answer', answerId], (old) => ({
      ...old,
      upvotes: old.upvotes + value
    }))
  },
  onError: (error, value) => {
    // Rollback jika error
    queryClient.invalidateQueries(['answer', answerId])
    showErrorToast('Gagal vote, coba lagi')
  }
})
```

#### Comment Submit (Optimistic)

```
User ketik komentar & submit:
1. Optimistic: Comment muncul di UI dengan badge "Sending..."
2. Server call di background
3. If success: ✓ Remove "Sending" badge
4. If error: ⚠️ Comment di-highlight, show error + retry button
```

### 23.6 Form Auto-save (Draft)

#### Rich Text Editor Draft

```
Saat user mengetik di editor:
- Trigger onChange event
- Debounce 3 detik
- Save ke browser localStorage + server (background)
- UI indicator: "Tersimpan" / "Menyimpan..." / "Gagal menyimpan"
```

**UI Draft Indicator:**

```
┌─────────────────────────────────────┐
│ Detail Pertanyaan                   │
│ ┌───────────────────────────────┐  │
│ │ Assalamu'alaikum...           │  │
│ │                               │  │
│ │ ... (user typing)             │  │
│ └───────────────────────────────┘  │
│ 💾 Menyimpan draft... (grey spinner)│
│                                     │
│ Setelah 3 detik idle:              │
│ ✓ Draft tersimpan di server        │
│   (akan dimuat saat kembali)       │
└─────────────────────────────────────┘
```

### 23.7 Loading States & Placeholders

#### Page Loading (First Load)

```
┌──────────────────────────────────────┐
│ 🌙 Manhajuna  [⋮ Menu] [Login]       │
├──────────┬──────────────────────────┤
│ FILTER   │ ▓▓▓▓▓ (skeleton)          │
│ ▓▓▓▓▓▓   │ ▓▓▓▓▓ ▓▓▓                │
│ ▓▓▓▓▓▓   │                          │
│ ▓▓▓▓▓▓   │ ▓▓▓▓▓ (skeleton)         │
│          │ ▓▓▓▓▓ ▓▓▓                │
│          │                          │
│ ▓▓▓▓▓▓   │ ▓▓▓▓▓ (skeleton)         │
│          │ ▓▓▓▓▓ ▓▓▓                │
└──────────┴──────────────────────────┘
```

#### Infinite Scroll Loading

```
[Question Card 1]
[Question Card 2]
...
[Question Card 20]

┌────────────────────────────┐
│  ⟳ Memuat pertanyaan...    │
│   (spinner + padding)      │
└────────────────────────────┘

[Question Card 21]
```

Position: **Bottom of list**, Show saat user scroll ke bawah

### 23.8 Success States & Confirmations

#### Successful Answer Acceptance

```
┌───────────────────────────────────────┐
│ ✓ JAWABAN DITERIMA SEBAGAI TERBAIK!   │
│                                       │
│ 🎉 Selamat! Jawaban Anda dipilih    │
│    sebagai jawaban terbaik.          │
│                                       │
│ Anda menerima:                        │
│ • +25 poin reputasi                  │
│ • +15 poin bonus                     │
│                                       │
│ [Lihat Profil Saya] [Lanjut]         │
└───────────────────────────────────────┘
```

#### Badge Earned

```
┌──────────────────────────────────────┐
│ 🏅 BADGE BARU!                       │
│                                      │
│ Anda mendapatkan badge:              │
│ 🥇 "Jawaban Terbaik x5"             │
│                                      │
│ Pencapaian luar biasa!               │
│                                      │
│ [Lihat Badge] [Bagikan]             │
└──────────────────────────────────────┘
```

Position: **Center screen**, **Auto-dismiss 5 detik** atau click anywhere

### 23.9 Confirmation Dialogs

#### Delete Question Confirmation

```
┌──────────────────────────────────────────┐
│ ⚠️  HAPUS PERTANYAAN                      │
│                                          │
│ Apakah Anda yakin ingin menghapus       │
│ pertanyaan ini?                          │
│                                          │
│ "Bagaimana hukum membeli barang riba?"  │
│                                          │
│ ⚠️  Tindakan ini tidak dapat dibatalkan  │
│                                          │
│ Pertanyaan akan dihapus bersama semua   │
│ jawaban dan komentar yang terkait.      │
│                                          │
│ [Batal] [Hapus Selamanya]               │
└──────────────────────────────────────────┘
```

Button "Hapus": Red danger style, disabled selama 3 detik pertama

#### Ban Reference Confirmation (Muraqi)

```
┌──────────────────────────────────────────┐
│ ⚠️  TOLAK REFERENSI                       │
│                                          │
│ Kitab: Fathul Mu'in, Hal. 45            │
│ Teks: وَلَا يَضُرُّ اسْتِعْمَالُ...   │
│                                          │
│ Alasan Penolakan:                        │
│ ┌──────────────────────────────────────┐│
│ │ Teks ini merujuk hal lain, bukan     ││
│ │ jawaban atas pertanyaan yang ditanya ││
│ └──────────────────────────────────────┘│
│                                          │
│ [Batal] [Tolak & Beri Catatan]          │
└──────────────────────────────────────────┘
```

### 23.10 Accessibility Error Handling

#### Screen Reader Announcement

```typescript
// When validation error occurs
<div role="alert" aria-live="polite" aria-atomic="true">
  <strong>⚠️ Validasi gagal:</strong>
  <ul>
    <li>Judul harus minimal 10 karakter</li>
    <li>Pilih minimal 1 tag</li>
  </ul>
</div>
```

#### Keyboard Navigation

- Tab through form fields
- Enter untuk submit (jika form valid)
- Escape untuk cancel/close modal
- Arrow keys untuk navigate dropdown

#### Color + Icons (Tidak hanya warna)

- ✓ ✗ ⚠️ 🔔 icons selalu ada
- "Required" label + asterisk (*)
- Error text + red color + icon

---

### 23.11 Rate Limiting UX

#### Too Many Requests (429)

```
┌────────────────────────────────────────┐
│ ⏳ TERLALU BANYAK PERMINTAAN             │
│                                        │
│ Anda telah mencapai limit posting     │
│ untuk hari ini (3 pertanyaan/hari)   │
│                                        │
│ Dapat posting lagi dalam:             │
│ ⏱️ 15 jam 23 menit                    │
│                                        │
│ Upgrade ke premium untuk limit lebih  │
│ [Lihat Premium]  [OK]                │
└────────────────────────────────────────┘
```

Countdown timer yang update setiap 1 detik

### 23.12 Form Field-Specific Error Recovery

| **Field** | **Error** | **Recovery Suggestion** |
|-----------|----------|------------------------|
| **Kitab Autocomplete** | "Kitab tidak ditemukan" | Tampilkan dropdown dengan kitab popular atau "Jangan ketemu? Hubungi Muraqi" |
| **Email** | "Email sudah terdaftar" | "Sudah punya akun? [Masuk di sini]" |
| **Username** | "Username sudah dipakai" | Suggesti username alternatif: "@akhmad_fauzi_1", "@akhmad_fauzi_2", dll |
| **Password** | "Password terlalu lemah" | Password strength meter + saran: "Gunakan kombinasi huruf, angka, dan simbol" |
| **Tag** | "Tag tidak valid" | Tampilkan tag suggestions atau "Buat tag baru?" (Muraqi only) |

---

## 24. SEED DATA SPECIFICATION

### 24.1 Master Data Kitab (40+ Entries)

File: `supabase/seed.sql` - INSERT into `kitab_master` table

```sql
INSERT INTO kitab_master (id, nama_arab, nama_latin, pengarang, bidang, penerbit, tahun_cetak) VALUES

-- FIKIH SYAFI'I (10 kitab)
(gen_random_uuid(), 'فتح المعين', 'Fathul Mu'in', 'Syekh Zainuddin Al-Malibari', 'Fikih Syafi''i', 'Darul Fikr', '2005'),
(gen_random_uuid(), 'فتح القريب', 'Fathul Qarib', 'Ibnu Qasim Al-Ghuzzi', 'Fikih Syafi''i', 'Darul Fikr', '2004'),
(gen_random_uuid(), 'حاشية البجيري', 'Al-Bajuri', 'Syekh Ibrahim Al-Bajuri', 'Fikih Syafi''i', 'Darul Kutub Ilmiyyah', '2003'),
(gen_random_uuid(), 'إعانة الطالبين', 'I''anatuth Thalibin', 'Abu Bakr Syatha', 'Fikih Syafi''i', 'Darul Fikr', '2002'),
(gen_random_uuid(), 'الفقه الواضح', 'Al-Fiqhul Wadih', 'Muhammad Mahmud Al-Jundi', 'Fikih Syafi''i', 'Maktab Al-Qahirah', '2001'),
(gen_random_uuid(), 'متن أبي شجاع', 'Matan Abi Syuja''', 'Ahmad bin Muhammad Al-Ijli', 'Fikih Syafi''i', 'Darul Fikr', '2006'),
(gen_random_uuid(), 'شرح المنهاج', 'Syarhul Manhaj', 'Imam An-Nawawi', 'Fikih Syafi''i', 'Darul Fikr', '2000'),
(gen_random_uuid(), 'الأم', 'Al-Umm', 'Imam Asy-Syafi''i', 'Fikih Syafi''i', 'Darul Fikr', '1990'),
(gen_random_uuid(), 'المحلي', 'Al-Mahalli', 'Jalaluddin Al-Mahalli', 'Fikih Syafi''i', 'Darul Fikr', '1995'),
(gen_random_uuid(), 'حاشية الجمل', 'Hasiyah Al-Jamal', 'Syekh Al-Jamal', 'Fikih Syafi''i', 'Darul Fikr', '1998'),

-- FIKIH HANBALI (5 kitab)
(gen_random_uuid(), 'المغني', 'Al-Mughni', 'Ibnu Qudamah Al-Maqdisi', 'Fikih Hanbali', 'Darul Fikr', '1992'),
(gen_random_uuid(), 'الكافي', 'Al-Kafi', 'Ibnu Qudamah', 'Fikih Hanbali', 'Darul Fikr', '1997'),
(gen_random_uuid(), 'الشرح الممتع', 'Syarhul Mumtii''', 'Muhammad bin Salih Al-Uthaimin', 'Fikih Hanbali', 'Darul Fikr', '2007'),
(gen_random_uuid(), 'الروض المربع', 'Ar-Rawdhul Murabba''', 'Sulayman bin Ahmad Al-Bahuti', 'Fikih Hanbali', 'Darul Fikr', '1996'),
(gen_random_uuid(), 'زاد المستقنع', 'Zadul Mustaqni''', 'Al-Hajjawi', 'Fikih Hanbali', 'Maktab Al-Riyad', '2008'),

-- FIKIH MALIKI (3 kitab)
(gen_random_uuid(), 'الديباج المذهب', 'Ad-Dibajul Madhab', 'Ibrahim bin Nuhayyil', 'Fikih Maliki', 'Darul Fikr', '1994'),
(gen_random_uuid(), 'التاج والإكليل', 'At-Taj Wal Iklil', 'Al-Mawwaq', 'Fikih Maliki', 'Darul Fikr', '1993'),
(gen_random_uuid(), 'الفواكه الدواني', 'Al-Fawakihul Dawani', 'Ahmad bin Ghanim An-Nafrati', 'Fikih Maliki', 'Darul Fikr', '1999'),

-- FIKIH HANAFI (5 kitab)
(gen_random_uuid(), 'الهداية', 'Al-Hidayah', 'Burhanuddin Al-Marghinani', 'Fikih Hanafi', 'Darul Fikr', '1989'),
(gen_random_uuid(), 'فتح القدير', 'Fathul Qadir', 'Kamaluddin Ibnu Al-Hamam', 'Fikih Hanafi', 'Darul Fikr', '1991'),
(gen_random_uuid(), 'بدائع الصنائع', 'Bada''il As-Sana''i''', 'Alaauddin Al-Kasani', 'Fikih Hanafi', 'Darul Fikr', '1988'),
(gen_random_uuid(), 'رد المحتار', 'Raddul Muhtar', 'Ibn Abidin', 'Fikih Hanafi', 'Darul Fikr', '1987'),
(gen_random_uuid(), 'العناية', 'Al-Inyah', 'Akmal Uddin Al-Babarti', 'Fikih Hanafi', 'Darul Fikr', '1986'),

-- USHUL FIKIH (6 kitab)
(gen_random_uuid(), 'الموافقات', 'Al-Muwafaqat', 'Asy-Syatibi', 'Ushul Fikih', 'Darul Fikr', '1985'),
(gen_random_uuid(), 'جمع الجوامع', 'Jam''ul Jawami''', 'Imam As-Subki', 'Ushul Fikih', 'Darul Fikr', '1984'),
(gen_random_uuid(), 'الورقات', 'Al-Waraqat', 'Imam Al-Juwaini', 'Ushul Fikih', 'Darul Fikr', '1983'),
(gen_random_uuid(), 'لب الأصول', 'Lubbul Ushul', 'Syekh Nawawi Al-Bantani', 'Ushul Fikih', 'Darul Fikr', '1982'),
(gen_random_uuid(), 'الأشباه والنظائر', 'Al-Ashbah Wan Nadha''ir', 'Imam As-Suyuthi', 'Ushul Fikih', 'Darul Fikr', '2010'),
(gen_random_uuid(), 'روضة الناظر', 'Rawdhatul Nazir', 'Ibn Qudamah', 'Ushul Fikih', 'Darul Fikr', '1981'),

-- NAHWU (8 kitab)
(gen_random_uuid(), 'الألفية', 'Alfiyyah', 'Ibnu Malik', 'Nahwu', 'Darul Fikr', '2015'),
(gen_random_uuid(), 'شرح ابن عقيل', 'Syarh Ibnu Aqil', 'Baha''uddin Ibnu Aqil', 'Nahwu', 'Darul Fikr', '2014'),
(gen_random_uuid(), 'الآجرومية', 'Al-Ajrumiyyah', 'Ibnu Ajurrum', 'Nahwu', 'Darul Fikr', '2013'),
(gen_random_uuid(), 'الجرومية', 'Al-Jurumiyyah', 'Ibnu Ajurrum', 'Nahwu', 'Darul Fikr', '2012'),
(gen_random_uuid(), 'شرح الكافية', 'Syarhul Kafiyah', 'Radiyuddin Al-Astarabadi', 'Nahwu', 'Darul Fikr', '2011'),
(gen_random_uuid(), 'معاني القرآن', 'Maa''anil Quran', 'Al-Farra''', 'Nahwu', 'Darul Fikr', '1980'),
(gen_random_uuid(), 'المقتضب', 'Al-Muqtadab', 'Al-Mubarrid', 'Nahwu', 'Darul Fikr', '1979'),
(gen_random_uuid(), 'مغني اللبيب', 'Maghniy Al-Labib', 'Ibn Hisyam', 'Nahwu', 'Darul Fikr', '1978'),

-- SHOROF/MORFOLOJI (3 kitab)
(gen_random_uuid(), 'الممتع', 'Al-Mumtaa''', 'Ibnu Ummul Qura''', 'Shorof', 'Darul Fikr', '1977'),
(gen_random_uuid(), 'الكافية في علم الصرف', 'Al-Kafiyah fi Ilmis Sharf', 'Ibnu Hajib', 'Shorof', 'Darul Fikr', '1976'),
(gen_random_uuid(), 'ديوان الأدب', 'Diwan Al-Adab', 'Al-Farahidi', 'Shorof', 'Darul Fikr', '1975'),

-- HADITS & ILMU HADITS (5 kitab)
(gen_random_uuid(), 'صحيح البخاري', 'Shahih Al-Bukhari', 'Muhammad bin Ismail Al-Bukhari', 'Hadis', 'Darul Fikr', '2020'),
(gen_random_uuid(), 'صحيح مسلم', 'Shahih Muslim', 'Muslim bin Al-Hajjaj', 'Hadis', 'Darul Fikr', '2019'),
(gen_random_uuid(), 'سنن الترمذي', 'Sunan At-Tirmidhi', 'Muhammad bin Isa At-Tirmidhi', 'Hadis', 'Darul Fikr', '2018'),
(gen_random_uuid(), 'سنن النسائي', 'Sunan An-Nasa''i', 'Ahmad bin Shu''ayb An-Nasa''i', 'Hadis', 'Darul Fikr', '2017'),
(gen_random_uuid(), 'سنن ابن ماجه', 'Sunan Ibnu Majah', 'Muhammad bin Yazid Ibnu Majah', 'Hadis', 'Darul Fikr', '2016');

ON CONFLICT DO NOTHING;
```

### 24.2 Tag Hierarki (Category Tree)

File: `supabase/seed.sql` - INSERT into `tags` table

```sql
-- Categories level 0 (parent)
INSERT INTO tags (id, name, slug, description, color, icon, parent_id) VALUES

-- FIKIH (Category)
('01FIKIH', 'Fikih', 'fikih', 'Diskusi tentang hukum syariat dalam berbagai aspek kehidupan', '#1B6B4A', '⚖️', NULL),

-- Fikih Ibadah
('02IBADAH', 'Ibadah', 'ibadah', 'Pertanyaan seputar thaharah, shalat, zakat, puasa, haji', '#2E8B5E', '🕌', '01FIKIH'),
('03THAHARAH', 'Thaharah', 'thaharah', 'Kesucian, wudhu, mandi, tayammum, adab istinja''', '#30A46C', '💧', '02IBADAH'),
('04WUDHU', 'Wudhu', 'wudhu', 'Tata cara wudhu, niat, ketentuan', '#3FA575', '✋', '03THAHARAH'),
('05SOLAT', 'Shalat', 'shalat', 'Shalat 5 waktu, shalat Jumat, tata cara, syarat', '#2E8B5E', '🕋', '02IBADAH'),
('06ZAKAT', 'Zakat', 'zakat', 'Zakat fitrah, zakat mal, nishab, mustahiq', '#1B6B4A', '💰', '02IBADAH'),
('07PUASA', 'Puasa', 'puasa', 'Puasa Ramadan, niat, pembatal puasa, i''tikaf', '#2E8B5E', '🌙', '02IBADAH'),
('08HAJI', 'Haji', 'haji', 'Haji dan Umrah, ihram, wukuf, thawaf', '#1B6B4A', '🗻', '02IBADAH'),

-- Fikih Muamalah
('09MUAMALAH', 'Muamalah', 'muamalah', 'Jual beli, riba, gadai, kerjasama bisnis', '#2E8B5E', '🤝', '01FIKIH'),
('10JUALBELI', 'Jual Beli', 'jual-beli', 'Akad jual beli, syarat, khiyar, barang cacat', '#3FA575', '🛍️', '09MUAMALAH'),
('11RIBA', 'Riba', 'riba', 'Definisi riba, macam-macam, hukum, kafalah', '#30A46C', '⚠️', '09MUAMALAH'),
('12HUTANG', 'Hutang Piutang', 'hutang-piutang', 'Hutang, pinjam, cicilan, riba dalam utang', '#2E8B5E', '📝', '09MUAMALAH'),

-- Fikih Nikah
('13NIKAH', 'Nikah', 'nikah', 'Pernikahan, ijab qobul, mahar, walimah', '#1B6B4A', '💍', '01FIKIH'),
('14IJABQOBUL', 'Ijab Qobul', 'ijab-qobul', 'Tata cara akad nikah, syarat, syahid', '#3FA575', '🎤', '13NIKAH'),
('15MAHAR', 'Mahar', 'mahar', 'Mahar wajib, tunai, usul mahar, muhalah', '#30A46C', '💎', '13NIKAH'),

-- NAHWU (Category)
('20NAHWU', 'Nahwu', 'nahwu', 'Ilmu tata bahasa Arab - sintaksis dan struktur kalimat', '#0066CC', '📚', NULL),
('21ISIM', 'Isim', 'isim', 'Pembahasan kata benda dan pola-polanya', '#0066FF', '📖', '20NAHWU'),
('22FIIL', 'Fiil', 'fiil', 'Pembahasan kata kerja dan conjugation', '#3366FF', '📗', '20NAHWU'),
('23HAL', 'Hal', 'hal', 'Adverbial construction, keadaan', '#6699FF', '📘', '20NAHWU'),
('24IDHOFA', 'Idhafah', 'idhafah', 'Konstruksi kepemilikan dan hubungan', '#0099CC', '🔗', '20NAHWU'),

-- USHUL FIKIH (Category)
('30USULFIKIH', 'Ushul Fikih', 'ushul-fikih', 'Prinsip-prinsip dan metodologi penetapan hukum Islam', '#8B4513', '⚙️', NULL),
('31IJMA''', 'Ijma''', 'ijmaa', 'Konsensus ulama, syarat, macam-macam', '#A0522D', '👥', '30USULFIKIH'),
('32QIYAS', 'Qiyas', 'qiyas', 'Analogi hukum, rukun qiyas, syarat', '#8B4513', '🔍', '30USULFIKIH'),
('33MASLAHAH', 'Maslahah', 'maslahah', 'Kemaslahatan, macam-macam, penggunaannya', '#A0522D', '✨', '30USULFIKIH'),

-- WAQIIYAH (Contemporary Issues) (Category)
('40WAQIIYAH', 'Waqiiyah (Kontemporer)', 'waqiiyah', 'Masalah-masalah keislaman kontemporer dan kasus aktual', '#FF6B6B', '🌍', NULL),
('41TEKNOLOGI', 'Teknologi', 'teknologi', 'Hukum teknologi, internet, media sosial', '#FF8787', '💻', '40WAQIIYAH'),
('42MEDIS', 'Medis', 'medis', 'Masalah kesehatan, vaksin, operasi, aborsi', '#FF9999', '⚕️', '40WAQIIYAH'),
('43KEUANGAN', 'Keuangan Digital', 'keuangan-digital', 'Cryptocurrency, fintech, banking digital', '#FFAAAA', '💳', '40WAQIIYAH'),
('44LINGKUNGAN', 'Lingkungan', 'lingkungan', 'Isu lingkungan, keberlanjutan, konservasi', '#FFBBBB', '🌱', '40WAQIIYAH'),

-- AKIDAH (Category)
('50AKIDAH', 'Akidah', 'akidah', 'Iman, tauhid, konsep ketuhanan dalam Islam', '#9B59B6', '✋', NULL),
('51TAUHID', 'Tauhid', 'tauhid', 'Keesaan Allah, atribut Ilahi', '#B369D1', '⭐', '50AKIDAH'),
('52QADAR', 'Qadar & Qudrah', 'qadar', 'Takdir, kehendak Allah, kebebasan manusia', '#9B59B6', '🎲', '50AKIDAH');

ON CONFLICT DO NOTHING;
```

### 24.3 Badge Definitions

File: `supabase/seed.sql` - INSERT into `badges` table

```sql
INSERT INTO badges (id, name, slug, description, icon, tier, criteria, display_order) VALUES

-- BRONZE BADGES
(gen_random_uuid(), 'Penanya Pertama', 'first-asker', 'Membuat pertanyaan pertama Anda', '🥉', 'BRONZE', '{"type": "questions_created", "count": 1}', 1),
(gen_random_uuid(), 'Penjawab Pertama', 'first-answerer', 'Memberikan jawaban pertama Anda', '🥉', 'BRONZE', '{"type": "answers_created", "count": 1}', 2),
(gen_random_uuid(), 'Referensi Pertama', 'first-reference', 'Menambahkan referensi kitab pertama', '🥉', 'BRONZE', '{"type": "references_added", "count": 1}', 3),
(gen_random_uuid(), 'Sepuluh Vote', 'ten-votes', 'Mendapatkan 10 upvotes total', '🥉', 'BRONZE', '{"type": "total_upvotes", "count": 10}', 4),
(gen_random_uuid(), 'Aktif Minggu Ini', 'weekly-active', 'Login minimal 3 hari dalam seminggu', '🥉', 'BRONZE', '{"type": "weekly_logins", "count": 3}', 5),

-- SILVER BADGES
(gen_random_uuid(), 'Sepuluh Referensi Valid', 'ten-valid-refs', '10 referensi divalidasi oleh Muraqi', '🥈', 'SILVER', '{"type": "valid_references", "count": 10}', 10),
(gen_random_uuid(), 'Lima Jawaban Terbaik', 'five-best-answers', '5 jawaban dipilih sebagai terbaik', '🥈', 'SILVER', '{"type": "best_answers", "count": 5}', 11),
(gen_random_uuid(), 'Seratus Upvotes', 'hundred-upvotes', 'Mendapatkan 100 upvotes total', '🥈', 'SILVER', '{"type": "total_upvotes", "count": 100}', 12),
(gen_random_uuid(), 'Penulis Produktif', 'prolific-writer', 'Menerbitkan 50 jawaban', '🥈', 'SILVER', '{"type": "answers_created", "count": 50}', 13),

-- GOLD BADGES
(gen_random_uuid(), 'Lima Puluh Referensi Valid', 'fifty-valid-refs', '50 referensi divalidasi - Master Referencer', '🥇', 'GOLD', '{"type": "valid_references", "count": 50}', 20),
(gen_random_uuid(), 'Dua Puluh Lima Jawaban Terbaik', 'twentyfive-best-answers', '25 jawaban terbaik - Ulama Terpercaya', '🥇', 'GOLD', '{"type": "best_answers", "count": 25}', 21),
(gen_random_uuid(), 'Seribu Upvotes', 'thousand-upvotes', '1000 upvotes - Kontributor Utama', '🥇', 'GOLD', '{"type": "total_upvotes", "count": 1000}', 22),
(gen_random_uuid(), 'Mufid', 'mufid', 'Reputasi ≥ 5000 - Yang Banyak Memberikan Faedah', '🥇', 'GOLD', '{"type": "reputation", "count": 5000}', 23),
(gen_random_uuid(), 'Allamah', 'allamah', 'Reputasi ≥ 10000 - Sang Cendekiawan', '🥇', 'GOLD', '{"type": "reputation", "count": 10000}', 24);

ON CONFLICT DO NOTHING;
```

### 24.4 Default Users (Admin & Moderators)

File: `supabase/seed.sql` - INSERT into profiles table (after auth.users created)

```sql
-- NOTE: Hanya jalankan SETELAH membuat users di Supabase Auth dashboard
-- Atau gunakan Supabase Edge Function untuk auto-create with password

-- Admin User
INSERT INTO profiles (id, username, display_name, gelar, bio, role, reputation, level, is_verified, email_notifications) VALUES
('11111111-1111-1111-1111-111111111111', 'admin_manhajuna', 'Admin Manhajuna', 'Admin Platform', 'Administrator Platform Manhajuna', 'MUDIR', 50000, 8, true, true),

-- Moderators (Muraqi)
('22222222-2222-2222-2222-222222222222', 'muraqi_faqih', 'Muraqi Faqih', 'Al-Muraqi', 'Moderator Spesialis Fikih', 'MURAQI', 15000, 7, true, true),
('33333333-3333-3333-3333-333333333333', 'muraqi_lugah', 'Muraqi Lugah', 'Al-Muraqi', 'Moderator Spesialis Bahasa Arab', 'MURAQI', 12000, 6, true, true),
('44444444-4444-4444-4444-444444444444', 'muraqi_ushul', 'Muraqi Ushul', 'Al-Muraqi', 'Moderator Spesialis Ushul Fikih', 'MURAQI', 10000, 5, true, true),

-- Sample Verified Scholars (Mujib)
('55555555-5555-5555-5555-555555555555', 'ustadz_faqih', 'Ustadz Muhammad Faqih', 'Dr. Faqih, M.Ag.', 'Dosen IAIN, Spesialis Fikih Muamalah', 'MUJIB', 8500, 7, true, true),
('66666666-6666-6666-6666-666666666666', 'kiai_suryan', 'Kiai Suryan Basyir', 'Lc., M.H.', 'Kiai Pesantren, Mufti Kabupaten', 'MUJIB', 7200, 6, true, true),
('77777777-7777-7777-7777-777777777777', 'dosen_nahwu', 'Dr. Ahmad Hamim', 'Dr. Hamim, M.Pd.', 'Dosen Bahasa Arab & Nahwu', 'MUJIB', 6500, 6, true, true);

ON CONFLICT DO NOTHING;
```

> **CATATAN PENTING:** User ID di atas adalah placeholder UUID. Dalam praktik:
> - Buat users di Supabase Auth dashboard terlebih dahulu
> - Ambil user ID dari auth.users
> - Update email + UUID di query di atas
> - Atau gunakan Supabase Edge Function untuk automation

### 24.5 Default System Categories

File: `supabase/seed.sql` - INSERT into categories (jika ada tabel terpisah)

Atau gunakan `tags` table dengan `parent_id = NULL` untuk kategori utama.

### 24.6 Initial Content Seeding (Optional - For Testing)

File: `supabase/seed_sample_content.sql`

```sql
-- SAMPLE QUESTION (untuk testing)
INSERT INTO questions (
  id, title, slug, content, content_text, user_id, status, views, upvotes, downvotes, created_at
) VALUES (
  gen_random_uuid(),
  'Bagaimana hukum wudhu dengan air bekas cucian beras?',
  'bagaimana-hukum-wudhu-dengan-air-bekas-cucian-beras-1234567',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Assalamu''alaikum warahmatullahi wabarakatuh..."}]}]}',
  'Assalamu''alaikum warahmatullahi wabarakatuh... Saya ingin bertanya tentang air bekas cucian beras apakah bisa digunakan untuk wudhu',
  '55555555-5555-5555-5555-555555555555',
  'HALL',
  0,
  0,
  0,
  now()
);

-- SAMPLE ANSWER
INSERT INTO answers (
  id, content, content_text, question_id, user_id, upvotes, downvotes, created_at
) VALUES (
  gen_random_uuid(),
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Air yang telah digunakan untuk mencuci beras..."}]}]}',
  'Air yang telah digunakan untuk mencuci beras termasuk dalam kategori air mustamal...',
  (SELECT id FROM questions ORDER BY created_at DESC LIMIT 1),
  '55555555-5555-5555-5555-555555555555',
  5,
  0,
  now()
);

-- SAMPLE REFERENCE
INSERT INTO "references" (
  id, answer_id, kitab_id, jilid, halaman, teks_arab, terjemah, validation_status, created_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM answers ORDER BY created_at DESC LIMIT 1),
  (SELECT id FROM kitab_master WHERE nama_latin = 'Fathul Mu''in' LIMIT 1),
  '1',
  '45',
  'وَالْمَاءُ الْمُسْتَعْمَلُ لَا يَصِحُّ التَّطَهُّرُ بِهِ',
  'Air yang telah digunakan tidak sah untuk bersuci dengannya',
  'VALID',
  now()
);
```

### 24.7 Complete Seed Execution Script

File: `supabase/seed.sql` (main file untuk production)

```bash
# Jalankan lokal
supabase db reset  # Reset DB
supabase db push   # Push migrations

# Atau jalankan SQL langsung:
# psql -U postgres -h localhost -p 5432 -d postgres -f supabase/seed.sql
```

### 24.8 Seed Data Checklist (Developers)

```
[ ] Kitab Master: 40+ kitab sudah di-insert
[ ] Tags Hierarki: Category + subcategory lengkap
    - Fikih (8 subcategories)
    - Nahwu (4 subcategories)
    - Ushul Fikih (4 subcategories)
    - Waqiiyah (4 subcategories)
    - Akidah (3 subcategories)
    
[ ] Badges: 14 badges (5 bronze, 4 silver, 5 gold)
[ ] Default Users:
    - 1 Admin (MUDIR)
    - 3 Moderators (MURAQI)
    - 3 Sample Scholars (MUJIB) — untuk testing
    
[ ] Reputasi Levels:
    - Admin: 50000 pts (Level 8)
    - Muraqi: 10000-15000 pts (Level 5-7)
    - Mujib: 6500-8500 pts (Level 6-7)
    - Regular Thalib: 0-50 pts (Level 1)
    
[ ] Sample Content (optional):
    - 1 Sample question (HALL status)
    - 1 Sample answer
    - 1 Sample reference (tervalidasi)
```

### 24.9 Seed Data Update Strategy

**Kitab baru ditambahkan oleh:**
1. **Muraqi** - via admin panel (create form)
2. **Automated** - via Supabase Edge Function (import batch)
3. **Community** - user suggestion (perlu approval Muraqi)

**Version tracking:**
- File: `supabase/seeds/v1_initial.sql` (40 kitab, 13 kategori)
- File: `supabase/seeds/v1.1_add_kitab.sql` (kitab tambahan per Q)
- File: `supabase/seeds/v1.2_add_references.sql` (referensi sampel baru)

---

> **Dokumen ini bersifat dinamis dan akan diperbarui seiring perkembangan proyek.**
> 
> *Wallahu a'lam bish-shawab.*
