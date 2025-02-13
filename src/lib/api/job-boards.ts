import { supabase } from '@/lib/supabase';

export async function getPublicJobBoard(slug: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      company_name,
      slug,
      jobs (*)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}