import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';

export async function createJob(job: Partial<Job>) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([job])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getJobDetails(id: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      profiles:user_id (
        company_name,
        logo_url,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getJob(id: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getPublicJob(id: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      profiles:user_id (
        company_name,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateJob(id: string, job: Partial<Job>) {
  const { data, error } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}