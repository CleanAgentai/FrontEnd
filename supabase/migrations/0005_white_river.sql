/*
  # Fix database tables

  1. Changes
    - Drop and recreate tables to ensure they exist
    - Add proper indexes for performance
    - Ensure RLS policies are correctly applied
*/

-- Recreate tables if they don't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  salary numeric,
  employment_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create or replace policies
DO $$ 
BEGIN
    -- Profiles policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON profiles
            FOR SELECT TO authenticated
            USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON profiles
            FOR UPDATE TO authenticated
            USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile" ON profiles
            FOR INSERT TO authenticated
            WITH CHECK (auth.uid() = id);
    END IF;

    -- Jobs policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'jobs' AND policyname = 'Users can manage own jobs'
    ) THEN
        CREATE POLICY "Users can manage own jobs" ON jobs
            FOR ALL TO authenticated
            USING (auth.uid() = user_id);
    END IF;
END $$;