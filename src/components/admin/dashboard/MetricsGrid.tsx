import { Card } from '@/components/ui/card';
import { Users, BriefcaseIcon, DollarSign, AlertCircle } from 'lucide-react';
import type { AdminMetrics } from '@/lib/types/admin';

interface MetricsGridProps {
  metrics: AdminMetrics;
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const items = [
    {
      label: 'Total Users',
      value: metrics.totalUsers,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Active Jobs',
      value: metrics.activeJobs,
      icon: BriefcaseIcon,
      color: 'text-green-600',
    },
    {
      label: 'Monthly Revenue',
      value: `$${metrics.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
    },
    {
      label: 'Pending Tickets',
      value: metrics.pendingTickets,
      icon: AlertCircle,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}