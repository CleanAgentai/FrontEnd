/*
  # Fix Dashboard Metrics Implementation

  1. Changes
    - Add initialize_dashboard_metrics function
    - Fix metrics update logic
    - Add proper upsert handling
*/

-- Drop existing function if exists
DROP FUNCTION IF EXISTS update_dashboard_metrics();
DROP FUNCTION IF EXISTS initialize_dashboard_metrics();

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

-- Add unique constraint for user_id and type combination
ALTER TABLE dashboard_metrics 
ADD CONSTRAINT dashboard_metrics_user_id_type_key 
UNIQUE (user_id, type);