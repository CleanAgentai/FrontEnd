/*
  # Update auth and profile handling

  1. Changes
    - Add trigger to update auth.users display_name with company_name
    - Update profile creation to handle company_name
  
  2. Security
    - Maintain existing RLS policies
*/

-- Create function to update auth.users display_name
CREATE OR REPLACE FUNCTION update_auth_user_display_name()
RETURNS trigger AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{company_name}',
    to_jsonb(NEW.company_name)
  )
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update auth.users when profile is updated
DROP TRIGGER IF EXISTS update_auth_display_name ON profiles;
CREATE TRIGGER update_auth_display_name
  AFTER INSERT OR UPDATE OF company_name ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_auth_user_display_name();