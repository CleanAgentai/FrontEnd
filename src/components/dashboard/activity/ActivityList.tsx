import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Activity } from '@/lib/types/dashboard';
import { formatDistanceToNow } from 'date-fns';

interface ActivityListProps {
  activities: Activity[];
  loading: boolean;
}

export default function ActivityList({ activities, loading }: ActivityListProps) {
  if (loading) {
    return (
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-center text-gray-700 py-2 border-b border-gray-100"
            >
              <span>{activity.description}</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No recent activity</p>
        )}
      </div>
    </Card>
  );
}