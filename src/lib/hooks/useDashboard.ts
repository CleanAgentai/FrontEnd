import { useState, useEffect } from 'react';
import { getDashboardMetrics } from '@/lib/api/metrics';
import { getRecentActivities } from '@/lib/api/activities';
import { initializeDashboardMetrics } from '@/lib/api/dashboard';
import type { DashboardMetric, Activity } from '@/lib/types/dashboard';

export function useDashboard(userId: string) {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (userId) {
      loadDashboardData();
    }
  }, [userId]);

  async function loadDashboardData() {
    try {
      setLoading(true);
      await initializeDashboardMetrics(userId);
      
      const [metricsData, activitiesData] = await Promise.all([
        getDashboardMetrics(userId),
        getRecentActivities(userId)
      ]);

      setMetrics(metricsData);
      setActivities(activitiesData);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    metrics,
    activities,
    loading,
    error,
    refresh: loadDashboardData
  };
}