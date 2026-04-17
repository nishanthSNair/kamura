-- Function to create a provider profile during signup.
-- Uses SECURITY DEFINER to bypass RLS since the user's session
-- may not be fully active yet (email confirmation pending).
CREATE OR REPLACE FUNCTION create_provider_profile(
  user_id UUID,
  p_business_name TEXT,
  p_slug TEXT,
  p_email TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO providers (id, business_name, slug, email)
  VALUES (user_id, p_business_name, p_slug, p_email)
  ON CONFLICT (id) DO NOTHING;
END;
$$;
