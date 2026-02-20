/**
 * Dashboard Service
 * Aggregated stats and data for the Dashboard.
 */
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  totalCompanies: number;
  startupsAdded30d: number;
  totalFundingUsd: number;
  activeSectors: number;
  countriesCovered: number;
  totalInvestors: number;
}

export interface MarketHeatmapItem {
  country: string;
  activity: 'very-high' | 'high' | 'medium' | 'low';
  companies: number;
  funding: string;
  growth: string;
}

export interface SectorSpotlightData {
  name: string;
  slug: string;
  companies: number;
  totalFunding: string;
  growth: string;
  description: string;
  topCompanies: string[];
}

/**
 * Parses a valuation/funding range string into a USD number (upper bound)
 * Handles: "$2.5B - $3.5B", "$500M - $700B", "$4M - $7M", etc.
 */
function parseRangeToUsd(raw: string | null | undefined): number {
  if (!raw) return 0;
  // Take upper bound of range
  const parts = raw.split('-').map(s => s.trim());
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

function formatFunding(amountUsd: number): string {
  if (amountUsd >= 1_000_000_000) return `$${(amountUsd / 1_000_000_000).toFixed(1)}B`;
  if (amountUsd >= 1_000_000) return `$${(amountUsd / 1_000_000).toFixed(0)}M`;
  if (amountUsd >= 1_000) return `$${(amountUsd / 1_000).toFixed(1)}K`;
  return `$${amountUsd}`;
}

/**
 * Parses a fund_amount string like "$1.2B", "$500M", "$4M" into a number.
 */
function parseFundAmount(val: string | null | undefined): number {
  if (!val) return 0;
  const s = String(val).trim();
  const match = s.match(/[\d.]+/);
  if (!match) return 0;
  const num = parseFloat(match[0]);
  if (isNaN(num)) return 0;
  if (/T/i.test(s)) return num * 1e12;
  if (/B/i.test(s)) return num * 1e9;
  if (/M/i.test(s)) return num * 1e6;
  if (/K/i.test(s)) return num * 1e3;
  return num;
}

/**
 * Fetches dashboard KPI stats (TelAfrik schema)
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // Use `any` to bypass generated types for custom TelAfrik tables/columns
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  // Run all queries in parallel
  const [companiesRes, investorsRes, sectorRes, countryRes, fundingRes] = await Promise.all([
    supabase.from('companies').select('company_id', { count: 'exact', head: true }),
    supabase.from('investors').select('fund_id', { count: 'exact', head: true }),
    db.from('companies').select('sector').not('sector', 'is', null).limit(10000),
    db.from('companies').select('Country').not('Country', 'is', null).limit(10000),
    // Pull fund_amount from TelAfrik Investors Companies — this is where actual deal data lives
    db.from('TelAfrik Investors Companies').select('fund_amount').limit(10000),
  ]);

  const totalCompanies = companiesRes.count ?? 0;
  const totalInvestors = investorsRes.count ?? 0;

  // Active sectors
  const sectorSet = new Set<string>(
    ((sectorRes.data as { sector?: string }[]) || [])
      .map((r) => r.sector?.trim())
      .filter((s): s is string => !!s)
  );
  const activeSectors = sectorSet.size;

  // Countries covered - from companies.Country
  const countrySet = new Set<string>(
    ((countryRes.data as { Country?: string }[]) || [])
      .map((r) => r.Country?.trim())
      .filter((s): s is string => !!s)
  );
  const countriesCovered = countrySet.size;

  // Total funding: sum fund_amount from TelAfrik Investors Companies
  let totalFundingUsd = 0;
  if (!fundingRes.error && fundingRes.data) {
    totalFundingUsd = (fundingRes.data as { fund_amount?: string }[]).reduce(
      (sum, r) => sum + parseFundAmount(r.fund_amount),
      0
    );
  }

  // Fallback: if no deal data, sum valuation_range from companies
  if (totalFundingUsd === 0) {
    const { data: valuationData } = await db
      .from('companies')
      .select('valuation_range')
      .not('valuation_range', 'is', null)
      .limit(10000);
    totalFundingUsd = ((valuationData as { valuation_range?: string }[]) || []).reduce(
      (sum, r) => sum + parseRangeToUsd(r.valuation_range),
      0
    );
  }

  return {
    totalCompanies,
    startupsAdded30d: 0,
    totalFundingUsd,
    activeSectors,
    countriesCovered,
    totalInvestors,
  };
}

/**
 * Fetches market heatmap data (by company Country - real startup data)
 */
export async function getMarketHeatmap(limit = 8): Promise<MarketHeatmapItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('companies')
    .select('Country')
    .not('Country', 'is', null);

  const byCountry = new Map<string, number>();
  for (const row of (data as { Country?: string }[]) || []) {
    const c = row.Country?.trim();
    if (c) byCountry.set(c, (byCountry.get(c) || 0) + 1);
  }

  return [...byCountry.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([country, companies]) => ({
      country,
      companies,
      funding: '—',
      activity:
        companies >= 100 ? ('very-high' as const)
        : companies >= 50 ? ('high' as const)
        : companies >= 20 ? ('medium' as const)
        : ('low' as const),
      growth: '+—',
    }));
}

/**
 * Fetches top sector for spotlight
 */
export async function getSectorSpotlight(): Promise<SectorSpotlightData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: companyRows } = await (supabase as any)
    .from('companies')
    .select('sector, company')
    .not('sector', 'is', null);

  const bySector = new Map<string, { companies: number; names: string[] }>();
  for (const row of (companyRows as { sector: string; company: string }[]) || []) {
    const r = row;
    const s = r.sector?.trim();
    if (!s) continue;
    const existing = bySector.get(s) ?? { companies: 0, names: [] };
    existing.companies += 1;
    if (r.company) existing.names.push(r.company);
    bySector.set(s, existing);
  }

  const entries = [...bySector.entries()];
  if (!entries.length) return null;

  const [topSectorName, stats] = entries.sort((a, b) => b[1].companies - a[1].companies)[0];
  const slug = topSectorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return {
    name: topSectorName,
    slug,
    companies: stats.companies,
    totalFunding: '—',
    growth: '+—',
    description: `${topSectorName} startups across Africa.`,
    topCompanies: stats.names.slice(0, 5),
  };
}

export { formatFunding };
