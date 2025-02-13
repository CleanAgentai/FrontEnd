import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Profile } from '@/lib/types';

interface ProfileSettingsProps {
  profile: Profile | null;
  onUpdate: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

export default function ProfileSettings({ profile, onUpdate }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    company_name: profile?.company_name || '',
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await onUpdate(formData);
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name</label>
          <Input
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          />
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Card>
  );
}