import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Elements } from '@stripe/react-stripe-js';
import { stripe } from '@/lib/stripe';
import PaymentMethodForm from './PaymentMethodForm';

export default function PaymentSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <p className="text-sm text-gray-500">Manage your payment information</p>
        </div>
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <CreditCard className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-sm text-gray-500">Expires 12/2024</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <Elements stripe={stripe}>
            <PaymentMethodForm onSuccess={() => setIsOpen(false)} />
          </Elements>
        </DialogContent>
      </Dialog>
    </Card>
  );
}