/**
 * Sectors Service
 * 
 * Supabase queries for sector data.
 */
import { supabase } from '@/integrations/supabase/client';
import type { Sector } from '@/types/domain';

/**
 * Fetches all sectors with company counts
 */
export async function getSectors(): Promise<Sector[]> {
  const { data, error } = await supabase
    .from('sectors')
    .select(`
      id,
      name,
      slug,
      description,
      market_overview,
      icon
    `)
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch sectors: ${error.message}`);
  }

  // Get company counts per sector
  const { data: counts, error: countError } = await supabase
    .from('companies')
    .select('sector_id')
    .not('sector_id', 'is', null);

  if (countError) {
    console.warn('Could not fetch company counts:', countError.message);
  }

  // Count companies per sector
  const countMap = new Map<string, number>();
  counts?.forEach((row: any) => {
    const sectorId = row.sector_id;
    countMap.set(sectorId, (countMap.get(sectorId) || 0) + 1);
  });

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    marketOverview: row.market_overview || '',
    icon: row.icon || '🏢',
    startupCount: countMap.get(row.id) || 0,
  }));
}

/**
 * Fetches a single sector by slug
 */
export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  const { data, error } = await supabase
    .from('sectors')
    .select(`
      id,
      name,
      slug,
      description,
      market_overview,
      icon
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch sector: ${error.message}`);
  }

  // Get company count for this sector
  const { count } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true })
    .eq('sector_id', data.id);

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || '',
    marketOverview: data.market_overview || '',
    icon: data.icon || '🏢',
    startupCount: count || 0,
  };
}
