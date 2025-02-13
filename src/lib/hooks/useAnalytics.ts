import { supabase } from '@/lib/supabase';
import { useDataFetching } from './useDataFetching';
import type { KeyMetric, HiringData } from '@/lib/types/analytics';

export function useAnalytics() {
  const fetchAnalytics = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const [metricsData, jobsData] = await Promise.all([
      supabase.from('dashboard_metrics').select('*').eq('user_id', user.id),
      supabase.from('jobs').select('title, created_at').eq('user_id', user.id)
    ]);

    if (metricsData.error) throw metricsData.error;
    if (jobsData.error) throw jobsData.error;

    return {
      metrics: metricsData.data.map(metric => ({
        label: metric.label,
        value: metric.value,
        change: 0,
        trend: 'neutral'
      })) as KeyMetric[],
      hiringData: [
        { stage: 'Posted Jobs', count: jobsData.data?.length || 0 },
        { stage: 'Applications', count: 0 },
        { stage: 'Interviews', count: 0 },
        { stage: 'Hired', count: 0 }
      ] as HiringData[]
    };
  };

  const { data, loading, error, refetch } = useDataFetching({
    fetchFn: fetchAnalytics,
    initialData: { metrics: [], hiringData: [] }
  });

  return {
    metrics: data?.metrics || [],
    hiringData: data?.hiringData || [],
    loading,
    error,
    refresh: refetch
  };
}