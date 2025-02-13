import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_CONFIG } from '@/lib/constants/charts';
import type { HiringData } from '@/lib/types/analytics';

interface HiringOverviewChartProps {
  data: HiringData[];
}

const defaultData = [
  { stage: 'Posted Jobs', count: 0 },
  { stage: 'Applications', count: 0 },
  { stage: 'Interviews', count: 0 },
  { stage: 'Hired', count: 0 }
];

export default function HiringOverviewChart({ data }: HiringOverviewChartProps) {
  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Hiring Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid {...CHART_CONFIG.grid} />
            <XAxis 
              dataKey="stage"
              tick={CHART_CONFIG.axis.tick}
              axisLine={CHART_CONFIG.axis.line}
            />
            <YAxis
              tick={CHART_CONFIG.axis.tick}
              axisLine={CHART_CONFIG.axis.line}
            />
            <Tooltip contentStyle={CHART_CONFIG.tooltip.style} />
            <Bar 
              dataKey="count"
              fill={CHART_CONFIG.bar.fill}
              radius={CHART_CONFIG.bar.radius}
              maxBarSize={CHART_CONFIG.bar.maxBarSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}