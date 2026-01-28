/**
 * Company domain type
 * 
 * This is the canonical representation of a company that the UI consumes.
 * It uses camelCase and nested objects (resolved foreign keys).
 */
import type { BusinessModel, DataSourceType, FundingStage } from './common';
import type { Country } from './country';
import type { Sector } from './sector';
import type { Founder } from './founder';
import type { Investor } from './investor';

export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  logoUrl: string | null;
  yearFounded: number | null;
  hqCountry: Country | null;
  operatingCountries: Country[];
  sector: Sector | null;
  subSector: string | null;
  businessModel: BusinessModel | null;
  primaryDomain: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
  employeeCountMin: number | null;
  employeeCountMax: number | null;
  isHiring: boolean;
  isVerified: boolean;
  trendingScore: number;
  totalFundingUsd: number;
  fundingRounds: FundingRound[];
  founders: Founder[];
  sources: Source[];
  createdAt: string;
  updatedAt: string;
}

export interface FundingRound {
  id: string;
  companyId: string;
  stage: FundingStage;
  amountUsd: number | null;
  amountDisclosed: boolean;
  date: string;
  valuationUsd: number | null;
  sourceType: DataSourceType;
  sourceUrl: string | null;
  confidenceScore: number;
  investors: Investor[];
  leadInvestor: Investor | null;
}

export interface Source {
  id: string;
  companyId: string;
  title: string;
  url: string;
  sourceType: 'Press' | 'Report' | 'Official' | 'Interview' | 'Filing';
  publishedAt: string | null;
}

// Compact list item for directory views
export interface CompanyListItem {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  logoUrl: string | null;
  yearFounded: number | null;
  hqCountry: { name: string; code: string; flagEmoji: string } | null;
  sector: { name: string; slug: string } | null;
  totalFundingUsd: number;
  isVerified: boolean;
  trendingScore: number;
}
