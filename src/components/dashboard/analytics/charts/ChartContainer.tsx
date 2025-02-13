import { ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
}

export default function ChartContainer({ title, children }: ChartContainerProps) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </>
  );
}