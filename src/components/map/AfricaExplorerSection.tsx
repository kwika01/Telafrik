import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, TrendingUp, Building2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AfricaMapSVG, { COUNTRY_NAMES } from './AfricaMapSVG';
import CountryPanel from './CountryPanel';
import { useCountryMapStats } from '@/api/queries/useCompanies';
import { COUNTRY_META } from '@/utils/countryMeta';

// Build name→code lookup once from COUNTRY_META
const NAME_TO_CODE: Record<string, string> = {};
for (const [name, meta] of Object.entries(COUNTRY_META)) {
  NAME_TO_CODE[name.toLowerCase()] = meta.code;
}

// Flag emoji helper using regional indicator symbols
function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(code.toUpperCase().charCodeAt(0) + offset) +
    String.fromCodePoint(code.toUpperCase().charCodeAt(1) + offset);
}

// Map of all active countries in DB (sorted by count) for the bottom ticker
const REGION_COLORS: Record<string, string> = {
  'North Africa': 'bg-amber-500',
  'West Africa': 'bg-green-500',
  'East Africa': 'bg-blue-500',
  'Central Africa': 'bg-purple-500',
  'Southern Africa': 'bg-rose-500',
};

const AfricaExplorerSection = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const { data: countryStats, isLoading } = useCountryMapStats();

  // Build Map<code, count> for choropleth coloring
  const startupCounts = useMemo(() => {
    const map = new Map<string, number>();
    if (!countryStats) return map;
    for (const [name, stats] of Object.entries(countryStats)) {
      const code = NAME_TO_CODE[name.toLowerCase()];
      if (code) map.set(code, stats.count);
    }
    return map;
  }, [countryStats]);

  // Total startups across all countries
  const totalStartups = useMemo(() => {
    if (!countryStats) return 0;
    return Object.values(countryStats).reduce((sum, s) => sum + s.count, 0);
  }, [countryStats]);

  const totalCountries = useMemo(() => {
    if (!countryStats) return 0;
    return Object.keys(countryStats).length;
  }, [countryStats]);

  // Build panel info for selected country
  const selectedInfo = useMemo(() => {
    if (!selectedCountry) return null;
    const name = COUNTRY_NAMES[selectedCountry] || selectedCountry;
    const stats = countryStats?.[name] || null;
    return {
      code: selectedCountry,
      name,
      flagEmoji: countryCodeToFlag(selectedCountry),
      startupCount: stats?.count || 0,
      topSectors: stats?.sectors || [],
      trendingStartups: (stats?.topCompanies || []).map(c => ({
        id: c.slug,
        name: c.name,
        sector: c.sector,
      })),
    };
  }, [selectedCountry, countryStats]);

  // Hover tooltip data
  const hoveredName = useMemo(() => {
    if (!hoveredCountry) return null;
    return COUNTRY_NAMES[hoveredCountry] || hoveredCountry;
  }, [hoveredCountry]);

  const hoveredCount = useMemo(() => {
    if (!hoveredCountry || !hoveredName) return 0;
    return countryStats?.[hoveredName]?.count || 0;
  }, [hoveredCountry, hoveredName, countryStats]);

  // Top 5 countries for the stat strip
  const topCountries = useMemo(() => {
    if (!countryStats) return [];
    return Object.entries(countryStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, stats]) => ({
        name,
        code: NAME_TO_CODE[name.toLowerCase()] || '',
        count: stats.count,
        flag: countryCodeToFlag(NAME_TO_CODE[name.toLowerCase()] || ''),
        topSector: stats.sectors[0]?.name || '',
      }));
  }, [countryStats]);

  const handleCountryClick = (code: string) => {
    setSelectedCountry(prev => (prev === code ? null : code));
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      {/* Background: subtle grid + radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.12) 0%, transparent 65%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 40px 40px, 40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-5">
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Explore by Region
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Africa's Startup Ecosystems
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Click any country to discover startups, top sectors, and the emerging leaders shaping Africa's future.
          </p>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { icon: Building2, value: isLoading ? '...' : totalStartups.toLocaleString(), label: 'Startups Tracked' },
            { icon: MapPin, value: isLoading ? '...' : totalCountries.toString(), label: 'Active Countries' },
            { icon: TrendingUp, value: topCountries[0]?.name || '...', label: 'Top Ecosystem' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Icon className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">{value}</p>
                <p className="text-slate-500 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map + Panel grid */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Left: Map */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Hover tooltip */}
              <AnimatePresence>
                {hoveredCountry && !selectedCountry && hoveredName && (
                  <motion.div
                    key={hoveredCountry}
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                  >
                    <div className="flex items-center gap-2.5 bg-slate-800/95 backdrop-blur border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl">
                      <span className="text-lg">{countryCodeToFlag(hoveredCountry)}</span>
                      <span className="font-semibold text-white text-sm">{hoveredName}</span>
                      {hoveredCount > 0 && (
                        <span className="ml-1 bg-emerald-500/20 text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-full">
                          {hoveredCount} startups
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Map card */}
              <div className="bg-slate-900/70 backdrop-blur border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <AfricaMapSVG
                  hoveredCountry={hoveredCountry}
                  selectedCountry={selectedCountry}
                  onCountryHover={setHoveredCountry}
                  onCountryClick={handleCountryClick}
                  startupCounts={startupCounts}
                  className="w-full"
                />
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-1 mt-3 flex-wrap">
                <span className="text-slate-500 text-xs mr-1">Startups:</span>
                {[
                  { label: '0', color: 'hsl(220,15%,88%)' },
                  { label: '1–4', color: 'hsl(158,55%,82%)' },
                  { label: '5–19', color: 'hsl(158,65%,68%)' },
                  { label: '20–49', color: 'hsl(158,72%,54%)' },
                  { label: '50–99', color: 'hsl(158,80%,44%)' },
                  { label: '100–199', color: 'hsl(158,88%,36%)' },
                  { label: '200+', color: 'hsl(158,95%,28%)' },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1 mr-2">
                    <div
                      className="w-3 h-3 rounded-sm border border-white/10"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-slate-400 text-[10px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Panel */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {selectedInfo ? (
                <CountryPanel
                  key={selectedInfo.code}
                  countryCode={selectedInfo.code}
                  countryName={selectedInfo.name}
                  flagEmoji={selectedInfo.flagEmoji}
                  startupCount={selectedInfo.startupCount}
                  topSectors={selectedInfo.topSectors}
                  trendingStartups={selectedInfo.trendingStartups}
                  onClose={() => setSelectedCountry(null)}
                  isLoading={isLoading}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900/70 backdrop-blur border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* Top: click prompt */}
                  <div className="px-6 pt-8 pb-6 text-center border-b border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-7 w-7 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">Select a Country</h3>
                    <p className="text-slate-400 text-sm">
                      Click any country on the map to explore its startup ecosystem.
                    </p>
                  </div>

                  {/* Bottom: top countries preview */}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                      Top Ecosystems
                    </p>
                    <div className="space-y-2">
                      {topCountries.map((c, i) => (
                        <button
                          key={c.code}
                          onClick={() => handleCountryClick(c.code)}
                          className="w-full flex items-center gap-3 hover:bg-white/5 rounded-xl px-3 py-2.5 transition-colors group text-left"
                        >
                          <span className="text-slate-400 text-xs w-4 font-mono">{i + 1}</span>
                          <span className="text-xl">{c.flag}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{c.name}</p>
                            <p className="text-slate-500 text-xs truncate">{c.topSector}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-emerald-400 text-sm font-bold tabular-nums">{c.count}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>

                    <Link
                      to="/directory"
                      className="mt-5 flex items-center justify-center gap-2 w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-sm font-medium rounded-xl py-3 transition-colors"
                    >
                      Browse All Startups
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AfricaExplorerSection;
