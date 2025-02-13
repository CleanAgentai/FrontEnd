import { z } from 'zod';
import { jobFormSchema } from '../validations/jobs';

export type JobFormData = z.infer<typeof jobFormSchema>;

export interface Job {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  salary: number | null;
  employment_type: string | null;
  created_at: string;
  updated_at: string;
}