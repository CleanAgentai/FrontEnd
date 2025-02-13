```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/lib/types';

interface JobTableProps {
  jobs: Job[];
  loading: boolean;
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

export default function JobTable({ 
  jobs, 
  loading, 
  onView, 
  onEdit, 
  onDelete 
}: JobTableProps) {
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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-4 font-medium">Job Title</th>
              <th className="pb-4 font-medium">Company</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium">Posted</th>
              <th className="pb-4 font-medium">Applications</th>
              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="py-4">
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500">
                    {job.salary ? `$${job.salary.toLocaleString()}` : 'Not specified'}
                  </p>
                </td>
                <td className="py-4">
                  <p className="text-sm">{job.company_name}</p>
                </td>
                <td className="py-4">
                  <Badge variant="outline">
                    {job.employment_type || 'Not specified'}
                  </Badge>
                </td>
                <td className="py-4 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                </td>
                <td className="py-4">
                  <Badge>{job.application_count || 0}</Badge>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(job)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(job)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
```