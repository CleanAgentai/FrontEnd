import { supabase } from '@/lib/supabase';
import type { Invoice } from '@/lib/types/billing';

export async function getBillingHistory(): Promise<Invoice[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function downloadInvoice(invoiceId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Invoice not found');

  // Generate PDF invoice (you can use jsPDF or other library)
  // For now, we'll just download a simple text file
  const blob = new Blob(
    [`Invoice #${data.id}\nAmount: $${data.amount}\nDate: ${new Date(data.created_at).toLocaleDateString()}`], 
    { type: 'text/plain' }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${data.id}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}