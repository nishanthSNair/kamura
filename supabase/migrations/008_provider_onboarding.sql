-- ============================================================
-- Provider onboarding wizard — extended fields
-- ============================================================

ALTER TABLE providers
  ADD COLUMN IF NOT EXISTS provider_type TEXT DEFAULT 'solo' CHECK (provider_type IN ('solo', 'clinic')),
  ADD COLUMN IF NOT EXISTS nationality TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS years_practicing INTEGER,
  ADD COLUMN IF NOT EXISTS years_in_uae INTEGER,
  ADD COLUMN IF NOT EXISTS practitioner_count INTEGER,                 -- clinics only
  ADD COLUMN IF NOT EXISTS approximate_clients TEXT DEFAULT '',        -- "1-10", "10-50", "50-200", "200+"
  ADD COLUMN IF NOT EXISTS operating_base TEXT DEFAULT '',             -- clinic / home / mobile / virtual
  ADD COLUMN IF NOT EXISTS price_range_min NUMERIC(10, 2),
  ADD COLUMN IF NOT EXISTS price_range_max NUMERIC(10, 2),
  ADD COLUMN IF NOT EXISTS specialties TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tagline TEXT DEFAULT '';

-- ============================================================
-- RPC: create_provider_profile_v2 — single-call wizard submit
-- Uses SECURITY DEFINER so it succeeds even if the session isn't
-- fully active yet (email confirmation pending).
-- ============================================================

CREATE OR REPLACE FUNCTION create_provider_profile_v2(
  user_id UUID,
  p_provider_type TEXT,
  p_business_name TEXT,
  p_slug TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_category TEXT,
  p_tagline TEXT,
  p_description TEXT,
  p_city TEXT,
  p_emirate TEXT,
  p_address TEXT,
  p_nationality TEXT,
  p_years_practicing INTEGER,
  p_years_in_uae INTEGER,
  p_practitioner_count INTEGER,
  p_approximate_clients TEXT,
  p_operating_base TEXT,
  p_price_range_min NUMERIC,
  p_price_range_max NUMERIC,
  p_specialties TEXT[],
  p_languages TEXT[],
  p_website TEXT,
  p_social_links JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO providers (
    id, provider_type, business_name, slug, email, phone, category, tagline,
    description, city, emirate, address, nationality, years_practicing,
    years_in_uae, practitioner_count, approximate_clients, operating_base,
    price_range_min, price_range_max, specialties, languages, website,
    social_links
  ) VALUES (
    user_id, p_provider_type, p_business_name, p_slug, p_email, p_phone,
    p_category, p_tagline, p_description, p_city, p_emirate, p_address,
    p_nationality, p_years_practicing, p_years_in_uae, p_practitioner_count,
    p_approximate_clients, p_operating_base, p_price_range_min,
    p_price_range_max, p_specialties, p_languages, p_website, p_social_links
  )
  ON CONFLICT (id) DO UPDATE SET
    provider_type = EXCLUDED.provider_type,
    business_name = EXCLUDED.business_name,
    slug = EXCLUDED.slug,
    phone = EXCLUDED.phone,
    category = EXCLUDED.category,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    city = EXCLUDED.city,
    emirate = EXCLUDED.emirate,
    address = EXCLUDED.address,
    nationality = EXCLUDED.nationality,
    years_practicing = EXCLUDED.years_practicing,
    years_in_uae = EXCLUDED.years_in_uae,
    practitioner_count = EXCLUDED.practitioner_count,
    approximate_clients = EXCLUDED.approximate_clients,
    operating_base = EXCLUDED.operating_base,
    price_range_min = EXCLUDED.price_range_min,
    price_range_max = EXCLUDED.price_range_max,
    specialties = EXCLUDED.specialties,
    languages = EXCLUDED.languages,
    website = EXCLUDED.website,
    social_links = EXCLUDED.social_links;
END;
$$;
