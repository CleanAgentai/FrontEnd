```tsx
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminGuard from './AdminGuard';

export default function AdminLayout() {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
```