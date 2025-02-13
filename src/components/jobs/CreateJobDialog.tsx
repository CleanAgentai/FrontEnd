import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useState } from 'react';
import { createJob } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CreateJobDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateJobDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    employment_type: '',
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await createJob({
      user_id: user.id,
      title: formData.title,
      description: formData.description,
      salary: formData.salary ? parseFloat(formData.salary) : null,
      employment_type: formData.employment_type,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create job',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Job created successfully',
      });
      onSuccess();
      onOpenChange(false);
      setFormData({
        title: '',
        description: '',
        salary: '',
        employment_type: '',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Job</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}