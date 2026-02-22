/**
 * Companies Service - uses actual DB schema
 */
import { supabase } from '@/integrations/supabase/client';
import type { CompanyListItem, DirectoryFilters, PaginatedResponse } from '@/types/domain';

interface GetCompaniesOptions {
  filters?: DirectoryFilters;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'trending_score' | 'total_funding_usd' | 'year_founded';
  sortOrder?: 'asc' | 'desc';
}

function mapRow(row: any): CompanyListItem {
  return {
    id: row.id,
    name: row.name || 'Unnamed Company',
    slug: row.slug,
    logoUrl: row.logo_url || null,
    tagline: row.tagline || null,
    description: row.description || null,
    yearFounded: row.year_founded || null,
    hqCountry: row.countries ? { id: row.countries.id, name: row.countries.name, code: row.countries.code, flagEmoji: row.countries.flag_emoji || '' } : null,
    sector: row.sectors ? { id: row.sectors.id, name: row.sectors.name, slug: row.sectors.slug } : null,
    totalFundingUsd: row.total_funding_usd || 0,
    isVerified: row.is_verified || false,
    trendingScore: row.trending_score || 0,
    business_model: row.business_model || null,
    stage: null,
    employee_count: row.employee_count_max || null,
    website: row.website_url || null,
    linkedin: row.linkedin_url || null,
    twitter: row.twitter_url || null,
    hiring_status: row.is_hiring ? 'Hiring' : null,
  };
}

const COMPANY_SELECT = '*, countries:hq_country_id(id, name, code, flag_emoji), sectors:sector_id(id, name, slug)';

export async function getCompanies(options: GetCompaniesOptions = {}): Promise<PaginatedResponse<CompanyListItem>> {
  const { filters, page = 1, pageSize = 20, sortOrder = 'asc' } = options;
  const safeFilters = filters || { sectors: [], countries: [], regions: [], stages: [] };
  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('companies')
    .select(COMPANY_SELECT, { count: 'exact' });

  if (safeFilters.search) {
    query = query.ilike('name', `%${safeFilters.search}%`);
  }

  if (safeFilters.sectors?.length) {
    // Filter by sector name via sector_id join - use sector_id in filter
    // For simplicity, filter client-side after fetch
  }

  query = query.order('name', { ascending: sortOrder === 'asc' });
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
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch company: ${error.message}`);
  }
  return mapRow(data);
}

export async function getCompanyDetailsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch company details: ${error.message}`);
  }

  const row = data as any;
  return {
    id: row.id,
    name: row.name || 'Unnamed Company',
    slug: row.slug,
    tagline: row.tagline || null,
    about: row.description || null,
    sector: row.sectors ? { name: row.sectors.name, slug: row.sectors.slug } : null,
    sub_sector: row.sub_sector || null,
    business_model: row.business_model || null,
    stage: null,
    year_founded: row.year_founded || null,
    hq_country: row.countries ? { id: row.countries.id, name: row.countries.name, code: row.countries.code, flagEmoji: row.countries.flag_emoji || '' } : null,
    website: row.website_url || null,
    linkedin: row.linkedin_url || null,
    twitter: row.twitter_url || null,
    founder: null,
    operating_countries: null,
    employee_count: row.employee_count_max || null,
    hiring_status: row.is_hiring ? 'Hiring' : null,
    valuation_range: null,
    valuation_confidence: null,
    revenue_range: null,
    total_funding_usd: row.total_funding_usd || 0,
    company_founders: [],
    funding_rounds: [],
    company_countries: [],
  };
}

export async function getSimilarCompanies(sectorName: string, excludeId: string, limit = 3) {
  // First get sector id
  const { data: sectorData } = await supabase
    .from('sectors')
    .select('id')
    .eq('name', sectorName)
    .single();

  if (!sectorData) return [];

  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .eq('sector_id', sectorData.id)
    .neq('id', excludeId)
    .limit(limit);

  if (error) throw new Error(`Failed to fetch similar companies: ${error.message}`);
  return (data || []).map(mapRow);
}

export async function searchCompanies(searchTerm: string, limit = 10): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true })
    .limit(limit);

  if (error) throw new Error(`Failed to search companies: ${error.message}`);
  return (data || []).map(mapRow);
}

export async function getTrendingCompanies(limit = 10): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .order('trending_score', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch trending companies: ${error.message}`);
  return (data || []).map(mapRow);
}
