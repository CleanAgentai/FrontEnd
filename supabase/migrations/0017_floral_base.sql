/*
  # Billing System Schema

  1. New Tables
    - `payment_methods`
      - Stores user payment methods (cards)
    - `invoices`
      - Stores billing history and transactions
    - `subscription_plans`
      - Defines available subscription plans
    - `subscriptions`
      - Tracks user subscriptions and billing status

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create payment_methods table
CREATE TABLE payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  card_number text NOT NULL,
  expiry_date text NOT NULL,
  card_type text,
  last_four text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('paid', 'pending', 'failed')),
  payment_method_id uuid REFERENCES payment_methods ON DELETE SET NULL,
  invoice_date timestamptz DEFAULT now(),
  due_date timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create subscription_plans table
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_per_hire numeric NOT NULL,
  features jsonb NOT NULL DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES subscription_plans ON DELETE RESTRICT NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their payment methods"
  ON payment_methods FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their invoices"
  ON invoices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view active subscription plans"
  ON subscription_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can view their subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Insert default subscription plan
INSERT INTO subscription_plans (name, description, price_per_hire, features)
VALUES (
  'Pay Per Hire',
  'Pay only for qualified candidates',
  30.00,
  '[
    "AI-powered candidate screening",
    "Automated video interviews",
    "Background verification",
    "Unlimited job postings"
  ]'
);

-- Create function to handle payment method updates
CREATE OR REPLACE FUNCTION handle_payment_method_update()
RETURNS trigger AS $$
BEGIN
  -- If new payment method is set as default, unset others
  IF NEW.is_default THEN
    UPDATE payment_methods
    SET is_default = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for payment method updates
CREATE TRIGGER payment_method_update
  BEFORE INSERT OR UPDATE ON payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION handle_payment_method_update();