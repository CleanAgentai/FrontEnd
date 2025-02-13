import { supabase } from './supabase';
import type { Database } from './database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Job = Database['public']['Tables']['jobs']['Row'];

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // If profile doesn't exist, create it
  if (error?.code === 'PGRST116') {
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{ id: userId }])
      .select()
      .single();

    if (createError) {
      return { data: null, error: createError };
    }
    return { data: newProfile, error: null };
  }

  return { data, error };
}

export async function updateProfile(userId: string, profile: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
}

export async function getJobs(userId: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([job])
    .select()
    .single();

  return { data, error };
}

export async function updateJob(id: string, job: Partial<Job>) {
  const { data, error } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteJob(id: string) {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  return { error };
}