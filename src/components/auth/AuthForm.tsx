import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Sign up with company name in metadata
        const { data, error } = await signUp(email, password, {
          data: { company_name: companyName }
        });
        if (error) throw error;

        // After successful signup, automatically sign in
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
        
        navigate('/dashboard');
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate(from);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-white px-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'signup' && (
            <Input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-white border-gray-200"
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-gray-200"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border-gray-200"
            required
          />
          <Button
            type="submit"
            className="w-full bg-primary-600 text-white hover:bg-primary-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <Button variant="link" className="text-primary-600 p-0" onClick={() => navigate('/signup')}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button variant="link" className="text-primary-600 p-0" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </>
          )}
        </p>
      </Card>
    </div>
  );
}