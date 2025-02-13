import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import type { SourceData } from '@/lib/types/analytics';

const COLORS = ['#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'];

interface CandidateSourcesChartProps {
  data: SourceData[];
}

export default function CandidateSourcesChart({ data }: CandidateSourcesChartProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Candidate Sources</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: '1px solid #E5E7EB',
                borderRadius: '6px'
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}