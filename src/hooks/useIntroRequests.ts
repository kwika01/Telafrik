import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';

export type IntroStatus = 'queued' | 'sent' | 'replied' | 'closed';

export interface IntroRequest {
  id: string;
  user_id: string;
  startup_id: string;
  investor_id: string;
  match_result_id: string | null;
  founder_message: string | null;
  contact_email: string | null;
  status: IntroStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  startup?: {
    name: string;
    slug: string;
    logo_url: string | null;
  };
  investor?: {
    name: string;
    slug: string;
    logo_url: string | null;
    type: string;
  };
}

export function useIntroRequests(isAdmin = false) {
  const [introRequests, setIntroRequests] = useState<IntroRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIntroRequests = useCallback(async (statusFilter?: IntroStatus) => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('intro_requests')
        .select(`
          *,
          startup:companies!intro_requests_startup_id_fkey(name, slug, logo_url),
          investor:investors!intro_requests_investor_id_fkey(name, slug, logo_url, type)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setIntroRequests((data as IntroRequest[]) || []);
    } catch (err) {
      console.error('Error fetching intro requests:', err);
      toast.error('Error', { description: 'Failed to load intro requests' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createIntroRequest = useCallback(async (
    startupId: string,
    investorId: string,
    founderMessage: string,
    contactEmail: string,
    matchResultId?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to request an intro');
      }

      const { data, error } = await supabase
        .from('intro_requests')
        .insert({
          user_id: user.id,
          startup_id: startupId,
          investor_id: investorId,
          founder_message: founderMessage,
          contact_email: contactEmail,
          match_result_id: matchResultId || null,
          status: 'queued',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Intro Request Submitted!', {
        description: 'Your request has been queued and our team will review it shortly.',
      });

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit intro request';
      toast.error('Error', { description: message });
      return null;
    }
  }, []);

  const updateIntroStatus = useCallback(async (
    introId: string,
    status: IntroStatus,
    adminNotes?: string
  ) => {
    try {
      const updateData: { status: IntroStatus; admin_notes?: string } = { status };
      if (adminNotes !== undefined) {
        updateData.admin_notes = adminNotes;
      }

      const { error } = await supabase
        .from('intro_requests')
        .update(updateData)
        .eq('id', introId);

      if (error) throw error;

      toast.success('Status Updated', {
        description: `Intro request status changed to ${status}`,
      });

      await fetchIntroRequests();
      return true;
    } catch (err) {
      toast.error('Error', { description: 'Failed to update status' });
      return false;
    }
  }, [fetchIntroRequests]);

  useEffect(() => {
    fetchIntroRequests();
  }, [fetchIntroRequests]);

  return {
    introRequests,
    isLoading,
    fetchIntroRequests,
    createIntroRequest,
    updateIntroStatus,
  };
}
