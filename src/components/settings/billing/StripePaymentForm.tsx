import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/stripe-react-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createSetupIntent, handlePaymentMethodAttached } from '@/lib/api/stripe';

interface StripePaymentFormProps {
  onSuccess: () => void;
}

export default function StripePaymentForm({ onSuccess }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Create a SetupIntent
      const { clientSecret } = await createSetupIntent();

      // Confirm the SetupIntent with the card element
      const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (setupIntent.payment_method) {
        // Attach the payment method to the customer
        await handlePaymentMethodAttached(setupIntent.payment_method);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? 'Adding...' : 'Add Payment Method'}
      </Button>
    </form>
  );
}