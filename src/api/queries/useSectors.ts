/**
 * Sector Query Hooks
 * 
 * React Query hooks for sector data.
 */
import { useQuery } from '@tanstack/react-query';
import { getSectors, getSectorBySlug } from '@/api/services/sectors';

// Query keys factory
export const sectorKeys = {
  all: ['sectors'] as const,
  list: () => [...sectorKeys.all, 'list'] as const,
  details: () => [...sectorKeys.all, 'detail'] as const,
  detail: (slug: string) => [...sectorKeys.details(), slug] as const,
};

/**
 * Hook to fetch all sectors
 */
export function useSectors() {
  return useQuery({
    queryKey: sectorKeys.list(),
    queryFn: getSectors,
    staleTime: 10 * 60 * 1000, // 10 minutes - sectors change rarely
  });
}

/**
 * Hook to fetch a single sector by slug
 */
export function useSector(slug: string | undefined) {
  return useQuery({
    queryKey: sectorKeys.detail(slug || ''),
    queryFn: () => getSectorBySlug(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}
