import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-primary-100/50">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}