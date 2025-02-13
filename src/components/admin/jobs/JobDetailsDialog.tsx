```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/lib/types';

interface JobDetailsDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function JobDetailsDialog({
  job,
  open,
  onOpenChange,
}: JobDetailsDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{job.employment_type}</Badge>
              <span className="text-sm text-gray-500">
                Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="text-sm font-medium text-gray-500">Salary</h4>
              <p className="text-lg font-semibold">
                {job.salary ? `$${job.salary.toLocaleString()}` : 'Not specified'}
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="text-sm font-medium text-gray-500">Applications</h4>
              <p className="text-lg font-semibold">{job.application_count || 0}</p>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```