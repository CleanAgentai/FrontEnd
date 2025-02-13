import { Card } from '@/components/ui/card';
import BarChartComponent from './charts/BarChartComponent';
import type { FunnelData } from './types';

const data: FunnelData[] = [
  { stage: 'Applications', count: 150 },
  { stage: 'Screened', count: 100 },
  { stage: 'Interviewed', count: 50 },
  { stage: 'Offered', count: 20 },
  { stage: 'Hired', count: 15 },
];

export default function HiringFunnel() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Hiring Pipeline</h3>
      <BarChartComponent 
        data={data}
        dataKey="count"
        xAxisKey="stage"
        height={300}
      />
    </Card>
  );
}