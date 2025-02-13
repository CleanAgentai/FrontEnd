import { supabase } from '@/lib/supabase';
import type { InterviewAnswers } from '@/lib/types/interviews';

export async function submitInterviewAnswers(applicationId: string, answers: Record<string, string>) {
  const { error } = await supabase
    .from('interview_answers')
    .insert([{
      application_id: applicationId,
      answers,
      submitted_at: new Date().toISOString(),
    }]);

  if (error) throw error;
}

export async function getInterviewQuestions(jobId: string) {
  const { data, error } = await supabase
    .from('interview_questions')
    .select('*')
    .eq('job_id', jobId);

  if (error) throw error;
  return data;
}

export async function submitAnswer(applicationId: string, questionId: string, answer: string) {
  const { error } = await supabase
    .from('interview_answers')
    .insert([{
      application_id: applicationId,
      question_id: questionId,
      answer,
      submitted_at: new Date().toISOString(),
    }]);

  if (error) throw error;
}

export async function uploadVideo(applicationId: string, questionId: string, videoFile: File) {
  const fileName = `${applicationId}/${questionId}-${Date.now()}.mp4`;
  
  const { error: uploadError } = await supabase
    .storage
    .from('interview-videos')
    .upload(fileName, videoFile);

  if (uploadError) throw uploadError;

  const { data } = await supabase
    .storage
    .from('interview-videos')
    .getPublicUrl(fileName);

  // Save the video URL in the interview_answers table
  const { error: answerError } = await supabase
    .from('interview_answers')
    .insert([{
      application_id: applicationId,
      question_id: questionId,
      video_url: data.publicUrl,
      submitted_at: new Date().toISOString(),
    }]);

  if (answerError) throw answerError;

  return data.publicUrl;
}

export async function getVideoQuestions(jobId: string) {
  const { data, error } = await supabase
    .from('interview_questions')
    .select('*')
    .eq('job_id', jobId)
    .eq('type', 'video');

  if (error) throw error;
  return data || [];
}