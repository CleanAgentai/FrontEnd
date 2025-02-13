import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';
import { useChartConfig } from '@/lib/hooks/useChartConfig';

interface AxisProps {
  dataKey?: string;
  orientation?: 'left' | 'right';
}

export function XAxis({ dataKey }: AxisProps) {
  const config = useChartConfig();
  
  return (
    <RechartsXAxis
      dataKey={dataKey}
      {...config.axis.props}
      style={config.axis.style}
    />
  );
}

export function YAxis({ orientation = 'left' }: AxisProps) {
  const config = useChartConfig();
  
  return (
    <RechartsYAxis
      orientation={orientation}
      {...config.axis.props}
      style={config.axis.style}
    />
  );
}