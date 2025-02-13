import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  type: 'interview' | 'review' | 'deadline';
  datetime: Date;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Interview with Sarah Parker',
    type: 'interview',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  // Add more sample events...
];

export default function UpcomingEvents() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <Calendar className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium">{event.title}</p>
              <div className="flex items-center mt-2">
                <Badge variant={
                  event.type === 'interview' ? 'default' :
                  event.type === 'review' ? 'secondary' : 'destructive'
                }>
                  {event.type}
                </Badge>
                <span className="text-sm text-gray-500 ml-2">
                  {format(event.datetime, 'MMM d, h:mm a')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}