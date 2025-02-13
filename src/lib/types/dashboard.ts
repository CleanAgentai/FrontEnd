export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  type: 'jobs' | 'candidates' | 'interviews' | 'reviews';
  period_start: Date;
  period_end: Date;
  user_id: string;
}

export interface Activity {
  id: string;
  type: 'job_created' | 'candidate_applied' | 'interview_scheduled' | 'review_completed';
  description: string;
  created_at: Date;
  user_id: string;
  reference_id: string;
}

export interface OverviewData {
  metrics: DashboardMetric[];
  pipeline: Array<{ stage: string; count: number }>;
  activities: Activity[];
}