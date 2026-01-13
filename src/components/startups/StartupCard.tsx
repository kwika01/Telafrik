import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, ExternalLink, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Startup } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import ConfidenceIndicator from './ConfidenceIndicator';

interface StartupCardProps {
  startup: Startup;
  featured?: boolean;
}

const StartupCard = ({ startup, featured = false }: StartupCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/startup/${startup.slug}`}
        className={`group block bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${
          featured ? 'p-6' : 'p-5'
        } relative overflow-hidden`}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <motion.div 
              className={`flex-shrink-0 ${featured ? 'w-16 h-16' : 'w-12 h-12'} rounded-xl bg-gradient-to-br from-secondary to-secondary/50 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all`}
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(startup.name)}&background=6366f1&color=fff&size=128`;
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors truncate ${featured ? 'text-lg' : 'text-base'}`}>
                  {startup.name}
                </h3>
                {startup.trending && (
                  <Badge variant="secondary" className="flex-shrink-0 text-xs bg-gradient-to-r from-accent/20 to-orange-500/20 text-accent border-0 animate-pulse">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {startup.recentlyFunded && !startup.trending && (
                  <Badge variant="secondary" className="flex-shrink-0 text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 border-0">
                    💰 Funded
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-3 group-hover:text-foreground/70 transition-colors">
                {startup.tagline}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full">
                  <MapPin className="h-3 w-3 text-primary" />
                  {startup.hqCountry}
                </span>
                <span className="px-2 py-1 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 text-primary font-medium">
                  {startup.sector}
                </span>
                <span className="px-2 py-1 rounded-full bg-secondary/50">
                  {startup.stage}
                </span>
              </div>
            </div>

            {/* External link icon */}
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>

          {/* Financial Metrics */}
          <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
            <div className="group/metric">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Valuation</span>
                <ConfidenceIndicator 
                  score={startup.valuation.confidenceScore} 
                  source={startup.valuation.source}
                  size="sm"
                />
              </div>
              <p className="text-sm font-bold text-foreground group-hover/metric:text-primary transition-colors">
                {startup.valuation.range}
              </p>
            </div>
            <div className="group/metric">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Raised</span>
              </div>
              <p className="text-sm font-bold text-foreground group-hover/metric:text-accent transition-colors">
                {startup.totalFunding}
              </p>
            </div>
          </div>

          {/* Founders preview on featured cards */}
          {featured && startup.founders.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Building2 className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Founded by <span className="text-foreground font-medium">{startup.founders[0].name}</span>
                  {startup.founders.length > 1 && ` +${startup.founders.length - 1}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default StartupCard;
