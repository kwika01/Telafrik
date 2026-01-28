/**
 * Company Mappers
 * 
 * Converts database row shapes to domain types.
 */
import type { CompanyListItem } from '@/types/domain';

/**
 * Raw company data from Supabase query with joined relations
 */
export interface CompanyQueryResult {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  logo_url: string | null;
  year_founded: number | null;
  total_funding_usd: number | null;
  is_verified: boolean | null;
  trending_score: number | null;
  hq_country: {
    name: string;
    code: string;
    flag_emoji: string | null;
  } | null;
  sector: {
    name: string;
    slug: string;
  } | null;
}

/**
 * Maps a database company row to a domain CompanyListItem
 */
export function mapToCompanyListItem(row: CompanyQueryResult): CompanyListItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    logoUrl: row.logo_url,
    yearFounded: row.year_founded,
    hqCountry: row.hq_country ? {
      name: row.hq_country.name,
      code: row.hq_country.code,
      flagEmoji: row.hq_country.flag_emoji || '',
    } : null,
    sector: row.sector ? {
      name: row.sector.name,
      slug: row.sector.slug,
    } : null,
    totalFundingUsd: row.total_funding_usd || 0,
    isVerified: row.is_verified || false,
    trendingScore: row.trending_score || 0,
  };
}

/**
 * Maps an array of database rows to domain CompanyListItems
 */
export function mapToCompanyListItems(rows: CompanyQueryResult[]): CompanyListItem[] {
  return rows.map(mapToCompanyListItem);
}
