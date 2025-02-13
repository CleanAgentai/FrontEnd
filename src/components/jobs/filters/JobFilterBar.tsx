import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface JobFilterBarProps {
  onFilter: (filters: JobFilters) => void;
}

interface JobFilters {
  search?: string;
  status?: string;
  type?: string;
}

export default function JobFilterBar({ onFilter }: JobFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            onChange={(e) => onFilter({ search: e.target.value })}
          />
        </div>
      </div>
      
      <Select onValueChange={(value) => onFilter({ status: value })}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilter({ type: value })}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full-time">Full-time</SelectItem>
          <SelectItem value="part-time">Part-time</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}