/*
  # Fix Database Tables

  1. Changes
    - Drop existing tables to avoid conflicts
    - Recreate tables with proper structure
    - Add RLS policies
    - Create trigger for automatic profile creation

  2. Tables
    - profiles
      - id (uuid, primary key)
      - first_name (text)
      - last_name (text)
      - company_name (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - jobs
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - title (text)
      - description (text)
      - salary (numeric)
      - employment_type (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  3. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Drop existing objects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS profiles;

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  salary numeric,
  employment_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policy for jobs
CREATE POLICY "Users can manage own jobs"
  ON jobs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();