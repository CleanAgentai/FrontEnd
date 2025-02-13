/*
  # Fix profiles slug column

  1. Changes
    - Drop existing trigger if exists
    - Recreate slug column with proper constraints
    - Add improved slug generation function
    - Add trigger with proper error handling
    - Update existing records

  2. Security
    - No changes to RLS policies needed
*/

-- Drop existing objects to ensure clean slate
DROP TRIGGER IF EXISTS generate_profile_slug_trigger ON profiles;
DROP FUNCTION IF EXISTS generate_profile_slug();

-- Ensure slug column exists with proper constraints
DO $$ 
BEGIN
  -- Drop existing slug column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE profiles DROP COLUMN slug;
  END IF;

  -- Create slug column
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
  -- Only proceed if we have a company name
  IF NEW.company_name IS NOT NULL THEN
    -- Generate base slug
    base_slug := lower(regexp_replace(
      regexp_replace(NEW.company_name, '[^a-zA-Z0-9\s-]', '', 'g'), -- Remove special chars
      '\s+', '-', 'g' -- Replace spaces with hyphens
    ));
    
    -- Initialize variables
    final_slug := base_slug;
    counter := 1;
    
    -- Handle duplicates
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
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error generating slug for company: %', NEW.company_name;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER generate_profile_slug_trigger
  BEFORE INSERT OR UPDATE OF company_name ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_profile_slug();

-- Update existing profiles
UPDATE profiles 
SET company_name = company_name -- This triggers the slug generation
WHERE company_name IS NOT NULL;