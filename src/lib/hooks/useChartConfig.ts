import { useMemo } from 'react';

export function useChartConfig() {
  return useMemo(() => ({
    axis: {
      props: {
        tick: { fill: '#6B7280' },
        axisLine: { stroke: '#E5E7EB' },
        tickLine: { stroke: '#E5E7EB' },
      },
      style: {
        fontSize: '12px',
      },
    },
    tooltip: {
      contentStyle: {
        backgroundColor: '#FFF',
        border: '1px solid #E5E7EB',
        borderRadius: '6px',
        padding: '8px',
      },
    },
    colors: {
      primary: '#16A34A',
      secondary: '#22C55E',
    },
  }), []);
}