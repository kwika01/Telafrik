/**
 * Funding / Deals Query Hooks
 */
import { useQuery } from '@tanstack/react-query';
import { getLatestFundingRounds, getDeals } from '@/api/services/funding';

export const fundingKeys = {
  all: ['funding'] as const,
  latest: (limit: number) => [...fundingKeys.all, 'latest', limit] as const,
  deals: () => [...fundingKeys.all, 'deals'] as const,
};

export function useLatestDeals(limit = 5) {
  return useQuery({
    queryKey: fundingKeys.latest(limit),
    queryFn: () => getLatestFundingRounds(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDeals() {
  return useQuery({
    queryKey: fundingKeys.deals(),
    queryFn: getDeals,
    staleTime: 5 * 60 * 1000,
  });
}
