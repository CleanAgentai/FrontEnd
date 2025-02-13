```tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateAdminSetting } from '@/lib/api/admin';

interface Setting {
  key: string;
  value: any;
  type: 'text' | 'textarea' | 'number';
  label: string;
}

const settings: Setting[] = [
  {
    key: 'platform_name',
    value: 'TaskTalent.AI',
    type: 'text',
    label: 'Platform Name',
  },
  {
    key: 'support_email',
    value: 'support@tasktalent.ai',
    type: 'text',
    label: 'Support Email',
  },
  {
    key: 'terms_of_service',
    value: '',
    type: 'textarea',
    label: 'Terms of Service',
  },
  {
    key: 'privacy_policy',
    value: '',
    type: 'textarea',
    label: 'Privacy Policy',
  },
];

export default function PlatformSettings() {
  const [formData, setFormData] = useState<Record<string, any>>(
    Object.fromEntries(settings.map(s => [s.key, s.value]))
  );
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await Promise.all(
        Object.entries(formData).map(([key, value]) =>
          updateAdminSetting(key, value)
        )
      );
      toast({ title: 'Success', description: 'Settings updated successfully' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Platform Settings</h2>
      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.key} className="space-y-2">
            <label className="text-sm font-medium">{setting.label}</label>
            {setting.type === 'textarea' ? (
              <Textarea
                value={formData[setting.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [setting.key]: e.target.value })
                }
                rows={6}
              />
            ) : (
              <Input
                type={setting.type}
                value={formData[setting.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [setting.key]: e.target.value })
                }
              />
            )}
          </div>
        ))}
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </Card>
  );
}
```