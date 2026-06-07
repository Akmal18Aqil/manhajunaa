-- Seed Data for Manhajuna Platform

-- Kitab Master Data
INSERT INTO kitab_master (nama_arab, nama_latin, pengarang, bidang, penerbit, tahun_cetak, deskripsi) VALUES
('فتح المعين', 'Fat-hul Mu''in', 'Zainuddin Al-Malibari', 'Fikih Syafi''i', 'Darul Fikr', '1420 H', 'Kitab Fikih Syafi''i populer di pesantren Indonesia'),
('فتح القريب', 'Fathul Qarib', 'Ibnu Qasim Al-Ghuzzi', 'Fikih Syafi''i', 'Darul Fikr', '1415 H', 'Kitab Fikih Syafi''i ringkas'),
('البجيرمي', 'Al-Bajuri', 'Ibrahim Al-Bajuri', 'Fikih Syafi''i', 'Darul Fikr', '1425 H', 'Syarah atas Fathul Qarib'),
('إعانة الطالبين', 'I''anatuth Thalibin', 'Abu Bakr Syatha', 'Fikih Syafi''i', 'Darul Fikr', '1420 H', 'Kitab Fikih mendetail untuk madzhab Syafi''i'),
('المجموع', 'Al-Majmuu', 'Imam Nawawi', 'Fikih Syafi''i', 'Darul Fikr', '1421 H', 'Enkiklopedia Fikih Syafi''i terlengkap'),
('المغني', 'Al-Mughni', 'Ibnu Qudamah', 'Fikih Hanbali', 'Darul Fikr', '1420 H', 'Kitab Fikih Hanbali komprehensif'),
('الأم', 'Al-Umm', 'Imam Asy-Syafi''i', 'Fikih Syafi''i', 'Darul Fikr', '1421 H', 'Kitab Fikih asli dari Imam Asy-Syafi''i'),
('بداية المجتهد', 'Bidayatul Mujtahid', 'Ibnu Rusyd', 'Fikih Perbandingan', 'Darul Fikr', '1420 H', 'Perbandingan fikih antar madzhab'),
('الأشباه والنظائر', 'Al-Asybah wan Nadha''ir', 'Imam As-Suyuthi', 'Qawa''id Fiqhiyyah', 'Darul Fikr', '1419 H', 'Kaidah-kaidah fikih'),
('ألفية ابن مالك', 'Alfiyah Ibnu Malik', 'Ibnu Malik', 'Nahwu', 'Darul Fikr', '1418 H', 'Kitab Nahwu paling terkenal dalam bentuk syair'),
('شرح ابن عقيل', 'Syarh Ibnu Aqil', 'Ibnu Aqil', 'Nahwu', 'Darul Fikr', '1420 H', 'Syarah populer untuk Alfiyah Ibnu Malik'),
('الآجرومية', 'Al-Ajurumiyyah', 'Ibnu Ajurrum', 'Nahwu Dasar', 'Darul Fikr', '1415 H', 'Kitab Nahwu dasar untuk pemula'),
('جمع الجوامع', 'Jam''ul Jawami''', 'Imam Subki', 'Ushul Fikih', 'Darul Fikr', '1419 H', 'Ringkasan Ushul Fikih'),
('الورقات', 'Al-Waraqat', 'Imam Al-Juwaini', 'Ushul Fikih', 'Darul Fikr', '1415 H', 'Pendahuluan Ushul Fikih'),
('لب الأصول', 'Lubbul Ushul', 'Nawawi Al-Bantani', 'Ushul Fikih', 'Darul Fikr', '1420 H', 'Ushul Fikih dalam bahasa Arab mudah'),
('صحيح البخاري', 'Sahih Al-Bukhari', 'Imam Al-Bukhari', 'Hadits', 'Darul Fikr', '1421 H', 'Kumpulan Hadits Shahih paling terkenal');

-- Tags with Hierarchy
INSERT INTO tags (name, slug, description, color, icon, parent_id) VALUES
('Fikih', 'fikih', 'Pembahasan masalah hukum Islam', '#1B6B4A', '⚖️', NULL),
('Ushul Fikih', 'ushul-fikih', 'Dasar-dasar dan metodologi fikih', '#2E8B5E', '🔍', NULL),
('Nahwu', 'nahwu', 'Tata bahasa Arab', '#1B6B4A', '📝', NULL),
('Sharaf', 'sharaf', 'Morfologi bahasa Arab', '#2E8B5E', '✏️', NULL),
('Waqiiyah', 'waqiiyah', 'Masalah-masalah kontemporer', '#C9A84C', '🌍', NULL),
('Tafsir', 'tafsir', 'Penafsiran Al-Quran', '#1B6B4A', '📖', NULL),
('Hadits', 'hadits', 'Ilmu dan kritik Hadits', '#2E8B5E', '🕯️', NULL);

-- Sub-categories for Fikih
INSERT INTO tags (name, slug, description, color, icon, parent_id) VALUES
('Thaharah', 'thaharah', 'Bab Suci dan Najis', '#1B6B4A', '💧', (SELECT id FROM tags WHERE slug = 'fikih')),
('Wudhu', 'wudhu', 'Tata cara dan syarat wudhu', '#2E8B5E', '🚿', (SELECT id FROM tags WHERE slug = 'thaharah')),
('Sholat', 'sholat', 'Masalah-masalah sholat', '#1B6B4A', '🕌', (SELECT id FROM tags WHERE slug = 'fikih')),
('Puasa', 'puasa', 'Masalah-masalah puasa dan zakat', '#2E8B5E', '🌙', (SELECT id FROM tags WHERE slug = 'fikih')),
('Haji', 'haji', 'Masalah-masalah haji dan umroh', '#1B6B4A', '🕋️', (SELECT id FROM tags WHERE slug = 'fikih')),
('Muamalah', 'muamalah', 'Jual beli dan transaksi', '#2E8B5E', '🤝', (SELECT id FROM tags WHERE slug = 'fikih')),
('Nikah', 'nikah', 'Masalah pernikahan dan keluarga', '#1B6B4A', '💑', (SELECT id FROM tags WHERE slug = 'fikih')),
('Warits', 'warits', 'Pembagian warisan', '#2E8B5E', '📋', (SELECT id FROM tags WHERE slug = 'fikih'));

-- Badges
INSERT INTO badges (name, slug, description, icon, tier, criteria, display_order) VALUES
-- Bronze Badges
('Penanya Pertama', 'penanya-pertama', 'Mengajukan pertanyaan pertama kalimu', '🥉', 'BRONZE'::badge_tier, '{"type": "first_question"}', 1),
('Penjawab Pertama', 'penjawab-pertama', 'Menjawab pertanyaan pertama kalimu', '🥉', 'BRONZE'::badge_tier, '{"type": "first_answer"}', 2),
('Referensi Pertama', 'referensi-pertama', 'Menambahkan referensi kitab pertama kalimu', '🥉', 'BRONZE'::badge_tier, '{"type": "first_reference"}', 3),
('Vote 10', 'vote-10', 'Mendapat 10 upvotes total', '🥉', 'BRONZE'::badge_tier, '{"type": "upvotes", "count": 10}', 4),

-- Silver Badges
('Referensi Valid x10', 'ref-valid-10', '10 referensi divalidasi oleh Muraqi', '🥈', 'SILVER'::badge_tier, '{"type": "validated_references", "count": 10}', 5),
('Jawaban Terbaik x5', 'best-answer-5', '5 jawaban dipilih sebagai terbaik', '🥈', 'SILVER'::badge_tier, '{"type": "best_answers", "count": 5}', 6),
('100 Upvotes', 'upvotes-100', 'Mendapat 100 upvotes total', '🥈', 'SILVER'::badge_tier, '{"type": "upvotes", "count": 100}', 7),

-- Gold Badges
('Referensi Valid x50', 'ref-valid-50', '50 referensi divalidasi oleh Muraqi', '🥇', 'GOLD'::badge_tier, '{"type": "validated_references", "count": 50}', 8),
('Jawaban Terbaik x25', 'best-answer-25', '25 jawaban terbaik', '🥇', 'GOLD'::badge_tier, '{"type": "best_answers", "count": 25}', 9),
('1000 Upvotes', 'upvotes-1000', 'Mendapat 1000 upvotes total', '🥇', 'GOLD'::badge_tier, '{"type": "upvotes", "count": 1000}', 10),
('Al-Mufid', 'al-mufid', 'Yang banyak memberi faedah - Reputasi ≥ 5000', '🥇', 'GOLD'::badge_tier, '{"type": "reputation", "min": 5000}', 11),
('Al-''Allamah', 'al-allamah', 'Sang Cendekiawan - Reputasi ≥ 10000', '🥇', 'GOLD'::badge_tier, '{"type": "reputation", "min": 10000}', 12);
