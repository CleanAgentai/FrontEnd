import type { DashboardMetric } from '@/lib/types/dashboard';
import { BriefcaseIcon, Users, CheckCircle, Clock } from 'lucide-react';

export const METRIC_ICONS = {
  jobs: BriefcaseIcon,
  candidates: Users,
  interviews: CheckCircle,
  reviews: Clock,
} as const;

export function formatMetricValue(metric: DashboardMetric): string {
  return metric.value.toLocaleString();
}