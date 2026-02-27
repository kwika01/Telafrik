/**
 * Companies Service - maps actual TelAfrik DB schema
 * Actual columns: company_id, company, slug, sector, sub_sector,
 * business_model, stage, founder, founding_year, Country, status,
 * website, linkedin, facebook, operating_countries, employee_count,
 * hiring_status, valuation_range, revenue_range, about
 */
import { supabase } from '@/integrations/supabase/client';
import type { CompanyListItem, DirectoryFilters, PaginatedResponse } from '@/types/domain';
import { getCountryMeta } from '@/utils/countryMeta';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Parses a valuation/funding range like "$500M - $700M" into a USD number (upper bound).
 */
function parseRangeToUsd(raw: string | null | undefined): number {
  if (!raw) return 0;
  const parts = raw.split('-').map((s) => s.trim());
  const upper = parts[parts.length - 1];
  const match = upper.match(/\$?([\d.]+)\s*([TBMKtbmk])?/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  if (isNaN(num)) return 0;
  const suffix = (match[2] || '').toUpperCase();
  if (suffix === 'T') return num * 1e12;
  if (suffix === 'B') return num * 1e9;
  if (suffix === 'M') return num * 1e6;
  if (suffix === 'K') return num * 1e3;
  return num;
}

const STAGE_SCORE: Record<string, number> = {
  'Series C+': 30,
  'Series C': 26,
  'Series B': 20,
  'Series A': 14,
  'Seed': 8,
  'Pre-seed': 4,
};

/** Compute a 1–99 momentum score from available fields */
function computeMomentumScore(valConfPct: string | null | undefined, stage: string | null | undefined): number {
  const conf = valConfPct ? parseFloat(valConfPct) : 50; // e.g. "70%" → 70
  const stageBonus = STAGE_SCORE[stage || ''] ?? 5;
  const score = Math.round(conf * 0.65 + stageBonus);
  return Math.min(99, Math.max(1, score));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): CompanyListItem {
  const slug = row.slug || slugify(row.company || `company-${row.company_id}`);
  return {
    id: String(row.company_id),
    name: row.company || 'Unnamed Company',
    slug,
    logoUrl: null,
    tagline: row.about ? String(row.about).substring(0, 140) : null,
    description: row.about || null,
    yearFounded: row.founding_year ? parseInt(String(row.founding_year)) || null : null,
    hqCountry: row.country
      ? (() => { const m = getCountryMeta(row.country); return { name: row.country, code: m.code, flagEmoji: m.flagEmoji }; })()
      : null,
    sector: row.sector
      ? { id: row.sector, name: row.sector, slug: slugify(row.sector) }
      : null,
    totalFundingUsd: parseRangeToUsd(row.valuation_range),
    isVerified: false,
    trendingScore: computeMomentumScore(row.valuation_conf_pct, row.stage),
    business_model: row.business_model || null,
    stage: row.stage || null,
    employee_count: null,
    website: row.website || null,
    linkedin: row.linkedin || null,
    facebook: row.facebook || null,
    twitter: null,
    operating_countries: row.operating_countries || null,
    hiring_status: row.hiring_status || null,
    revenue_range: row.revenue_range || null,
    valuation_range: row.valuation_range || null,
    valuation_confidence: row.valuation_conf_pct || null,
    founder: row.founder || null,
  };
}

interface GetCompaniesOptions {
  filters?: DirectoryFilters;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'trending_score' | 'total_funding_usd' | 'year_founded';
  sortOrder?: 'asc' | 'desc';
}

export async function getCompanies(options: GetCompaniesOptions = {}): Promise<PaginatedResponse<CompanyListItem>> {
  const { filters, page = 1, pageSize = 20, sortOrder = 'asc' } = options;
  const safeFilters = filters || { sectors: [], countries: [], regions: [], stages: [] };
  const offset = (page - 1) * pageSize;

  let query = db.from('companies').select('*', { count: 'exact' });

  // Text search
  if (safeFilters.search) {
    query = query.ilike('company', `%${safeFilters.search}%`);
  }

  // Sector filter — FilterPanel sends sector.name which matches companies.sector exactly
  if (safeFilters.sectors && safeFilters.sectors.length > 0) {
    query = query.in('sector', safeFilters.sectors);
  }

  // Country filter — FilterPanel sends country.name which matches companies.country exactly
  if (safeFilters.countries && safeFilters.countries.length > 0) {
    query = query.in('country', safeFilters.countries);
  }

  // Stage filter — FilterPanel sends exact DB stage strings (Pre-seed, Seed, Series A…C+)
  if (safeFilters.stages && safeFilters.stages.length > 0) {
    query = query.in('stage', safeFilters.stages);
  }

  // Map UI sort options to actual DB columns
  const { sortBy: options_sortBy } = options;
  if (options_sortBy === 'year_founded') {
    query = query.order('founding_year', { ascending: sortOrder === 'asc', nullsFirst: false });
  } else if (options_sortBy === 'name') {
    query = query.order('company', { ascending: sortOrder !== 'desc' });
  } else if (options_sortBy === 'total_funding_usd') {
    // Use valuation_conf_pct as best numeric proxy for funding size
    query = query.order('valuation_conf_pct', { ascending: false, nullsFirst: false });
  } else {
    // trending_score default: stage desc (Series C+ first), then valuation_conf_pct
    query = query.order('stage', { ascending: false, nullsFirst: false });
  }

  query = query.range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw new Error(`Failed to fetch companies: ${error.message}`);

  const items = (data || []).map(mapRow);
  const totalCount = count ?? 0;

  return {
    data: items,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export async function getCompanyBySlug(slug: string): Promise<CompanyListItem | null> {
  const { data, error } = await db
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch company: ${error.message}`);
  }
  return mapRow(data);
}

export async function getCompanyDetailsBySlug(slug: string) {
  const { data, error } = await db
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch company details: ${error.message}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return {
    id: String(row.company_id),
    name: row.company || 'Unnamed Company',
    slug: row.slug || slugify(row.company || 'company'),
    tagline: row.about ? String(row.about).substring(0, 140) : null,
    about: row.about || null,
    sector: row.sector ? { name: row.sector, slug: slugify(row.sector) } : null,
    sub_sector: row.sub_sector || null,
    business_model: row.business_model || null,
    stage: row.stage || null,
    year_founded: row.founding_year ? parseInt(String(row.founding_year)) || null : null,
    hq_country: row.country
      ? (() => { const m = getCountryMeta(row.country); return { id: row.country, name: row.country, code: m.code, flagEmoji: m.flagEmoji }; })()
      : null,
    website: row.website || null,
    linkedin: row.linkedin || null,
    twitter: null,
    founder: row.founder || null,
    operating_countries: row.operating_countries || null,
    employee_count: null,
    hiring_status: row.hiring_status || null,
    valuation_range: row.valuation_range || null,
    valuation_confidence: row.valuation_conf_pct || null,
    revenue_range: row.revenue_range || null,
    total_funding_usd: parseRangeToUsd(row.valuation_range),
    company_founders: [],
    funding_rounds: [],
    company_countries: [],
  };
}

export async function getSimilarCompanies(sectorName: string, excludeId: string, limit = 3) {
  const { data, error } = await db
    .from('companies')
    .select('*')
    .eq('sector', sectorName)
    .neq('company_id', excludeId)
    .limit(limit);

  if (error) throw new Error(`Failed to fetch similar companies: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((row: any) => mapRow(row));
}

export async function searchCompanies(searchTerm: string, limit = 10): Promise<CompanyListItem[]> {
  const { data, error } = await db
    .from('companies')
    .select('*')
    .ilike('company', `%${searchTerm}%`)
    .order('company', { ascending: true })
    .limit(limit);

  if (error) throw new Error(`Failed to search companies: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((row: any) => mapRow(row));
}

/** Stage priority for sorting - later stage = higher score */
const STAGE_PRIORITY: Record<string, number> = {
  'Series C+': 6,
  'Series C': 5,
  'Series B': 4,
  'Series A': 3,
  'Seed': 2,
  'Pre-seed': 1,
};

export interface CountryMapStat {
  count: number;
  sectors: { name: string; count: number }[];
  topCompanies: { name: string; slug: string; sector: string }[];
}

/**
 * Returns per-country stats used by the interactive Africa map.
 * Keyed by country NAME (e.g. "Nigeria") to match the DB column.
 */
export async function getCountryMapStats(): Promise<Record<string, CountryMapStat>> {
  const { data, error } = await db
    .from('companies')
    .select('country, sector, company, slug')
    .not('country', 'is', null);

  if (error) throw new Error(`Failed to fetch country stats: ${error.message}`);

  const raw: Record<string, { count: number; sectors: Record<string, number>; companies: { name: string; slug: string; sector: string }[] }> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of (data || []) as any[]) {
    const name = (row.country as string)?.trim();
    if (!name) continue;
    if (!raw[name]) raw[name] = { count: 0, sectors: {}, companies: [] };
    raw[name].count++;
    const s = (row.sector as string)?.trim();
    if (s) raw[name].sectors[s] = (raw[name].sectors[s] || 0) + 1;
    if (raw[name].companies.length < 5) {
      raw[name].companies.push({
        name: row.company as string,
        slug: (row.slug as string) || slugify(row.company as string),
        sector: s || '',
      });
    }
  }

  const result: Record<string, CountryMapStat> = {};
  for (const [name, d] of Object.entries(raw)) {
    result[name] = {
      count: d.count,
      sectors: Object.entries(d.sectors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([sectorName, cnt]) => ({ name: sectorName, count: cnt })),
      topCompanies: d.companies,
    };
  }
  return result;
}

export async function getTrendingCompanies(limit = 10): Promise<CompanyListItem[]> {
  // Fetch a pool and client-sort by stage priority (best proxy for "trending")
  const { data, error } = await db
    .from('companies')
    .select('*')
    .not('stage', 'is', null)
    .order('stage', { ascending: false })
    .limit(limit * 4);

  if (error) throw new Error(`Failed to fetch trending companies: ${error.message}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sorted = ((data || []) as any[])
    .sort((a, b) => {
      const pa = STAGE_PRIORITY[a.stage] ?? 0;
      const pb = STAGE_PRIORITY[b.stage] ?? 0;
      return pb - pa;
    })
    .slice(0, limit);

  return sorted.map(mapRow);
}
