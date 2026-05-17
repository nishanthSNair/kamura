-- ============================================================
-- Phase 4.5: Member-row safety net + restore upsert_wellness_checkin
-- ============================================================
-- Two production fixes:
--
-- 1. Some auth.users have no matching row in `members`, so any
--    insert into a member-scoped table (session_logs, dose_logs,
--    journal_entries, etc.) fails with an FK violation. Root cause:
--    the signup flow's create_member_profile RPC can be skipped if a
--    user is created via magic-link/OTP/admin/SSO, or if the RPC call
--    silently failed at signup time. We backfill missing rows and add
--    an AFTER INSERT trigger on auth.users so it can't happen again.
--
-- 2. `upsert_wellness_checkin` (migration 005) is missing from the
--    PostgREST schema cache in production. CREATE OR REPLACE here is
--    idempotent — safe to run even if the function already exists.

-- ------------------------------------------------------------
-- (1) Restore upsert_wellness_checkin
-- ------------------------------------------------------------

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

  score := ROUND(
    (p_energy + p_mood + p_sleep_quality + (6 - p_stress))::NUMERIC / 4.0 * 20
  );

  -- Safety: if this user has no members row yet, create one so the
  -- wellness_checkins FK doesn't reject the insert.
  INSERT INTO members (id, email)
  SELECT uid, u.email FROM auth.users u WHERE u.id = uid
  ON CONFLICT (id) DO NOTHING;

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

-- ------------------------------------------------------------
-- (2) Backfill missing members rows for existing auth.users
-- ------------------------------------------------------------

INSERT INTO members (id, email, full_name)
SELECT
  u.id,
  u.email,
  COALESCE(
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    ''
  )
FROM auth.users u
LEFT JOIN members m ON m.id = u.id
WHERE m.id IS NULL;

-- ------------------------------------------------------------
-- (3) Trigger: create members row automatically on every auth signup
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO members (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      ''
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();
