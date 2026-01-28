/**
 * Database Types
 * 
 * Re-exports from Supabase auto-generated types.
 * These represent raw database row shapes with snake_case naming.
 */

export type { Database, Json } from '@/integrations/supabase/types';
import type { Database } from '@/integrations/supabase/types';

// Extract row types for convenience
export type CompanyRow = Database['public']['Tables']['companies']['Row'];
export type CompanyInsert = Database['public']['Tables']['companies']['Insert'];
export type CompanyUpdate = Database['public']['Tables']['companies']['Update'];

export type CountryRow = Database['public']['Tables']['countries']['Row'];
export type SectorRow = Database['public']['Tables']['sectors']['Row'];
export type FounderRow = Database['public']['Tables']['founders']['Row'];
export type InvestorRow = Database['public']['Tables']['investors']['Row'];
export type FundingRoundRow = Database['public']['Tables']['funding_rounds']['Row'];

// Enum types
export type BusinessModel = Database['public']['Enums']['business_model'];
export type FundingStage = Database['public']['Enums']['funding_stage'];
export type ClaimStatus = Database['public']['Enums']['claim_status'];
export type DataSourceType = Database['public']['Enums']['data_source_type'];
