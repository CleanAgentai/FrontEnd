import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Settings, LogOut } from 'lucide-react';

export default function DashboardNav() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-DEFAULT">TaskTalent.AI</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Button variant="ghost" className="inline-flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="inline-flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Candidates
              </Button>
              <Button variant="ghost" className="inline-flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="inline-flex items-center text-gray-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}