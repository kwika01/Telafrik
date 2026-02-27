import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CompanyListItem } from '@/types/domain';

interface StartupCardProps {
  company: CompanyListItem;
  featured?: boolean;
  index?: number;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const StartupCard = ({ company, featured, index = 0 }: StartupCardProps) => {
  const isTrending = (company.trendingScore || 0) >= 40;

  const valuationDisplay = company.valuation_range
    ? company.valuation_range.trim()
    : null;

  const totalRaisedDisplay =
    company.totalFundingUsd && company.totalFundingUsd > 0
      ? company.totalFundingUsd >= 1e9
        ? `$${(company.totalFundingUsd / 1e9).toFixed(1)}B`
        : `$${(company.totalFundingUsd / 1e6).toFixed(0)}M`
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
    >
      <Link
        to={`/startup/${company.slug}`}
        className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden h-full"
      >
        {/* Card header — avatar row then full-width name */}
        <div className="p-5 pb-3">
          {/* Avatar + trending pill on same row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-none w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-14 h-14 object-cover rounded-2xl"
                />
              ) : (
                <span className="text-lg font-extrabold text-white tracking-wider select-none leading-none">
                  {getInitials(company.name)}
                </span>
              )}
            </div>
            {isTrending && (
              <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-semibold border border-amber-100">
                <TrendingUp className="h-2.5 w-2.5" />
                Hot
              </span>
            )}
          </div>

          {/* Full-width name — always visible, never truncated */}
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
            {company.name}
          </h3>

          {/* Stage + Sector chips */}
          <div className="flex flex-wrap gap-1.5">
            {company.stage && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                {company.stage}
              </span>
            )}
            {company.sector && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                {company.sector.name}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {(company.tagline || company.description) && (
          <div className="px-5 pb-4">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {company.tagline || company.description}
            </p>
          </div>
        )}

        {/* Location + year */}
        <div className="px-5 pb-4 flex items-center gap-3 text-xs text-muted-foreground">
          {company.hqCountry && (
            <span className="flex items-center gap-1">
              {company.hqCountry.flagEmoji && <span>{company.hqCountry.flagEmoji}</span>}
              <MapPin className="h-3 w-3" />
              {company.hqCountry.name}
            </span>
          )}
          {company.yearFounded && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {company.yearFounded}
            </span>
          )}
        </div>

        {/* Stats footer */}
        <div className="mt-auto grid grid-cols-2 border-t border-border/60">
          <div className="px-4 py-3 border-r border-border/60 min-w-0 overflow-hidden">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5 font-medium">Valuation</p>
            <p className={`text-xs font-bold truncate ${valuationDisplay ? 'text-foreground' : 'text-muted-foreground/40'}`}>
              {valuationDisplay || '—'}
            </p>
          </div>
          <div className="px-4 py-3 min-w-0 overflow-hidden">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5 font-medium">Total Raised</p>
            <p className={`text-xs font-bold truncate ${totalRaisedDisplay ? 'text-primary' : 'text-muted-foreground/40'}`}>
              {totalRaisedDisplay || '—'}
            </p>
          </div>
        </div>

        {/* Featured founder strip */}
        {featured && company.founder && (
          <div className="px-5 py-3 border-t border-border/60 flex items-center gap-1.5 bg-slate-50/60">
            <span className="text-[11px] text-muted-foreground">Founded by</span>
            <span className="text-[11px] font-semibold text-foreground truncate">{company.founder}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default StartupCard;
