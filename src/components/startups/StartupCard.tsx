import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, ExternalLink, Building2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { CompanyListItem } from '@/types/domain';
import { formatCurrency } from '@/types/domain';

interface StartupCardProps {
  company: CompanyListItem;
  featured?: boolean;
}

const StartupCard = ({ company, featured = false }: StartupCardProps) => {
  const isTrending = (company.trendingScore || 0) > 50;
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        to={`/startup/${company.slug}`}
        className={`group block bg-card rounded-xl border border-border hover:border-emerald/30 hover:shadow-lg transition-all duration-200 ${
          featured ? 'p-6' : 'p-5'
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div 
            className={`flex-shrink-0 ${featured ? 'w-14 h-14' : 'w-11 h-11'} rounded-lg bg-muted overflow-hidden flex items-center justify-center`}
          >
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=6366f1&color=fff&size=128`;
                }}
              />
            ) : (
              <Building2 className={`${featured ? 'h-7 w-7' : 'h-5 w-5'} text-muted-foreground`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold text-foreground group-hover:text-emerald transition-colors truncate ${featured ? 'text-lg' : 'text-base'}`}>
                {company.name}
              </h3>
              {isTrending && (
                <Badge variant="secondary" className="flex-shrink-0 text-[10px] bg-terracotta/10 text-terracotta border-0 gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" />
                  Hot
                </Badge>
              )}
              {company.isVerified && (
                <Badge variant="secondary" className="flex-shrink-0 text-[10px] bg-emerald/10 text-emerald border-0">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
              {company.tagline || 'No description available'}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {company.hqCountry && (
                <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                  <MapPin className="h-3 w-3 text-gold" />
                  {company.hqCountry.name}
                </span>
              )}
              {company.sector && (
                <span className="px-2 py-0.5 rounded bg-indigo/10 text-indigo font-medium">
                  {company.sector.name}
                </span>
              )}
              {company.yearFounded && (
                <span className="px-2 py-0.5 rounded bg-muted">
                  Est. {company.yearFounded}
                </span>
              )}
            </div>
          </div>

          {/* External link icon */}
          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>

        {/* Financial Metrics */}
        {(company.totalFundingUsd > 0) && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wider">
                <DollarSign className="h-3 w-3 text-gold" />
                Total Raised
              </span>
              <span className="text-sm font-bold text-gold">
                {formatCurrency(company.totalFundingUsd)}
              </span>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default StartupCard;
