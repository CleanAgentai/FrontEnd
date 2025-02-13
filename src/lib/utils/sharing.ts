export async function generateShareableLink(companyId: string, jobId?: string): Promise<string> {
  const baseUrl = window.location.origin;
  
  if (jobId) {
    return `${baseUrl}/jobs/${jobId}`;
  }
  
  return `${baseUrl}/companies/${companyId}/jobs`;
}

export function getCompanyIdFromUrl(): string | null {
  const path = window.location.pathname;
  const match = path.match(/\/companies\/([^\/]+)\/jobs/);
  return match ? match[1] : null;
}

export function getJobIdFromUrl(): string | null {
  const path = window.location.pathname;
  const match = path.match(/\/jobs\/([^\/]+)/);
  return match ? match[1] : null;
}