import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function ProfileSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch profile',
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      setProfile(data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        company_name: data.company_name || '',
      });
    }
  };

  const handleUpdate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...formData,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Profile updated successfully',
    });
    setIsEditing(false);
    fetchProfile();
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Name</label>
          <p className="text-lg">
            {profile?.first_name || profile?.last_name
              ? `${profile?.first_name || ''} ${profile?.last_name || ''}`
              : 'Not set'}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Company</label>
          <p className="text-lg">{profile?.company_name || 'Not set'}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Member Since</label>
          <p className="text-lg">
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : 'Not available'}
          </p>
        </div>
      </div>
    </Card>
  );
}