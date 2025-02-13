import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KeyMetric } from '@/lib/types/analytics';

interface KeyMetricsSectionProps {
  metrics: KeyMetric[];
}

export default function KeyMetricsSection({ metrics }: KeyMetricsSectionProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-primary-600" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              {metric.change !== undefined && (
                <p className={`text-sm mt-1 flex items-center gap-1 ${
                  metric.trend === 'up' ? 'text-primary-600' :
                  metric.trend === 'down' ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </p>
              )}
            </div>
            {getTrendIcon(metric.trend)}
          </div>
        </Card>
      ))}
    </div>
  );
}