import { Card } from '@/components/ui/card';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { Job } from '@/lib/types/jobs';

interface JobStatsProps {
  jobs: Job[];
}

export default function JobStats({ jobs }: JobStatsProps) {
  const stats = [
    {
      label: 'Active Jobs',
      value: jobs.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Total Applications',
      value: '0',
      icon: Clock,
      color: 'text-green-600',
    },
    {
      label: 'Interviews Scheduled',
      value: '0',
      icon: CheckCircle,
      color: 'text-purple-600',
    },
    {
      label: 'Pending Reviews',
      value: '0',
      icon: AlertCircle,
      color: 'text-yellow-600',
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