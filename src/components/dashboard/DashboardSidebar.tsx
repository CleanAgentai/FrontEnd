import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import {
  LayoutDashboard,
  BriefcaseIcon,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: BriefcaseIcon, label: 'Jobs', path: '/dashboard/jobs' },
  { icon: Users, label: 'Candidates', path: '/dashboard/candidates' },
  { icon: BarChart, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSignOut } = useAuth();
  
  return (
    <div className={`min-h-screen bg-white shadow-lg transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-primary-100">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <span className="text-xl font-bold text-primary-600">
                TaskTalent.AI
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-primary-400 hover:text-primary-600 hover:bg-primary-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full justify-start rounded-xl ${
                  collapsed ? 'px-2' : 'px-4'
                } ${
                  isActive 
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className={`h-5 w-5 ${
                  collapsed ? 'mr-0' : 'mr-3'
                }`} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-100">
          <Button
            variant="ghost"
            className={`w-full justify-start text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl ${
              collapsed ? 'px-2' : 'px-4'
            }`}
            onClick={handleSignOut}
          >
            <LogOut className={`h-5 w-5 ${
              collapsed ? 'mr-0' : 'mr-3'
            }`} />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}