/**
 * Company Data Mappers
 * Transforms TelAfrik Supabase schema → domain camelCase types
 */
import type { CompanyListItem } from '@/types/domain';

export interface TelAfrikCompanyRow {
  company_id: string | number;
  company: string;
  slug: string;
  sector?: string | null;
  sub_sector?: string | null;
  business_model?: string | null;
  stage?: string | null;
  founder?: string | null;
  founding_year?: string | null;
  Country?: string | null;
  operating_countries?: string | null;
  employee_count?: string | null;
  website?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  about?: string | null;
  valuation_range?: string | null;
  valuation_conf_pct?: string | null;
  revenue_range?: string | null;
  hiring_status?: string | null;
  status?: string | null;
}

export function mapTelAfrikCompaniesToListItems(rows: any[]): CompanyListItem[] {
  return rows.map(mapTelAfrikCompanyToListItem);
}

export function mapTelAfrikCompanyToListItem(row: any): CompanyListItem {
  const yearFounded = row.founding_year
    ? parseInt(row.founding_year.match(/\d{4}/)?.[0] || '0') || null
    : null;

  const valuationUsd = parseFundingFromValuation(row.valuation_range);

  return {
    id: String(row.company_id),
    name: row.company || 'Unnamed Company',
    slug: row.slug,
    // camelCase — what the UI actually reads
    logoUrl: null,
    tagline: row.about ? row.about.substring(0, 120) : (row.sub_sector || null),
    description: row.about || null,
    sector: row.sector
      ? {
          id: `sector-${row.sector.toLowerCase().replace(/\s+/g, '-')}`,
          name: row.sector,
          slug: row.sector.toLowerCase().replace(/\s+/g, '-'),
        }
      : null,
    hqCountry: row.Country
      ? {
          id: `country-${row.Country.toLowerCase().replace(/\s+/g, '-')}`,
          name: row.Country,
          code: deriveCountryCode(row.Country),
          flagEmoji: deriveFlag(row.Country),
        }
      : null,
    yearFounded: yearFounded,
    totalFundingUsd: valuationUsd ?? 0,
    valuationUsd: valuationUsd,
    isVerified: false,
    trendingScore: 0,
    // TelAfrik-specific snake_case extras (used directly in card/profile)
    business_model: row.business_model || null,
    stage: row.stage || null,
    employee_count: parseEmployeeCount(row.employee_count),
    website: row.website || null,
    linkedin: row.linkedin || null,
    facebook: row.facebook || null,
    twitter: row.twitter || null,
    operating_countries: row.operating_countries || null,
    hiring_status: row.hiring_status || null,
    revenue_range: row.revenue_range || null,
    valuation_range: row.valuation_range || null,
    valuation_confidence: row.valuation_conf_pct || null,
    founder: row.founder || null,
  };
}

export function mapTelAfrikCompanyToDetails(row: any) {
  const yearFounded = row.founding_year
    ? parseInt(row.founding_year.match(/\d{4}/)?.[0] || '0') || null
    : null;

  return {
    id: String(row.company_id),
    name: row.company || 'Unnamed Company',
    slug: row.slug,
    tagline: row.about ? row.about.substring(0, 120) : (row.sub_sector || null),
    about: row.about || null,
    sector: row.sector
      ? { name: row.sector, slug: row.sector.toLowerCase().replace(/\s+/g, '-') }
      : null,
    sub_sector: row.sub_sector || null,
    business_model: row.business_model || null,
    stage: row.stage || null,
    year_founded: yearFounded,
    hq_country: row.Country
      ? {
          id: `country-${row.Country.toLowerCase().replace(/\s+/g, '-')}`,
          name: row.Country,
          code: deriveCountryCode(row.Country),
          flagEmoji: deriveFlag(row.Country),
        }
      : null,
    website: row.website || null,
    linkedin: row.linkedin || null,
    facebook: row.facebook || null,
    twitter: row.twitter || null,
    founder: row.founder || null,
    operating_countries: row.operating_countries || null,
    employee_count: parseEmployeeCount(row.employee_count),
    hiring_status: row.hiring_status || null,
    valuation_range: row.valuation_range || null,
    valuation_confidence: row.valuation_conf_pct || null,
    revenue_range: row.revenue_range || null,
    total_funding_usd: parseFundingFromValuation(row.valuation_range) ?? 0,
    company_founders: row.founder ? [{ name: row.founder, role: 'Founder' }] : [],
    funding_rounds: [],
    company_countries: [],
  };
}

function parseEmployeeCount(count?: string | null): number | null {
  if (!count) return null;
  if (count.includes('+')) return parseInt(count.replace(/[^\d]/g, '')) || null;
  const match = count.match(/(\d+)[-–](\d+)/);
  if (match) return parseInt(match[2]);
  const single = parseInt(count.replace(/[^\d]/g, ''));
  return single || null;
}

function parseFundingFromValuation(range?: string | null): number | null {
  if (!range) return null;
  const parts = range.split(/[-–]/).map(s => s.trim());
  const upper = parts[parts.length - 1];
  const match = upper.match(/\$?([\d.]+)\s*([TBMKtbmk])?/);
  if (!match) return null;
  const amount = parseFloat(match[1]);
  if (isNaN(amount)) return null;
  const suffix = (match[2] || '').toUpperCase();
  if (suffix === 'T') return Math.round(amount * 1e12);
  if (suffix === 'B') return Math.round(amount * 1e9);
  if (suffix === 'M') return Math.round(amount * 1e6);
  if (suffix === 'K') return Math.round(amount * 1e3);
  return Math.round(amount);
}

function deriveCountryCode(name: string): string {
  const map: Record<string, string> = {
    'Algeria': 'DZ', 'Egypt': 'EG', 'Kenya': 'KE', 'Nigeria': 'NG',
    'South Africa': 'ZA', 'Ghana': 'GH', 'Morocco': 'MA', 'Tunisia': 'TN',
    'Senegal': 'SN', 'Uganda': 'UG', 'Tanzania': 'TZ', 'Rwanda': 'RW',
    'Ethiopia': 'ET', "Côte d'Ivoire": 'CI', 'Cameroon': 'CM', 'Benin': 'BJ',
    'Togo': 'TG', 'Burkina Faso': 'BF', 'Congo': 'CG', 'Zambia': 'ZM',
    'Mozambique': 'MZ', 'Zimbabwe': 'ZW', 'Angola': 'AO', 'Botswana': 'BW',
    'Namibia': 'NA', 'Malawi': 'MW', 'Mali': 'ML', 'Niger': 'NE',
    'Democratic Republic of the Congo (DRC)': 'CD',
  };
  return map[name] || name.substring(0, 2).toUpperCase();
}

function deriveFlag(name: string): string {
  const map: Record<string, string> = {
    'Nigeria': '🇳🇬', 'Kenya': '🇰🇪', 'South Africa': '🇿🇦', 'Egypt': '🇪🇬',
    'Ghana': '🇬🇭', 'Rwanda': '🇷🇼', 'Tanzania': '🇹🇿', 'Ethiopia': '🇪🇹',
    'Senegal': '🇸🇳', "Côte d'Ivoire": '🇨🇮', 'Morocco': '🇲🇦', 'Tunisia': '🇹🇳',
    'Uganda': '🇺🇬', 'Cameroon': '🇨🇲', 'Algeria': '🇩🇿', 'Zimbabwe': '🇿🇼',
    'Botswana': '🇧🇼', 'Zambia': '🇿🇲', 'Angola': '🇦🇴', 'Mozambique': '🇲🇿',
    'Benin': '🇧🇯', 'Burkina Faso': '🇧🇫', 'Mali': '🇲🇱', 'Togo': '🇹🇬',
    'Congo': '🇨🇬', 'Democratic Republic of the Congo (DRC)': '🇨🇩',
  };
  return map[name] || '';
}
