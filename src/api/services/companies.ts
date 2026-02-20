/**
 * Companies Service
 *
 * Supabase queries for company data.
 * Adapted for TelAfrik analyst schema: uses ALL available columns
 */
import { supabase } from '@/integrations/supabase/client';
import {
  mapTelAfrikCompaniesToListItems,
  mapTelAfrikCompanyToDetails,
} from '@/api/mappers/company';
import type { CompanyListItem, DirectoryFilters, PaginatedResponse } from '@/types/domain';

interface GetCompaniesOptions {
  filters?: DirectoryFilters;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'trending_score' | 'total_funding_usd' | 'year_founded';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Fetches a paginated list of companies (TelAfrik schema - all columns)
 */
export async function getCompanies(
  options: GetCompaniesOptions = {}
): Promise<PaginatedResponse<CompanyListItem>> {
  const {
    filters,
    page = 1,
    pageSize = 20,
    sortBy = 'name',
    sortOrder = 'asc',
  } = options;

  // Provide default empty filters
  const safeFilters = filters || { sectors: [], countries: [], regions: [], stages: [] };

  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('companies')
    .select('*', { count: 'exact' })
    .order('company', { ascending: true });

  if (safeFilters.search) {
    query = query.ilike('company', `%${safeFilters.search}%`);
  }

  if (safeFilters.sectors && safeFilters.sectors.length > 0) {
    const sectorValues = safeFilters.sectors.map((s) =>
      s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    );
    query = query.in('sector', sectorValues);
  }

  query = query.order('company', { ascending: sortOrder === 'asc' });
  query = query.range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch companies: ${error.message}`);
  }

  // Deduplicate by company name (case-insensitive)
  const rawItems = (data || []) as any[];
  const seenNames = new Set<string>();
  const uniqueItems = rawItems.filter(item => {
    const normalizedName = item.company?.toLowerCase().trim();
    if (!normalizedName || seenNames.has(normalizedName)) {
      return false;
    }
    seenNames.add(normalizedName);
    return true;
  });

  const items = mapTelAfrikCompaniesToListItems(uniqueItems);
  const totalCount = count ?? 0;

  return {
    data: items,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

/**
 * Fetches a single company by slug (all columns)
 */
export async function getCompanyBySlug(slug: string): Promise<CompanyListItem | null> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch company: ${error.message}`);
  }

  return mapTelAfrikCompaniesToListItems([data as any])[0];
}

/**
 * Fetches full company details by slug (all columns)
 */
export async function getCompanyDetailsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch company details: ${error.message}`);
  }

  return mapTelAfrikCompanyToDetails(data as any);
}

/**
 * Fetches similar companies (same sector - all columns)
 */
export async function getSimilarCompanies(sectorName: string, excludeId: string, limit = 3) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('sector', sectorName)
    .neq('company_id', excludeId)
    .limit(limit);

  if (error) throw new Error(`Failed to fetch similar companies: ${error.message}`);
  return mapTelAfrikCompaniesToListItems((data || []) as any[]);
}

/**
 * Fetches companies for autocomplete/search (all columns)
 */
export async function searchCompanies(searchTerm: string, limit = 10): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .ilike('company', `%${searchTerm}%`)
    .order('company', { ascending: true })
    .limit(limit);

  if (error) throw new Error(`Failed to search companies: ${error.message}`);
  return mapTelAfrikCompaniesToListItems((data || []) as any[]);
}

/**
 * Fetches trending companies (all columns)
 */
export async function getTrendingCompanies(limit = 10): Promise<CompanyListItem[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('company', { ascending: true })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch trending companies: ${error.message}`);
  return mapTelAfrikCompaniesToListItems((data || []) as any[]);
}
