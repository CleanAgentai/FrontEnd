```typescript
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { RefreshCw } from 'lucide-react';

interface AnalyticsHeaderProps {
  onRefresh: () => void;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export default function AnalyticsHeader({ onRefresh, onDateRangeChange }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-1">Track your hiring performance and metrics</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <DateRangePicker onChange={onDateRangeChange} />
        <Button 
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
```