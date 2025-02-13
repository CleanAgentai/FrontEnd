import { supabase } from '../supabase';
import type { DashboardMetric } from '../types/dashboard';

export async function getDashboardMetrics(userId: string): Promise<DashboardMetric[]> {
  const { data, error } = await supabase
    .from('dashboard_metrics')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}