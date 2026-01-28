/**
 * Investor domain type
 */
import type { AfricanRegion, InvestorType } from './common';
import type { Country } from './country';
import type { Sector } from './sector';

export interface Investor {
  id: string;
  name: string;
  slug: string;
  type: InvestorType;
  description: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  hqCountry: Country | null;
  totalInvestments: number;
  portfolioCount: number;
  focusSectors: Sector[];
  focusRegions: AfricanRegion[];
}

// Compact list item for directory views
export interface InvestorListItem {
  id: string;
  name: string;
  slug: string;
  type: InvestorType;
  logoUrl: string | null;
  hqCountry: { name: string; code: string } | null;
  totalInvestments: number;
  portfolioCount: number;
}
