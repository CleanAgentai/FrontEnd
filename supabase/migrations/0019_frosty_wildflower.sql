/*
  # Job Board Schema Update

  1. New Tables
    - `job_boards` - Stores job board settings and metadata
    - `job_board_views` - Tracks job board and job post views
  
  2. Changes
    - Add slug column to profiles table
    - Add view tracking for job boards
  
  3. Security
    - Enable RLS
    - Add policies for public access to job boards
*/

-- Add slug column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create job_boards table
CREATE TABLE job_boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text,
  description text,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_board_views table
CREATE TABLE job_board_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_board_id uuid REFERENCES job_boards ON DELETE CASCADE,
  job_id uuid REFERENCES jobs ON DELETE CASCADE,
  viewer_ip text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE job_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_board_views ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view public job boards"
  ON job_boards FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can manage their job boards"
  ON job_boards FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create job board views"
  ON job_board_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create function to generate and update profile slugs
CREATE OR REPLACE FUNCTION generate_profile_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.company_name IS NOT NULL THEN
    NEW.slug := lower(regexp_replace(NEW.company_name, '[^a-zA-Z0-9]+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for slug generation
CREATE TRIGGER generate_profile_slug_trigger
  BEFORE INSERT OR UPDATE OF company_name ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_profile_slug();

-- Update existing profiles with slugs
UPDATE profiles 
SET slug = lower(regexp_replace(company_name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE company_name IS NOT NULL AND slug IS NULL;