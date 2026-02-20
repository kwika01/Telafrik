/**
 * Country Query Hooks
 * 
 * React Query hooks for country data.
 */
import { useQuery } from '@tanstack/react-query';
import { getCountries, getCountriesWithCounts, getCountriesWithStats, getCountryEcosystem, getCountryByCode } from '@/api/services/countries';

// Query keys factory
export const countryKeys = {
  all: ['countries'] as const,
  list: () => [...countryKeys.all, 'list'] as const,
  withCounts: () => [...countryKeys.all, 'withCounts'] as const,
  withStats: () => [...countryKeys.all, 'withStats'] as const,
  details: () => [...countryKeys.all, 'detail'] as const,
  detail: (code: string) => [...countryKeys.details(), code] as const,
  ecosystem: (code: string) => [...countryKeys.all, 'ecosystem', code] as const,
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
 * Hook to fetch countries with full stats for Countries page
 */
export function useCountriesWithStats() {
  return useQuery({
    queryKey: countryKeys.withStats(),
    queryFn: getCountriesWithStats,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch ecosystem data for a country (map panel)
 */
export function useCountryEcosystem(countryCode: string | null) {
  return useQuery({
    queryKey: countryKeys.ecosystem(countryCode || ''),
    queryFn: () => getCountryEcosystem(countryCode!),
    enabled: !!countryCode,
    staleTime: 5 * 60 * 1000,
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
