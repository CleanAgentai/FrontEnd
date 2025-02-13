import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { SupportTicket } from '@/lib/types/admin';

interface SupportTicketsOverviewProps {
  tickets: SupportTicket[];
  onAssign: (ticketId: string) => void;
}

export default function SupportTicketsOverview({ tickets, onAssign }: SupportTicketsOverviewProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Support Tickets</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex justify-between items-center py-4 border-b">
            <div>
              <p className="font-medium">{ticket.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
                <span className="text-sm text-gray-500">{ticket.status}</span>
              </div>
            </div>
            {!ticket.assigned_to && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAssign(ticket.id)}
              >
                Assign
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}