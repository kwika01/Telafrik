/**
 * Sectors Service - uses actual DB schema (sectors table)
 */
import { supabase } from '@/integrations/supabase/client';
import type { Sector } from '@/types/domain';

/**
 * Fetches sectors with startup counts
 */
export async function getSectors(): Promise<Sector[]> {
  const { data: sectors, error } = await supabase
    .from('sectors')
    .select('id, name, slug, description, market_overview, icon')
    .order('name', { ascending: true });

  if (error) throw new Error(`Failed to fetch sectors: ${error.message}`);

  // Get company counts per sector
  const { data: companies } = await supabase
    .from('companies')
    .select('sector_id')
    .not('sector_id', 'is', null);

  const countMap = new Map<string, number>();
  for (const c of companies || []) {
    const sid = (c as any).sector_id;
    if (sid) countMap.set(sid, (countMap.get(sid) || 0) + 1);
  }

  return (sectors || []).map((row) => ({
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
    .select('id, name, slug, description, market_overview, icon')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || '',
    marketOverview: data.market_overview || '',
    icon: data.icon || '🏢',
  };
}
