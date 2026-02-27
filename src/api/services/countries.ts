/**
 * Countries Service
 * No standalone countries table - countries are derived from companies.Country (string column).
 */
import { supabase } from '@/integrations/supabase/client';
import type { Country } from '@/types/domain';
import { COUNTRY_META, getCountryMeta } from '@/utils/countryMeta';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Fetches countries derived from companies.Country column, sorted by startup count.
 */
export async function getCountries(): Promise<Country[]> {
  const { data, error } = await db
    .from('companies')
    .select('country')
    .not('country', 'is', null)
    .limit(10000);

  if (error) throw new Error(`Failed to fetch countries: ${error.message}`);

  const countMap = new Map<string, number>();
  for (const row of (data || []) as { country?: string }[]) {
    const c = row.country?.trim();
    if (c) countMap.set(c, (countMap.get(c) || 0) + 1);
  }

  return [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => {
      const meta = getCountryMeta(name);
      return { id: slugify(name), name, code: meta.code, region: meta.region, flagEmoji: meta.flagEmoji };
    });
}

/**
 * Fetches countries with startup counts
 */
export async function getCountriesWithCounts(): Promise<(Country & { startupCount: number })[]> {
  const { data, error } = await db
    .from('companies')
    .select('country')
    .not('country', 'is', null)
    .limit(10000);

  if (error) throw new Error(`Failed to fetch countries: ${error.message}`);

  const countMap = new Map<string, number>();
  for (const row of (data || []) as { country?: string }[]) {
    const c = row.country?.trim();
    if (c) countMap.set(c, (countMap.get(c) || 0) + 1);
  }

  return [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, startupCount]) => {
      const meta = getCountryMeta(name);
      return { id: slugify(name), name, code: meta.code, region: meta.region, flagEmoji: meta.flagEmoji, startupCount };
    });
}

export interface CountryWithStats {
  name: string;
  flag: string;
  slug: string;
  region: string;
  companies: number;
  startups: number;
  totalFunding: string;
  topSectors: string[];
  recentDeals: number;
  growth: string;
}

export async function getCountriesWithStats(): Promise<CountryWithStats[]> {
  // Fetch country + sector in one query to build full stats
  const { data, error } = await db
    .from('companies')
    .select('country, sector')
    .not('country', 'is', null)
    .limit(10000);

  if (error) throw new Error(`Failed to fetch countries with stats: ${error.message}`);

  const byCountry = new Map<string, { count: number; sectors: Record<string, number> }>();
  for (const row of (data || []) as { country?: string; sector?: string }[]) {
    const name = row.country?.trim();
    if (!name) continue;
    if (!byCountry.has(name)) byCountry.set(name, { count: 0, sectors: {} });
    const entry = byCountry.get(name)!;
    entry.count++;
    const s = row.sector?.trim();
    if (s) entry.sectors[s] = (entry.sectors[s] || 0) + 1;
  }

  return [...byCountry.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, stats]) => {
      const meta = getCountryMeta(name);
      const topSectors = Object.entries(stats.sectors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([s]) => s);
      return {
        name,
        flag: meta.flagEmoji || '🌍',
        slug: slugify(name),
        region: meta.region || 'Africa',
        companies: stats.count,
        startups: stats.count,
        totalFunding: '—',
        topSectors: topSectors.length ? topSectors : ['—'],
        recentDeals: 0,
        growth: '—',
      };
    });
}

export interface CountryEcosystem {
  startupCount: number;
  topSectors: { name: string; count: number }[];
  trendingStartups: { id: string; name: string; sector: string }[];
}

export async function getCountryEcosystem(countryCode: string): Promise<CountryEcosystem> {
  // Find which country name maps to this code
  const targetName = Object.entries(COUNTRY_META).find(
    ([, meta]) => meta.code === countryCode.toUpperCase()
  )?.[0];

  if (!targetName) return { startupCount: 0, topSectors: [], trendingStartups: [] };

  const { data, error } = await db
    .from('companies')
    .select('company_id, company, slug, sector')
    .eq('country', targetName)
    .limit(100);

  if (error || !data) return { startupCount: 0, topSectors: [], trendingStartups: [] };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companies = data as any[];
  const startupCount = companies.length;

  const sectorCounts = new Map<string, number>();
  companies.forEach((c) => {
    const s = c.sector?.trim() || 'Other';
    sectorCounts.set(s, (sectorCounts.get(s) || 0) + 1);
  });

  const topSectors = [...sectorCounts.entries()]
    .filter(([n]) => n !== 'Other')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }));

  const trendingStartups = companies.slice(0, 5).map((c) => ({
    id: c.slug || String(c.company_id),
    name: c.company || 'Unknown',
    sector: c.sector || '—',
  }));

  return { startupCount, topSectors, trendingStartups };
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const countries = await getCountries();
  return countries.find((c) => c.code === code.toUpperCase()) || null;
}
