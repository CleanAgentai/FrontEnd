import { supabase } from '@/lib/supabase';
import { trackQualifiedHire } from './billing';
import type { Application } from '@/lib/types/applications';

export async function createApplication(application: Partial<Application>) {
  const { data, error } = await supabase
    .from('applications')
    .insert([application])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getApplications(filters?: Partial<Application>) {
  let query = supabase
    .from('applications')
    .select(`
      *,
      jobs (
        title,
        company_id
      ),
      profiles (
        full_name,
        email
      )
    `)
    .order('created_at', { ascending: false });

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query = query.eq(key, value);
      }
    });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getApplicationDetails(id: string) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      jobs (
        *,
        profiles (
          company_name,
          logo_url
        )
      ),
      profiles (
        *
      ),
      interview_answers (
        *
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateApplicationStatus(id: string, status: string) {
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id);

  if (error) throw error;

  // If the candidate is marked as hired, track it for billing
  if (status === 'hired') {
    await trackQualifiedHire(id);
  }
}