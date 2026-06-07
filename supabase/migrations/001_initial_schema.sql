-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types
CREATE TYPE user_role AS ENUM ('ZAIR', 'THALIB', 'MUJIB', 'MURAQI', 'MUDIR');
CREATE TYPE question_status AS ENUM ('HALL', 'MAUQUF', 'TERSELESAIKAN', 'MUGHLAQ');
CREATE TYPE vote_target AS ENUM ('QUESTION', 'ANSWER');
CREATE TYPE validation_status AS ENUM ('PENDING', 'VALID', 'TIDAK_VALID');
CREATE TYPE notification_type AS ENUM (
  'NEW_ANSWER', 'NEW_COMMENT', 'UPVOTE', 'ANSWER_ACCEPTED',
  'BADGE_EARNED', 'REFERENCE_VALIDATED', 'MOD_WARNING', 'STATUS_CHANGED'
);
CREATE TYPE badge_tier AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- Profiles Table (extends auth.users)
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

-- Kitab Master Table
CREATE TABLE kitab_master (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_arab   VARCHAR(300) NOT NULL,
  nama_latin  VARCHAR(300) NOT NULL UNIQUE,
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
CREATE INDEX idx_kitab_trgm ON kitab_master USING GIN (nama_latin gin_trgm_ops);

-- Tags Table (with hierarchy)
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

-- Questions Table
CREATE TABLE questions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             VARCHAR(300) NOT NULL,
  slug              VARCHAR(400) UNIQUE NOT NULL,
  content           JSONB NOT NULL,
  content_text      TEXT NOT NULL,
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status            question_status DEFAULT 'HALL',
  views             INT DEFAULT 0,
  upvotes           INT DEFAULT 0,
  downvotes         INT DEFAULT 0,
  total_answers     INT DEFAULT 0,
  accepted_answer_id UUID UNIQUE,
  mughlaq_reason    TEXT,
  muraqi_id         UUID REFERENCES profiles(id),
  search_vector     TSVECTOR,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_slug ON questions(slug);
CREATE INDEX idx_questions_user ON questions(user_id);
CREATE INDEX idx_questions_created ON questions(created_at DESC);
CREATE INDEX idx_questions_status_created ON questions(status, created_at DESC);
CREATE INDEX idx_questions_search ON questions USING GIN(search_vector);

-- Answers Table
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

-- Question Tags (Many-to-Many)
CREATE TABLE question_tags (
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  tag_id      UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, tag_id)
);

-- References Table
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

-- Votes Table
CREATE TABLE votes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id   UUID NOT NULL,
  target_type vote_target NOT NULL,
  value       SMALLINT NOT NULL CHECK (value IN (1, -1)),
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, target_id, target_type)
);

CREATE INDEX idx_votes_target ON votes(target_id, target_type);

-- Comments Table
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content     TEXT NOT NULL,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id   UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('QUESTION', 'ANSWER')),
  parent_id   UUID REFERENCES comments(id),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_target ON comments(target_id, target_type);

-- Badges Table
CREATE TABLE badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) UNIQUE NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT NOT NULL,
  tier        badge_tier NOT NULL,
  criteria    JSONB NOT NULL,
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

-- Bookmarks Table
CREATE TABLE bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, question_id)
);

-- Notifications Table
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

-- Reputation Log Table
CREATE TABLE reputation_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  points       INT NOT NULL,
  reason       TEXT NOT NULL,
  reference_id UUID,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_rep_log_user ON reputation_logs(user_id);
CREATE INDEX idx_rep_log_created ON reputation_logs(created_at DESC);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitab_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_tags ENABLE ROW LEVEL SECURITY;
