import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import type { DashboardMetric } from '@/lib/types/dashboard';

interface MetricCardProps {
  metric: DashboardMetric;
  icon: LucideIcon;
}

export default function MetricCard({ metric, icon: Icon }: MetricCardProps) {
  return (
    <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
      <div className="flex items-center">
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-white/60">{metric.label}</p>
          <p className="text-2xl font-semibold text-white">{metric.value}</p>
        </div>
      </div>
    </Card>
  );
}