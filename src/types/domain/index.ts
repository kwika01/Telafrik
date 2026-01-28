/**
 * Domain Types
 * 
 * Canonical application types that the UI consumes.
 * These use camelCase and contain nested objects (resolved joins).
 */

// Common types
export type {
  AfricanRegion,
  BusinessModel,
  FundingStage,
  DataSourceType,
  InvestorType,
  ClaimStatus,
} from './common';

// Entity types
export type { Country } from './country';
export type { Sector } from './sector';
export type { Company, CompanyListItem, FundingRound, Source } from './company';
export type { Founder } from './founder';
export type { Investor, InvestorListItem } from './investor';

// Filter types
export interface DirectoryFilters {
  sectors: string[];
  countries: string[];
  regions: string[];
  stages: string[];
  fundingMin?: number;
  fundingMax?: number;
  yearFoundedMin?: number;
  yearFoundedMax?: number;
  search?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Utility functions
export const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
};

export const formatRange = (min: number, max: number): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};
