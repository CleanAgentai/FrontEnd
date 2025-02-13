import { supabase } from '@/lib/supabase';

export async function createPaymentIntent(amount: number) {
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    body: { amount },
  });

  if (error) throw error;
  return data;
}

export async function createSetupIntent() {
  const { data, error } = await supabase.functions.invoke('create-setup-intent', {
    body: {},
  });

  if (error) throw error;
  return data;
}

export async function handlePaymentMethodAttached(paymentMethodId: string) {
  const { error } = await supabase.functions.invoke('attach-payment-method', {
    body: { paymentMethodId },
  });

  if (error) throw error;
}