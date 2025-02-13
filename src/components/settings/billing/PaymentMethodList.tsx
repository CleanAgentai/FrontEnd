import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { removePaymentMethod } from '@/lib/api/billing';
import type { PaymentMethod } from '@/lib/types/billing';

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  onUpdate: () => void;
}

export default function PaymentMethodList({ methods, onUpdate }: PaymentMethodListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await removePaymentMethod(id);
      toast({ title: 'Success', description: 'Payment method removed successfully' });
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove payment method',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <Card key={method.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{method.card_number}</p>
                <p className="text-sm text-gray-500">
                  Expires {method.expiry_date}
                  {method.is_default && (
                    <span className="ml-2 text-primary-600">(Default)</span>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(method.id)}
              disabled={deleting === method.id}
            >
              {deleting === method.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </Card>
      ))}

      {methods.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No payment methods added
        </p>
      )}
    </div>
  );
}