import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodFormProps {
  onSuccess: () => void;
}

export function PaymentMethodForm({ onSuccess }: PaymentMethodFormProps) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentMethod) {
        toast({ title: 'Success', description: 'Payment method added successfully' });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add payment method',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#0EA5E9',
                '::placeholder': {
                  color: '#94A3B8',
                },
              },
              invalid: {
                color: '#EF4444',
              },
            },
          }}
        />
      </div>
      <Button type="submit" disabled={loading || !stripe} className="w-full">
        {loading ? 'Adding...' : 'Add Payment Method'}
      </Button>
    </form>
  );
}