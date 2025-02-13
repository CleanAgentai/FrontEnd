import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  try {
    const { productId, quantity } = await req.json();
    const { user } = await getUser(req);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get subscription item ID for the metered product
    const { data: subscriptionData } = await supabaseAdmin
      .from('stripe_subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .single();

    if (!subscriptionData?.stripe_subscription_id) {
      throw new Error('No active subscription found');
    }

    const subscription = await stripe.subscriptions.retrieve(
      subscriptionData.stripe_subscription_id
    );

    const subscriptionItem = subscription.items.data.find(
      item => item.price.product === productId
    );

    if (!subscriptionItem) {
      throw new Error('Subscription item not found');
    }

    // Report usage for the metered billing
    const usageRecord = await stripe.subscriptionItems.createUsageRecord(
      subscriptionItem.id,
      {
        quantity,
        timestamp: 'now',
        action: 'increment',
      }
    );

    return new Response(JSON.stringify({ usageRecord }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});