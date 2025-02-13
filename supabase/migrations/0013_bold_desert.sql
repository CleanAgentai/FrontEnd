/*
  # Add Dashboard Tables and Functions

  1. New Tables
    - `dashboard_metrics`
      - Stores user-specific dashboard metrics
      - Includes jobs, candidates, interviews, and reviews counts
    - `activities`
      - Tracks user activities and notifications
      - Includes type, description, and reference information

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
    
  3. Functions
    - Add initialization function for dashboard metrics
    - Add trigger for automatic metric updates
*/

-- Create dashboard_metrics table if it doesn't exist
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  value integer NOT NULL,
  type text NOT NULL CHECK (type IN ('jobs', 'candidates', 'interviews', 'reviews')),
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT dashboard_metrics_user_id_type_key UNIQUE (user_id, type)
);

-- Create activities table if it doesn't exist
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('job_created', 'candidate_applied', 'interview_scheduled', 'review_completed')),
  description text NOT NULL,
  reference_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own metrics"
  ON dashboard_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activities"
  ON activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create initialize_dashboard_metrics function
CREATE OR REPLACE FUNCTION initialize_dashboard_metrics(user_id_param uuid)
RETURNS void AS $$
BEGIN
  -- Insert/Update jobs metric
  INSERT INTO dashboard_metrics (
    user_id,
    label,
    value,
    type,
    period_start,
    period_end
  )
  SELECT
    user_id_param,
    'Active Jobs',
    COUNT(*)::integer,
    'jobs',
    date_trunc('day', now()),
    date_trunc('day', now()) + interval '1 day'
  FROM jobs
  WHERE user_id = user_id_param
  ON CONFLICT ON CONSTRAINT dashboard_metrics_user_id_type_key 
  DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = now();

  -- Initialize other metrics with 0 if they don't exist
  INSERT INTO dashboard_metrics (
    user_id,
    label,
    value,
    type,
    period_start,
    period_end
  )
  VALUES 
    (user_id_param, 'Total Candidates', 0, 'candidates', date_trunc('day', now()), date_trunc('day', now()) + interval '1 day'),
    (user_id_param, 'Completed Interviews', 0, 'interviews', date_trunc('day', now()), date_trunc('day', now()) + interval '1 day'),
    (user_id_param, 'Pending Reviews', 0, 'reviews', date_trunc('day', now()), date_trunc('day', now()) + interval '1 day')
  ON CONFLICT ON CONSTRAINT dashboard_metrics_user_id_type_key 
  DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger function for jobs
CREATE OR REPLACE FUNCTION update_jobs_metric()
RETURNS trigger AS $$
BEGIN
  -- Update jobs metric for the affected user
  INSERT INTO dashboard_metrics (
    user_id,
    label,
    value,
    type,
    period_start,
    period_end
  )
  SELECT
    COALESCE(NEW.user_id, OLD.user_id),
    'Active Jobs',
    COUNT(*)::integer,
    'jobs',
    date_trunc('day', now()),
    date_trunc('day', now()) + interval '1 day'
  FROM jobs
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
  ON CONFLICT ON CONSTRAINT dashboard_metrics_user_id_type_key 
  DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = now();
    
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for jobs table
DROP TRIGGER IF EXISTS update_jobs_metric_trigger ON jobs;
CREATE TRIGGER update_jobs_metric_trigger
  AFTER INSERT OR UPDATE OR DELETE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_jobs_metric();