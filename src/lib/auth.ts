import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export function useAuth() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
    return { error };
  };

  return { handleSignOut };
}