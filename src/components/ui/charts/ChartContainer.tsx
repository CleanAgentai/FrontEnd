import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  loading?: boolean;
  children: ReactNode;
}

export default function ChartContainer({ title, loading = false, children }: ChartContainerProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          children
        )}
      </div>
    </Card>
  );
}