import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  salary: z.number().optional(),
  employment_type: z.string().optional(),
});