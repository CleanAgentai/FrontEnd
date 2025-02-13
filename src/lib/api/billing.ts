import { supabase } from '@/lib/supabase';

export async function trackQualifiedHire(applicationId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Record the qualified hire
  const { data: hire, error: hireError } = await supabase
    .from('qualified_employees')
    .insert([{
      user_id: user.id,
      candidate_id: applicationId,
    }])
    .select()
    .single();

  if (hireError) throw hireError;

  // Report usage to Stripe
  const { error: usageError } = await supabase.functions.invoke('report-usage', {
    body: {
      productId: 'prod_RTeNNHbXYsXwxL',
      quantity: 1,
    },
  });

  if (usageError) throw usageError;

  return hire;
}

export async function getQualifiedHires(startDate?: Date, endDate?: Date) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  let query = supabase
    .from('qualified_employees')
    .select(`
      *,
      applications (
        first_name,
        last_name,
        email,
        created_at
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (startDate) {
    query = query.gte('created_at', startDate.toISOString());
  }
  if (endDate) {
    query = query.lte('created_at', endDate.toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;

  return data;
}

export async function getCurrentBillingCycle() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('stripe_subscriptions')
    .select('current_period_start, current_period_end')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function getBillingMetrics() {
  const cycle = await getCurrentBillingCycle();
  const hires = await getQualifiedHires(
    new Date(cycle.current_period_start),
    new Date(cycle.current_period_end)
  );

  return {
    totalHires: hires.length,
    currentCharges: hires.length * 25, // $25 per hire
    cycleStart: cycle.current_period_start,
    cycleEnd: cycle.current_period_end,
  };
}