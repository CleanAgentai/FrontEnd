import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const PRICE_ID = 'price_H5ggYwtUq123'; // Replace with your actual price ID

serve(async (req) => {
  try {
    const { userId } = await req.json();
    const { user } = await getUser(req);

    if (!user || user.id !== userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get or create Stripe customer
    let { data: customerData } = await supabaseAdmin
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    let stripeCustomerId;
    if (customerData?.stripe_customer_id) {
      stripeCustomerId = customerData.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;

      await supabaseAdmin
        .from('stripe_customers')
        .insert([{ id: userId, stripe_customer_id: stripeCustomerId }]);
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: PRICE_ID }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    await supabaseAdmin
      .from('stripe_subscriptions')
      .insert([{
        user_id: userId,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
      }]);

    return new Response(JSON.stringify({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});