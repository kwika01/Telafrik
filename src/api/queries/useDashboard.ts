/**
 * Dashboard Query Hooks
 */
import { useQuery } from '@tanstack/react-query';
import {
  getDashboardStats,
  getMarketHeatmap,
  getSectorSpotlight,
} from '@/api/services/dashboard';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  marketHeatmap: (limit: number) => [...dashboardKeys.all, 'marketHeatmap', limit] as const,
  sectorSpotlight: () => [...dashboardKeys.all, 'sectorSpotlight'] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMarketHeatmap(limit = 8) {
  return useQuery({
    queryKey: dashboardKeys.marketHeatmap(limit),
    queryFn: () => getMarketHeatmap(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSectorSpotlight() {
  return useQuery({
    queryKey: dashboardKeys.sectorSpotlight(),
    queryFn: getSectorSpotlight,
    staleTime: 5 * 60 * 1000,
  });
}
