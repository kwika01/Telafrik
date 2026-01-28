/**
 * Common domain types used across the application
 */

export type AfricanRegion = 'West Africa' | 'East Africa' | 'North Africa' | 'Central Africa' | 'Southern Africa';

export type BusinessModel = 'B2B' | 'B2C' | 'B2B2C' | 'Marketplace' | 'SaaS' | 'Other';

export type FundingStage = 
  | 'Pre-seed' 
  | 'Seed' 
  | 'Series A' 
  | 'Series B' 
  | 'Series C' 
  | 'Series D+' 
  | 'Grant' 
  | 'Debt' 
  | 'Unknown';

export type DataSourceType = 'Verified' | 'Reported' | 'Estimated';

export type InvestorType = 'VC' | 'PE' | 'Angel' | 'Accelerator' | 'Corporate' | 'Family Office';

export type ClaimStatus = 'pending' | 'approved' | 'rejected';
