import { apiClient } from './client';
import { trackQualifiedHire } from './billing';
import type { Application } from '@/lib/types/applications';

export async function createApplication(application: Partial<Application>) {
  const { data } = await apiClient.post('/applications', application);
  return data;
}

export async function getApplications(filters?: Partial<Application>) {
  const { data } = await apiClient.get('/applications', { params: filters });
  return data || [];
}

export async function getApplicationDetails(id: string) {
  const { data } = await apiClient.get(`/applications/${id}`);
  return data;
}

export async function updateApplicationStatus(id: string, status: string) {
  const { data } = await apiClient.put(`/applications/${id}/status`, { status });

  // If the candidate is marked as hired, track it for billing
  if (status === 'hired') {
    await trackQualifiedHire(id);
  }

  return data;
}