import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface BillingHistoryHeaderProps {
  onExport: () => void;
}

export default function BillingHistoryHeader({ onExport }: BillingHistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Billing History</h3>
      <Button variant="outline" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        Export All
      </Button>
    </div>
  );
}