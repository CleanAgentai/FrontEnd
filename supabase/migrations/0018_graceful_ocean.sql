-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  stripe_payment_method_id text NOT NULL,
  card_number text NOT NULL,
  expiry_date text NOT NULL,
  card_type text,
  last_four text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('paid', 'pending', 'failed')),
  payment_method_id uuid REFERENCES payment_methods ON DELETE SET NULL,
  stripe_payment_intent_id text,
  invoice_date timestamptz DEFAULT now(),
  due_date timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their payment methods"
  ON payment_methods FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their invoices"
  ON invoices FOR SELECT
  USING (auth.uid() = user_id);

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