import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          setIsLoading(false);
          navigate('/auth', { replace: true });
          return;
        }

        // Check if user has admin role using the has_role function
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
          navigate('/', { replace: true });
        } else {
          setIsAdmin(data === true);
          if (data !== true) {
            navigate('/', { replace: true });
          }
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
        setIsAdmin(false);
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        navigate('/auth', { replace: true });
      } else if (event === 'SIGNED_IN') {
        checkAdminRole();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { isAdmin, isLoading };
}
