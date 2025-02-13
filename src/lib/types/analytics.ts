export interface KeyMetric {
  label: string;
  value: string | number;
  change?: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface HiringData {
  stage: string;
  count: number;
}

export interface TimeToHireData {
  date: string;
  averageDays: number;
}

export interface AnalyticsData {
  metrics: KeyMetric[];
  hiringData: HiringData[];
  timeToHireData: TimeToHireData[];
}