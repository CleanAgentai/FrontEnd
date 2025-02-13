import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';

const baseAxisProps = {
  stroke: '#E5E7EB',
  tick: { fill: '#6B7280' },
  axisLine: { stroke: '#E5E7EB' },
  tickLine: { stroke: '#E5E7EB' },
};

export function XAxis({ dataKey }: { dataKey: string }) {
  return <RechartsXAxis dataKey={dataKey} {...baseAxisProps} />;
}

export function YAxis() {
  return <RechartsYAxis {...baseAxisProps} />;
}