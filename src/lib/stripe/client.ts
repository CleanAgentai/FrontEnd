import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripePublicKey) {
  throw new Error('Missing Stripe public key');
}

export const stripe = await loadStripe(stripePublicKey);

export async function createSetupIntent() {
  const response = await fetch('/api/stripe/setup-intent', {
    method: 'POST',
  });
  return response.json();
}

export async function handlePaymentMethodAttached(paymentMethodId: string) {
  const response = await fetch('/api/stripe/attach-payment-method', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentMethodId }),
  });
  return response.json();
}