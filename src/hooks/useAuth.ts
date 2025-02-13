import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session);
      setUser(session?.user ?? null);
    } catch (err) {
      console.error('Auth check error:', err);
      setError(err instanceof Error ? err : new Error('Auth error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err instanceof Error ? err : new Error('Sign out failed'));
    }
  };

  return { user, loading, error, handleSignOut };
}