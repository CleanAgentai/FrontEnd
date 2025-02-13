export interface Application {
  id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'interviewing' | 'accepted' | 'rejected';
  created_at: string;
}