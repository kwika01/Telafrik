/**
 * Investors Service
 * 
 * Supabase queries for investor data.
 * This layer contains raw queries - no React hooks.
 */
import { supabase } from '@/integrations/supabase/client';
import type { InvestorListItem, PaginatedResponse } from '@/types/domain';

// Query result type for investor list
export interface InvestorQueryResult {
  id: string;
  name: string;
  slug: string;
  type: string;
  logo_url: string | null;
  total_investments: number | null;
  portfolio_count: number | null;
  hq_country: {
    name: string;
    code: string;
  } | null;
}

// Select for investor list queries
const INVESTOR_LIST_SELECT = `
  id,
  name,
  slug,
  type,
  logo_url,
  total_investments,
  portfolio_count,
  hq_country:countries!investors_hq_country_id_fkey(name, code)
`;

interface GetInvestorsOptions {
  page?: number;
  pageSize?: number;
  type?: string;
  search?: string;
}

/**
 * Maps raw query result to domain type
 */
function mapToInvestorListItem(row: InvestorQueryResult): InvestorListItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    type: row.type as InvestorListItem['type'],
    logoUrl: row.logo_url,
    hqCountry: row.hq_country,
    totalInvestments: row.total_investments || 0,
    portfolioCount: row.portfolio_count || 0,
  };
}

/**
 * Fetches a paginated list of investors
 */
export async function getInvestors(
  options: GetInvestorsOptions = {}
): Promise<PaginatedResponse<InvestorListItem>> {
  const {
    page = 1,
    pageSize = 20,
    type,
    search,
  } = options;

  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('investors')
    .select(INVESTOR_LIST_SELECT, { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  if (type) {
    query = query.eq('type', type);
  }

  query = query
    .order('portfolio_count', { ascending: false })
    .range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch investors: ${error.message}`);
  }

  const items = ((data as unknown as InvestorQueryResult[]) || []).map(mapToInvestorListItem);
  const totalCount = count || 0;

  return {
    data: items,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

/**
 * Fetches a single investor by slug with full details
 */
export async function getInvestorBySlug(slug: string) {
  const { data, error } = await supabase
    .from('investors')
    .select(`
      *,
      hq_country:countries!investors_hq_country_id_fkey(name, code, flag_emoji),
      investor_sectors(
        sector:sectors(id, name, slug)
      ),
      investor_regions(region)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch investor: ${error.message}`);
  }

  return data;
}

/**
 * Fetches investors for search/autocomplete
 */
export async function searchInvestors(
  searchTerm: string,
  limit: number = 10
): Promise<InvestorListItem[]> {
  const { data, error } = await supabase
    .from('investors')
    .select(INVESTOR_LIST_SELECT)
    .ilike('name', `%${searchTerm}%`)
    .order('portfolio_count', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to search investors: ${error.message}`);
  }

  return ((data as unknown as InvestorQueryResult[]) || []).map(mapToInvestorListItem);
}

/**
 * Fetches portfolio companies for an investor
 */
export async function getInvestorPortfolio(investorId: string) {
  const { data, error } = await supabase
    .from('funding_round_investors')
    .select(`
      funding_round:funding_rounds(
        company:companies(
          id,
          name,
          slug,
          logo_url,
          tagline,
          sector:sectors(name, slug)
        )
      )
    `)
    .eq('investor_id', investorId);

  if (error) {
    throw new Error(`Failed to fetch investor portfolio: ${error.message}`);
  }

  // Extract unique companies from funding rounds
  const companiesMap = new Map();
  data?.forEach((item: any) => {
    const company = item.funding_round?.company;
    if (company && !companiesMap.has(company.id)) {
      companiesMap.set(company.id, company);
    }
  });

  return Array.from(companiesMap.values());
}
