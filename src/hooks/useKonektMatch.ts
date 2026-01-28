import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';

export interface MatchProfileInput {
  startup_id: string;
  raise_stage: string;
  raise_amount_min: number | null;
  raise_amount_max: number | null;
  target_geos: string[];
  sector: string;
  sub_sector?: string;
  traction_notes?: string;
  investor_preferences?: string;
}

export interface MatchResult {
  investor_id: string;
  investor: {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string | null;
    logo_url: string | null;
    website_url: string | null;
    total_investments: number | null;
    portfolio_count: number | null;
    hq_country: { name: string; code: string } | null;
    sectors: { sector: { name: string; slug: string } }[];
    regions: { region: string }[];
  };
  fit_score: number;
  fit_tags: string[];
  why_bullets: string[];
}

export interface MatchResponse {
  success: boolean;
  match_profile_id: string;
  total_investors_scored: number;
  matches: MatchResult[];
}

export function useKonektMatch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [matchProfileId, setMatchProfileId] = useState<string | null>(null);

  const createMatchProfile = useCallback(async (input: MatchProfileInput): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to create a match profile');
      }

      const { data, error: insertError } = await supabase
        .from('match_profiles')
        .insert({
          user_id: user.id,
          startup_id: input.startup_id,
          raise_stage: input.raise_stage,
          raise_amount_min: input.raise_amount_min,
          raise_amount_max: input.raise_amount_max,
          target_geos: input.target_geos,
          sector: input.sector,
          sub_sector: input.sub_sector || null,
          traction_notes: input.traction_notes || null,
          investor_preferences: input.investor_preferences || null,
        })
        .select('id')
        .single();

      if (insertError) throw insertError;
      return data.id;
    } catch (err) {
      console.error('Error creating match profile:', err);
      throw err;
    }
  }, []);

  const generateMatches = useCallback(async (profileInput: MatchProfileInput) => {
    setIsLoading(true);
    setError(null);
    setMatchResults([]);

    try {
      // Create match profile first
      const profileId = await createMatchProfile(profileInput);
      if (!profileId) {
        throw new Error('Failed to create match profile');
      }
      setMatchProfileId(profileId);

      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please sign in to generate matches');
      }

      // Call matching endpoint
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/konekt-match`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ match_profile_id: profileId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate matches');
      }

      const data: MatchResponse = await response.json();
      setMatchResults(data.matches);

      toast.success('Matches Generated!', {
        description: `Found ${data.matches.length} investor matches for your startup.`,
      });

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate matches';
      setError(message);
      toast.error('Error', { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [createMatchProfile]);

  const loadExistingResults = useCallback(async (profileId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('match_results')
        .select(`
          *,
          investor:investors(
            *,
            hq_country:countries(name, code),
            sectors:investor_sectors(sector:sectors(name, slug)),
            regions:investor_regions(region)
          )
        `)
        .eq('match_profile_id', profileId)
        .order('fit_score', { ascending: false });

      if (fetchError) throw fetchError;

      const results: MatchResult[] = (data || []).map(r => ({
        investor_id: r.investor_id,
        investor: r.investor,
        fit_score: r.fit_score,
        fit_tags: r.fit_tags || [],
        why_bullets: (r.why_bullets as string[]) || [],
      }));

      setMatchResults(results);
      setMatchProfileId(profileId);
      return results;
    } catch (err) {
      console.error('Error loading results:', err);
      return [];
    }
  }, []);

  return {
    isLoading,
    error,
    matchResults,
    matchProfileId,
    generateMatches,
    loadExistingResults,
  };
}
