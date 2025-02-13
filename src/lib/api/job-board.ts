import { supabase } from '@/lib/supabase';

export async function getJobBoardBySlug(slug: string) {
  // Try finding by slug first
  const { data: profileBySlug } = await supabase
    .from('profiles')
    .select('id, company_name, slug')
    .eq('slug', slug)
    .single();

  if (profileBySlug) {
    return profileBySlug;
  }

  // Fallback to ID if slug not found
  const { data: profileById } = await supabase
    .from('profiles')
    .select('id, company_name, slug')
    .eq('id', slug)
    .single();

  return profileById;
}

export async function getJobsByCompanyId(companyId: string) {
  const { data } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', companyId)
    .order('created_at', { ascending: false });

  return data || [];
}

export async function trackJobBoardView(jobBoardId: string, jobId?: string) {
  await supabase.from('job_board_views').insert([{
    job_board_id: jobBoardId,
    job_id: jobId,
    user_agent: navigator.userAgent,
  }]);
}