import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import type { Job } from '@/lib/types';

interface JobsListProps {
  jobs: Job[];
  loading: boolean;
  onJobUpdate: () => void;
}

export default function JobsList({ jobs, loading, onJobUpdate }: JobsListProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No jobs posted yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {job.employment_type && (
                  <Badge variant="outline">{job.employment_type}</Badge>
                )}
                {job.salary && (
                  <Badge variant="outline">${job.salary.toLocaleString()}/year</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}