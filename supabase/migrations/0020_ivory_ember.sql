-- Add analytics columns to job_boards
ALTER TABLE job_boards 
ADD COLUMN view_count integer DEFAULT 0,
ADD COLUMN share_count integer DEFAULT 0;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_job_board_view()
RETURNS trigger AS $$
BEGIN
  UPDATE job_boards
  SET view_count = view_count + 1
  WHERE id = NEW.job_board_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for view count
CREATE TRIGGER increment_view_count_trigger
  AFTER INSERT ON job_board_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_job_board_view();