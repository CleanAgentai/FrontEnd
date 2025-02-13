import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { OverviewData } from '@/lib/types/dashboard';

export function useOverviewData() {
  const [data, setData] = useState<OverviewData>({
    metrics: [],
    pipeline: [],
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const refresh = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      // Get active jobs count
      const { count: jobsCount } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get applications with job data
      const { data: applications } = await supabase
        .from('applications')
        .select('status, job_id')
        .in('job_id', 
          supabase
            .from('jobs')
            .select('id')
            .eq('user_id', user.id)
        );

      // Count applications by status
      const statusCounts = (applications || []).reduce((acc: Record<string, number>, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      // Pipeline data
      const pipeline = [
        { stage: 'Applications', count: statusCounts.pending || 0 },
        { stage: 'Screening', count: statusCounts.screening || 0 },
        { stage: 'Interviews', count: statusCounts.interviewing || 0 },
        { stage: 'Offers', count: statusCounts.offered || 0 },
        { stage: 'Hired', count: statusCounts.hired || 0 }
      ];

      // Metrics
      const metrics = [
        {
          id: '1',
          label: 'Active Jobs',
          value: jobsCount || 0,
          type: 'jobs',
          period_start: new Date(),
          period_end: new Date(),
          user_id: user.id
        },
        {
          id: '2',
          label: 'Total Applications',
          value: Object.values(statusCounts).reduce((a, b) => a + b, 0),
          type: 'candidates',
          period_start: new Date(),
          period_end: new Date(),
          user_id: user.id
        },
        {
          id: '3',
          label: 'In Progress',
          value: (statusCounts.screening || 0) + (statusCounts.interviewing || 0),
          type: 'interviews',
          period_start: new Date(),
          period_end: new Date(),
          user_id: user.id
        },
        {
          id: '4',
          label: 'Hired',
          value: statusCounts.hired || 0,
          type: 'reviews',
          period_start: new Date(),
          period_end: new Date(),
          user_id: user.id
        }
      ];

      // Get recent activities
      const { data: activities } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setData({ metrics, pipeline, activities: activities || [] });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load overview data');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  return { data, loading, error, refresh };
}