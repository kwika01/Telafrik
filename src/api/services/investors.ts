/**
 * Investors Service — mapped to actual TelAfrik DB schema.
 *
 * investors table columns:
 *   fund_id, fund_name, investor_type, hq_country, regions,
 *   stage_focus, sector_focus, check_size_usd, website, status
 *
 * "TelAfrik Investors Companies" table columns:
 *   id, fund_id, fund_name, fund_amount, porfolio_size,
 *   company, country, year, fund_round, company_id
 */
import { supabase } from '@/integrations/supabase/client';
import type { InvestorListItem, PaginatedResponse } from '@/types/domain';
import { getCountryMeta } from '@/utils/countryMeta';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function parseAmount(raw: string | null | undefined): number {
  if (!raw) return 0;
  const match = String(raw).match(/\$\s*([\d.]+)\s*([MBK])?/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  if (isNaN(num)) return 0;
  const suffix = (match[2] || '').toUpperCase();
  if (suffix === 'B') return num * 1e9;
  if (suffix === 'M') return num * 1e6;
  if (suffix === 'K') return num * 1e3;
  return num;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToListItem(row: any, agg?: { portfolioCount: number; totalInvestments: number }): InvestorListItem {
  const countryName: string | null = row.hq_country || null;
  let hqCountry: { name: string; code: string } | null = null;
  if (countryName) {
    const meta = getCountryMeta(countryName);
    hqCountry = { name: countryName, code: meta.code || countryName.slice(0, 2).toUpperCase() };
  }

  return {
    id: String(row.fund_id),
    name: row.fund_name || 'Unknown Fund',
    slug: slugify(row.fund_name || `fund-${row.fund_id}`),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: (row.investor_type || 'VC') as any,
    logoUrl: null,
    hqCountry,
    totalInvestments: agg?.totalInvestments ?? 0,
    portfolioCount: agg?.portfolioCount ?? 0,
  };
}

interface GetInvestorsOptions {
  page?: number;
  pageSize?: number;
  type?: string;
  search?: string;
}

export async function getInvestors(
  options: GetInvestorsOptions = {},
): Promise<PaginatedResponse<InvestorListItem>> {
  const { page = 1, pageSize = 20, type, search } = options;
  const offset = (page - 1) * pageSize;

  let query = db.from('investors').select('*', { count: 'exact' });

  if (search) query = query.ilike('fund_name', `%${search}%`);
  if (type)   query = query.ilike('investor_type', `%${type}%`);

  query = query
    .eq('status', 'active')
    .order('fund_name', { ascending: true })
    .range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw new Error(`Failed to fetch investors: ${error.message}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = (data || []) as any[];
  const fundIds = rows.map((r: { fund_id: number }) => r.fund_id).filter(Boolean);

  // Build portfolio aggregates from TelAfrik Investors Companies
  const aggMap = new Map<number, { portfolioCount: number; totalInvestments: number }>();
  if (fundIds.length) {
    const { data: deals } = await db
      .from('TelAfrik Investors Companies')
      .select('fund_id, fund_amount, porfolio_size')
      .in('fund_id', fundIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const d of (deals || []) as any[]) {
      const fid = d.fund_id as number;
      const prev = aggMap.get(fid) || { portfolioCount: 0, totalInvestments: 0 };
      aggMap.set(fid, {
        portfolioCount: Math.max(prev.portfolioCount, Number(d.porfolio_size) || 0),
        totalInvestments: prev.totalInvestments + parseAmount(d.fund_amount),
      });
    }
  }

  const items = rows.map((row) => mapRowToListItem(row, aggMap.get(row.fund_id)));
  const total = count ?? rows.length;

  return {
    data: items,
    totalCount: total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getInvestorBySlug(slug: string) {
  const { data, error } = await db.from('investors').select('*');
  if (error || !data) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = (data as any[]).find((r) => slugify(r.fund_name || '') === slug);
  if (!row) return null;

  const countryName: string | null = row.hq_country || null;
  let hq_country: { name: string; code: string } | null = null;
  if (countryName) {
    const meta = getCountryMeta(countryName);
    hq_country = { name: countryName, code: meta.code || countryName.slice(0, 2).toUpperCase() };
  }

  return {
    id: String(row.fund_id),
    name: row.fund_name || 'Unknown Fund',
    slug,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: (row.investor_type || 'VC') as any,
    description: [row.stage_focus, row.sector_focus, row.regions]
      .filter(Boolean)
      .map((v, i) => [`Focus: ${v}`, `Sectors: ${v}`, `Regions: ${v}`][i])
      .join(' · ') || null,
    logo_url: null,
    website_url: row.website || null,
    linkedin_url: null,
    hq_country,
    investor_sectors: [],
    investor_regions: [],
    // Extra fields for the profile page
    stage_focus: row.stage_focus || null,
    sector_focus: row.sector_focus || null,
    regions: row.regions || null,
    check_size_usd: row.check_size_usd || null,
  };
}

export async function searchInvestors(searchTerm: string, limit = 10): Promise<InvestorListItem[]> {
  const { data, error } = await db
    .from('investors')
    .select('*')
    .ilike('fund_name', `%${searchTerm}%`)
    .limit(limit);

  if (error) throw new Error(`Failed to search investors: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((data || []) as any[]).map((row) => mapRowToListItem(row));
}

export async function getInvestorPortfolio(investorId: string) {
  const fundId = parseInt(investorId, 10);
  if (!fundId) return [];

  const { data, error } = await db
    .from('TelAfrik Investors Companies')
    .select('company, company_id, country, year, fund_round, fund_amount')
    .eq('fund_id', fundId)
    .limit(100);

  if (error || !data?.length) return [];

  const seen = new Set<string>();
  const result: { id: string; name: string; slug: string; country?: string; year?: number; round?: string; amount?: string }[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of data as any[]) {
    const id = String(row.company_id ?? row.company);
    if (seen.has(id)) continue;
    seen.add(id);
    result.push({
      id,
      name: row.company as string,
      slug: slugify(row.company as string),
      country: row.country || undefined,
      year: row.year || undefined,
      round: row.fund_round || undefined,
      amount: row.fund_amount || undefined,
    });
  }

  return result;
}
