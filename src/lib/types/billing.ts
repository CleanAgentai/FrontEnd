export interface PaymentMethod {
  id: string;
  user_id: string;
  card_number: string;
  expiry_date: string;
  card_type?: string;
  last_four: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  description: string;
  status: 'paid' | 'pending' | 'failed';
  payment_method_id?: string;
  invoice_date: string;
  due_date?: string;
  paid_at?: string;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price_per_hire: number;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}