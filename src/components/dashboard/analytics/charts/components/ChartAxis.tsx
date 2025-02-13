import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';
import { CHART_STYLES } from '@/lib/constants/charts';

interface AxisProps {
  dataKey?: string;
  label?: string;
  tickFormatter?: (value: any) => string;
}

export function XAxis({ dataKey, tickFormatter }: AxisProps) {
  return (
    <RechartsXAxis
      dataKey={dataKey}
      tick={{ ...CHART_STYLES.axis.tick }}
      axisLine={{ ...CHART_STYLES.axis.line }}
      tickFormatter={tickFormatter}
      height={50}
      tickMargin={10}
    />
  );
}

export function YAxis({ label, tickFormatter }: AxisProps) {
  return (
    <RechartsYAxis
      tick={{ ...CHART_STYLES.axis.tick }}
      axisLine={{ ...CHART_STYLES.axis.line }}
      tickFormatter={tickFormatter}
      width={60}
      tickMargin={10}
      label={label ? {
        value: label,
        angle: -90,
        position: 'insideLeft',
        style: { ...CHART_STYLES.axis.label }
      } : undefined}
    />
  );
}