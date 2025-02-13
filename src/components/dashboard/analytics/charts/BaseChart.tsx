import { ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

interface BaseChartProps {
  children: ReactNode;
  height?: number;
}

export default function BaseChart({ children, height = 300 }: BaseChartProps) {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  );
}