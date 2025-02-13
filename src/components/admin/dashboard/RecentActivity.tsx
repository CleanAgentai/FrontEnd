import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import type { AdminLog } from '@/lib/types/admin';

interface RecentActivityProps {
  logs: AdminLog[];
}

export default function RecentActivity({ logs }: RecentActivityProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="text-sm text-gray-600">{log.action} {log.entity_type}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}