import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Shortlist {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  items?: ShortlistItem[];
}

export interface ShortlistItem {
  id: string;
  shortlist_id: string;
  investor_id: string;
  created_at: string;
  investor?: {
    name: string;
    slug: string;
    logo_url: string | null;
    type: string;
  };
}

export function useShortlist() {
  const [shortlists, setShortlists] = useState<Shortlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchShortlists = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_shortlists')
        .select(`
          *,
          items:saved_shortlist_items(
            *,
            investor:investors(name, slug, logo_url, type)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShortlists((data as Shortlist[]) || []);
    } catch (err) {
      console.error('Error fetching shortlists:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createShortlist = useCallback(async (name: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in');

      const { data, error } = await supabase
        .from('saved_shortlists')
        .insert({ user_id: user.id, name })
        .select()
        .single();

      if (error) throw error;
      await fetchShortlists();
      return data;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create shortlist',
        variant: 'destructive',
      });
      return null;
    }
  }, [fetchShortlists, toast]);

  const addToShortlist = useCallback(async (shortlistId: string, investorId: string) => {
    try {
      const { error } = await supabase
        .from('saved_shortlist_items')
        .insert({ shortlist_id: shortlistId, investor_id: investorId });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Added',
            description: 'This investor is already in your shortlist',
          });
          return true;
        }
        throw error;
      }

      toast({
        title: 'Added to Shortlist',
        description: 'Investor saved to your shortlist',
      });
      await fetchShortlists();
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add to shortlist',
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchShortlists, toast]);

  const removeFromShortlist = useCallback(async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('saved_shortlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await fetchShortlists();
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to remove from shortlist',
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchShortlists, toast]);

  const getOrCreateDefaultShortlist = useCallback(async () => {
    await fetchShortlists();
    if (shortlists.length > 0) {
      return shortlists[0];
    }
    return await createShortlist('My Investor Shortlist');
  }, [fetchShortlists, shortlists, createShortlist]);

  useEffect(() => {
    fetchShortlists();
  }, [fetchShortlists]);

  return {
    shortlists,
    isLoading,
    fetchShortlists,
    createShortlist,
    addToShortlist,
    removeFromShortlist,
    getOrCreateDefaultShortlist,
  };
}
