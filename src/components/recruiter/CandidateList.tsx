import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import type { Application } from '@/lib/types/applications';

interface CandidateListProps {
  candidates: Application[];
  onSelect: (candidate: Application) => void;
}

export default function CandidateList({ candidates, onSelect }: CandidateListProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      interviewing: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <p className="text-sm text-gray-500">{candidate.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(candidate.status)}>
                  {candidate.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Applied {formatDistanceToNow(new Date(candidate.created_at))} ago
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={() => onSelect(candidate)}>
              Review
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}