/*
  # Add Stripe billing tables and functions

  1. New Tables
    - `stripe_customers` - Links Supabase users to Stripe customers
    - `stripe_subscriptions` - Tracks active subscriptions
    - `qualified_employees` - Tracks hired candidates for billing
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create stripe_customers table
CREATE TABLE stripe_customers (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  stripe_customer_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create stripe_subscriptions table
CREATE TABLE stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE NOT NULL,
  status text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create qualified_employees table
CREATE TABLE qualified_employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  candidate_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  stripe_usage_record_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualified_employees ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own stripe customer"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own qualified employees"
  ON qualified_employees FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to handle subscription updates
CREATE OR REPLACE FUNCTION handle_subscription_update()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for subscription updates
CREATE TRIGGER update_subscription_timestamp
  BEFORE UPDATE ON stripe_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION handle_subscription_update();