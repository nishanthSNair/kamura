-- ============================================================
-- Kamura Member Dashboard — Phase 1 Schema
-- ============================================================

-- 1. Members (extends Supabase Auth users, consumer side)
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  date_of_birth DATE,
  gender TEXT DEFAULT '',
  city TEXT DEFAULT 'Dubai',
  emirate TEXT DEFAULT 'Dubai',
  phone TEXT DEFAULT '',
  language_pref TEXT DEFAULT 'en' CHECK (language_pref IN ('en', 'ar')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Member concerns (things they want to address)
CREATE TABLE IF NOT EXISTS member_concerns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  concern TEXT NOT NULL,
  severity INTEGER DEFAULT 3 CHECK (severity BETWEEN 1 AND 5),
  active BOOLEAN DEFAULT TRUE,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Member goals (measurable, time-bound)
CREATE TABLE IF NOT EXISTS member_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL,
  description TEXT DEFAULT '',
  target_value NUMERIC,
  target_unit TEXT DEFAULT '',
  target_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'achieved', 'paused', 'abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Member favorites (saved treatments + clinics)
CREATE TABLE IF NOT EXISTS member_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('treatment', 'provider', 'article', 'event')),
  entity_id TEXT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (member_id, entity_type, entity_id)
);

-- 5. Daily check-ins (wellness score log)
CREATE TABLE IF NOT EXISTS wellness_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  checkin_date DATE NOT NULL,
  overall_score INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  energy INTEGER CHECK (energy BETWEEN 1 AND 5),
  mood INTEGER CHECK (mood BETWEEN 1 AND 5),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  stress INTEGER CHECK (stress BETWEEN 1 AND 5),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (member_id, checkin_date)
);

-- ============================================================
-- Row-Level Security
-- ============================================================

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view own profile"
  ON members FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Members can update own profile"
  ON members FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Members can insert own profile"
  ON members FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Members manage own concerns"
  ON member_concerns FOR ALL USING (member_id = auth.uid());

CREATE POLICY "Members manage own goals"
  ON member_goals FOR ALL USING (member_id = auth.uid());

CREATE POLICY "Members manage own favorites"
  ON member_favorites FOR ALL USING (member_id = auth.uid());

CREATE POLICY "Members manage own checkins"
  ON wellness_checkins FOR ALL USING (member_id = auth.uid());

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_member_concerns_member ON member_concerns (member_id) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_member_goals_member ON member_goals (member_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_member_favorites_member ON member_favorites (member_id);
CREATE INDEX IF NOT EXISTS idx_wellness_checkins_member_date ON wellness_checkins (member_id, checkin_date DESC);

-- ============================================================
-- Auto-update updated_at on members
-- ============================================================

CREATE TRIGGER members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SECURITY DEFINER function to create member profile at signup
-- (bypasses RLS for initial insert, same pattern as providers)
-- ============================================================

CREATE OR REPLACE FUNCTION create_member_profile(
  user_id UUID,
  p_full_name TEXT,
  p_email TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO members (id, full_name, email)
  VALUES (user_id, p_full_name, p_email)
  ON CONFLICT (id) DO NOTHING;
END;
$$;
