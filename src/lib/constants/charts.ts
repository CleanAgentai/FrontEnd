export const CHART_COLORS = {
  primary: '#16A34A',
  text: '#6B7280',
  grid: '#E5E7EB',
} as const;

export const CHART_CONFIG = {
  axis: {
    tick: {
      fill: CHART_COLORS.text,
      fontSize: 12,
    },
    line: {
      stroke: CHART_COLORS.grid,
      strokeWidth: 1,
    },
  },
  grid: {
    strokeDasharray: '3 3',
    vertical: false,
  },
  tooltip: {
    style: {
      backgroundColor: '#FFF',
      border: `1px solid ${CHART_COLORS.grid}`,
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '8px',
    },
  },
  bar: {
    fill: CHART_COLORS.primary,
    radius: [4, 4, 0, 0],
    maxBarSize: 50,
  },
  line: {
    stroke: CHART_COLORS.primary,
    strokeWidth: 2,
    dot: {
      fill: CHART_COLORS.primary,
      r: 4,
    },
    activeDot: {
      r: 6,
    },
  },
} as const;