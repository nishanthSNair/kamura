-- ============================================================
-- Phase 4: Session logs — booked & self-driven wellness sessions
-- ============================================================
-- Captures HBOT, IV, yoga, sauna, breathwork, sound bath, cold plunge,
-- red light, bloodwork, massage, etc. — the data primitive that feeds
-- the dashboard "real impact" view (Slice 2).

CREATE TABLE IF NOT EXISTS session_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN (
    'hbot', 'iv_drip', 'yoga', 'sauna', 'cold_plunge', 'breathwork',
    'sound_bath', 'red_light', 'massage', 'bloodwork', 'cryotherapy',
    'meditation', 'pilates', 'other'
  )),
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_minutes INTEGER,
  provider_id UUID REFERENCES providers(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  -- post-session feel (1-10 to match journal scale)
  energy_after INTEGER CHECK (energy_after BETWEEN 1 AND 10),
  clarity_after INTEGER CHECK (clarity_after BETWEEN 1 AND 10),
  calm_after INTEGER CHECK (calm_after BETWEEN 1 AND 10),
  -- session-specific details: HBOT {pressure_ata, oxygen_percent},
  -- yoga {style}, iv_drip {blend_name}, sauna {temp_c, type:infrared|traditional}, etc.
  details JSONB DEFAULT '{}'::jsonb,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members manage own session logs"
  ON session_logs FOR ALL USING (member_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_session_logs_member_performed
  ON session_logs (member_id, performed_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_logs_type
  ON session_logs (member_id, session_type, performed_at DESC);
