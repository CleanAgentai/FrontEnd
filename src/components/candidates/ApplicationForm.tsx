import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createApplication } from '@/lib/api/applications';

interface ApplicationFormProps {
  jobId: string;
  onSuccess: () => void;
}

export default function ApplicationForm({ jobId, onSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createApplication({ ...formData, jobId });
      toast({ title: 'Success', description: 'Application submitted successfully' });
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <Input
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <Input
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Phone</label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Letter</label>
        <Textarea
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          rows={5}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}