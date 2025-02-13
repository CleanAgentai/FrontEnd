import JobFilterBar from './filters/JobFilterBar';

export default function JobFilters({ onFilter }: { onFilter: (filters: any) => void }) {
  return <JobFilterBar onFilter={onFilter} />;
}