import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Startup } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import ConfidenceIndicator from './ConfidenceIndicator';

interface StartupCardProps {
  startup: Startup;
  featured?: boolean;
}

const StartupCard = ({ startup, featured = false }: StartupCardProps) => {
  return (
    <Link
      to={`/startup/${startup.slug}`}
      className={`group block bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${
        featured ? 'p-6' : 'p-5'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className={`flex-shrink-0 ${featured ? 'w-16 h-16' : 'w-12 h-12'} rounded-lg bg-secondary overflow-hidden`}>
          <img
            src={startup.logo}
            alt={startup.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors truncate ${featured ? 'text-lg' : 'text-base'}`}>
              {startup.name}
            </h3>
            {startup.trending && (
              <Badge variant="secondary" className="flex-shrink-0 text-xs bg-accent/10 text-accent border-0">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
            {startup.tagline}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {startup.hqCountry}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary">
              {startup.sector}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary">
              {startup.stage}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="metric-label">Valuation</span>
            <ConfidenceIndicator 
              score={startup.valuation.confidenceScore} 
              source={startup.valuation.source}
              size="sm"
            />
          </div>
          <p className="text-sm font-semibold text-foreground">{startup.valuation.range}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="metric-label">Total Raised</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{startup.totalFunding}</p>
        </div>
      </div>
    </Link>
  );
};

export default StartupCard;
