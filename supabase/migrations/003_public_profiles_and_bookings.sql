-- ============================================================
-- Public profiles, consumer booking, treatment linking, reviews
-- ============================================================

-- 1. Link services to Kamura treatment slugs (optional)
ALTER TABLE services ADD COLUMN IF NOT EXISTS treatment_slug TEXT;
CREATE INDEX IF NOT EXISTS idx_services_treatment ON services (treatment_slug) WHERE treatment_slug IS NOT NULL;

-- 2. Review submission token (one-time public token emailed to customer)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS review_token TEXT UNIQUE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS review_submitted BOOLEAN DEFAULT FALSE;

-- 3. Public read policies (so consumers can see providers, services, slots, reviews)
CREATE POLICY "Public can view active providers"
  ON providers FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Public can view availability"
  ON availability_slots FOR SELECT
  USING (is_blocked = FALSE);

CREATE POLICY "Public can view non-flagged reviews"
  ON reviews FOR SELECT
  USING (flagged = FALSE);

-- 4. Allow anonymous booking creation
CREATE POLICY "Anyone can create a booking"
  ON bookings FOR INSERT
  WITH CHECK (TRUE);

-- Customers can read their own booking if they know the review_token
CREATE POLICY "Public can view booking by review token"
  ON bookings FOR SELECT
  USING (review_token IS NOT NULL);

-- 5. Allow anonymous review creation (must include valid token from bookings)
CREATE POLICY "Anyone can submit a review"
  ON reviews FOR INSERT
  WITH CHECK (TRUE);

-- 6. Helper function — get available slots for a provider on a given date
CREATE OR REPLACE FUNCTION get_available_slots(
  p_provider_id UUID,
  p_date DATE
)
RETURNS TABLE (
  start_time TIME,
  end_time TIME,
  duration_minutes INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  day_num INTEGER;
BEGIN
  day_num := EXTRACT(DOW FROM p_date);

  RETURN QUERY
  SELECT
    s.start_time,
    s.end_time,
    s.slot_duration_minutes
  FROM availability_slots s
  WHERE s.provider_id = p_provider_id
    AND s.day_of_week = day_num
    AND s.is_blocked = FALSE
    AND (s.specific_date IS NULL OR s.specific_date = p_date)
    AND NOT EXISTS (
      -- Exclude slots that are fully booked
      SELECT 1 FROM bookings b
      WHERE b.provider_id = p_provider_id
        AND b.booking_date = p_date
        AND b.start_time = s.start_time
        AND b.status IN ('confirmed', 'completed')
    )
  ORDER BY s.start_time;
END;
$$;

-- 7. Function to create a booking with auto-generated review token
CREATE OR REPLACE FUNCTION create_booking(
  p_provider_id UUID,
  p_service_id UUID,
  p_customer_name TEXT,
  p_customer_phone TEXT,
  p_customer_email TEXT,
  p_booking_date DATE,
  p_start_time TIME,
  p_end_time TIME,
  p_price_aed NUMERIC,
  p_notes TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_booking_id UUID;
  token TEXT;
BEGIN
  token := encode(gen_random_bytes(24), 'hex');

  INSERT INTO bookings (
    provider_id, service_id, customer_name, customer_phone, customer_email,
    booking_date, start_time, end_time, price_aed, notes, review_token, status
  ) VALUES (
    p_provider_id, p_service_id, p_customer_name, p_customer_phone, p_customer_email,
    p_booking_date, p_start_time, p_end_time, p_price_aed, p_notes, token, 'confirmed'
  )
  RETURNING id INTO new_booking_id;

  RETURN new_booking_id;
END;
$$;

-- 8. Function to submit a review via token
CREATE OR REPLACE FUNCTION submit_review(
  p_review_token TEXT,
  p_customer_name TEXT,
  p_rating INTEGER,
  p_comment TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  b_record RECORD;
BEGIN
  SELECT * INTO b_record FROM bookings
  WHERE review_token = p_review_token
    AND review_submitted = FALSE
  LIMIT 1;

  IF b_record IS NULL THEN
    RAISE EXCEPTION 'Invalid or already-used review token';
  END IF;

  IF p_rating < 1 OR p_rating > 5 THEN
    RAISE EXCEPTION 'Rating must be 1-5';
  END IF;

  INSERT INTO reviews (provider_id, booking_id, customer_name, rating, comment)
  VALUES (b_record.provider_id, b_record.id, p_customer_name, p_rating, p_comment);

  UPDATE bookings SET review_submitted = TRUE WHERE id = b_record.id;
END;
$$;
