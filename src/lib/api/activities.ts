import { supabase } from '../supabase';
import type { Activity } from '../types/dashboard';

export async function getRecentActivities(userId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data || [];
}

export async function createActivity(activity: Omit<Activity, 'id' | 'created_at'>) {
  const { error } = await supabase
    .from('activities')
    .insert([activity]);

  if (error) throw error;
}