-- ============================================================
-- Kamura Provider Dashboard — Database Schema
-- ============================================================

-- 1. Providers (extends Supabase Auth users)
CREATE TABLE providers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'Wellness Clinic',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  website TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT 'Dubai',
  emirate TEXT DEFAULT 'Dubai',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  logo_url TEXT DEFAULT '',
  cover_image_url TEXT DEFAULT '',
  operating_hours JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services offered by providers
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  duration_minutes INTEGER DEFAULT 60,
  price_aed NUMERIC(10, 2) NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Availability slots
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sun
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INTEGER DEFAULT 60,
  is_recurring BOOLEAN DEFAULT TRUE,
  specific_date DATE, -- NULL for recurring, date for one-offs
  is_blocked BOOLEAN DEFAULT FALSE,
  block_reason TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT DEFAULT '',
  customer_email TEXT DEFAULT '',
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'no_show')),
  price_aed NUMERIC(10, 2) DEFAULT 0,
  notes TEXT DEFAULT '',
  source TEXT DEFAULT 'kamura', -- kamura, walk_in, phone, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT DEFAULT '',
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Earnings / Payouts
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  amount_aed NUMERIC(10, 2) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  stripe_transfer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row-Level Security Policies
-- ============================================================

ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

-- Providers: own row only
CREATE POLICY "Providers can view own profile"
  ON providers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Providers can update own profile"
  ON providers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Providers can insert own profile"
  ON providers FOR INSERT WITH CHECK (auth.uid() = id);

-- Services: own provider's services
CREATE POLICY "Providers manage own services"
  ON services FOR ALL USING (provider_id = auth.uid());

-- Availability: own provider's slots
CREATE POLICY "Providers manage own availability"
  ON availability_slots FOR ALL USING (provider_id = auth.uid());

-- Bookings: own provider's bookings
CREATE POLICY "Providers manage own bookings"
  ON bookings FOR ALL USING (provider_id = auth.uid());

-- Reviews: providers can read own reviews, flag them
CREATE POLICY "Providers read own reviews"
  ON reviews FOR SELECT USING (provider_id = auth.uid());
CREATE POLICY "Providers can flag own reviews"
  ON reviews FOR UPDATE USING (provider_id = auth.uid())
  WITH CHECK (provider_id = auth.uid());

-- Payouts: own provider's payouts
CREATE POLICY "Providers view own payouts"
  ON payouts FOR SELECT USING (provider_id = auth.uid());

-- ============================================================
-- Indexes for performance
-- ============================================================

CREATE INDEX idx_bookings_provider_date ON bookings (provider_id, booking_date);
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_availability_provider ON availability_slots (provider_id, day_of_week);
CREATE INDEX idx_reviews_provider ON reviews (provider_id);
CREATE INDEX idx_services_provider ON services (provider_id);
CREATE INDEX idx_payouts_provider ON payouts (provider_id);

-- ============================================================
-- Auto-update updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
