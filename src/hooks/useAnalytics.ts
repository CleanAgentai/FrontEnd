import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { AnalyticsData } from '@/lib/types/analytics';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    metrics: [],
    hiringData: [],
    timeToHireData: []
  });
  const [loading, setLoading] = useState(false);
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

      // Get applications count
      const { count: applicationsCount } = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true });

      // Calculate metrics
      const metrics = [
        {
          label: 'Active Jobs',
          value: jobsCount || 0,
          trend: 'neutral' as const
        },
        {
          label: 'Total Applications',
          value: applicationsCount || 0,
          trend: 'neutral' as const
        },
        {
          label: 'Interview Rate',
          value: '0%',
          trend: 'neutral' as const
        },
        {
          label: 'Hire Rate',
          value: '0%',
          trend: 'neutral' as const
        }
      ];

      // Sample time to hire data
      const timeToHireData = [
        { date: '2024-01', averageDays: 15 },
        { date: '2024-02', averageDays: 12 },
        { date: '2024-03', averageDays: 14 }
      ];

      setData({ metrics, hiringData: [], timeToHireData });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load analytics');
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