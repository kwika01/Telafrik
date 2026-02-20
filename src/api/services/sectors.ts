/**
 * Sectors Service
 *
 * TelAfrik: derive sectors from companies.sector (no sectors table)
 */
import { supabase } from '@/integrations/supabase/client';
import type { Sector } from '@/types/domain';

/**
 * Fetches sectors with startup counts (derived from companies.sector)
 */
export async function getSectors(): Promise<Sector[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('sector')
    .not('sector', 'is', null);

  if (error) throw new Error(`Failed to fetch sectors: ${error.message}`);

  const countMap = new Map<string, number>();
  for (const row of data || []) {
    const s = (row as { sector: string }).sector?.trim();
    if (s) countMap.set(s, (countMap.get(s) || 0) + 1);
  }

  const sectorIcons: Record<string, string> = {
    Fintech: '💳',
    Healthtech: '🏥',
    'E-Commerce': '🛒',
    Logistics: '📦',
    Agritech: '🌾',
    Cleantech: '♻️',
    Edtech: '📚',
    Insurtech: '🛡️',
  };

  return [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, startupCount]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: '',
      marketOverview: '',
      icon: sectorIcons[name] || '🏢',
      startupCount,
    }));
}

/**
 * Fetches a single sector by slug (TelAfrik: match sector name)
 */
export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  const sectors = await getSectors();
  return sectors.find((s) => s.slug === slug) || null;
}
