import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}

export const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

export async function getSubscriptionStatus() {
  const response = await fetch('/api/stripe/subscription-status');
  return response.json();
}

export async function getBillingPortalUrl() {
  const response = await fetch('/api/stripe/billing-portal');
  return response.json();
}