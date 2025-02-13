import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  BriefcaseIcon,
  BarChart,
  Settings,
  LifeBuoy,
  LogOut,
  Menu,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BriefcaseIcon, label: 'Jobs', path: '/admin/jobs' },
  { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: LifeBuoy, label: 'Support', path: '/admin/support' },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`min-h-screen bg-white shadow-lg transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <span className="text-xl font-bold text-primary-600">
                Admin Panel
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
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
                className={`w-full justify-start rounded-lg ${
                  collapsed ? 'px-2' : 'px-4'
                } ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
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

        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            className={`w-full justify-start text-gray-600 hover:bg-gray-50 rounded-lg ${
              collapsed ? 'px-2' : 'px-4'
            }`}
            onClick={() => navigate('/logout')}
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