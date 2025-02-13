import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSubscriptionStatus } from '@/lib/stripe';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const data = await getSubscriptionStatus();
      setSubscription(data);
    } catch (error) {
      console.error('Failed to load subscription:', error);
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Subscription Status</h3>
          <p className="text-sm text-gray-500">Pay per qualified hire</p>
        </div>
        <Badge variant={subscription?.status === 'active' ? 'success' : 'warning'}>
          {subscription?.status || 'inactive'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Billing Period</span>
          <span>
            {subscription?.current_period_start && 
              new Date(subscription.current_period_start).toLocaleDateString()}
            {' - '}
            {subscription?.current_period_end && 
              new Date(subscription.current_period_end).toLocaleDateString()}
          </span>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.location.href = '/billing'}
        >
          Manage Billing
        </Button>
      </div>
    </Card>
  );
}