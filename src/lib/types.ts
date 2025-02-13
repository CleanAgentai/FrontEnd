export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

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

export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  skills: string[];
  location: string | null;
  availability: string | null;
  resume_url: string | null;
  video_url: string | null;
  created_at: string;
}

export interface ShortlistedCandidate {
  id: string;
  job_id: string;
  candidate_id: string;
  user_id: string;
  created_at: string;
}

export interface SupportRequest {
  id: string;
  user_id: string;
  issue: string;
  status: string;
  created_at: string;
}