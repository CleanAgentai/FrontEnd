```typescript
import { supabase } from '@/lib/supabase';
import type { AdminSettings, AdminLog, SupportTicket, AdminMetrics } from '@/lib/types/admin';

export async function isAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, email')
    .eq('id', user.id)
    .single();

  if (!profile) return false;

  return (
    profile.role === 'admin' ||
    profile.email === 'porter@clementinescleaning.com' ||
    profile.email === 'momenandpc@gmail.com'
  );
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const [
    { count: totalUsers },
    { count: activeJobs },
    { data: revenue },
    { count: pendingTickets }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('invoices').select('amount').gte('created_at', new Date(new Date().setDate(1)).toISOString()),
    supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('status', 'open')
  ]);

  const monthlyRevenue = revenue?.reduce((sum, invoice) => sum + invoice.amount, 0) || 0;

  return {
    totalUsers: totalUsers || 0,
    activeJobs: activeJobs || 0,
    monthlyRevenue,
    pendingTickets: pendingTickets || 0
  };
}

export async function getAdminSettings(): Promise<AdminSettings[]> {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .order('key');

  if (error) throw error;
  return data;
}

export async function updateAdminSetting(key: string, value: any): Promise<void> {
  const { error } = await supabase
    .from('admin_settings')
    .upsert({ key, value })
    .eq('key', key);

  if (error) throw error;
}

export async function getAdminLogs(limit = 50): Promise<AdminLog[]> {
  const { data, error } = await supabase
    .from('admin_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getSupportTickets(status?: string): Promise<SupportTicket[]> {
  let query = supabase.from('support_tickets').select('*');
  
  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateSupportTicket(
  id: string,
  updates: Partial<SupportTicket>
): Promise<void> {
  const { error } = await supabase
    .from('support_tickets')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}
```