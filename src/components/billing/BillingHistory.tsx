import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getBillingHistory } from '@/lib/api/billing/history';
import { exportToCSV } from '@/lib/utils/export';
import BillingHistoryHeader from './history/BillingHistoryHeader';
import BillingHistoryTable from './history/BillingHistoryTable';
import type { Invoice } from '@/lib/types/billing';

export default function BillingHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getBillingHistory();
      setInvoices(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load billing history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const data = invoices.map(invoice => ({
      Date: new Date(invoice.created_at).toLocaleDateString(),
      Amount: `$${invoice.amount.toFixed(2)}`,
      Description: invoice.description,
      Status: invoice.status,
    }));
    exportToCSV(data, 'billing-history');
  };

  return (
    <Card className="p-6">
      <BillingHistoryHeader onExport={handleExport} />
      <BillingHistoryTable invoices={invoices} />
    </Card>
  );
}