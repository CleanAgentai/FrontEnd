import { supabase } from '@/lib/supabase';

export async function uploadVideo(questionId: string, blob: Blob) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const filename = `${user.id}/${questionId}/${Date.now()}.webm`;
  
  const { error: uploadError } = await supabase.storage
    .from('interview-videos')
    .upload(filename, blob);

  if (uploadError) throw uploadError;

  const { data: { publicUrl }, error: urlError } = supabase.storage
    .from('interview-videos')
    .getPublicUrl(filename);

  if (urlError) throw urlError;

  const { error: dbError } = await supabase
    .from('video_responses')
    .insert([{
      question_id: questionId,
      user_id: user.id,
      video_url: publicUrl,
      created_at: new Date().toISOString(),
    }]);

  if (dbError) throw dbError;
}

export async function getVideoResponse(questionId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('video_responses')
    .select('*')
    .eq('question_id', questionId)
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}