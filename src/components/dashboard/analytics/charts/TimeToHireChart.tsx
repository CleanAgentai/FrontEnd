```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TimeToHireData } from '@/lib/types/analytics';

interface TimeToHireChartProps {
  data: TimeToHireData[];
}

export function TimeToHireChart({ data }: TimeToHireChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="averageDays" 
          stroke="#16A34A" 
          strokeWidth={2}
          dot={{ fill: '#16A34A' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```