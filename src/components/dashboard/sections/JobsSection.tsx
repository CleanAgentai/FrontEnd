import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function JobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    employment_type: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch jobs',
        variant: 'destructive',
      });
      return;
    }

    setJobs(data || []);
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const jobData = {
      ...formData,
      salary: formData.salary ? parseFloat(formData.salary) : null,
      user_id: user.id,
    };

    const { error } = editingJob
      ? await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', editingJob.id)
      : await supabase
          .from('jobs')
          .insert([jobData]);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save job',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Job ${editingJob ? 'updated' : 'created'} successfully`,
    });
    setIsCreating(false);
    setEditingJob(null);
    setFormData({ title: '', description: '', salary: '', employment_type: '' });
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete job',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Job deleted successfully',
    });
    fetchJobs();
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description || '',
      salary: job.salary?.toString() || '',
      employment_type: job.employment_type || '',
    });
    setIsCreating(true);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Job Listings</h2>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
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
              <Button variant="outline" onClick={() => {
                setIsCreating(false);
                setEditingJob(null);
                setFormData({ title: '', description: '', salary: '', employment_type: '' });
              }}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingJob ? 'Update Job' : 'Create Job'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                <div className="flex space-x-4 mt-2">
                  <span className="text-sm text-gray-500">
                    ${job.salary?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    {job.employment_type}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(job)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(job.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {jobs.length === 0 && (
          <p className="text-center text-gray-500">No jobs posted yet</p>
        )}
      </div>
    </Card>
  );
}