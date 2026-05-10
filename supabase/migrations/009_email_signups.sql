-- 009_email_signups.sql
-- Single email capture table for all pre-launch waitlists.
-- `source` is an enum so we can segment by intent later (peptide waitlist,
-- booking waitlist, general newsletter) without splitting tables.

CREATE TYPE email_signup_source AS ENUM (
  'peptide_waitlist',
  'booking_waitlist',
  'newsletter',
  'unspecified'
);

CREATE TABLE IF NOT EXISTS email_signups (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL,
  source      email_signup_source NOT NULL DEFAULT 'unspecified',
  ip          INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (email, source)
);

CREATE INDEX IF NOT EXISTS email_signups_source_idx
  ON email_signups (source, created_at DESC);

CREATE INDEX IF NOT EXISTS email_signups_email_idx
  ON email_signups (email);

-- RLS — anon role can INSERT (form submission) but not SELECT/UPDATE/DELETE.
-- Admin reads happen through the service-role key.
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can subscribe"
  ON email_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT policy → anon can't read back the list.
-- Service role bypasses RLS; admin scripts use that.

COMMENT ON TABLE email_signups IS
  'Pre-launch waitlist captures. Segmented by source. Built 2026-05 for the lead-magnet phase.';
