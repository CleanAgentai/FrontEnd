/*
  # Add Admin Role Support

  1. Changes
    - Add role column to profiles table
    - Add admin_settings table for platform configuration
    - Add admin_logs table for system activity tracking
    - Add admin-specific policies
  
  2. Security
    - Enable RLS on new tables
    - Add policies for admin access
*/

-- Add role column to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user'
CHECK (role IN ('admin', 'user', 'support', 'financial'));

-- Create admin_settings table
CREATE TABLE admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL,
  updated_by uuid REFERENCES auth.users ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_logs table
CREATE TABLE admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create support_tickets table
CREATE TABLE support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to uuid REFERENCES auth.users ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage settings"
  ON admin_settings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.email IN ('porter@clementinescleaning.com', 'momenandpc@gmail.com'))
  ));

CREATE POLICY "Admins can view logs"
  ON admin_logs FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.email IN ('porter@clementinescleaning.com', 'momenandpc@gmail.com'))
  ));

CREATE POLICY "Users can create support tickets"
  ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role IN ('admin', 'support') OR profiles.email IN ('porter@clementinescleaning.com', 'momenandpc@gmail.com'))
    )
  );

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS trigger AS $$
BEGIN
  INSERT INTO admin_logs (admin_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    CASE
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      ELSE row_to_json(NEW)
    END
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for logging
CREATE TRIGGER log_admin_settings_changes
  AFTER INSERT OR UPDATE OR DELETE ON admin_settings
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_support_ticket_changes
  AFTER INSERT OR UPDATE OR DELETE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();