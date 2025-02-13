-- Add slug column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE profiles ADD CONSTRAINT profiles_slug_key UNIQUE(slug);

-- Create function to generate slugs from company names
CREATE OR REPLACE FUNCTION generate_profile_slug()
RETURNS trigger AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer;
BEGIN
  IF NEW.company_name IS NOT NULL AND (NEW.slug IS NULL OR NEW.company_name != OLD.company_name) THEN
    -- Convert company name to slug format
    base_slug := lower(regexp_replace(
      regexp_replace(NEW.company_name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    ));
    
    -- Handle duplicate slugs
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

-- Create trigger for automatic slug generation
CREATE TRIGGER generate_profile_slug_trigger
  BEFORE INSERT OR UPDATE OF company_name ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_profile_slug();

-- Update existing profiles with slugs
UPDATE profiles 
SET company_name = company_name
WHERE company_name IS NOT NULL;