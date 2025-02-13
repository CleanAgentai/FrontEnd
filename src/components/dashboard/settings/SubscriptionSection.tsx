import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Crown, Check } from 'lucide-react';

const features = [
  'AI-powered candidate screening',
  'Video interview responses',
  'Background verification',
  'Unlimited job postings',
  'Analytics dashboard',
  'Priority support'
];

export default function SubscriptionSection() {
  const [showPlans, setShowPlans] = useState(false);

  const handleSubscribe = async () => {
    try {
      // Redirect to Stripe Checkout or handle subscription creation
      console.log('Subscribing to plan...');
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Crown className="h-6 w-6 text-primary-600" />
            <div>
              <h3 className="text-lg font-semibold">Pay Per Hire</h3>
              <p className="text-sm text-gray-500">$30 per qualified candidate</p>
            </div>
          </div>
          <Badge variant="outline" className="text-primary-600">
            Current Plan
          </Badge>
        </div>

        <div className="space-y-3 mb-6">
          {features.map((feature) => (
            <div key={feature} className="flex items-center text-gray-700">
              <Check className="h-5 w-5 text-primary-600 mr-2" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setShowPlans(true)}
        >
          View Plan Options
        </Button>
      </Card>

      <Dialog open={showPlans} onOpenChange={setShowPlans}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Available Plans</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Pay Per Hire</h4>
                  <p className="text-sm text-gray-500">Perfect for growing teams</p>
                </div>
                <Badge>Current Plan</Badge>
              </div>
              <div className="mb-6">
                <p className="text-3xl font-bold">$30</p>
                <p className="text-sm text-gray-500">per qualified hire</p>
              </div>
              <div className="space-y-2 mb-6">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary-600 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={handleSubscribe}>
                Subscribe Now
              </Button>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}