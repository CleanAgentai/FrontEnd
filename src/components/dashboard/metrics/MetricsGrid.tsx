import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Users, BriefcaseIcon, CheckCircle, Clock } from 'lucide-react';
import type { DashboardMetric } from '@/lib/types/dashboard';

interface MetricsGridProps {
  metrics: DashboardMetric[];
  loading?: boolean;
}

const METRIC_ICONS = {
  jobs: BriefcaseIcon,
  candidates: Users,
  interviews: CheckCircle,
  reviews: Clock,
} as const;

export default function MetricsGrid({ metrics = [], loading = false }: MetricsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-center items-center h-24">
              <LoadingSpinner />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = METRIC_ICONS[metric.type] || BriefcaseIcon;
        return (
          <Card 
            key={metric.id} 
            className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-primary-50">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}