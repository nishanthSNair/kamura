-- Pre-appointment prep notes on services
-- e.g. "Fasting required 8h prior · Hydrate well · Bring recent bloodwork"
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS prep_notes TEXT DEFAULT '';
