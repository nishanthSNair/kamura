-- ============================================================
-- Phase 3: Journal + Goal framing + Practitioner-of-record
-- ============================================================

-- 1. Extend members with protocol framing + primary provider
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS primary_goal TEXT DEFAULT '',       -- e.g. "Recovery & Longevity"
  ADD COLUMN IF NOT EXISTS protocol_start_date DATE,           -- "Week X" is computed from this
  ADD COLUMN IF NOT EXISTS primary_provider_id UUID REFERENCES providers(id) ON DELETE SET NULL;

-- 2. Journal entries (free text + metric chips)
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  entry_date DATE DEFAULT CURRENT_DATE,
  body TEXT DEFAULT '',
  energy INTEGER CHECK (energy BETWEEN 1 AND 10),
  mood INTEGER CHECK (mood BETWEEN 1 AND 10),
  pain INTEGER CHECK (pain BETWEEN 1 AND 10),
  sleep_hours NUMERIC(3, 1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members manage own journal entries"
  ON journal_entries FOR ALL USING (member_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_journal_member_date
  ON journal_entries (member_id, entry_date DESC);
