import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

const billingHistory = [
  {
    id: 1,
    date: new Date('2024-03-15'),
    amount: 90.00,
    description: '3 qualified candidates',
    status: 'Paid',
  },
  {
    id: 2,
    date: new Date('2024-02-28'),
    amount: 60.00,
    description: '2 qualified candidates',
    status: 'Paid',
  },
];

export default function BillingHistorySection() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Billing History</h3>
          <p className="text-sm text-gray-500">View and download past invoices</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      <div className="divide-y">
        {billingHistory.map((item) => (
          <div key={item.id} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-medium">${item.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-500">
                {format(item.date, 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-primary-600">
                {item.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {billingHistory.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No billing history available
          </p>
        )}
      </div>
    </Card>
  );
}