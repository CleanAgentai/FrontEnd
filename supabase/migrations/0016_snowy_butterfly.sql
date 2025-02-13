/*
  # Candidate System Schema

  1. New Tables
    - `applications`
      - Stores job applications
      - Links candidates to jobs
      - Tracks application status
    - `interview_questions`
      - Stores predefined interview questions
      - Supports both text and video responses
    - `interview_answers`
      - Stores candidate responses to questions
    - `video_responses`
      - Stores video interview responses
    - `evaluations`
      - Stores recruiter evaluations of candidates

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create interview_questions table
CREATE TABLE interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  type text NOT NULL CHECK (type IN ('text', 'video')),
  required boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create interview_answers table
CREATE TABLE interview_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications ON DELETE CASCADE NOT NULL,
  answers jsonb NOT NULL,
  submitted_at timestamptz DEFAULT now()
);

-- Create video_responses table
CREATE TABLE video_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES interview_questions ON DELETE CASCADE NOT NULL,
  application_id uuid REFERENCES applications ON DELETE CASCADE NOT NULL,
  video_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create evaluations table
CREATE TABLE evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications ON DELETE CASCADE NOT NULL,
  skills_rating integer CHECK (skills_rating BETWEEN 1 AND 5),
  experience_rating integer CHECK (experience_rating BETWEEN 1 AND 5),
  culture_fit_rating integer CHECK (culture_fit_rating BETWEEN 1 AND 5),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Employers can view applications for their jobs"
  ON applications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create applications"
  ON applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Employers can manage interview questions"
  ON interview_questions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM jobs WHERE jobs.id = interview_questions.job_id AND jobs.user_id = auth.uid()
  ));

CREATE POLICY "Candidates can view their own answers"
  ON interview_answers FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM applications WHERE applications.id = interview_answers.application_id
  ));

CREATE POLICY "Candidates can submit answers"
  ON interview_answers FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM applications WHERE applications.id = interview_answers.application_id
  ));

CREATE POLICY "Employers can view video responses"
  ON video_responses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM applications 
    JOIN jobs ON jobs.id = applications.job_id
    WHERE applications.id = video_responses.application_id 
    AND jobs.user_id = auth.uid()
  ));

CREATE POLICY "Candidates can upload videos"
  ON video_responses FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM applications WHERE applications.id = video_responses.application_id
  ));

CREATE POLICY "Employers can manage evaluations"
  ON evaluations FOR ALL
  USING (EXISTS (
    SELECT 1 FROM applications 
    JOIN jobs ON jobs.id = applications.job_id
    WHERE applications.id = evaluations.application_id 
    AND jobs.user_id = auth.uid()
  ));

-- Create storage bucket for video uploads
INSERT INTO storage.buckets (id, name)
VALUES ('interview-videos', 'interview-videos')
ON CONFLICT DO NOTHING;

-- Set up storage policies
CREATE POLICY "Anyone can upload videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'interview-videos');

CREATE POLICY "Employers can view videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'interview-videos' AND (
    EXISTS (
      SELECT 1 FROM applications 
      JOIN jobs ON jobs.id = applications.job_id
      JOIN video_responses ON video_responses.application_id = applications.id
      WHERE jobs.user_id = auth.uid()
      AND video_responses.video_url LIKE '%' || name
    )
  ));