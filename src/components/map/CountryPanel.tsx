import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Layers, ArrowRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CountryPanelProps {
  countryCode: string | null;
  countryName: string;
  flagEmoji: string;
  startupCount: number;
  topSectors: { name: string; count: number }[];
  trendingStartups: { id: string; name: string; sector: string }[];
  onClose: () => void;
  className?: string;
}

const CountryPanel = ({
  countryCode,
  countryName,
  flagEmoji,
  startupCount,
  topSectors,
  trendingStartups,
  onClose,
  className,
}: CountryPanelProps) => {
  // Calculate max count for progress bars
  const maxSectorCount = Math.max(...topSectors.map(s => s.count), 1);

  return (
    <AnimatePresence>
      {countryCode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'bg-card border border-border rounded-xl shadow-lg overflow-hidden',
            className
          )}
        >
          {/* Header with accent bar */}
          <div className="bg-emerald/5 border-b border-border px-5 py-4 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">{flagEmoji}</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground leading-tight">{countryName}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1">Startup Ecosystem</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground -mt-1 -mr-1"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            {/* Stats card */}
            <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-3">
              <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5 text-emerald" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground leading-none">{startupCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Startups Tracked</p>
              </div>
            </div>

            {/* Top Sectors with mini progress bars */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-3.5 w-3.5 text-indigo" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Top Sectors</span>
              </div>
              {topSectors.length > 0 ? (
                <div className="space-y-2.5">
                  {topSectors.slice(0, 4).map((sector) => (
                    <div key={sector.name} className="group">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{sector.name}</span>
                        <span className="text-xs font-medium text-muted-foreground tabular-nums">{sector.count}</span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo/40 rounded-full transition-all duration-300"
                          style={{ width: `${(sector.count / maxSectorCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No sector data available</p>
              )}
            </div>

            {/* Trending Startups */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-terracotta" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notable Startups</span>
              </div>
              {trendingStartups.length > 0 ? (
                <div className="space-y-1">
                  {trendingStartups.slice(0, 3).map((startup, index) => (
                    <Link
                      key={startup.id}
                      to={`/startup/${startup.id}`}
                      className="flex items-center gap-3 text-sm hover:bg-muted/50 rounded-lg px-2 py-2 -mx-2 transition-colors group"
                    >
                      <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {index + 1}
                      </span>
                      <span className="text-foreground font-medium flex-1 truncate">{startup.name}</span>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded flex-shrink-0">
                        {startup.sector}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No notable startups yet</p>
              )}
            </div>

            {/* Action */}
            <Button asChild className="w-full group" size="sm">
              <Link to={`/directory?country=${countryCode}`}>
                View All {startupCount} Startups
                <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountryPanel;
