import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

export default function CompanySettings() {
  const { profile, loading, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    companyName: profile?.company_name || '',
    website: profile?.website || '',
    description: profile?.description || '',
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile({
        company_name: formData.companyName,
        website: formData.website,
        description: formData.description,
      });
      toast({ title: 'Success', description: 'Company settings updated successfully' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update company settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

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
      <h2 className="text-lg font-semibold mb-6">Company Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name</label>
          <Input
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
}