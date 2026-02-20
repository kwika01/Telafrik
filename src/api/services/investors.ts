/**
 * Investors Service
 *
 * TelAfrik schema: investors(fund_id, fund_name, investor_type, hq_country)
 */
import { supabase } from '@/integrations/supabase/client';
import type { InvestorListItem, PaginatedResponse } from '@/types/domain';

interface TelAfrikInvestorRow {
  fund_id: string | number;
  fund_name: string;
  investor_type?: string | null;
  hq_country?: string | null;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function mapRowToInvestor(row: TelAfrikInvestorRow): InvestorListItem {
  const type = (row.investor_type || 'VC').toUpperCase();
  return {
    id: String(row.fund_id),
    name: row.fund_name || 'Unknown',
    slug: slugify(row.fund_name || String(row.fund_id)),
    type: type === 'VC' || type === 'ANGEL' || type === 'CVC' || type === 'PE' ? (type as InvestorListItem['type']) : 'VC',
    logoUrl: null,
    hqCountry: row.hq_country ? { name: row.hq_country, code: '' } : null,
    totalInvestments: 0,
    portfolioCount: 0,
  };
}

interface GetInvestorsOptions {
  page?: number;
  pageSize?: number;
  type?: string;
  search?: string;
}

/**
 * Fetches a paginated list of investors (TelAfrik schema)
 */
export async function getInvestors(
  options: GetInvestorsOptions = {}
): Promise<PaginatedResponse<InvestorListItem>> {
  const { page = 1, pageSize = 20, type, search } = options;
  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('investors')
    .select('fund_id, fund_name, investor_type, hq_country', { count: 'exact' });

  if (search) {
    query = query.ilike('fund_name', `%${search}%`);
  }

  if (type) {
    query = query.eq('investor_type', type);
  }

  query = query.order('fund_name', { ascending: true }).range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;

  if (error) throw new Error(`Failed to fetch investors: ${error.message}`);

  const items = ((data || []) as TelAfrikInvestorRow[]).map(mapRowToInvestor);

  return {
    data: items,
    totalCount: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

/**
 * Fetches a single investor by slug (TelAfrik: match fund_name)
 */
export async function getInvestorBySlug(slug: string) {
  const target = slug.replace(/-/g, ' ');
  const { data, error } = await supabase
    .from('investors')
    .select('fund_id, fund_name, investor_type, hq_country')
    .ilike('fund_name', `%${target}%`)
    .limit(1);

  if (error || !data?.length) return null;

  const row = data[0] as TelAfrikInvestorRow;
  return {
    id: String(row.fund_id),
    name: row.fund_name,
    slug: slugify(row.fund_name),
    type: row.investor_type || 'VC',
    hq_country: row.hq_country ? { name: row.hq_country, code: '' } : null,
    investor_sectors: [],
    investor_regions: [],
  };
}

/**
 * Fetches investors for search/autocomplete (TelAfrik schema)
 */
export async function searchInvestors(searchTerm: string, limit = 10): Promise<InvestorListItem[]> {
  const { data, error } = await supabase
    .from('investors')
    .select('fund_id, fund_name, investor_type, hq_country')
    .ilike('fund_name', `%${searchTerm}%`)
    .limit(limit);

  if (error) throw new Error(`Failed to search investors: ${error.message}`);
  return ((data || []) as TelAfrikInvestorRow[]).map(mapRowToInvestor);
}

/**
 * Fetches portfolio companies for an investor (TelAfrik: from TelAfrik Investors Companies)
 */
export async function getInvestorPortfolio(investorId: string) {
  const { data: investor } = await supabase
    .from('investors')
    .select('fund_name')
    .eq('fund_id', investorId)
    .single();

  if (!investor) return [];

  const { data, error } = await supabase
    .from('TelAfrik Investors Companies')
    .select('*')
    .eq('fund_id', investorId)
    .limit(100);

  if (error || !data?.length) return [];

  const { data: companies } = await supabase
    .from('companies')
    .select('company_id, company, slug, sector');

  const companyMap = new Map<string, { id: string; name: string; slug: string; sector?: { name: string; slug: string } }>();
  for (const c of companies || []) {
    const row = c as { company_id: string; company: string; slug: string; sector?: string };
    companyMap.set(String(row.company_id), {
      id: String(row.company_id),
      name: row.company,
      slug: row.slug,
      sector: row.sector ? { name: row.sector, slug: row.sector.toLowerCase().replace(/\s+/g, '-') } : undefined,
    });
  }

  const icRows = data as { company_id?: string; company?: string }[];
  const result: { id: string; name: string; slug: string; sector?: { name: string; slug: string } }[] = [];
  const seen = new Set<string>();

  for (const row of icRows) {
    const cid = row.company_id ?? row.company;
    if (!cid || seen.has(String(cid))) continue;
    seen.add(String(cid));
    const company = companyMap.get(String(cid)) ?? { id: String(cid), name: row.company ?? '—', slug: String(cid) };
    result.push(company);
  }

  return result;
}
