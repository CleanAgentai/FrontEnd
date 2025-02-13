import { apiClient } from './client';
import type { InterviewAnswers } from '@/lib/types/interviews';

export async function submitInterviewAnswers(applicationId: string, answers: Record<string, string>) {
  const { data } = await apiClient.post(`/applications/${applicationId}/interview-answers`, {
    answers,
    submitted_at: new Date().toISOString(),
  });
  return data;
}

export async function getInterviewQuestions(jobId: string) {
  const { data } = await apiClient.get(`/jobs/${jobId}/interview-questions`);
  return data;
}

export async function submitAnswer(applicationId: string, questionId: string, answer: string) {
  const { data } = await apiClient.post(`/applications/${applicationId}/answers`, {
    question_id: questionId,
    answer,
    submitted_at: new Date().toISOString(),
  });
  return data;
}

export async function uploadVideo(applicationId: string, questionId: string, videoFile: File) {
  const formData = new FormData();
  formData.append('video', videoFile);
  
  const { data } = await apiClient.post(
    `/applications/${applicationId}/questions/${questionId}/video`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return data.videoUrl;
}

export async function getVideoQuestions(jobId: string) {
  const { data } = await apiClient.get(`/jobs/${jobId}/video-questions`);
  return data || [];
}