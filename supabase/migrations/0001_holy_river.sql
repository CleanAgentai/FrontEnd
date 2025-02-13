/*
  # Initial Schema Setup for TaskTalent.AI

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - first_name (text)
      - last_name (text)
      - company_name (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - jobs
      - id (uuid)
      - user_id (uuid, references auth.users)
      - title (text)
      - description (text)
      - salary (numeric)
      - employment_type (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - candidates
      - id (uuid)
      - first_name (text)
      - last_name (text)
      - email (text)
      - skills (text[])
      - location (text)
      - availability (text)
      - resume_url (text)
      - video_url (text)
      - created_at (timestamp)
    
    - shortlisted_candidates
      - id (uuid)
      - job_id (uuid, references jobs)
      - candidate_id (uuid, references candidates)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)
    
    - support_requests
      - id (uuid)
      - user_id (uuid, references auth.users)
      - issue (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

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

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own jobs"
  ON jobs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create candidates table
CREATE TABLE candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  skills text[],
  location text,
  availability text,
  resume_url text,
  video_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view candidates"
  ON candidates FOR SELECT
  TO authenticated
  USING (true);

-- Create shortlisted_candidates table
CREATE TABLE shortlisted_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs ON DELETE CASCADE NOT NULL,
  candidate_id uuid REFERENCES candidates ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shortlisted_candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their shortlisted candidates"
  ON shortlisted_candidates FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create support_requests table
CREATE TABLE support_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  issue text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and create own support requests"
  ON support_requests FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();