interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div 
      className={`animate-spin rounded-full border-2 border-primary-200 border-b-primary-600 ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    />
  );
}