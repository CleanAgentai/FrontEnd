import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'application' | 'interview' | 'status';
  description: string;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'application',
    description: 'New application received for Senior Cleaner position',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    type: 'interview',
    description: 'Interview scheduled with John Doe',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  // Add more sample activities...
];

export default function ActivityFeed() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="application">Applications</SelectItem>
            <SelectItem value="interview">Interviews</SelectItem>
            <SelectItem value="status">Status Changes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
            <Badge variant={
              activity.type === 'application' ? 'default' :
              activity.type === 'interview' ? 'secondary' : 'outline'
            }>
              {activity.type}
            </Badge>
            <div className="flex-1">
              <p className="text-sm">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </div>
    </Card>
  );
}