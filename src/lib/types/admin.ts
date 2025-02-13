export interface AdminSettings {
  id: string;
  key: string;
  value: any;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: any;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminMetrics {
  totalUsers: number;
  activeJobs: number;
  monthlyRevenue: number;
  pendingTickets: number;
}