import { supabase } from '@/lib/supabase';
import type { Evaluation } from '@/lib/types/evaluations';

export async function createEvaluation(data: Omit<Evaluation, 'id' | 'created_at'>) {
  const { error } = await supabase
    .from('evaluations')
    .insert([{
      ...data,
      created_at: new Date().toISOString(),
    }]);

  if (error) throw error;
}

export async function getEvaluation(applicationId: string) {
  const { data, error } = await supabase
    .from('evaluations')
    .select('*')
    .eq('applicationId', applicationId)
    .single();

  if (error) throw error;
  return data;
}