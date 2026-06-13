-- Seed Data for Manhajuna Platform (PISS-KTB Dummy Data)
-- This file contains sample users, questions, answers, comments, and references.
-- Used for local development and testing.

-- 1. Create Dummy Users in auth.users
-- Password for all is 'password123'
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role, aud)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'penanya1@piss-ktb.test', crypt('password123', gen_salt('bf')), now(), '{"username":"hamba_allah_1", "full_name":"Hamba Allah"}', now(), now(), 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'penanya2@piss-ktb.test', crypt('password123', gen_salt('bf')), now(), '{"username":"santri_baru", "full_name":"Santri Kopi"}', now(), now(), 'authenticated', 'authenticated'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'ustadz1@piss-ktb.test', crypt('password123', gen_salt('bf')), now(), '{"username":"ustadz_zain", "full_name":"Ustadz Zain"}', now(), now(), 'authenticated', 'authenticated'),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'ustadz2@piss-ktb.test', crypt('password123', gen_salt('bf')), now(), '{"username":"kyai_ahmad", "full_name":"Kyai Ahmad"}', now(), now(), 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Trigger trg_on_auth_user_created will create the profiles.
-- Let's wait a bit or just run an update directly. We can update profiles with roles and rep.
UPDATE public.profiles
SET 
  role = CASE 
    WHEN id IN ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444') THEN 'MUJIB'::user_role 
    ELSE 'THALIB'::user_role 
  END,
  reputation = CASE 
    WHEN id = '33333333-3333-3333-3333-333333333333' THEN 1500
    WHEN id = '44444444-4444-4444-4444-444444444444' THEN 3200
    ELSE 10 
  END,
  gelar = CASE 
    WHEN id IN ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444') THEN 'Ust.' 
    ELSE NULL 
  END,
  show_gelar = CASE 
    WHEN id IN ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444') THEN true 
    ELSE false 
  END,
  bio = CASE 
    WHEN id = '33333333-3333-3333-3333-333333333333' THEN 'Pengasuh Ponpes Al-Hidayah, aktif menjawab masalah Fikih.'
    WHEN id = '44444444-4444-4444-4444-444444444444' THEN 'Dewan Asatidz PISS-KTB.'
    ELSE 'Santri pencari ilmu.' 
  END
WHERE id IN (
  '11111111-1111-1111-1111-111111111111', 
  '22222222-2222-2222-2222-222222222222', 
  '33333333-3333-3333-3333-333333333333', 
  '44444444-4444-4444-4444-444444444444'
);

-- 2. Create Questions
-- Discussion 1
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  'aaaa1111-aaaa-1111-aaaa-111111111111',
  '[TANYA JAWAB] Hukum Menggabungkan Niat Puasa Qadha Ramadhan dan Puasa Sunnah Syawal',
  'hukum-menggabungkan-niat-puasa-qadha-ramadhan-dan-puasa-sunnah-syawal',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum ustadz... Izin bertanya dari PISS-KTB. Apa hukumnya menggabungkan niat puasa qadha Ramadhan dan puasa sunnah Syawal sekaligus? Apakah sah keduanya atau hanya salah satu saja? Terima kasih atas jawabannya."}]}]}'::jsonb,
  'Assalamu''alaikum ustadz... Izin bertanya dari PISS-KTB. Apa hukumnya menggabungkan niat puasa qadha Ramadhan dan puasa sunnah Syawal sekaligus? Apakah sah keduanya atau hanya salah satu saja? Terima kasih atas jawabannya.',
  '11111111-1111-1111-1111-111111111111',
  'TERSELESAIKAN',
  152, 12, 1
) ON CONFLICT (id) DO NOTHING;

-- Discussion 2
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  'aaaa2222-aaaa-2222-aaaa-222222222222',
  'Hukum Wudhu Menggunakan Air Musta''mal dalam Madzhab Syafi''i',
  'hukum-wudhu-menggunakan-air-mustamal-dalam-madzhab-syafii',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum para kiai dan ustadz. Mohon penjelasannya tentang air musta''mal. Bolehkan kita wudhu menggunakan air musta''mal (air sisa wudhu orang lain atau sisa wudhu sendiri yang tertampung)?"}]}]}'::jsonb,
  'Assalamu''alaikum para kiai dan ustadz. Mohon penjelasannya tentang air musta''mal. Bolehkan kita wudhu menggunakan air musta''mal (air sisa wudhu orang lain atau sisa wudhu sendiri yang tertampung)?',
  '22222222-2222-2222-2222-222222222222',
  'TERSELESAIKAN',
  341, 24, 2
) ON CONFLICT (id) DO NOTHING;

-- Discussion 3
INSERT INTO public.questions (id, title, slug, content, content_text, user_id, status, views, upvotes, total_answers)
VALUES (
  'aaaa3333-aaaa-3333-aaaa-333333333333',
  'Hukum Mengucapkan Selamat Ulang Tahun dan Meniup Lilin',
  'hukum-mengucapkan-selamat-ulang-tahun-dan-meniup-lilin',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Assalamu''alaikum. Deskripsi masalah: Di zaman sekarang sering kita temui perayaan ulang tahun dengan meniup lilin. Bagaimana pandangan fikih Islam mengenai perayaan ini dan meniup lilin? Mohon ibarohnya dari kitab mu''tabaroh."}]}]}'::jsonb,
  'Assalamu''alaikum. Deskripsi masalah: Di zaman sekarang sering kita temui perayaan ulang tahun dengan meniup lilin. Bagaimana pandangan fikih Islam mengenai perayaan ini dan meniup lilin? Mohon ibarohnya dari kitab mu''tabaroh.',
  '11111111-1111-1111-1111-111111111111',
  'HALL',
  89, 5, 0
) ON CONFLICT (id) DO NOTHING;

-- 3. Map Questions to Tags (Requires knowing tag UUIDs. We can use subqueries)
-- Map Q1 to 'Puasa'
INSERT INTO public.question_tags (question_id, tag_id)
SELECT 'aaaa1111-aaaa-1111-aaaa-111111111111', id FROM tags WHERE slug = 'puasa'
ON CONFLICT DO NOTHING;

-- Map Q2 to 'Wudhu'
INSERT INTO public.question_tags (question_id, tag_id)
SELECT 'aaaa2222-aaaa-2222-aaaa-222222222222', id FROM tags WHERE slug = 'wudhu'
ON CONFLICT DO NOTHING;

-- Map Q3 to 'Waqiiyah'
INSERT INTO public.question_tags (question_id, tag_id)
SELECT 'aaaa3333-aaaa-3333-aaaa-333333333333', id FROM tags WHERE slug = 'waqiiyah'
ON CONFLICT DO NOTHING;

-- 4. Create Answers
-- Answer for Q1
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  'bbbb1111-bbbb-1111-bbbb-111111111111',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam warahmatullah wabarakatuh. \nHukum menggabungkan niat puasa qadha Ramadhan dan puasa sunnah (seperti puasa Syawal, Senin-Kamis, dll) adalah sah dan diperbolehkan menurut mayoritas ulama Syafi''iyyah, dan pahala keduanya bisa didapatkan. Namun yang lebih utama (afdhal) adalah memisahkannya dengan mendahulukan puasa qadha Ramadhan baru kemudian puasa sunnah."}]}]}'::jsonb,
  'Wa''alaikumussalam warahmatullah wabarakatuh. Hukum menggabungkan niat puasa qadha Ramadhan dan puasa sunnah (seperti puasa Syawal, Senin-Kamis, dll) adalah sah dan diperbolehkan menurut mayoritas ulama Syafi''iyyah, dan pahala keduanya bisa didapatkan. Namun yang lebih utama (afdhal) adalah memisahkannya dengan mendahulukan puasa qadha Ramadhan baru kemudian puasa sunnah.',
  'aaaa1111-aaaa-1111-aaaa-111111111111',
  '33333333-3333-3333-3333-333333333333', -- ustadz_zain
  true,
  15
) ON CONFLICT (id) DO NOTHING;

-- Set Accepted Answer for Q1
UPDATE public.questions SET accepted_answer_id = 'bbbb1111-bbbb-1111-bbbb-111111111111' WHERE id = 'aaaa1111-aaaa-1111-aaaa-111111111111';

-- Answers for Q2
INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  'bbbb2222-bbbb-2222-bbbb-222222222222',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wa''alaikumussalam. Air musta''mal (air sedikit kurang dari dua qullah yang telah digunakan untuk fardhu bersuci) hukumnya suci namun tidak mensucikan (thahir ghairu muthahhir) dalam madzhab Syafi''i. Sehingga tidak sah digunakan untuk wudhu atau mandi wajib."}]}]}'::jsonb,
  'Wa''alaikumussalam. Air musta''mal (air sedikit kurang dari dua qullah yang telah digunakan untuk fardhu bersuci) hukumnya suci namun tidak mensucikan (thahir ghairu muthahhir) dalam madzhab Syafi''i. Sehingga tidak sah digunakan untuk wudhu atau mandi wajib.',
  'aaaa2222-aaaa-2222-aaaa-222222222222',
  '44444444-4444-4444-4444-444444444444', -- kyai_ahmad
  true,
  20
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.answers (id, content, content_text, question_id, user_id, is_accepted, upvotes)
VALUES (
  'bbbb3333-bbbb-3333-bbbb-333333333333',
  '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Menambahkan dari Kyai Ahmad, jika air musta''mal dikumpulkan hingga mencapai volume 2 Qullah (sekitar 216 liter) maka air tersebut kembali suci dan mensucikan (thohir muthohthir), asalkan tidak berubah sifatnya (warna, rasa, bau)."}]}]}'::jsonb,
  'Menambahkan dari Kyai Ahmad, jika air musta''mal dikumpulkan hingga mencapai volume 2 Qullah (sekitar 216 liter) maka air tersebut kembali suci dan mensucikan (thohir muthohthir), asalkan tidak berubah sifatnya (warna, rasa, bau).',
  'aaaa2222-aaaa-2222-aaaa-222222222222',
  '33333333-3333-3333-3333-333333333333', -- ustadz_zain
  false,
  8
) ON CONFLICT (id) DO NOTHING;

-- Set Accepted Answer for Q2
UPDATE public.questions SET accepted_answer_id = 'bbbb2222-bbbb-2222-bbbb-222222222222' WHERE id = 'aaaa2222-aaaa-2222-aaaa-222222222222';

-- 5. Create Comments
INSERT INTO public.comments (content, user_id, target_id, target_type)
VALUES
  ('Terima kasih banyak atas jawabannya ustadz.', '11111111-1111-1111-1111-111111111111', 'bbbb1111-bbbb-1111-bbbb-111111111111', 'ANSWER'),
  ('Izin copas untuk disebarkan ke grup jamaah.', '22222222-2222-2222-2222-222222222222', 'bbbb2222-bbbb-2222-bbbb-222222222222', 'ANSWER');

-- 6. Create References
-- Reference for A1 (I'anatuth Thalibin)
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT 
  'bbbb1111-bbbb-1111-bbbb-111111111111', 
  id, 
  '2', 
  'Kitab Shaum', 
  '253', 
  'وَفِيْ فَتَاوَى الْعَلاَّمَةِ الرَّمْلِيِّ مَا نَصُّهُ سُئِلَ هَلْ يَحْصُلُ لَهُ ثَوَابُ سِتَّةٍ مِنْ شَوَّالٍ وَقَضَاءِ رَمَضَانَ بِصَوْمِهَا ؟ فَاَجَابَ بِأَنَّهُ يَحْصُلُ لَهُ ثَوَابُهَا', 
  'Dan dalam Fatawa Al-''Allamah Ar-Ramli apa teksnya: Beliau ditanya apakah seseorang mendapatkan pahala puasa enam hari Syawal dan qadha Ramadhan dengan mempuasainya? Beliau menjawab: Sesungguhnya ia mendapatkan pahalanya.',
  'VALID'
FROM kitab_master WHERE nama_latin = 'I''anatuth Thalibin'
LIMIT 1;

-- Reference for A2 (Fathul Qarib)
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT 
  'bbbb2222-bbbb-2222-bbbb-222222222222', 
  id, 
  '1', 
  'Thaharah', 
  '12', 
  'وَالْقِسْمُ الثَّانِيْ (طَاهِرٌ) فِي نَفْسِهِ (غَيْرُ مُطَهِّرٍ لِغَيْرِهِ) وَهُوَ الْمَاءُ (الْمُسْتَعْمَلُ) فِيْ رَفْعِ حَدَثٍ أَوْ إِزَالَةِ نَجَسٍ', 
  'Bagian kedua adalah air yang suci pada dirinya sendiri (tetapi tidak mensucikan yang lain). Yaitu air musta''mal (yang telah dipakai) untuk mengangkat hadats atau menghilangkan najis.',
  'VALID'
FROM kitab_master WHERE nama_latin = 'Fathul Qarib'
LIMIT 1;

-- Reference for A3 (Al-Bajuri)
INSERT INTO public."references" (answer_id, kitab_id, jilid, bab, halaman, teks_arab, terjemah, validation_status)
SELECT 
  'bbbb3333-bbbb-3333-bbbb-333333333333', 
  id, 
  '1', 
  'Thaharah', 
  '25', 
  'لَوْ جُمِعَ الْمَاءُ الْمُسْتَعْمَلُ فَبَلَغَ قُلَّتَيْنِ صَارَ طَهُوْرًا', 
  'Seandainya air musta''mal dikumpulkan sehingga mencapai dua qullah maka ia menjadi thohur (mensucikan).',
  'VALID'
FROM kitab_master WHERE nama_latin = 'Al-Bajuri'
LIMIT 1;

-- Seed Data Complete
