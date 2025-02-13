import { ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

interface ResponsiveChartProps {
  children: ReactNode;
  height?: number;
}

export default function ResponsiveChart({ children, height = 300 }: ResponsiveChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  );
}