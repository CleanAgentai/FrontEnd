-- Add slug column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE profiles ADD CONSTRAINT profiles_slug_key UNIQUE(slug);

-- Create function to generate slugs from company names
CREATE OR REPLACE FUNCTION generate_profile_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.company_name IS NOT NULL AND (NEW.slug IS NULL OR NEW.company_name != OLD.company_name) THEN
    NEW.slug := lower(regexp_replace(NEW.company_name, '[^a-zA-Z0-9]+', '-', 'g'));
    
    -- Handle duplicate slugs by appending a number
    DECLARE
      base_slug text := NEW.slug;
      counter integer := 1;
    BEGIN
      WHILE EXISTS (
        SELECT 1 FROM profiles 
        WHERE slug = NEW.slug 
        AND id != NEW.id
      ) LOOP
        NEW.slug := base_slug || '-' || counter;
        counter := counter + 1;
      END LOOP;
    END;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic slug generation
DROP TRIGGER IF EXISTS generate_profile_slug_trigger ON profiles;
CREATE TRIGGER generate_profile_slug_trigger
  BEFORE INSERT OR UPDATE OF company_name ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_profile_slug();

-- Generate slugs for existing profiles
UPDATE profiles 
SET slug = subquery.new_slug
FROM (
  SELECT 
    id,
    CASE
      WHEN company_name IS NOT NULL THEN 
        lower(regexp_replace(company_name, '[^a-zA-Z0-9]+', '-', 'g'))
      ELSE NULL
    END as new_slug
  FROM profiles
) as subquery
WHERE profiles.id = subquery.id
AND profiles.slug IS NULL
AND subquery.new_slug IS NOT NULL;