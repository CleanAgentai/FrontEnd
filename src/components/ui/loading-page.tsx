import { LoadingSpinner } from './loading-spinner';

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
      <LoadingSpinner size="lg" />
    </div>
  );
}