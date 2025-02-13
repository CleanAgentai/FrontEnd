/*
  # Fix profiles slug column - Final Fix

  1. Changes
    - Safely recreate slug column
    - Add improved slug generation with better error handling
    - Update existing records
    - Add proper constraints

  2. Security
    - Maintains existing RLS policies
*/

-- Safely recreate slug column
DO $$ 
BEGIN
  -- Drop existing column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE profiles DROP COLUMN slug CASCADE;
  END IF;

  -- Create new slug column
  ALTER TABLE profiles ADD COLUMN slug text;
  ALTER TABLE profiles ADD CONSTRAINT profiles_slug_key UNIQUE(slug);
END $$;

-- Create improved slug generation function
CREATE OR REPLACE FUNCTION generate_profile_slug()
RETURNS trigger AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer;
BEGIN
  -- Generate base slug from company name
  IF NEW.company_name IS NOT NULL THEN
    -- Clean and format the company name
    base_slug := lower(regexp_replace(
      regexp_replace(NEW.company_name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ));
    
    -- Handle duplicates with counter
    final_slug := base_slug;
    counter := 1;
    
    WHILE EXISTS (
      SELECT 1 FROM profiles 
      WHERE slug = final_slug 
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')
    ) LOOP
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
    
    NEW.slug := final_slug;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS generate_profile_slug_trigger ON profiles;
CREATE TRIGGER generate_profile_slug_trigger
  BEFORE INSERT OR UPDATE OF company_name ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_profile_slug();

-- Update existing profiles to generate slugs
UPDATE profiles 
SET company_name = company_name
WHERE company_name IS NOT NULL;