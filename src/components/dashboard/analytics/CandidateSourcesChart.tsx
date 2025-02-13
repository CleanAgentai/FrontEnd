import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

interface SourceData {
  name: string;
  value: number;
}

const COLORS = ['#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'];

export default function CandidateSourcesChart() {
  const [data, setData] = useState<SourceData[]>([]);

  useEffect(() => {
    // In a real app, fetch this data from your API
    // For now, using sample data
    setData([
      { name: 'Job Boards', value: 45 },
      { name: 'Referrals', value: 25 },
      { name: 'Company Website', value: 15 },
      { name: 'Social Media', value: 10 },
      { name: 'Other', value: 5 },
    ]);
  }, []);

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
              {data.map((entry, index) => (
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