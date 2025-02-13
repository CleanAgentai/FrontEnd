import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const refresh = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setJobs(data || []);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load jobs');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  return { jobs, loading, error, refresh };
}