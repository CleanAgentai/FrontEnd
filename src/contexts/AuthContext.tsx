import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient, setAuthToken, removeAuthToken } from '@/lib/api/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const { data } = await apiClient.get('/auth/me');
        setUser(data.user);
      }
    } catch (error) {
      removeAuthToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    const { data } = await apiClient.post('/auth/login', {
      email,
      password,
    });
    
    setAuthToken(data.token);
    setUser(data.user);
  }

  async function signUp(email: string, password: string, fullName: string) {
    const { data } = await apiClient.post('/auth/register', {
      email,
      password,
      full_name: fullName,
    });
    
    setAuthToken(data.token);
    setUser(data.user);
  }

  async function signOut() {
    await apiClient.post('/auth/logout');
    removeAuthToken();
    setUser(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}