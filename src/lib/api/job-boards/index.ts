import { supabase } from '@/lib/supabase';
import type { JobBoard } from '@/lib/types/job-boards';

export async function getJobBoard(companyId: string) {
  const { data, error } = await supabase
    .from('job_boards')
    .select(`
      *,
      profiles:user_id (
        company_name,
        slug
      )
    `)
    .eq('user_id', companyId)
    .single();

  if (error) throw error;
  return data;
}

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

export async function trackJobBoardView(jobBoardId: string) {
  const { error } = await supabase
    .from('job_board_views')
    .insert([{
      job_board_id: jobBoardId,
      user_agent: navigator.userAgent,
    }]);

  if (error) throw error;
}