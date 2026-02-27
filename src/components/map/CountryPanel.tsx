import { Link } from 'react-router-dom';
import { Building2, Layers, ArrowRight, X, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountryPanelProps {
  countryCode: string | null;
  countryName: string;
  flagEmoji: string;
  startupCount: number;
  topSectors: { name: string; count: number }[];
  trendingStartups: { id: string; name: string; sector: string }[];
  onClose: () => void;
  isLoading?: boolean;
  className?: string;
}

const CountryPanel = ({
  countryCode,
  countryName,
  flagEmoji,
  startupCount,
  topSectors = [],
  trendingStartups = [],
  onClose,
  isLoading = false,
}: CountryPanelProps) => {
  const maxSectorCount = Math.max(...(topSectors ?? []).map(s => s.count), 1);

  return (
    <AnimatePresence>
      {countryCode && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-slate-900/70 backdrop-blur border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-500/10 to-transparent border-b border-white/5 px-6 py-5">
            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500/0" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none">{flagEmoji}</span>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{countryName}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Startup Ecosystem</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white -mt-0.5"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            {/* Startup count stat */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-xl p-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none tabular-nums">
                  {startupCount.toLocaleString()}
                </p>
                <p className="text-slate-400 text-xs mt-1">Startups Tracked</p>
              </div>
            </div>

            {/* Top Sectors */}
            <div>
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                  <span>Loading ecosystem data…</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Top Sectors
                </span>
              </div>
              {topSectors.length > 0 ? (
                <div className="space-y-3">
                  {topSectors.slice(0, 4).map((sector, i) => (
                    <div key={sector.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-slate-200 font-medium">{sector.name}</span>
                        <span className="text-xs font-semibold text-emerald-400 tabular-nums">
                          {sector.count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${(sector.count / maxSectorCount) * 100}%` }}
                          transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No sector data available</p>
              )}
            </div>

            {/* Notable Startups */}
            {trendingStartups.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Notable Startups
                  </span>
                </div>
                <div className="space-y-1">
                  {trendingStartups.slice(0, 4).map((startup, index) => (
                    <Link
                      key={startup.id}
                      to={`/startup/${startup.id}`}
                      className="flex items-center gap-3 text-sm hover:bg-white/5 rounded-xl px-3 py-2.5 -mx-1 transition-colors group"
                    >
                      <span className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-slate-200 font-medium flex-1 truncate group-hover:text-white transition-colors">
                        {startup.name}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0 truncate max-w-[70px]">
                        {startup.sector}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              to={`/directory?country=${encodeURIComponent(countryName)}`}
              className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-xl py-3 transition-colors group"
            >
              View All {startupCount} Startups
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountryPanel;
