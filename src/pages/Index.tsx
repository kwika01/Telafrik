import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, DollarSign, Building2, Users, Globe, Zap, Sparkles, Loader2, MapPin, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import { AfricaMapSVG, CountryPanel, COUNTRY_NAMES } from '@/components/map';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import { useTrendingCompanies } from '@/api/queries/useCompanies';
import { useSectors } from '@/api/queries/useSectors';
import { useCountries, useCountriesWithCounts, useCountryEcosystem } from '@/api/queries/useCountries';
import { useDashboardStats } from '@/api/queries/useDashboard';

const Index = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [particleColor, setParticleColor] = useState("#10b981");

  const { data: trendingCompanies = [], isLoading: trendingLoading } = useTrendingCompanies(6);
  const { data: sectors = [] } = useSectors();
  const { data: countries = [] } = useCountries();
  const { data: countriesWithCounts = [] } = useCountriesWithCounts();
  const { data: dashboardStats } = useDashboardStats();
  const { data: countryEcosystem, isLoading: ecosystemLoading } = useCountryEcosystem(selectedCountry);

  // Detect dark mode via DOM class
  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setParticleColor(isDark ? '#ffffff' : '#10b981');
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const startupCountsByCode = useMemo(() => {
    const m = new Map<string, number>();
    countriesWithCounts.forEach((c: { code: string; startupCount: number }) => {
      m.set(c.code, c.startupCount);
    });
    return m;
  }, [countriesWithCounts]);

  const selectedCountryInfo = useMemo(() => {
    if (!selectedCountry) return null;
    const country = countries.find((c: { code: string }) => c.code === selectedCountry);
    const ecosystem = countryEcosystem ?? { startupCount: 0, topSectors: [], trendingStartups: [] };
    const countFromMap = startupCountsByCode.get(selectedCountry) ?? 0;
    return {
      code: selectedCountry,
      name: country?.name || COUNTRY_NAMES[selectedCountry] || selectedCountry,
      flagEmoji: country?.flagEmoji || '🌍',
      startupCount: ecosystem.startupCount || countFromMap,
      topSectors: ecosystem.topSectors,
      trendingStartups: ecosystem.trendingStartups,
      isLoading: ecosystemLoading,
    };
  }, [selectedCountry, countries, countryEcosystem, ecosystemLoading, startupCountsByCode]);

  const hoveredCountryName = useMemo(() => {
    if (!hoveredCountry) return null;
    const country = countries.find(c => c.code === hoveredCountry);
    return country?.name || COUNTRY_NAMES[hoveredCountry] || hoveredCountry;
  }, [hoveredCountry, countries]);

  const handleCountryClick = (code: string) => {
    setSelectedCountry(selectedCountry === code ? null : code);
  };

  const trendingStartups = trendingCompanies.slice(0, 3);
  const recentlyFunded = trendingCompanies.slice(3, 7);

  // Use top 10 sectors and 15 top countries for display
  const displaySectors = sectors.slice(0, 10);
  const displayCountries = countries.slice(0, 15);

  // Stats with African accent colors (from Supabase)
  const formatFunding = (n: number) =>
    n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(0)}M` : `$${n.toLocaleString()}`;
  const stats = [
    { label: 'Startups Tracked', value: dashboardStats ? `${dashboardStats.totalCompanies.toLocaleString()}+` : '—', icon: Building2, accent: 'emerald' as const },
    { label: 'Total Funding', value: dashboardStats ? formatFunding(dashboardStats.totalFundingUsd) : '—', icon: DollarSign, accent: 'gold' as const },
    { label: 'Investors', value: dashboardStats ? `${dashboardStats.totalInvestors.toLocaleString()}+` : '—', icon: Users, accent: 'indigo' as const },
    { label: 'Countries', value: dashboardStats ? String(dashboardStats.countriesCovered) : '—', icon: Globe, accent: 'terracotta' as const },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout>
      {/* Split Hero Section */}
      <section className="relative bg-background border-b border-border overflow-hidden min-h-[520px]">
        {/* Particles Background - needs explicit h-full to fill parent */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Particles
            className="w-full h-full"
            quantity={120}
            ease={80}
            color={particleColor}
            staticity={40}
            size={0.5}
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Hero Content */}
            <motion.div 
              className="lg:py-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Eyebrow */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-foreground text-sm font-medium mb-6"
              >
                <Sparkles className="h-4 w-4 text-gold" />
                Africa's Investment Intelligence Platform
              </motion.div>
              
              {/* Headline */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-[1.15] tracking-tight"
              >
                Discover Africa's Most{' '}
                <span className="text-emerald">Promising Startups</span>
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg"
              >
                Track funding rounds, valuations, and growth metrics across {dashboardStats ? `${dashboardStats.totalCompanies.toLocaleString()}+` : '2,400+'}{' '}startups in {dashboardStats ? dashboardStats.countriesCovered : 54} African countries.
              </motion.p>

              {/* Search */}
              <motion.div 
                variants={itemVariants}
                className="mb-6"
              >
                <GlobalSearch size="lg" />
              </motion.div>

              {/* Popular searches */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <span className="text-muted-foreground mr-1">Popular:</span>
                {['Fintech', 'Nigeria', 'Series A', 'Healthtech'].map((term) => (
                  <Link
                    key={term}
                    to={`/search?q=${term}`}
                    className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground text-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column: Africa Map Intelligence Spotlight */}
            <div className="relative lg:-mr-8 lg:-mt-8 lg:-mb-8">
              {/* INTELLIGENCE SPOTLIGHT CONTAINER */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-surface-alt/60 backdrop-blur-sm border border-border/40 shadow-elevated p-6 lg:p-8">
                {/* ATMOSPHERIC DEPTH LAYER (Intelligence Lighting) */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Primary intelligence glow - emerald center */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-emerald/6 rounded-full blur-[100px]" />
                  {/* Secondary premium glow - gold bottom */}
                  <div className="absolute bottom-[15%] right-[20%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[80px]" />
                  {/* Subtle warm ambient edge */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald/[0.02] via-transparent to-gold/[0.015]" />
                </div>

                {/* CONTENT (relative to atmospheric layer) */}
                <div className="relative z-10">
                  {/* Map header - intelligence module styling */}
                  <div className="mb-4 pb-3 border-b border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-emerald rounded-full shadow-sm shadow-emerald/20" />
                    <h3 className="text-sm font-semibold text-foreground tracking-tight">Africa Startup Intelligence</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald/5 border border-emerald/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald uppercase tracking-wider">Live</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Interactive ecosystem map • Hover to preview • Click to explore
                </p>
              </div>

              {/* Premium hover tooltip */}
              {hoveredCountry && !selectedCountry && hoveredCountryName && (
                <div className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="bg-foreground/95 backdrop-blur-sm text-background rounded-xl px-5 py-3 shadow-2xl border border-background/10">
                    <div className="flex items-center gap-3.5">
                      <span className="font-semibold tracking-tight">{hoveredCountryName}</span>
                      <div className="flex items-center gap-1.5 text-background/70 text-xs border-l border-background/20 pl-3">
                        <div className="w-1 h-1 rounded-full bg-gold" />
                        <span className="font-medium tabular-nums">{startupCountsByCode.get(hoveredCountry) || 0} startups</span>
                      </div>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-foreground/95 rotate-45 border-b border-r border-background/10" />
                  </div>
                </div>
              )}

              {/* Premium Map Module Container */}
              <div className="relative">
                {/* CONTINENT AURA: Enhanced for spotlight context */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Primary emerald aura - centered on map */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-emerald/10 rounded-full blur-[80px]" />
                  {/* Secondary gold warmth - bottom right */}
                  <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-gold/8 rounded-full blur-[60px]" />
                </div>
                
                {/* Premium elevated container with enhanced authority */}
                <div className="map-container-premium relative shadow-[0_0_0_1px_hsl(var(--emerald)/0.08),0_20px_40px_-8px_hsl(222_47%_11%/0.18)]">
                  {/* DATA COLOR RAILS: Top emerald intelligence line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald/40 to-transparent" />
                  {/* Bottom gold micro glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
                  
                  {/* Map content area with premium background */}
                  <div className="map-content-area">
                    {/* Optional continental vignette */}
                    <div className="map-vignette" />
                    
                    <AfricaMapSVG
                      hoveredCountry={hoveredCountry}
                      selectedCountry={selectedCountry}
                      onCountryHover={setHoveredCountry}
                      onCountryClick={handleCountryClick}
                      startupCounts={startupCountsByCode}
                      className="w-full h-auto max-h-[380px] relative z-10"
                    />
                    
                    {/* Choropleth Legend */}
                    <div className="absolute bottom-4 right-4 z-20 bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl px-3 py-2">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Startups</p>
                      <div className="flex items-center gap-1">
                        {[
                          { color: 'hsl(158, 60%, 88%)', label: '<10' },
                          { color: 'hsl(158, 70%, 75%)', label: '30+' },
                          { color: 'hsl(158, 80%, 48%)', label: '60+' },
                          { color: 'hsl(158, 94%, 35%)', label: '100+' },
                        ].map(({ color, label }) => (
                          <div key={label} className="flex flex-col items-center gap-0.5">
                            <div className="w-5 h-3 rounded-sm" style={{ backgroundColor: color }} />
                            <span className="text-[8px] text-muted-foreground">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Country Panel - appears below map when selected */}
              {selectedCountryInfo && (
                <div className="mt-4">
                  <CountryPanel
                    countryCode={selectedCountryInfo.code}
                    countryName={selectedCountryInfo.name}
                    flagEmoji={selectedCountryInfo.flagEmoji}
                    startupCount={selectedCountryInfo.startupCount}
                    topSectors={selectedCountryInfo.topSectors}
                    trendingStartups={selectedCountryInfo.trendingStartups}
                    onClose={() => setSelectedCountry(null)}
                    isLoading={selectedCountryInfo.isLoading}
                  />
                </div>
              )}

              {/* Prompt to interact - only show when no country selected */}
              {!selectedCountry && (
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-sm shadow-gold/30" />
                    <span className="font-medium">Click any country to explore</span>
                  </div>
                </div>
              )}
                </div>
                {/* END: Content wrapper */}
              </div>
              {/* END: Intelligence Spotlight Container */}
            </div>
            {/* END: Right Column */}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container-wide relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Accent dots */}
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              <span className="font-semibold text-emerald">TelAfrik</span>{' '}by{' '}
              <span className="font-semibold text-foreground">Ennylytics</span>{' '}
              is the intelligence hub for the African startup ecosystem, utilizing deep data to identify{' '}
              <span className="text-foreground">high-potential ventures</span>{' '}
              and connect them with global investors looking for the continent's most promising opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container-wide">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {stats.map((stat) => {
              const accentClasses = {
                emerald: { bg: 'bg-emerald/10', text: 'text-emerald', border: 'border-emerald/20' },
                gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20' },
                indigo: { bg: 'bg-indigo/10', text: 'text-indigo', border: 'border-indigo/20' },
                terracotta: { bg: 'bg-terracotta/10', text: 'text-terracotta', border: 'border-terracotta/20' },
              }[stat.accent];

              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="text-center group"
                >
                  {/* Icon badge */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${accentClasses.bg} ${accentClasses.border} border mb-4`}>
                    <stat.icon className={`h-6 w-6 ${accentClasses.text}`} />
                  </div>
                  {/* Value */}
                  <div className={`text-3xl md:text-4xl font-bold mb-1 ${accentClasses.text}`}>
                    {stat.value}
                  </div>
                  {/* Label */}
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <motion.div 
            className="flex items-center justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-terracotta/10 flex items-center justify-center">
                  <TrendingUp className="h-3.5 w-3.5 text-terracotta" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
                  Trending Now
                </span>
              </div>
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Startups Gaining Momentum
              </h2>
              {/* Accent underline */}
              <div className="w-10 h-1 bg-terracotta/30 rounded-full" />
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex border-terracotta/20 hover:border-terracotta/40 hover:bg-terracotta/5">
              <Link to="/trending">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {trendingLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : trendingStartups.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {trendingStartups.map((company) => (
                <motion.div
                  key={company.id}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <StartupCard company={company} featured />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Trending startups will appear here once data is available.</p>
            </div>
          )}

          <div className="mt-8 md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link to="/trending">
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recently Funded */}
      {recentlyFunded.length > 0 && (
        <section className="section border-t border-border">
          <div className="container-wide">
            <motion.div 
              className="flex items-center justify-between mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                {/* Eyebrow */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center">
                    <DollarSign className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                    Fresh Capital
                  </span>
                </div>
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Recently Funded Startups
                </h2>
                {/* Accent underline */}
                <div className="w-10 h-1 bg-gold/30 rounded-full" />
              </div>
              <Button variant="outline" asChild className="hidden md:inline-flex border-gold/20 hover:border-gold/40 hover:bg-gold/5">
                <Link to="/directory?sort=recently-funded">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {recentlyFunded.map((company) => (
                <motion.div
                  key={company.id}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <StartupCard company={company} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Browse by Sector */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Eyebrow with icon */}
            <div className="inline-flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-indigo" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo">
                Explore Industries
              </span>
            </div>
            {/* Title with underline accent */}
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Browse by Sector
            </h2>
            {/* Accent underline */}
            <div className="w-12 h-1 bg-indigo/30 rounded-full mx-auto mb-4" />
            {/* Subtitle */}
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore African startups across key industries driving innovation and growth.
            </p>
          </motion.div>

          {displaySectors.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {displaySectors.map((sector) => (
                <motion.div
                  key={sector.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="group block p-5 rounded-xl border border-border bg-card hover:border-indigo/30 hover:shadow-lg transition-all text-center relative overflow-hidden"
                  >
                    {/* Subtle accent indicator on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <span className="text-2xl mb-2 block">{sector.icon}</span>
                    <span className="font-medium text-foreground group-hover:text-indigo transition-colors text-sm">
                      {sector.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Layers className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Sectors will appear here once data is available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Browse by Country */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Eyebrow with icon */}
            <div className="inline-flex items-center gap-2 mb-3">
              <Globe className="h-4 w-4 text-gold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Markets
              </span>
            </div>
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Top Startup Ecosystems
            </h2>
            {/* Accent underline */}
            <div className="w-12 h-1 bg-gold/30 rounded-full mx-auto mb-4" />
            {/* Subtitle */}
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the leading African countries for startup investment and innovation.
            </p>
          </motion.div>

          {displayCountries.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {displayCountries.map((country) => (
                <motion.div
                  key={country.code}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/directory?country=${encodeURIComponent(country.code)}`}
                    className="group block p-5 rounded-xl border border-border bg-card hover:border-gold/30 hover:shadow-lg transition-all text-center relative overflow-hidden"
                  >
                    {/* Subtle accent indicator on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <span className="text-2xl mb-2 block">{country.flagEmoji}</span>
                    <span className="font-medium text-foreground group-hover:text-gold transition-colors text-sm">
                      {country.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Globe className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Countries will appear here once data is available.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-lg overflow-hidden bg-[#0a0f1e]">
        {/* Particles on CTA too */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Particles className="w-full h-full" quantity={80} ease={80} color="#10b981" staticity={50} size={0.4} />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 via-transparent to-gold/5 pointer-events-none" />
        <div className="container-wide relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/20 border border-gold/30 mb-6 mx-auto">
              <Zap className="h-7 w-7 text-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Full Access to African Startup Intelligence
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              Unlock advanced filters, company comparisons, data exports, and real-time alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald hover:bg-emerald/90 text-white font-semibold shadow-lg shadow-emerald/25" asChild>
                <Link to="/auth">Start Free Trial</Link>
              </Button>
              <Button size="lg" className="bg-white/10 border border-white/30 text-white hover:bg-white/20 font-semibold" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
