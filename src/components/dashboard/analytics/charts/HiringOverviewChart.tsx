```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { HiringData } from '@/lib/types/analytics';

interface HiringOverviewChartProps {
  data: HiringData[];
}

export function HiringOverviewChart({ data }: HiringOverviewChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#16A34A" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
```