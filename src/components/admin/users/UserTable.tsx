import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Lock, Unlock } from 'lucide-react';
import type { AdminUser } from '@/lib/types/admin';

interface UserTableProps {
  users: AdminUser[];
  loading: boolean;
  onEdit: (user: AdminUser) => void;
  onToggleStatus: (userId: string, active: boolean) => void;
}

export default function UserTable({ users, loading, onEdit, onToggleStatus }: UserTableProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-4 font-medium">User</th>
              <th className="pb-4 font-medium">Role</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Joined</th>
              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-4">
                  <div>
                    <p className="font-medium">{user.company_name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="py-4">
                  <Badge variant="outline">{user.role}</Badge>
                </td>
                <td className="py-4">
                  <Badge variant={user.active ? 'success' : 'destructive'}>
                    {user.active ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="py-4 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(user)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(user.id, !user.active)}
                    >
                      {user.active ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}