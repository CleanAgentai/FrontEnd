-- Drop existing applications table if it exists
DROP TABLE IF EXISTS applications CASCADE;

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'screening', 'interviewing', 'offered', 'hired', 'rejected')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_job
    FOREIGN KEY(job_id) 
    REFERENCES jobs(id)
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Employers can view applications for their jobs"
  ON applications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM jobs 
    WHERE jobs.id = applications.job_id 
    AND jobs.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create applications"
  ON applications FOR INSERT
  WITH CHECK (true);

-- Create indexes
CREATE INDEX applications_job_id_idx ON applications(job_id);
CREATE INDEX applications_status_idx ON applications(status);
CREATE INDEX applications_created_at_idx ON applications(created_at);