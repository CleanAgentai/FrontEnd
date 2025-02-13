import { Tooltip, TooltipProps } from 'recharts';
import { CHART_STYLES } from '@/lib/constants/charts';

interface CustomTooltipProps extends TooltipProps<any, any> {
  formatter?: (value: any, name: string) => [string, string];
}

export default function ChartTooltip({ formatter, ...props }: CustomTooltipProps) {
  return (
    <Tooltip 
      contentStyle={CHART_STYLES.tooltip.style}
      formatter={formatter}
      {...props}
    />
  );
}