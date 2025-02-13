import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) throw error;

      toast({ title: 'Success', description: 'Password updated successfully' });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <Input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <Input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </form>
    </Card>
  );
}