```typescript
import { supabase } from '@/lib/supabase';

export async function fetchAnalyticsData() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Fetch jobs data
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', user.id);

  // Calculate metrics
  const metrics = [
    {
      label: 'Active Jobs',
      value: jobs?.length || 0,
      change: 0,
      trend: 'neutral'
    },
    {
      label: 'Total Applications',
      value: 0,
      change: 0,
      trend: 'neutral'
    },
    {
      label: 'Time to Hire',
      value: '14 days',
      change: -2,
      trend: 'down'
    },
    {
      label: 'Cost per Hire',
      value: '$30',
      change: 0,
      trend: 'neutral'
    }
  ];

  // Sample hiring data
  const hiringData = [
    { stage: 'Posted Jobs', count: jobs?.length || 0 },
    { stage: 'Applications', count: 0 },
    { stage: 'Interviews', count: 0 },
    { stage: 'Hired', count: 0 }
  ];

  // Sample time to hire data
  const timeToHireData = [
    { date: '2024-01', averageDays: 15 },
    { date: '2024-02', averageDays: 12 },
    { date: '2024-03', averageDays: 14 }
  ];

  return {
    metrics,
    hiringData,
    timeToHireData
  };
}
```