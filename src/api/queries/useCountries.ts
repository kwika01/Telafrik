/**
 * Country Query Hooks
 * 
 * React Query hooks for country data.
 */
import { useQuery } from '@tanstack/react-query';
import { getCountries, getCountriesWithCounts, getCountryByCode } from '@/api/services/countries';

// Query keys factory
export const countryKeys = {
  all: ['countries'] as const,
  list: () => [...countryKeys.all, 'list'] as const,
  withCounts: () => [...countryKeys.all, 'withCounts'] as const,
  details: () => [...countryKeys.all, 'detail'] as const,
  detail: (code: string) => [...countryKeys.details(), code] as const,
};

/**
 * Hook to fetch all countries
 */
export function useCountries() {
  return useQuery({
    queryKey: countryKeys.list(),
    queryFn: getCountries,
    staleTime: 30 * 60 * 1000, // 30 minutes - countries never change
  });
}

/**
 * Hook to fetch countries with startup counts
 */
export function useCountriesWithCounts() {
  return useQuery({
    queryKey: countryKeys.withCounts(),
    queryFn: getCountriesWithCounts,
    staleTime: 5 * 60 * 1000, // 5 minutes - counts can change
  });
}

/**
 * Hook to fetch a single country by code
 */
export function useCountry(code: string | undefined) {
  return useQuery({
    queryKey: countryKeys.detail(code || ''),
    queryFn: () => getCountryByCode(code!),
    enabled: !!code,
    staleTime: 30 * 60 * 1000,
  });
}
