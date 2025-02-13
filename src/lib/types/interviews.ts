export interface Question {
  id: string;
  text: string;
  type: 'text' | 'video';
  required: boolean;
}

export interface InterviewAnswers {
  id: string;
  application_id: string;
  answers: Record<string, string>;
  submitted_at: string;
}