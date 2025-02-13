import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_CONFIG } from '@/lib/constants/charts';
import type { TimeToHireData } from '@/lib/types/analytics';

interface TimeToHireChartProps {
  data: TimeToHireData[];
}

const defaultData = [
  { date: '2024-01', averageDays: 15 },
  { date: '2024-02', averageDays: 12 },
  { date: '2024-03', averageDays: 14 }
];

export default function TimeToHireChart({ data }: TimeToHireChartProps) {
  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Time to Hire Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid {...CHART_CONFIG.grid} />
            <XAxis
              dataKey="date"
              tick={CHART_CONFIG.axis.tick}
              axisLine={CHART_CONFIG.axis.line}
            />
            <YAxis
              tick={CHART_CONFIG.axis.tick}
              axisLine={CHART_CONFIG.axis.line}
              label={{ 
                value: 'Days', 
                angle: -90, 
                position: 'insideLeft',
                style: CHART_CONFIG.axis.tick
              }}
            />
            <Tooltip contentStyle={CHART_CONFIG.tooltip.style} />
            <Line
              type="monotone"
              dataKey="averageDays"
              stroke={CHART_CONFIG.line.stroke}
              strokeWidth={CHART_CONFIG.line.strokeWidth}
              dot={CHART_CONFIG.line.dot}
              activeDot={CHART_CONFIG.line.activeDot}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}