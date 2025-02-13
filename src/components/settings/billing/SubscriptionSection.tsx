import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  return (
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

      <Button variant="outline" className="w-full">
        View Plan Details
      </Button>
    </Card>
  );
}