-- ============================================================
-- Kamura Member Dashboard — Phase 2: Protocol + Dose Logs
-- ============================================================

-- 1. Protocol items (what the member is actively tracking)
CREATE TABLE IF NOT EXISTS protocol_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('peptide', 'pharmaceutical', 'supplement', 'lifestyle', 'habit')),
  treatment_slug TEXT,                       -- optional link to Kamura treatments
  dose TEXT DEFAULT '',                      -- human-readable (e.g. "500 mcg", "1 capsule")
  dose_units NUMERIC,                        -- optional numeric (for syringes)
  schedule TEXT DEFAULT 'daily' CHECK (schedule IN ('daily', 'twice_daily', 'weekly', 'twice_weekly', 'every_other_day', 'as_needed', 'custom')),
  time_of_day TEXT DEFAULT 'any' CHECK (time_of_day IN ('morning', 'midday', 'evening', 'bedtime', 'before_activity', 'any')),
  fasting_required BOOLEAN DEFAULT FALSE,
  fasting_note TEXT DEFAULT '',
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  active BOOLEAN DEFAULT TRUE,
  notes TEXT DEFAULT '',
  source TEXT DEFAULT 'self' CHECK (source IN ('self', 'provider', 'kamura_ai')),
  prescribed_by_provider_id UUID REFERENCES providers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dose logs (each time the member takes/completes an item)
CREATE TABLE IF NOT EXISTS dose_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  protocol_item_id UUID NOT NULL REFERENCES protocol_items(id) ON DELETE CASCADE,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  dose_taken TEXT DEFAULT '',                -- actual dose (may differ from prescribed)
  injection_site TEXT DEFAULT '',
  fasted BOOLEAN,
  mood INTEGER CHECK (mood BETWEEN 1 AND 5),
  energy INTEGER CHECK (energy BETWEEN 1 AND 5),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  notes TEXT DEFAULT '',
  skipped BOOLEAN DEFAULT FALSE,
  skip_reason TEXT DEFAULT ''
);

-- 3. Vial / inventory (for peptides, pharmaceuticals, supplements bottles)
CREATE TABLE IF NOT EXISTS vial_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  protocol_item_id UUID NOT NULL REFERENCES protocol_items(id) ON DELETE CASCADE,
  label TEXT DEFAULT '',                     -- e.g. "Vial #2"
  total_doses INTEGER NOT NULL,
  doses_used INTEGER DEFAULT 0,
  opened_at DATE,
  expires_on DATE,
  is_current BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row-Level Security
-- ============================================================

ALTER TABLE protocol_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dose_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vial_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members manage own protocol items"
  ON protocol_items FOR ALL USING (member_id = auth.uid());

CREATE POLICY "Members manage own dose logs"
  ON dose_logs FOR ALL USING (member_id = auth.uid());

CREATE POLICY "Members manage own inventory"
  ON vial_inventory FOR ALL USING (member_id = auth.uid());

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_protocol_items_member ON protocol_items (member_id) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_dose_logs_member_date ON dose_logs (member_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_dose_logs_item ON dose_logs (protocol_item_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_vial_inventory_item ON vial_inventory (protocol_item_id) WHERE is_current = TRUE;

-- ============================================================
-- RPC: Upsert today's wellness check-in (avoid duplicate per day)
-- ============================================================

CREATE OR REPLACE FUNCTION upsert_wellness_checkin(
  p_energy INTEGER,
  p_mood INTEGER,
  p_sleep_quality INTEGER,
  p_stress INTEGER,
  p_notes TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID;
  today DATE;
  score INTEGER;
BEGIN
  uid := auth.uid();
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  today := CURRENT_DATE;

  -- Simple score: average of 4 dims (inverse stress), scale to 0-100
  -- energy/mood/sleep: higher = better (1-5)
  -- stress: lower = better, so invert (6 - stress) -> 1-5
  score := ROUND(
    (p_energy + p_mood + p_sleep_quality + (6 - p_stress))::NUMERIC / 4.0 * 20
  );

  INSERT INTO wellness_checkins (
    member_id, checkin_date, overall_score, energy, mood, sleep_quality, stress, notes
  ) VALUES (
    uid, today, score, p_energy, p_mood, p_sleep_quality, p_stress, p_notes
  )
  ON CONFLICT (member_id, checkin_date) DO UPDATE SET
    overall_score = EXCLUDED.overall_score,
    energy = EXCLUDED.energy,
    mood = EXCLUDED.mood,
    sleep_quality = EXCLUDED.sleep_quality,
    stress = EXCLUDED.stress,
    notes = EXCLUDED.notes;

  RETURN score;
END;
$$;
