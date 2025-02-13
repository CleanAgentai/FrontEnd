import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface WelcomeHeaderProps {
  action?: React.ReactNode;
}

export default function WelcomeHeader({ action }: WelcomeHeaderProps) {
  const [companyName, setCompanyName] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // First try to get company name from user metadata
        const metadataCompanyName = user.user_metadata?.company_name;
        if (metadataCompanyName) {
          setCompanyName(metadataCompanyName);
          return;
        }

        // Fallback to profiles table if not in metadata
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_name')
          .eq('id', user.id)
          .single();
        
        if (profile?.company_name) {
          setCompanyName(profile.company_name);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {companyName ? `Welcome, ${companyName}` : 'Welcome'}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your hiring activities
        </p>
      </div>
      {action}
    </div>
  );
}