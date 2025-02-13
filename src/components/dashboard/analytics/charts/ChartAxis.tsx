import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';
import { chartConfig } from './ChartConfig';

const baseAxisProps = {
  stroke: chartConfig.colors.grid,
  tick: { fill: chartConfig.colors.text },
  axisLine: { stroke: chartConfig.colors.grid },
  tickLine: { stroke: chartConfig.colors.grid },
};

interface AxisProps {
  dataKey?: string;
  orientation?: 'left' | 'right';
}

export function XAxis({ dataKey }: AxisProps) {
  return <RechartsXAxis dataKey={dataKey} {...baseAxisProps} />;
}

export function YAxis({ orientation = 'left' }: AxisProps) {
  return <RechartsYAxis orientation={orientation} {...baseAxisProps} />;
}