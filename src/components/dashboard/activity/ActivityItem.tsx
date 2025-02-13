import { formatDistanceToNow } from 'date-fns';
import type { Activity } from '@/lib/types/dashboard';

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-center text-white/80 py-2 border-b border-white/10">
      <span>{activity.description}</span>
      <span className="text-sm text-white/60">
        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
      </span>
    </div>
  );
}