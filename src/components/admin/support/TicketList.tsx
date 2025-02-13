```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { formatDistanceToNow } from 'date-fns';
import type { SupportTicket } from '@/lib/types/admin';

interface TicketListProps {
  tickets: SupportTicket[];
  loading: boolean;
  onAssign: (ticketId: string) => void;
  onUpdateStatus: (ticketId: string, status: string) => void;
}

export default function TicketList({
  tickets,
  loading,
  onAssign,
  onUpdateStatus,
}: TicketListProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors];
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{ticket.title}</h3>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
                <Badge variant="outline">{ticket.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{ticket.description}</p>
              <p className="text-xs text-gray-500">
                Opened{' '}
                {formatDistanceToNow(new Date(ticket.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className="flex gap-2">
              {!ticket.assigned_to && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAssign(ticket.id)}
                >
                  Assign to Me
                </Button>
              )}
              {ticket.status !== 'closed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(ticket.id, 'closed')}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
```