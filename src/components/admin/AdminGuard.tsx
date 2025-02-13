import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { isAdmin } from '@/lib/api/admin';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const adminAccess = await isAdmin();
      setHasAccess(adminAccess);
    } catch (error) {
      console.error('Failed to check admin access:', error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}