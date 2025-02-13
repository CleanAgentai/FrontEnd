import { apiClient } from './client';
import type { Job } from '@/lib/types';

export async function createJob(job: Partial<Job>) {
  const { data } = await apiClient.post('/jobs', job);
  return data;
}

export async function getJobs() {
  const { data } = await apiClient.get('/jobs');
  return data || [];
}

export async function getJobDetails(id: string) {
  const { data } = await apiClient.get(`/jobs/${id}`);
  return data;
}

export async function getJob(id: string) {
  const { data } = await apiClient.get(`/jobs/${id}`);
  return data;
}

export async function getPublicJob(id: string) {
  const { data } = await apiClient.get(`/jobs/${id}/public`);
  return data;
}

export async function updateJob(id: string, job: Partial<Job>) {
  const { data } = await apiClient.put(`/jobs/${id}`, job);
  return data;
}