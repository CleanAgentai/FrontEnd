import { Card } from '@/components/ui/card';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Application } from '@/lib/types/applications';

interface ApplicationStatsProps {
  applications: Application[];
}

export default function ApplicationStats({ applications }: ApplicationStatsProps) {
  const stats = [
    {
      label: 'Total Applications',
      value: applications.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'In Review',
      value: applications.filter(app => app.status === 'reviewing').length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      label: 'Accepted',
      value: applications.filter(app => app.status === 'accepted').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      label: 'Rejected',
      value: applications.filter(app => app.status === 'rejected').length,
      icon: XCircle,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}