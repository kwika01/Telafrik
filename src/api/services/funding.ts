/**
 * Funding Service - uses actual DB schema (funding_rounds table)
 */
import { supabase } from '@/integrations/supabase/client';

export interface LatestDeal {
  company: string;
  amount: string;
  round: string;
  date: string;
  sector: string;
}

export interface Deal {
  id: string;
  company: string;
  companySlug: string;
  amount: string;
  amountUsd: number | null;
  round: string;
  date: string;
  investors: string[];
  sector: string;
  country: string;
  valuation: string;
}

function formatAmount(amountUsd: number | null): string {
  if (amountUsd == null || amountUsd === 0) return '—';
  if (amountUsd >= 1_000_000_000) return `$${(amountUsd / 1_000_000_000).toFixed(1)}B`;
  if (amountUsd >= 1_000_000) return `$${(amountUsd / 1_000_000).toFixed(0)}M`;
  if (amountUsd >= 1_000) return `$${(amountUsd / 1_000).toFixed(1)}K`;
  return `$${amountUsd}`;
}

export async function getLatestFundingRounds(limit = 5): Promise<LatestDeal[]> {
  const { data, error } = await supabase
    .from('funding_rounds')
    .select('id, stage, amount_usd, date, companies:company_id(name, sectors:sector_id(name))')
    .order('date', { ascending: false })
    .limit(limit);

  if (error) {
    console.warn('funding_rounds not available:', error.message);
    return [];
  }

  return (data || []).map((row: any) => ({
    company: row.companies?.name ?? '—',
    amount: formatAmount(row.amount_usd),
    round: row.stage || '—',
    date: row.date || '—',
    sector: row.companies?.sectors?.name ?? '—',
  }));
}

export async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('funding_rounds')
    .select('id, stage, amount_usd, date, valuation_usd, companies:company_id(name, slug, sectors:sector_id(name), countries:hq_country_id(name))')
    .order('date', { ascending: false });

  if (error) {
    console.warn('funding_rounds not available:', error.message);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    company: row.companies?.name ?? '—',
    companySlug: row.companies?.slug ?? '',
    amount: formatAmount(row.amount_usd),
    amountUsd: row.amount_usd,
    round: row.stage || '—',
    date: row.date || '—',
    investors: [],
    sector: row.companies?.sectors?.name ?? '—',
    country: row.companies?.countries?.name ?? '—',
    valuation: formatAmount(row.valuation_usd),
  }));
}
