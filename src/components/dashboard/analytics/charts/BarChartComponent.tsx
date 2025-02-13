import { BarChart, Bar, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartConfig } from './ChartConfig';
import { XAxis, YAxis } from './ChartAxis';
import type { ChartData } from '../types';

interface BarChartComponentProps {
  data: ChartData[];
  dataKey: string;
  xAxisKey: string;
  height?: number;
  barColor?: string;
}

export default function BarChartComponent({
  data,
  dataKey,
  xAxisKey,
  height = 300,
  barColor = chartConfig.colors.bar,
}: BarChartComponentProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={chartConfig.margins}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={chartConfig.colors.grid}
            vertical={false}
          />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip
            cursor={chartConfig.tooltip.cursor}
            contentStyle={chartConfig.tooltip.style}
          />
          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={chartConfig.bar.radius}
            maxBarSize={chartConfig.bar.maxSize}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}