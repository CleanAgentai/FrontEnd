import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno';

const stripe = new Stripe('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', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  try {
    const { amount } = await req.json();
    const { user } = await getUser(req);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: user.stripe_customer_id,
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});