/**
 * Companies Service
 * 
 * Supabase queries for company data.
 * This layer contains raw queries - no React hooks.
 */
import { supabase } from '@/integrations/supabase/client';
import { mapToCompanyListItems, type CompanyQueryResult } from '@/api/mappers/company';
import type { CompanyListItem, DirectoryFilters, PaginatedResponse } from '@/types/domain';

// Default select for company list queries
const COMPANY_LIST_SELECT = `
  id,
  name,
  slug,
  tagline,
  logo_url,
  year_founded,
  total_funding_usd,
  is_verified,
  trending_score,
  hq_country:countries!companies_hq_country_id_fkey(name, code, flag_emoji),
  sector:sectors!companies_sector_id_fkey(name, slug)
`;

interface GetCompaniesOptions {
  filters?: DirectoryFilters;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'trending_score' | 'total_funding_usd' | 'year_founded';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Fetches a paginated list of companies with optional filters
 */
export async function getCompanies(
  options: GetCompaniesOptions = {}
): Promise<PaginatedResponse<CompanyListItem>> {
  const {
    filters = {},
    page = 1,
    pageSize = 20,
    sortBy = 'trending_score',
    sortOrder = 'desc',
  } = options;

  // Calculate offset
  const offset = (page - 1) * pageSize;

  // Build query
  let query = supabase
    .from('companies')
    .select(COMPANY_LIST_SELECT, { count: 'exact' });

  // Apply filters
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  if (filters.sectors && filters.sectors.length > 0) {
    const { data: sectorRows } = await supabase
      .from('sectors')
      .select('id')
      .in('slug', filters.sectors);
    const sectorIds = (sectorRows || []).map((s: { id: string }) => s.id);
    if (sectorIds.length > 0) {
      query = query.in('sector_id', sectorIds);
    }
  }

  if (filters.countries && filters.countries.length > 0) {
    const { data: countryRows } = await supabase
      .from('countries')
      .select('id')
      .in('code', filters.countries);
    const countryIds = (countryRows || []).map((c: { id: string }) => c.id);
    if (countryIds.length > 0) {
      query = query.in('hq_country_id', countryIds);
    }
  }

  if (filters.fundingMin !== undefined) {
    query = query.gte('total_funding_usd', filters.fundingMin);
  }

  if (filters.fundingMax !== undefined) {
    query = query.lte('total_funding_usd', filters.fundingMax);
  }

  if (filters.yearFoundedMin !== undefined) {
    query = query.gte('year_founded', filters.yearFoundedMin);
  }

  if (filters.yearFoundedMax !== undefined) {
    query = query.lte('year_founded', filters.yearFoundedMax);
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  // Apply pagination
  query = query.range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch companies: ${error.message}`);
  }

  const items = mapToCompanyListItems((data as unknown as CompanyQueryResult[]) || []);
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
 * Fetches a single company by slug (list item version)
 */
export async function getCompanyBySlug(slug: string): Promise<CompanyListItem | null> {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_LIST_SELECT)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch company: ${error.message}`);
  }

  return mapToCompanyListItems([data as unknown as CompanyQueryResult])[0];
}

// Full company select for detail pages
const COMPANY_FULL_SELECT = `
  *,
  hq_country:countries!companies_hq_country_id_fkey(id, name, code, flag_emoji, region),
  sector:sectors!companies_sector_id_fkey(id, name, slug, description),
  company_founders(
    role,
    is_current,
    founder:founders(id, name, slug, title, avatar_url, linkedin_url, twitter_url, bio)
  ),
  funding_rounds(
    id, stage, amount_usd, date, valuation_usd, amount_disclosed, source_type,
    funding_round_investors(
      is_lead,
      investor:investors(id, name, slug, logo_url)
    )
  ),
  company_countries(
    is_hq,
    country:countries(id, name, code, flag_emoji)
  )
`;

/**
 * Fetches full company details by slug
 */
export async function getCompanyDetailsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_FULL_SELECT)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch company details: ${error.message}`);
  }

  return data;
}

/**
 * Fetches similar companies (same sector)
 */
export async function getSimilarCompanies(sectorId: string, excludeId: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_LIST_SELECT)
    .eq('sector_id', sectorId)
    .neq('id', excludeId)
    .order('trending_score', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch similar companies: ${error.message}`);
  }

  return mapToCompanyListItems((data as unknown as CompanyQueryResult[]) || []);
}

/**
 * Fetches companies for autocomplete/search
 */
export async function searchCompanies(
  searchTerm: string,
  limit: number = 10
): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_LIST_SELECT)
    .ilike('name', `%${searchTerm}%`)
    .order('trending_score', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to search companies: ${error.message}`);
  }

  return mapToCompanyListItems((data as unknown as CompanyQueryResult[]) || []);
}

/**
 * Fetches trending companies
 */
export async function getTrendingCompanies(limit: number = 10): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_LIST_SELECT)
    .order('trending_score', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch trending companies: ${error.message}`);
  }

  return mapToCompanyListItems((data as unknown as CompanyQueryResult[]) || []);
}
