/**
 * Countries Service
 * 
 * Supabase queries for country data.
 */
import { supabase } from '@/integrations/supabase/client';
import type { Country } from '@/types/domain';

/**
 * Fetches all countries
 */
export async function getCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from('countries')
    .select(`
      id,
      name,
      code,
      region,
      flag_emoji
    `)
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    code: row.code,
    region: row.region,
    flagEmoji: row.flag_emoji || '',
  }));
}

/**
 * Fetches countries with company counts
 */
export async function getCountriesWithCounts(): Promise<(Country & { startupCount: number })[]> {
  const { data, error } = await supabase
    .from('countries')
    .select(`
      id,
      name,
      code,
      region,
      flag_emoji
    `)
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }

  // Get company counts per country
  const { data: counts, error: countError } = await supabase
    .from('companies')
    .select('hq_country_id')
    .not('hq_country_id', 'is', null);

  if (countError) {
    console.warn('Could not fetch company counts:', countError.message);
  }

  // Count companies per country
  const countMap = new Map<string, number>();
  counts?.forEach((row: any) => {
    const countryId = row.hq_country_id;
    countMap.set(countryId, (countMap.get(countryId) || 0) + 1);
  });

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    code: row.code,
    region: row.region,
    flagEmoji: row.flag_emoji || '',
    startupCount: countMap.get(row.id) || 0,
  }));
}

/**
 * Fetches a single country by code
 */
export async function getCountryByCode(code: string): Promise<Country | null> {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('code', code)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch country: ${error.message}`);
  }

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    region: data.region,
    flagEmoji: data.flag_emoji || '',
  };
}
