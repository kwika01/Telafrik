// Database-aligned types for AfricaBase

export type BusinessModel = 'B2B' | 'B2C' | 'B2B2C' | 'Marketplace' | 'SaaS' | 'Other';
export type FundingStage = 'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D+' | 'Grant' | 'Debt' | 'Unknown';
export type DataSourceType = 'Verified' | 'Reported' | 'Estimated';
export type ClaimStatus = 'pending' | 'approved' | 'rejected';
export type AfricanRegion = 'West Africa' | 'East Africa' | 'North Africa' | 'Central Africa' | 'Southern Africa';

export interface Sector {
  id: string;
  name: string;
  slug: string;
  description: string;
  marketOverview: string;
  icon: string;
  startupCount?: number;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  region: AfricanRegion;
  flagEmoji: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logoUrl: string;
  yearFounded: number;
  hqCountry: Country;
  operatingCountries: Country[];
  sector: Sector;
  subSector: string;
  businessModel: BusinessModel;
  primaryDomain: string;
  websiteUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  iosAppUrl?: string;
  androidAppUrl?: string;
  employeeCountMin?: number;
  employeeCountMax?: number;
  isHiring: boolean;
  isVerified: boolean;
  trendingScore: number;
  totalFundingUsd: number;
  revenue?: RevenueMetric;
  valuation?: ValuationMetric;
  fundingRounds: FundingRound[];
  founders: Founder[];
  sources: Source[];
}

export interface Founder {
  id: string;
  name: string;
  slug: string;
  title: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  avatarUrl: string;
  bio?: string;
  role?: string;
  isCurrent: boolean;
}

export interface Investor {
  id: string;
  name: string;
  slug: string;
  type: 'VC' | 'PE' | 'Angel' | 'Accelerator' | 'Corporate' | 'Family Office';
  description: string;
  logoUrl: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  hqCountry?: Country;
  totalInvestments: number;
  portfolioCount: number;
  focusSectors: Sector[];
  focusRegions: AfricanRegion[];
}

export interface FundingRound {
  id: string;
  companyId: string;
  stage: FundingStage;
  amountUsd?: number;
  amountDisclosed: boolean;
  date: string;
  valuationUsd?: number;
  sourceType: DataSourceType;
  sourceUrl?: string;
  confidenceScore: number;
  investors: Investor[];
  leadInvestor?: Investor;
}

export interface RevenueMetric {
  id: string;
  companyId: string;
  metricType: 'ARR' | 'MRR' | 'GMV' | 'Net Revenue';
  minValueUsd: number;
  maxValueUsd: number;
  asOfDate: string;
  sourceType: DataSourceType;
  sourceUrl?: string;
  confidenceScore: number;
}

export interface ValuationMetric {
  id: string;
  companyId: string;
  minValueUsd: number;
  maxValueUsd: number;
  isPostMoney: boolean;
  asOfDate: string;
  sourceType: DataSourceType;
  sourceUrl?: string;
  confidenceScore: number;
}

export interface Source {
  id: string;
  companyId: string;
  title: string;
  url: string;
  sourceType: 'Press' | 'Report' | 'Official' | 'Interview' | 'Filing';
  publishedAt?: string;
}

export interface Claim {
  id: string;
  userId: string;
  companyId: string;
  roleAtCompany: string;
  emailDomain?: string;
  proofUrl?: string;
  notes?: string;
  status: ClaimStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface CorrectionRequest {
  id: string;
  companyId: string;
  userId?: string;
  email?: string;
  fieldName: string;
  currentValue?: string;
  suggestedValue: string;
  sourceUrl?: string;
  notes?: string;
  status: ClaimStatus;
  createdAt: string;
}

// Filter types
export interface DirectoryFilters {
  sectors: string[];
  countries: string[];
  regions: AfricanRegion[];
  stages: string[];
  fundingMin?: number;
  fundingMax?: number;
  revenueMin?: number;
  revenueMax?: number;
  valuationMin?: number;
  valuationMax?: number;
  yearFoundedMin?: number;
  yearFoundedMax?: number;
}

// Helper function for formatting
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
