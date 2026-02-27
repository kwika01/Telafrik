/**
 * Company Query Hooks
 * 
 * React Query hooks wrapping company services.
 */
import { useQuery } from '@tanstack/react-query';
import {
  getCompanies,
  getCompanyBySlug,
  getCompanyDetailsBySlug,
  getSimilarCompanies,
  searchCompanies,
  getTrendingCompanies,
  getCountryMapStats,
} from '@/api/services/companies';
import type { DirectoryFilters } from '@/types/domain';

// Query keys for cache management
export const companyKeys = {
  all: ['companies'] as const,
  lists: () => [...companyKeys.all, 'list'] as const,
  list: (filters: DirectoryFilters, page: number, pageSize: number, sortBy?: string, sortOrder?: string) => 
    [...companyKeys.lists(), { filters, page, pageSize, sortBy, sortOrder }] as const,
  details: () => [...companyKeys.all, 'detail'] as const,
  detail: (slug: string) => [...companyKeys.details(), slug] as const,
  search: (term: string) => [...companyKeys.all, 'search', term] as const,
  trending: (limit: number) => [...companyKeys.all, 'trending', limit] as const,
};

interface UseCompaniesOptions {
  filters?: DirectoryFilters;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'trending_score' | 'total_funding_usd' | 'year_founded';
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * Hook to fetch paginated list of companies
 */
export function useCompanies(options: UseCompaniesOptions = {}) {
  const {
    filters = {} as DirectoryFilters,
    page = 1,
    pageSize = 20,
    sortBy = 'trending_score',
    sortOrder = 'desc',
    enabled = true,
  } = options;

  return useQuery({
    queryKey: companyKeys.list(filters, page, pageSize, sortBy, sortOrder),
    queryFn: () => getCompanies({ filters, page, pageSize, sortBy, sortOrder }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Hook to fetch a single company by slug
 */
export function useCompany(slug: string, enabled = true) {
  return useQuery({
    queryKey: companyKeys.detail(slug),
    queryFn: () => getCompanyBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for company search/autocomplete
 */
export function useCompanySearch(searchTerm: string, limit = 10) {
  return useQuery({
    queryKey: companyKeys.search(searchTerm),
    queryFn: () => searchCompanies(searchTerm, limit),
    enabled: searchTerm.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to fetch trending companies
 */
export function useTrendingCompanies(limit = 10) {
  return useQuery({
    queryKey: companyKeys.trending(limit),
    queryFn: () => getTrendingCompanies(limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch full company details by slug
 */
export function useCompanyDetails(slug: string | undefined) {
  return useQuery({
    queryKey: [...companyKeys.detail(slug || ''), 'full'],
    queryFn: () => getCompanyDetailsBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch per-country startup stats for the interactive Africa map.
 * Returns data keyed by country name (matches DB).
 */
export function useCountryMapStats() {
  return useQuery({
    queryKey: [...companyKeys.all, 'country-map-stats'],
    queryFn: getCountryMapStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch similar companies
 */
export function useSimilarCompanies(sectorId: string | undefined, excludeId: string | undefined, limit = 3) {
  return useQuery({
    queryKey: [...companyKeys.all, 'similar', sectorId, excludeId],
    queryFn: () => getSimilarCompanies(sectorId!, excludeId!, limit),
    enabled: !!sectorId && !!excludeId,
    staleTime: 5 * 60 * 1000,
  });
}
