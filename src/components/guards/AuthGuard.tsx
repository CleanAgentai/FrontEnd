import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session in AuthGuard:', session);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    console.log('No user found in AuthGuard, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}