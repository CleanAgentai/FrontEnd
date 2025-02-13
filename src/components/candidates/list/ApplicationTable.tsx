import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { formatDistanceToNow } from 'date-fns';
import type { Application } from '@/lib/types/applications';

interface ApplicationTableProps {
  applications: Application[];
  loading: boolean;
  onStatusChange: () => void;
}

export default function ApplicationTable({ 
  applications, 
  loading, 
  onStatusChange 
}: ApplicationTableProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No applications found</p>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-4 font-medium">Candidate</th>
              <th className="pb-4 font-medium">Job</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Applied</th>
              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="py-4">
                  <div>
                    <p className="font-medium">
                      {application.firstName} {application.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{application.email}</p>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-sm">Job Title</p>
                </td>
                <td className="py-4">
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </td>
                <td className="py-4 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(application.createdAt))} ago
                </td>
                <td className="py-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/candidates/${application.id}`)}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}