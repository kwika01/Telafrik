/**
 * Country metadata utilities - ISO codes, flag emojis, and region mapping
 * for the African countries tracked by TelAfrik.
 */
import type { AfricanRegion } from '@/types/domain';

interface CountryMeta {
  code: string;
  region: AfricanRegion;
}

export const COUNTRY_META: Record<string, CountryMeta> = {
  'Algeria': { code: 'DZ', region: 'North Africa' },
  'Angola': { code: 'AO', region: 'Southern Africa' },
  'Benin': { code: 'BJ', region: 'West Africa' },
  'Botswana': { code: 'BW', region: 'Southern Africa' },
  'Burkina Faso': { code: 'BF', region: 'West Africa' },
  'Burundi': { code: 'BI', region: 'East Africa' },
  'Cabo Verde': { code: 'CV', region: 'West Africa' },
  'Cape Verde': { code: 'CV', region: 'West Africa' },
  'Cameroon': { code: 'CM', region: 'Central Africa' },
  'Central African Republic': { code: 'CF', region: 'Central Africa' },
  'Chad': { code: 'TD', region: 'Central Africa' },
  'Comoros': { code: 'KM', region: 'East Africa' },
  'Congo': { code: 'CG', region: 'Central Africa' },
  'DRC': { code: 'CD', region: 'Central Africa' },
  'Democratic Republic of the Congo': { code: 'CD', region: 'Central Africa' },
  "Côte d'Ivoire": { code: 'CI', region: 'West Africa' },
  "Cote d'Ivoire": { code: 'CI', region: 'West Africa' },
  'Ivory Coast': { code: 'CI', region: 'West Africa' },
  'Djibouti': { code: 'DJ', region: 'East Africa' },
  'Egypt': { code: 'EG', region: 'North Africa' },
  'Equatorial Guinea': { code: 'GQ', region: 'Central Africa' },
  'Eritrea': { code: 'ER', region: 'East Africa' },
  'Eswatini': { code: 'SZ', region: 'Southern Africa' },
  'Swaziland': { code: 'SZ', region: 'Southern Africa' },
  'Ethiopia': { code: 'ET', region: 'East Africa' },
  'Gabon': { code: 'GA', region: 'Central Africa' },
  'Gambia': { code: 'GM', region: 'West Africa' },
  'The Gambia': { code: 'GM', region: 'West Africa' },
  'Ghana': { code: 'GH', region: 'West Africa' },
  'Guinea': { code: 'GN', region: 'West Africa' },
  'Guinea-Bissau': { code: 'GW', region: 'West Africa' },
  'Kenya': { code: 'KE', region: 'East Africa' },
  'Lesotho': { code: 'LS', region: 'Southern Africa' },
  'Liberia': { code: 'LR', region: 'West Africa' },
  'Libya': { code: 'LY', region: 'North Africa' },
  'Madagascar': { code: 'MG', region: 'Southern Africa' },
  'Malawi': { code: 'MW', region: 'Southern Africa' },
  'Mali': { code: 'ML', region: 'West Africa' },
  'Mauritania': { code: 'MR', region: 'West Africa' },
  'Mauritius': { code: 'MU', region: 'Southern Africa' },
  'Morocco': { code: 'MA', region: 'North Africa' },
  'Mozambique': { code: 'MZ', region: 'Southern Africa' },
  'Namibia': { code: 'NA', region: 'Southern Africa' },
  'Niger': { code: 'NE', region: 'West Africa' },
  'Nigeria': { code: 'NG', region: 'West Africa' },
  'Rwanda': { code: 'RW', region: 'East Africa' },
  'São Tomé and Príncipe': { code: 'ST', region: 'Central Africa' },
  'Senegal': { code: 'SN', region: 'West Africa' },
  'Seychelles': { code: 'SC', region: 'East Africa' },
  'Sierra Leone': { code: 'SL', region: 'West Africa' },
  'Somalia': { code: 'SO', region: 'East Africa' },
  'South Africa': { code: 'ZA', region: 'Southern Africa' },
  'South Sudan': { code: 'SS', region: 'East Africa' },
  'Sudan': { code: 'SD', region: 'North Africa' },
  'Tanzania': { code: 'TZ', region: 'East Africa' },
  'Togo': { code: 'TG', region: 'West Africa' },
  'Tunisia': { code: 'TN', region: 'North Africa' },
  'Uganda': { code: 'UG', region: 'East Africa' },
  'Western Sahara': { code: 'EH', region: 'North Africa' },
  'Zambia': { code: 'ZM', region: 'Southern Africa' },
  'Zimbabwe': { code: 'ZW', region: 'Southern Africa' },
};

/** Convert ISO 3166-1 alpha-2 code to flag emoji */
export function codeToFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1a5 + c.charCodeAt(0)))
    .join('');
}

/** Get country metadata (code, region, flag) for a given country name */
export function getCountryMeta(name: string): CountryMeta & { flagEmoji: string } {
  const meta = COUNTRY_META[name] || COUNTRY_META[name?.trim()] || {
    code: (name || '??').trim().substring(0, 2).toUpperCase(),
    region: 'West Africa' as AfricanRegion,
  };
  return { ...meta, flagEmoji: codeToFlag(meta.code) };
}
