/**
 * Funding Service
 *
 * TelAfrik: deals from "TelAfrik Investors Companies" (fund_name, fund_amount)
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

function parseAmount(val: string | null | undefined): number | null {
  if (!val) return null;
  const raw = String(val).replace(/[$,KMB]/g, '');
  const num = parseFloat(raw);
  if (isNaN(num)) return null;
  if (String(val).includes('B')) return num * 1e9;
  if (String(val).includes('M')) return num * 1e6;
  if (String(val).includes('K')) return num * 1e3;
  return num;
}

/**
 * Fetches latest deals (TelAfrik Investors Companies)
 */
export async function getLatestFundingRounds(limit = 5): Promise<LatestDeal[]> {
  const { data, error } = await supabase
    .from('TelAfrik Investors Companies')
    .select('id, fund_name, fund_amount')
    .limit(limit * 3);

  if (error) {
    console.warn('TelAfrik Investors Companies not available:', error.message);
    return [];
  }

  const seen = new Set<string>();
  const deals: LatestDeal[] = [];
  for (const row of data || []) {
    const r = row as { id: string; fund_name: string; fund_amount?: string };
    const key = `${r.fund_name}-${r.fund_amount}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deals.push({
      company: r.fund_name ?? '—',
      amount: r.fund_amount ?? '—',
      round: '—',
      date: '—',
      sector: '—',
    });
    if (deals.length >= limit) break;
  }
  return deals;
}

/**
 * Fetches all deals for Deals page (TelAfrik Investors Companies)
 */
export async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('TelAfrik Investors Companies')
    .select('id, fund_name, fund_amount');

  if (error) {
    console.warn('TelAfrik Investors Companies not available:', error.message);
    return [];
  }

  return (data || []).map((row: { id: string; fund_name: string; fund_amount?: string }) => {
    const amountUsd = parseAmount(row.fund_amount);
    return {
      id: String(row.id),
      company: row.fund_name ?? '—',
      companySlug: (row.fund_name ?? '').toLowerCase().replace(/\s+/g, '-'),
      amount: row.fund_amount ?? formatAmount(amountUsd),
      amountUsd,
      round: '—',
      date: '—',
      investors: [row.fund_name].filter(Boolean),
      sector: '—',
      country: '—',
      valuation: '—',
    };
  });
}
