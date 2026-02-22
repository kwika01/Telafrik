/**
 * Countries Service - uses actual DB schema (countries table)
 */
import { supabase } from '@/integrations/supabase/client';
import type { Country } from '@/types/domain';
import type { AfricanRegion } from '@/types/domain';

/**
 * Fetches countries from the countries table
 */
export async function getCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from('countries')
    .select('id, name, code, region, flag_emoji')
    .order('name', { ascending: true });

  if (error) throw new Error(`Failed to fetch countries: ${error.message}`);

  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    code: row.code,
    region: row.region as AfricanRegion,
    flagEmoji: row.flag_emoji || '',
  }));
}

/**
 * Fetches countries with startup counts
 */
export async function getCountriesWithCounts(): Promise<(Country & { startupCount: number })[]> {
  const { data: countries, error: cErr } = await supabase
    .from('countries')
    .select('id, name, code, region, flag_emoji');

  if (cErr) throw new Error(`Failed to fetch countries: ${cErr.message}`);

  const { data: companies, error: coErr } = await supabase
    .from('companies')
    .select('hq_country_id')
    .not('hq_country_id', 'is', null);

  if (coErr) throw new Error(`Failed to fetch companies: ${coErr.message}`);

  const countMap = new Map<string, number>();
  for (const c of companies || []) {
    const cid = (c as any).hq_country_id;
    if (cid) countMap.set(cid, (countMap.get(cid) || 0) + 1);
  }

  return (countries || [])
    .map((row) => ({
      id: row.id,
      name: row.name,
      code: row.code,
      region: row.region as AfricanRegion,
      flagEmoji: row.flag_emoji || '',
      startupCount: countMap.get(row.id) || 0,
    }))
    .sort((a, b) => b.startupCount - a.startupCount);
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

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export async function getCountriesWithStats(): Promise<CountryWithStats[]> {
  const withCounts = await getCountriesWithCounts();
  return withCounts.map((c) => ({
    name: c.name,
    flag: c.flagEmoji || '',
    slug: slugify(c.name),
    region: c.region || 'Africa',
    companies: c.startupCount,
    startups: c.startupCount,
    totalFunding: '—',
    topSectors: ['—'],
    recentDeals: 0,
    growth: '—',
  }));
}

export interface CountryEcosystem {
  startupCount: number;
  topSectors: { name: string; count: number }[];
  trendingStartups: { id: string; name: string; sector: string }[];
}

export async function getCountryEcosystem(countryCode: string): Promise<CountryEcosystem> {
  // Find country by code
  const { data: country } = await supabase
    .from('countries')
    .select('id, name')
    .eq('code', countryCode.toUpperCase())
    .single();

  if (!country) return { startupCount: 0, topSectors: [], trendingStartups: [] };

  const { data: companies, error } = await supabase
    .from('companies')
    .select('id, name, slug, sector_id, sectors:sector_id(name)')
    .eq('hq_country_id', country.id)
    .limit(100);

  if (error || !companies) return { startupCount: 0, topSectors: [], trendingStartups: [] };

  const startupCount = companies.length;

  const sectorCounts = new Map<string, number>();
  companies.forEach((c: any) => {
    const s = c.sectors?.name ?? 'Other';
    sectorCounts.set(s, (sectorCounts.get(s) || 0) + 1);
  });

  const topSectors = [...sectorCounts.entries()]
    .filter(([n]) => n !== 'Other')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }));

  const trendingStartups = companies.slice(0, 5).map((c: any) => ({
    id: c.slug ?? c.id,
    name: c.name ?? 'Unknown',
    sector: c.sectors?.name ?? '—',
  }));

  return { startupCount, topSectors, trendingStartups };
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const { data, error } = await supabase
    .from('countries')
    .select('id, name, code, region, flag_emoji')
    .eq('code', code.toUpperCase())
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    region: data.region as AfricanRegion,
    flagEmoji: data.flag_emoji || '',
  };
}
