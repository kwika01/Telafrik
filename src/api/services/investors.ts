/**
 * Investors Service - uses actual DB schema
 */
import { supabase } from '@/integrations/supabase/client';
import type { InvestorListItem, PaginatedResponse } from '@/types/domain';

function mapRow(row: any): InvestorListItem {
  return {
    id: row.id,
    name: row.name || 'Unknown',
    slug: row.slug,
    type: row.type || 'VC',
    logoUrl: row.logo_url || null,
    hqCountry: row.countries ? { name: row.countries.name, code: row.countries.code } : null,
    totalInvestments: row.total_investments || 0,
    portfolioCount: row.portfolio_count || 0,
  };
}

const INVESTOR_SELECT = 'id, name, slug, type, logo_url, total_investments, portfolio_count, countries:hq_country_id(name, code)';

interface GetInvestorsOptions {
  page?: number;
  pageSize?: number;
  type?: string;
  search?: string;
}

export async function getInvestors(options: GetInvestorsOptions = {}): Promise<PaginatedResponse<InvestorListItem>> {
  const { page = 1, pageSize = 20, type, search } = options;
  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('investors')
    .select(INVESTOR_SELECT, { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (type) {
    query = query.eq('type', type);
  }

  query = query.order('name', { ascending: true }).range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw new Error(`Failed to fetch investors: ${error.message}`);

  return {
    data: (data || []).map(mapRow),
    totalCount: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function getInvestorBySlug(slug: string) {
  const { data, error } = await supabase
    .from('investors')
    .select('id, name, slug, type, description, logo_url, website_url, linkedin_url, countries:hq_country_id(name, code)')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  const row = data as any;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    type: row.type || 'VC',
    description: row.description,
    logo_url: row.logo_url,
    website_url: row.website_url,
    linkedin_url: row.linkedin_url,
    hq_country: row.countries ? { name: row.countries.name, code: row.countries.code } : null,
    investor_sectors: [],
    investor_regions: [],
  };
}

export async function searchInvestors(searchTerm: string, limit = 10): Promise<InvestorListItem[]> {
  const { data, error } = await supabase
    .from('investors')
    .select(INVESTOR_SELECT)
    .ilike('name', `%${searchTerm}%`)
    .limit(limit);

  if (error) throw new Error(`Failed to search investors: ${error.message}`);
  return (data || []).map(mapRow);
}

export async function getInvestorPortfolio(investorId: string) {
  const { data, error } = await supabase
    .from('funding_round_investors')
    .select('funding_rounds:funding_round_id(company_id, companies:company_id(id, name, slug, sectors:sector_id(name, slug)))')
    .eq('investor_id', investorId)
    .limit(100);

  if (error || !data?.length) return [];

  const seen = new Set<string>();
  const result: { id: string; name: string; slug: string; sector?: { name: string; slug: string } }[] = [];

  for (const row of data) {
    const company = (row as any).funding_rounds?.companies;
    if (!company || seen.has(company.id)) continue;
    seen.add(company.id);
    result.push({
      id: company.id,
      name: company.name,
      slug: company.slug,
      sector: company.sectors ? { name: company.sectors.name, slug: company.sectors.slug } : undefined,
    });
  }

  return result;
}
