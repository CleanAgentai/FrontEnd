import JobStatsGrid from './stats/JobStatsGrid';
import type { Job } from '@/lib/types';

export default function JobStats({ jobs }: { jobs: Job[] }) {
  return <JobStatsGrid jobs={jobs} />;
}