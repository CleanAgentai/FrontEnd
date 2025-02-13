import { supabase } from '../supabase';
import type { DashboardMetric, Activity } from '../types/dashboard';

export async function initializeDashboardMetrics(userId: string) {
  const { error } = await supabase.rpc('initialize_dashboard_metrics', {
    user_id_param: userId
  });
  if (error) throw error;
}

export async function logActivity(
  userId: string,
  type: Activity['type'],
  description: string,
  referenceId?: string
) {
  const { error } = await supabase
    .from('activities')
    .insert([{
      user_id: userId,
      type,
      description,
      reference_id: referenceId
    }]);

  if (error) throw error;
}