/**
 * Sectors Service
 * No standalone sectors table - sectors are derived from companies.sector (string column).
 */
import { supabase } from '@/integrations/supabase/client';
import type { Sector } from '@/types/domain';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const SECTOR_ICONS: Record<string, string> = {
  'Fintech': '💳',
  'Healthtech': '🏥',
  'Edtech': '🎓',
  'Agritech': '🌾',
  'Cleantech': '⚡',
  'Logistics': '🚚',
  'E-Commerce': '🛒',
  'E-commerce': '🛒',
  'Ecommerce': '🛒',
  'SaaS': '☁️',
  'Proptech': '🏗️',
  'Insurtech': '🛡️',
  'InsurTech': '🛡️',
  'Mobility': '🚗',
  'Media': '📱',
  'Foodtech': '🍽️',
  'Legaltech': '⚖️',
  'HR Tech': '👥',
  'HRTech': '👥',
  'Cybersecurity': '🔒',
  'AI/ML': '🤖',
  'Blockchain': '⛓️',
  'Gaming': '🎮',
  'Travel': '✈️',
  'Retail': '🏪',
};

function getSectorIcon(name: string): string {
  return SECTOR_ICONS[name] || '🏢';
}

/**
 * Fetches sectors with startup counts — derived from companies.sector column
 */
export async function getSectors(): Promise<Sector[]> {
  const { data, error } = await db
    .from('companies')
    .select('sector')
    .not('sector', 'is', null)
    .limit(10000);

  if (error) throw new Error(`Failed to fetch sectors: ${error.message}`);

  const countMap = new Map<string, number>();
  for (const row of (data || []) as { sector?: string }[]) {
    const s = row.sector?.trim();
    if (s) countMap.set(s, (countMap.get(s) || 0) + 1);
  }

  return [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      id: slugify(name),
      name,
      slug: slugify(name),
      description: `${name} startups across Africa.`,
      marketOverview: '',
      icon: getSectorIcon(name),
      startupCount: count,
    }));
}

/**
 * Fetches a single sector by slug
 */
export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  const sectors = await getSectors();
  return sectors.find((s) => s.slug === slug) || null;
}
