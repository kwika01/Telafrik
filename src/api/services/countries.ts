/**
 * Countries Service
 *
 * TelAfrik: derive countries from investors.hq_country (no countries table)
 */
import { supabase } from '@/integrations/supabase/client';
import type { Country } from '@/types/domain';

const COUNTRY_CODE_MAP: Record<string, string> = {
  Nigeria: 'NG',
  Kenya: 'KE',
  'South Africa': 'ZA',
  Egypt: 'EG',
  Ghana: 'GH',
  Rwanda: 'RW',
  Tanzania: 'TZ',
  Ethiopia: 'ET',
  Senegal: 'SN',
  "Côte d'Ivoire": 'CI',
  Morocco: 'MA',
  Tunisia: 'TN',
  Uganda: 'UG',
  Cameroon: 'CM',
  Algeria: 'DZ',
  Zimbabwe: 'ZW',
  Botswana: 'BW',
  Zambia: 'ZM',
  Angola: 'AO',
  Mozambique: 'MZ',
  Benin: 'BJ',
  'Burkina Faso': 'BF',
  Congo: 'CG',
  'Democratic Republic of the Congo (DRC)': 'CD',
  Mali: 'ML',
  Togo: 'TG',
  Malawi: 'MW',
  Namibia: 'NA',
  Liberia: 'LR',
  Niger: 'NE',
  Chad: 'TD',
  Sudan: 'SD',
  Somalia: 'SO',
  Madagascar: 'MG',
  UK: 'GB',
  France: 'FR',
  Sweden: 'SE',
  USA: 'US',
};

const FLAG_EMOJI_MAP: Record<string, string> = {
  Nigeria: '🇳🇬', Kenya: '🇰🇪', 'South Africa': '🇿🇦', Egypt: '🇪🇬',
  Ghana: '🇬🇭', Rwanda: '🇷🇼', Tanzania: '🇹🇿', Ethiopia: '🇪🇹',
  Senegal: '🇸🇳', "Côte d'Ivoire": '🇨🇮', Morocco: '🇲🇦', Tunisia: '🇹🇳',
  Uganda: '🇺🇬', Cameroon: '🇨🇲', Algeria: '🇩🇿', Zimbabwe: '🇿🇼',
  Botswana: '🇧🇼', Zambia: '🇿🇲', Angola: '🇦🇴', Mozambique: '🇲🇿',
  Benin: '🇧🇯', 'Burkina Faso': '🇧🇫', Congo: '🇨🇬', Mali: '🇲🇱',
  Togo: '🇹🇬', Malawi: '🇲🇼', Namibia: '🇳🇦', Liberia: '🇱🇷',
  Niger: '🇳🇪', Chad: '🇹🇩', Sudan: '🇸🇩', Madagascar: '🇲🇬',
  'Democratic Republic of the Congo (DRC)': '🇨🇩',
};

/**
 * Fetches countries (derived from companies.Country)
 */
export async function getCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('Country')
    .not('Country', 'is', null);

  if (error) throw new Error(`Failed to fetch countries: ${error.message}`);

  const seen = new Set<string>();
  const countries: Country[] = [];
  for (const row of data || []) {
    const name = (row as { Country: string }).Country?.trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    countries.push({
      id: name,
      name,
      code: COUNTRY_CODE_MAP[name] || name.slice(0, 2).toUpperCase(),
      region: '',
      flagEmoji: FLAG_EMOJI_MAP[name] || '',
    });
  }
  return countries.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Fetches countries with STARTUP counts from companies.Country
 */
export async function getCountriesWithCounts(): Promise<(Country & { startupCount: number })[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('Country')
    .not('Country', 'is', null);

  if (error) throw new Error(`Failed to fetch countries: ${error.message}`);

  const countMap = new Map<string, number>();
  for (const row of data || []) {
    const name = (row as { Country: string }).Country?.trim();
    if (name) countMap.set(name, (countMap.get(name) || 0) + 1);
  }

  return [...countMap.entries()]
    .sort((a, b) => b[1] - a[1]) // sort by count descending
    .map(([name, startupCount]) => ({
      id: name,
      name,
      code: COUNTRY_CODE_MAP[name] || name.slice(0, 2).toUpperCase(),
      region: '',
      flagEmoji: FLAG_EMOJI_MAP[name] || '',
      startupCount,
    }));
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

function formatFunding(amountUsd: number): string {
  if (amountUsd >= 1e9) return `$${(amountUsd / 1e9).toFixed(1)}B`;
  if (amountUsd >= 1e6) return `$${(amountUsd / 1e6).toFixed(0)}M`;
  if (amountUsd >= 1e3) return `$${(amountUsd / 1e3).toFixed(0)}K`;
  return `$${amountUsd.toLocaleString()}`;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Fetches countries with stats (TelAfrik: from investors)
 */
export async function getCountriesWithStats(): Promise<CountryWithStats[]> {
  const withCounts = await getCountriesWithCounts();
  return withCounts.map((c) => ({
    name: c.name,
    flag: c.flagEmoji || '',
    slug: slugify(c.name),
    region: 'Africa',
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

/**
 * Fetches ecosystem data for a single country (TelAfrik schema)
 * Uses companies.Country (text) and companies.sector
 */
export async function getCountryEcosystem(countryCode: string): Promise<CountryEcosystem> {
  // Reverse-lookup country name from code
  const countryName = Object.entries(COUNTRY_CODE_MAP).find(
    ([, code]) => code === countryCode.toUpperCase()
  )?.[0];

  if (!countryName) {
    return { startupCount: 0, topSectors: [], trendingStartups: [] };
  }

  const { data: companies, error } = await supabase
    .from('companies')
    .select('company_id, company, slug, sector, Country')
    .eq('Country', countryName)
    .limit(100);

  if (error || !companies) {
    return { startupCount: 0, topSectors: [], trendingStartups: [] };
  }

  const startupCount = companies.length;

  const sectorCounts = new Map<string, number>();
  companies.forEach((c: any) => {
    const s = c.sector ?? 'Other';
    sectorCounts.set(s, (sectorCounts.get(s) || 0) + 1);
  });

  const topSectors = [...sectorCounts.entries()]
    .filter(([n]) => n !== 'Other')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }));

  const trendingStartups = companies
    .slice(0, 5)
    .map((c: any) => ({
      id: c.slug ?? String(c.company_id),
      name: c.company ?? 'Unknown',
      sector: c.sector ?? '—',
    }));

  return { startupCount, topSectors, trendingStartups };
}

/**
 * Fetches a single country by code (TelAfrik: from derived countries)
 */
export async function getCountryByCode(code: string): Promise<Country | null> {
  const countries = await getCountries();
  return countries.find((c) => c.code === code.toUpperCase()) || null;
}
