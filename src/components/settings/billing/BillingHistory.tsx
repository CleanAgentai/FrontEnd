import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { downloadInvoice, exportInvoices } from '@/lib/api/billing';
import type { Invoice } from '@/lib/types/billing';

interface BillingHistoryProps {
  invoices: Invoice[];
}

export default function BillingHistory({ invoices }: BillingHistoryProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownload = async (invoiceId: string) => {
    setDownloading(invoiceId);
    try {
      await downloadInvoice(invoiceId);
      toast({ title: 'Success', description: 'Invoice downloaded successfully' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to download invoice',
        variant: 'destructive',
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleExportAll = async () => {
    try {
      await exportInvoices(invoices);
      toast({ title: 'Success', description: 'Billing history exported successfully' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to export billing history',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Billing History</h3>
        <Button variant="outline" onClick={handleExportAll}>
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      <div className="divide-y">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-medium">${invoice.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{invoice.description}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(invoice.created_at), 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm px-2 py-1 rounded ${
                invoice.status === 'paid' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {invoice.status}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDownload(invoice.id)}
                disabled={downloading === invoice.id}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {invoices.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No billing history available
          </p>
        )}
      </div>
    </Card>
  );
}