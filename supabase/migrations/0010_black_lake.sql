/*
  # Create Dashboard Tables

  1. New Tables
    - `dashboard_metrics`
      - Stores real-time metrics for the dashboard
    - `activities`
      - Tracks all user activities in the system
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create dashboard_metrics table
CREATE TABLE dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  value integer NOT NULL,
  type text NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own metrics"
  ON dashboard_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create activities table
CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  reference_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activities"
  ON activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update metrics
CREATE OR REPLACE FUNCTION update_dashboard_metrics()
RETURNS trigger AS $$
BEGIN
  -- Update jobs metric
  INSERT INTO dashboard_metrics (
    user_id,
    label,
    value,
    type,
    period_start,
    period_end
  )
  SELECT
    NEW.user_id,
    'Active Jobs',
    COUNT(*)::integer,
    'jobs',
    date_trunc('day', now()),
    date_trunc('day', now()) + interval '1 day'
  FROM jobs
  WHERE user_id = NEW.user_id
  ON CONFLICT (id) DO UPDATE
  SET value = EXCLUDED.value,
      updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update metrics when jobs change
CREATE TRIGGER update_metrics_on_job_change
  AFTER INSERT OR UPDATE OR DELETE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_dashboard_metrics();