import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ReactNode } from 'react';

interface BaseChartCardProps {
  title: string;
  loading?: boolean;
  error?: Error | null;
  children: ReactNode;
}

export default function BaseChartCard({ 
  title, 
  loading = false, 
  error = null, 
  children 
}: BaseChartCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500">
            {error.message}
          </div>
        ) : (
          children
        )}
      </div>
    </Card>
  );
}