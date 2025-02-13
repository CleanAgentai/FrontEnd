import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { downloadInvoice } from '@/lib/api/billing/history';
import type { Invoice } from '@/lib/types/billing';

interface BillingHistoryTableProps {
  invoices: Invoice[];
}

export default function BillingHistoryTable({ invoices }: BillingHistoryTableProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (invoiceId: string) => {
    setDownloading(invoiceId);
    try {
      await downloadInvoice(invoiceId);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <Card key={invoice.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">${invoice.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{invoice.description}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(invoice.created_at), 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={invoice.status === 'paid' ? 'success' : 'warning'}>
                {invoice.status}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(invoice.id)}
                disabled={downloading === invoice.id}
              >
                {downloading === invoice.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {invoices.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No billing history available
        </p>
      )}
    </div>
  );
}