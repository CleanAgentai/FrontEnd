import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createJob, updateJob } from '@/lib/api/jobs';
import type { Job } from '@/lib/types';

interface JobFormProps {
  initialData?: Partial<Job>;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function JobForm({ initialData, onSuccess, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    salary: initialData?.salary?.toString() || '',
    employment_type: initialData?.employment_type || '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      };

      if (initialData?.id) {
        await updateJob(initialData.id, jobData);
      } else {
        await createJob(jobData);
      }

      toast({
        title: 'Success',
        description: `Job ${initialData ? 'updated' : 'created'} successfully`,
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${initialData ? 'update' : 'create'} job`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Job Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Salary</label>
        <Input
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Employment Type</label>
        <Select
          value={formData.employment_type}
          onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}