-- Seed 10 More Q&A

-- Q1
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d001-4000-8000-000000000000',
  'Hukum Shalat Memakai Masker / Menutup Mulut saat Pandemi',
  'hukum-shalat-memakai-masker-menutup-mulut',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum ustadz. Izin bertanya, apa hukumnya shalat sambil memakai masker atau menutup mulut, seperti pada masa pandemi atau di tempat berdebu?"}]}]}'::jsonb,
  'Assalamu''alaikum ustadz. Izin bertanya, apa hukumnya shalat sambil memakai masker atau menutup mulut, seperti pada masa pandemi atau di tempat berdebu?',
  '11111111-1111-1111-1111-111111111111',
  'TERSELESAIKAN',
  250, 15, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d001-4000-8000-000000000000', id FROM tags WHERE slug = 'sholat' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d001-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Hukum asal menutup mulut saat shalat adalah makruh (makruh tanzih), namun kemakruhan ini hilang jika ada udzur/hajat seperti adanya debu, penyakit menular (seperti wabah/pandemi), atau bau yang mengganggu."}]}]}'::jsonb,
  'Wa''alaikumussalam. Hukum asal menutup mulut saat shalat adalah makruh (makruh tanzih), namun kemakruhan ini hilang jika ada udzur/hajat seperti adanya debu, penyakit menular (seperti wabah/pandemi), atau bau yang mengganggu.',
  '11111111-d001-4000-8000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  true, 18
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d001-4000-8000-000000000000' WHERE id = '11111111-d001-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d001-4000-8000-000000000000', id, '1', 'Bab Shalat', '188', 'يُكْرَهُ أَنْ يُصَلِّيَ الرَّجُلُ مُتَلَثِّمًا', 'Dimakruhkan bagi seseorang shalat dalam keadaan menutup mulutnya.', 'VALID' FROM kitab_master WHERE nama_latin = 'Fat-hul Mu''in' LIMIT 1;


-- Q2
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d002-4000-8000-000000000000',
  'Hukum Menggunakan Inhaler saat Puasa',
  'hukum-menggunakan-inhaler-saat-puasa',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum... Bagaimana hukum orang yang puasanya memakai inhaler (obat hirup asma)? Apakah membatalkan puasa?"}]}]}'::jsonb,
  'Assalamu''alaikum... Bagaimana hukum orang yang puasanya memakai inhaler (obat hirup asma)? Apakah membatalkan puasa?',
  '22222222-2222-2222-2222-222222222222',
  'TERSELESAIKAN',
  500, 32, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d002-4000-8000-000000000000', id FROM tags WHERE slug = 'puasa' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d002-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Penggunaan inhaler yang berisi zat/obat (bukan hanya udara) yang dihirup hingga masuk ke rongga jauf (paru-paru/lambung) membatalkan puasa menurut mayoritas ulama Syafi''iyah kontemporer."}]}]}'::jsonb,
  'Wa''alaikumussalam. Penggunaan inhaler yang berisi zat/obat (bukan hanya udara) yang dihirup hingga masuk ke rongga jauf (paru-paru/lambung) membatalkan puasa menurut mayoritas ulama Syafi''iyah kontemporer.',
  '11111111-d002-4000-8000-000000000000',
  '44444444-4444-4444-4444-444444444444',
  true, 25
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d002-4000-8000-000000000000' WHERE id = '11111111-d002-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d002-4000-8000-000000000000', id, '2', 'Kitab Shaum', '261', 'وَالْمُفْطِرُ وُصُوْلُ عَيْنٍ إِلَى جَوْفٍ', 'Dan hal yang membatalkan (puasa) adalah sampainya suatu benda (''ain) ke dalam rongga dalam (jauf).', 'VALID' FROM kitab_master WHERE nama_latin = 'I''anatuth Thalibin' LIMIT 1;


-- Q3
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d003-4000-8000-000000000000',
  'Hukum Shalat Jenazah Gaib untuk Saudara di Palestina',
  'hukum-shalat-jenazah-gaib-untuk-palestina',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum. Izin bertanya, bolehkah kita menyelenggarakan shalat ghaib untuk para syuhada di Palestina? Mengingat jarak yang jauh dan mereka pasti sudah dishalati di sana."}]}]}'::jsonb,
  'Assalamu''alaikum. Izin bertanya, bolehkah kita menyelenggarakan shalat ghaib untuk para syuhada di Palestina? Mengingat jarak yang jauh dan mereka pasti sudah dishalati di sana.',
  '11111111-1111-1111-1111-111111111111',
  'TERSELESAIKAN',
  120, 10, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d003-4000-8000-000000000000', id FROM tags WHERE slug = 'sholat' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d003-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Shalat jenazah ghaib diperbolehkan bagi orang yang berada di luar daerah (masafatul qashar atau sulit dijangkau) meskipun jenazah tersebut sudah dishalati di tempat asalnya. Ini adalah pendapat mu''tamad madzhab Syafi''i."}]}]}'::jsonb,
  'Wa''alaikumussalam. Shalat jenazah ghaib diperbolehkan bagi orang yang berada di luar daerah (masafatul qashar atau sulit dijangkau) meskipun jenazah tersebut sudah dishalati di tempat asalnya. Ini adalah pendapat mu''tamad madzhab Syafi''i.',
  '11111111-d003-4000-8000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  true, 40
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d003-4000-8000-000000000000' WHERE id = '11111111-d003-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d003-4000-8000-000000000000', id, '5', 'Shalat Jenazah', '253', 'يَجُوزُ صَلَاةُ الْغَائِبِ عَلَى الْمَيِّتِ الْغَائِبِ عَنْ الْبَلَدِ', 'Diperbolehkan shalat ghaib atas mayit yang tidak berada di daerah tersebut.', 'VALID' FROM kitab_master WHERE nama_latin = 'Al-Majmuu' LIMIT 1;


-- Q4
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d004-4000-8000-000000000000',
  'Kewajiban Membaca Al-Fatihah Makmum di Belakang Imam',
  'kewajiban-membaca-al-fatihah-makmum',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum. Apakah makmum wajib membaca Al-Fatihah ketika shalat jahriyah (seperti Maghrib/Isya) atau cukup mendengarkan bacaan imam?"}]}]}'::jsonb,
  'Assalamu''alaikum. Apakah makmum wajib membaca Al-Fatihah ketika shalat jahriyah (seperti Maghrib/Isya) atau cukup mendengarkan bacaan imam?',
  '22222222-2222-2222-2222-222222222222',
  'TERSELESAIKAN',
  310, 19, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d004-4000-8000-000000000000', id FROM tags WHERE slug = 'sholat' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d004-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Dalam madzhab Syafi''i, membaca Al-Fatihah adalah rukun shalat yang wajib dilakukan oleh imam, makmum (baik shalat sirriyah maupun jahriyah), dan munfarid (shalat sendiri), kecuali makmum masbuq yang tidak mendapati waktu cukup untuk membacanya."}]}]}'::jsonb,
  'Wa''alaikumussalam. Dalam madzhab Syafi''i, membaca Al-Fatihah adalah rukun shalat yang wajib dilakukan oleh imam, makmum (baik shalat sirriyah maupun jahriyah), dan munfarid (shalat sendiri), kecuali makmum masbuq yang tidak mendapati waktu cukup untuk membacanya.',
  '11111111-d004-4000-8000-000000000000',
  '44444444-4444-4444-4444-444444444444',
  true, 55
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d004-4000-8000-000000000000' WHERE id = '11111111-d004-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d004-4000-8000-000000000000', id, '1', 'Shifatush Shalah', '109', 'لَا تُجْزِئُ صَلَاةٌ لَا يُقْرَأُ فِيهَا بِفَاتِحَةِ الْكِتَابِ', 'Tidak sah shalat yang tidak dibacakan padanya Fatihatul Kitab (Al-Fatihah).', 'VALID' FROM kitab_master WHERE nama_latin = 'Al-Umm' LIMIT 1;


-- Q5
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d005-4000-8000-000000000000',
  'Syarat Bolehnya Mengusap Khuf (Sepatu) saat Wudhu',
  'syarat-bolehnya-mengusap-khuf',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum para asatidz. Mohon pencerahannya terkait syarat-syarat diperbolehkannya mengusap sepatu (khuf) saat wudhu sebagai pengganti membasuh kaki."}]}]}'::jsonb,
  'Assalamu''alaikum para asatidz. Mohon pencerahannya terkait syarat-syarat diperbolehkannya mengusap sepatu (khuf) saat wudhu sebagai pengganti membasuh kaki.',
  '11111111-1111-1111-1111-111111111111',
  'TERSELESAIKAN',
  180, 21, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d005-4000-8000-000000000000', id FROM tags WHERE slug = 'wudhu' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d005-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Boleh mengusap khuf dengan tiga syarat: 1. Dipakai setelah suci sempurna (wudhu/mandi tuntas), 2. Khuf tersebut menutupi area wajib basuh (mata kaki), 3. Khuf harus kuat dipakai berjalan jauh."}]}]}'::jsonb,
  'Wa''alaikumussalam. Boleh mengusap khuf dengan tiga syarat: 1. Dipakai setelah suci sempurna (wudhu/mandi tuntas), 2. Khuf tersebut menutupi area wajib basuh (mata kaki), 3. Khuf harus kuat dipakai berjalan jauh.',
  '11111111-d005-4000-8000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  true, 20
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d005-4000-8000-000000000000' WHERE id = '11111111-d005-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d005-4000-8000-000000000000', id, '1', 'Al-Mashu alal Khuffain', '23', 'وَيَمْسَحُ عَلَى الْخُفَّيْنِ بِثَلَاثِ شَرَائِطَ: أَنْ يَبْتَدِئَ لُبْسَهُمَا بَعْدَ كَمَالِ الطَّهَارَةِ...', 'Dan boleh mengusap khuf dengan 3 syarat: memulai memakainya setelah suci sempurna...', 'VALID' FROM kitab_master WHERE nama_latin = 'Fathul Qarib' LIMIT 1;


-- Q6
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d006-4000-8000-000000000000',
  'Hukum Zakat Fitrah Menggunakan Uang',
  'hukum-zakat-fitrah-menggunakan-uang',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum ustadz, bagaimana hukumnya membayar zakat fitrah dengan uang? Karena saya lihat banyak panitia masjid yang menerima uang."}]}]}'::jsonb,
  'Assalamu''alaikum ustadz, bagaimana hukumnya membayar zakat fitrah dengan uang? Karena saya lihat banyak panitia masjid yang menerima uang.',
  '22222222-2222-2222-2222-222222222222',
  'TERSELESAIKAN',
  800, 60, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d006-4000-8000-000000000000', id FROM tags WHERE slug = 'puasa' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d006-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Dalam madzhab Syafi''i tidak sah membayar zakat fitrah dengan uang (qimah), wajib dengan makanan pokok (beras). Namun, diperbolehkan bagi masyarakat awam untuk bertaqlid kepada madzhab Hanafi yang mensahkan zakat fitrah dengan uang."}]}]}'::jsonb,
  'Wa''alaikumussalam. Dalam madzhab Syafi''i tidak sah membayar zakat fitrah dengan uang (qimah), wajib dengan makanan pokok (beras). Namun, diperbolehkan bagi masyarakat awam untuk bertaqlid kepada madzhab Hanafi yang mensahkan zakat fitrah dengan uang.',
  '11111111-d006-4000-8000-000000000000',
  '44444444-4444-4444-4444-444444444444',
  true, 85
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d006-4000-8000-000000000000' WHERE id = '11111111-d006-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d006-4000-8000-000000000000', id, '1', 'Zakat Fitrah', '279', 'وَلَا يُجْزِئُ إِخْرَاجُ الْقِيمَةِ فِيْ زَكَاةِ الْفِطْرِ عِنْدَنَا', 'Tidak sah mengeluarkan nilai (uang) dalam zakat fitrah di sisi madzhab kita (Syafi''iyah).', 'VALID' FROM kitab_master WHERE nama_latin = 'Al-Bajuri' LIMIT 1;


-- Q7
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d007-4000-8000-000000000000',
  'Hukum Air Kopi Terkena Kotoran Cicak',
  'hukum-air-kopi-terkena-najis-kotoran-cicak',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum. Gelas kopi saya kemasukan kotoran cicak sedikit sekali, warnanya tidak berubah. Apakah kopi tersebut najis?"}]}]}'::jsonb,
  'Assalamu''alaikum. Gelas kopi saya kemasukan kotoran cicak sedikit sekali, warnanya tidak berubah. Apakah kopi tersebut najis?',
  '11111111-1111-1111-1111-111111111111',
  'TERSELESAIKAN',
  112, 8, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d007-4000-8000-000000000000', id FROM tags WHERE slug = 'thaharah' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d007-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Ya, air kopi tersebut hukumnya najis (mutanajjis). Dalam madzhab Syafi''i, air/benda cair yang volumenya kurang dari dua qullah (sekitar 216 liter) akan langsung menjadi najis jika kemasukan najis, meskipun tidak mengalami perubahan pada sifatnya (warna, rasa, bau)."}]}]}'::jsonb,
  'Wa''alaikumussalam. Ya, air kopi tersebut hukumnya najis (mutanajjis). Dalam madzhab Syafi''i, air/benda cair yang volumenya kurang dari dua qullah (sekitar 216 liter) akan langsung menjadi najis jika kemasukan najis, meskipun tidak mengalami perubahan pada sifatnya (warna, rasa, bau).',
  '11111111-d007-4000-8000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  true, 12
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d007-4000-8000-000000000000' WHERE id = '11111111-d007-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d007-4000-8000-000000000000', id, '1', 'Thaharah', '15', 'وَالْمَاءُ الْقَلِيلُ يَنْجُسُ بِوُقُوعِ النَّجَاسَةِ فِيهِ وَإِنْ لَمْ يَتَغَيَّرْ', 'Dan air sedikit menjadi najis sebab jatuhnya najis di dalamnya, meskipun tidak berubah.', 'VALID' FROM kitab_master WHERE nama_latin = 'Fathul Qarib' LIMIT 1;


-- Q8
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d008-4000-8000-000000000000',
  'Hukum Jual Beli Kucing Anggora',
  'hukum-jual-beli-kucing-anggora',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum kyai, bagaimana hukumnya memperjualbelikan kucing peliharaan (seperti kucing Persia/Anggora)? Mengingat ada hadits yang melarang hasil penjualan kucing."}]}]}'::jsonb,
  'Assalamu''alaikum kyai, bagaimana hukumnya memperjualbelikan kucing peliharaan (seperti kucing Persia/Anggora)? Mengingat ada hadits yang melarang hasil penjualan kucing.',
  '22222222-2222-2222-2222-222222222222',
  'TERSELESAIKAN',
  450, 22, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d008-4000-8000-000000000000', id FROM tags WHERE slug = 'muamalah' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d008-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Dalam madzhab Syafi''i dan jumhur ulama, sah dan diperbolehkan memperjualbelikan kucing jinak yang ada manfaatnya (untuk mengusir tikus atau peliharaan). Hadits larangan tersebut ditakwilkan untuk kucing liar yang tidak ada manfaatnya."}]}]}'::jsonb,
  'Wa''alaikumussalam. Dalam madzhab Syafi''i dan jumhur ulama, sah dan diperbolehkan memperjualbelikan kucing jinak yang ada manfaatnya (untuk mengusir tikus atau peliharaan). Hadits larangan tersebut ditakwilkan untuk kucing liar yang tidak ada manfaatnya.',
  '11111111-d008-4000-8000-000000000000',
  '44444444-4444-4444-4444-444444444444',
  true, 30
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d008-4000-8000-000000000000' WHERE id = '11111111-d008-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d008-4000-8000-000000000000', id, '9', 'Jual Beli', '229', 'بَيْعُ الْهِرَّةِ الْأَهْلِيَّةِ جَائِزٌ بِلَا خِلَافٍ عِنْدَنَا', 'Jual beli kucing peliharaan (jinak) adalah boleh tanpa perselisihan di madzhab kita.', 'VALID' FROM kitab_master WHERE nama_latin = 'Al-Majmuu' LIMIT 1;


-- Q9
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d009-4000-8000-000000000000',
  'Qashar Shalat untuk Safar Maksiat',
  'qashar-shalat-untuk-safar-maksiat',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum ustadz, jika seseorang bepergian jauh keluar kota (memenuhi syarat masafatul qashar) namun tujuannya adalah untuk berjudi/maksiat, bolehkah ia menjamak dan mengqashar shalatnya?"}]}]}'::jsonb,
  'Assalamu''alaikum ustadz, jika seseorang bepergian jauh keluar kota (memenuhi syarat masafatul qashar) namun tujuannya adalah untuk berjudi/maksiat, bolehkah ia menjamak dan mengqashar shalatnya?',
  '11111111-1111-1111-1111-111111111111',
  'TERSELESAIKAN',
  105, 5, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d009-4000-8000-000000000000', id FROM tags WHERE slug = 'sholat' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d009-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Tidak diperbolehkan. Rukhsah (keringanan) syariat seperti jamak dan qashar shalat tidak boleh diambil jika perjalanannya adalah perjalanan maksiat (safar ma''shiyat), berdasarkan kaidah: rukhsah tidak diikatkan dengan maksiat."}]}]}'::jsonb,
  'Wa''alaikumussalam. Tidak diperbolehkan. Rukhsah (keringanan) syariat seperti jamak dan qashar shalat tidak boleh diambil jika perjalanannya adalah perjalanan maksiat (safar ma''shiyat), berdasarkan kaidah: rukhsah tidak diikatkan dengan maksiat.',
  '11111111-d009-4000-8000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  true, 9
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d009-4000-8000-000000000000' WHERE id = '11111111-d009-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d009-4000-8000-000000000000', id, '2', 'Shalat Jama Qashar', '124', 'اَلرُّخَصُ لَا تُنَاطُ بِالْمَعَاصِيْ', 'Keringanan-keringanan (syariat) tidak bisa dikaitkan/didapatkan dengan kemaksiatan.', 'VALID' FROM kitab_master WHERE nama_latin = 'I''anatuth Thalibin' LIMIT 1;


-- Q10
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  '11111111-d010-4000-8000-000000000000',
  'Suami Menjatuhkan Talak Tiga Sekaligus',
  'suami-menjatuhkan-talak-tiga-sekaligus',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum... Jika seorang suami berkata pada istrinya: \"Aku talak engkau dengan talak tiga sekaligus!\", apakah jatuh talak tiga secara langsung (bain kubra) atau hanya dihitung talak satu?"}]}]}'::jsonb,
  'Assalamu''alaikum... Jika seorang suami berkata pada istrinya: \"Aku talak engkau dengan talak tiga sekaligus!\", apakah jatuh talak tiga secara langsung (bain kubra) atau hanya dihitung talak satu?',
  '22222222-2222-2222-2222-222222222222',
  'TERSELESAIKAN',
  350, 16, 1
) ON CONFLICT DO NOTHING;
INSERT INTO public.question_tags (question_id, tag_id) SELECT '11111111-d010-4000-8000-000000000000', id FROM tags WHERE slug = 'nikah' ON CONFLICT DO NOTHING;
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  '22222222-d010-4000-8000-000000000000',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Menurut ijma'' 4 madzhab (Syafi''i, Hanafi, Maliki, Hanbali), ucapan talak tiga sekaligus jatuh sebagai talak tiga seketika (talak bain kubra), istri tidak bisa dirujuk kecuali telah menikah lagi dengan laki-laki lain (muhallil) lalu cerai secara wajar."}]}]}'::jsonb,
  'Wa''alaikumussalam. Menurut ijma'' 4 madzhab (Syafi''i, Hanafi, Maliki, Hanbali), ucapan talak tiga sekaligus jatuh sebagai talak tiga seketika (talak bain kubra), istri tidak bisa dirujuk kecuali telah menikah lagi dengan laki-laki lain (muhallil) lalu cerai secara wajar.',
  '11111111-d010-4000-8000-000000000000',
  '44444444-4444-4444-4444-444444444444',
  true, 28
) ON CONFLICT DO NOTHING;
UPDATE public.questions SET accepted_answer_id = '22222222-d010-4000-8000-000000000000' WHERE id = '11111111-d010-4000-8000-000000000000';
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT '22222222-d010-4000-8000-000000000000', id, '2', 'Kitab Talak', '61', 'وَأَمَّا طَلَاقُ الثَّلَاثِ بِلَفْظٍ وَاحِدٍ... فَإِنَّ جُمْهُورَ فُقَهَاءِ الْأَمْصَارِ عَلَى أَنَّهُ يَلْزَمُ', 'Adapun menjatuhkan talak tiga dengan satu lafaz... maka jumhur fuqaha sepakat bahwa hal itu jatuh secara mutlak (tiga).', 'VALID' FROM kitab_master WHERE nama_latin = 'Bidayatul Mujtahid' LIMIT 1;
