import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { CompanyListItem } from '@/types/domain';

interface StartupCardProps {
  company: CompanyListItem;
  featured?: boolean;
}

const StartupCard = ({ company }: StartupCardProps) => {
  const isTrending = (company.trendingScore || 0) > 50;

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // Show valuation range as-is from DB (e.g. "$2.5B - $3.5B"), fallback to parsed number
  const valuationDisplay = company.valuation_range
    ? company.valuation_range
    : company.valuationUsd && company.valuationUsd > 0
      ? `$${(company.valuationUsd / 1e6).toFixed(0)}M`
      : null;

  const revenueDisplay = company.revenue_range || null;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        to={`/startup/${company.slug}`}
        className="group relative block bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-200 p-5 overflow-hidden"
      >
        {/* Top accent bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-emerald-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Logo */}
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-muted border border-border flex items-center justify-center">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-xs font-bold text-muted-foreground">{getInitials(company.name)}</span>
              )}
            </div>

            {/* Name + badges */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                  {company.name}
                </h3>
                {isTrending && (
                  <Badge className="text-[9px] bg-amber-100 text-amber-700 border-0 px-1.5 py-0 h-4 font-semibold">
                    <TrendingUp className="h-2.5 w-2.5 mr-0.5" />Trending
                  </Badge>
                )}
              </div>
              {/* Location + Sector */}
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {company.hqCountry && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {company.hqCountry.flagEmoji && <span>{company.hqCountry.flagEmoji}</span>}
                    {company.hqCountry.name}
                  </span>
                )}
                {company.sector && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                    {company.sector.name}
                  </span>
                )}
                {company.stage && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                    {company.stage}
                  </span>
                )}
              </div>
            </div>
          </div>

          <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:opacity-100 transition-all flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100" />
        </div>

        {/* Description */}
        {(company.tagline || company.description) && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {company.tagline || company.description}
          </p>
        )}

        {/* Metrics - always show, use DB values directly */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
          <div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
              Valuation
            </p>
            <p className={`text-sm font-bold ${valuationDisplay ? 'text-foreground' : 'text-muted-foreground/40'}`}>
              {valuationDisplay || '—'}
            </p>
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5 font-medium">
              Revenue
            </p>
            <p className={`text-sm font-bold ${revenueDisplay ? 'text-emerald-600' : 'text-muted-foreground/40'}`}>
              {revenueDisplay || '—'}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StartupCard;
