import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Initialize Stripe only if public key is available
export const stripe = stripePublicKey ? await loadStripe(stripePublicKey) : null;

// API functions
export async function getSubscriptionStatus() {
  try {
    const response = await fetch('/api/stripe/subscription-status');
    return response.json();
  } catch (error) {
    console.error('Failed to get subscription status:', error);
    return { status: 'inactive' };
  }
}

export async function getBillingPortalUrl() {
  try {
    const response = await fetch('/api/stripe/billing-portal');
    return response.json();
  } catch (error) {
    console.error('Failed to get billing portal URL:', error);
    return null;
  }
}