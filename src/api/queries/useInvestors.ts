/**
 * Investor Query Hooks
 * 
 * React Query hooks for investor data.
 */
import { useQuery } from '@tanstack/react-query';
import {
  getInvestors,
  getInvestorBySlug,
  searchInvestors,
  getInvestorPortfolio,
} from '@/api/services/investors';

// Query keys factory
export const investorKeys = {
  all: ['investors'] as const,
  lists: () => [...investorKeys.all, 'list'] as const,
  list: (params: object) => [...investorKeys.lists(), params] as const,
  details: () => [...investorKeys.all, 'detail'] as const,
  detail: (slug: string) => [...investorKeys.details(), slug] as const,
  portfolio: (id: string) => [...investorKeys.all, 'portfolio', id] as const,
  search: (term: string) => [...investorKeys.all, 'search', term] as const,
};

interface UseInvestorsOptions {
  page?: number;
  pageSize?: number;
  type?: string;
  search?: string;
  enabled?: boolean;
}

/**
 * Hook to fetch paginated investors
 */
export function useInvestors(options: UseInvestorsOptions = {}) {
  const { page = 1, pageSize = 20, type, search, enabled = true } = options;

  return useQuery({
    queryKey: investorKeys.list({ page, pageSize, type, search }),
    queryFn: () => getInvestors({ page, pageSize, type, search }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single investor by slug
 */
export function useInvestor(slug: string | undefined) {
  return useQuery({
    queryKey: investorKeys.detail(slug || ''),
    queryFn: () => getInvestorBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for investor search/autocomplete
 */
export function useInvestorSearch(searchTerm: string, limit: number = 10) {
  return useQuery({
    queryKey: investorKeys.search(searchTerm),
    queryFn: () => searchInvestors(searchTerm, limit),
    enabled: searchTerm.length >= 2,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch investor portfolio companies
 */
export function useInvestorPortfolio(investorId: string | undefined) {
  return useQuery({
    queryKey: investorKeys.portfolio(investorId || ''),
    queryFn: () => getInvestorPortfolio(investorId!),
    enabled: !!investorId,
    staleTime: 5 * 60 * 1000,
  });
}
