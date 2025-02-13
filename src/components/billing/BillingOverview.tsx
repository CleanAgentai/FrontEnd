import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSubscriptionStatus, getBillingPortalUrl } from '@/lib/stripe';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function BillingOverview() {
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

  const handleManageBilling = async () => {
    try {
      const url = await getBillingPortalUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to open billing portal:', error);
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
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold">Billing Overview</h2>
          <p className="text-sm text-gray-500">Pay per qualified hire</p>
        </div>
        <Button onClick={handleManageBilling}>
          Manage Billing
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">Current Period</p>
            <p className="text-sm text-gray-500">
              {subscription?.current_period_start && new Date(subscription.current_period_start).toLocaleDateString()} - 
              {subscription?.current_period_end && new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={subscription?.status === 'active' ? 'success' : 'warning'}>
            {subscription?.status}
          </Badge>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium mb-2">Usage This Period</p>
          <p className="text-3xl font-bold">$30 <span className="text-sm font-normal text-gray-500">per qualified hire</span></p>
        </div>
      </div>
    </Card>
  );
}