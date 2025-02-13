import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Users, DollarSign, Clock } from 'lucide-react';
import { getBillingMetrics } from '@/lib/api/billing';
import { format } from 'date-fns';

export default function UsageMetrics() {
  const [metrics, setMetrics] = useState({
    totalHires: 0,
    currentCharges: 0,
    cycleStart: '',
    cycleEnd: '',
  });

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getBillingMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-primary-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Qualified Hires</p>
            <p className="text-2xl font-semibold">{metrics.totalHires}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-primary-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Current Charges</p>
            <p className="text-2xl font-semibold">${metrics.currentCharges}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-primary-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Billing Period</p>
            <p className="text-sm">
              {metrics.cycleStart && format(new Date(metrics.cycleStart), 'MMM d')} - {' '}
              {metrics.cycleEnd && format(new Date(metrics.cycleEnd), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}