import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, DollarSign, Building2, Users, Globe, Zap, Sparkles, Loader2, MapPin, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import { AfricaMapSVG, CountryPanel, COUNTRY_NAMES } from '@/components/map';
import { Button } from '@/components/ui/button';
import { useTrendingCompanies } from '@/api/queries/useCompanies';
import { useSectors } from '@/api/queries/useSectors';
import { useCountries } from '@/api/queries/useCountries';

// Mock data for map (will be replaced with real data)
const MOCK_STARTUP_COUNTS: Record<string, number> = {
  NG: 890, KE: 520, ZA: 480, EG: 350, GH: 220,
  RW: 85, TZ: 75, ET: 120, SN: 95, CI: 60,
  MA: 180, TN: 90, UG: 110, CM: 45, DZ: 40,
  ZW: 25, BW: 15, ZM: 20, AO: 12, MZ: 18,
};

const MOCK_SECTORS: Record<string, { name: string; count: number }[]> = {
  NG: [{ name: 'Fintech', count: 245 }, { name: 'E-commerce', count: 120 }, { name: 'Healthtech', count: 85 }, { name: 'Agritech', count: 78 }],
  KE: [{ name: 'Fintech', count: 145 }, { name: 'Agritech', count: 95 }, { name: 'Logistics', count: 70 }, { name: 'Healthtech', count: 55 }],
  ZA: [{ name: 'Fintech', count: 130 }, { name: 'Insurtech', count: 85 }, { name: 'E-commerce', count: 75 }, { name: 'Cleantech', count: 60 }],
  EG: [{ name: 'Fintech', count: 95 }, { name: 'E-commerce', count: 80 }, { name: 'Edtech', count: 45 }, { name: 'Logistics', count: 40 }],
  GH: [{ name: 'Fintech', count: 65 }, { name: 'Agritech', count: 45 }, { name: 'E-commerce', count: 35 }, { name: 'Healthtech', count: 25 }],
};

const MOCK_TRENDING: Record<string, { id: string; name: string; sector: string }[]> = {
  NG: [{ id: 'flutterwave', name: 'Flutterwave', sector: 'Fintech' }, { id: 'paystack', name: 'Paystack', sector: 'Fintech' }, { id: 'andela', name: 'Andela', sector: 'HR Tech' }],
  KE: [{ id: 'mpesa', name: 'M-Pesa', sector: 'Fintech' }, { id: 'twiga', name: 'Twiga Foods', sector: 'Agritech' }, { id: 'sendy', name: 'Sendy', sector: 'Logistics' }],
  ZA: [{ id: 'yoco', name: 'Yoco', sector: 'Fintech' }, { id: 'takealot', name: 'Takealot', sector: 'E-commerce' }],
  EG: [{ id: 'swvl', name: 'Swvl', sector: 'Transport' }, { id: 'fawry', name: 'Fawry', sector: 'Fintech' }],
  GH: [{ id: 'expresspay', name: 'ExpressPay', sector: 'Fintech' }, { id: 'farmerline', name: 'Farmerline', sector: 'Agritech' }],
};

const Index = () => {
  const { data: trendingCompanies = [], isLoading: trendingLoading } = useTrendingCompanies(6);
  const { data: sectors = [] } = useSectors();
  const { data: countries = [] } = useCountries();

  // Map state
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const selectedCountryInfo = useMemo(() => {
    if (!selectedCountry) return null;
    const country = countries.find(c => c.code === selectedCountry);
    return {
      code: selectedCountry,
      name: country?.name || COUNTRY_NAMES[selectedCountry] || selectedCountry,
      flagEmoji: country?.flagEmoji || '🌍',
      startupCount: MOCK_STARTUP_COUNTS[selectedCountry] || 0,
      topSectors: MOCK_SECTORS[selectedCountry] || [],
      trendingStartups: MOCK_TRENDING[selectedCountry] || [],
    };
  }, [selectedCountry, countries]);

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

  // Stats with African accent colors
  const stats = [
    { label: 'Startups Tracked', value: '2,400+', icon: Building2, accent: 'emerald' },
    { label: 'Total Funding', value: '$8.2B', icon: DollarSign, accent: 'gold' },
    { label: 'Investors', value: '450+', icon: Users, accent: 'indigo' },
    { label: 'Countries', value: '54', icon: Globe, accent: 'terracotta' },
  ] as const;

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
      <section className="relative bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
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
                Track funding rounds, valuations, and growth metrics across 2,400+ startups in 54 African countries.
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

            {/* Right Column: Africa Map */}
            <div className="relative">
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
                        <span className="font-medium tabular-nums">{MOCK_STARTUP_COUNTS[hoveredCountry] || 0} startups</span>
                      </div>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-foreground/95 rotate-45 border-b border-r border-background/10" />
                  </div>
                </div>
              )}

              {/* Map container - premium module styling */}
              <div className="relative">
                {/* Subtle outer glow */}
                <div className="absolute inset-0 bg-emerald/5 rounded-2xl blur-xl" />
                
                {/* Main container */}
                <div className="relative bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                  {/* Inner accent border */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent" />
                  
                  {/* Map content */}
                  <div className="bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 p-6 relative">
                    <AfricaMapSVG
                      hoveredCountry={hoveredCountry}
                      selectedCountry={selectedCountry}
                      onCountryHover={setHoveredCountry}
                      onCountryClick={handleCountryClick}
                      className="w-full h-auto max-h-[380px]"
                    />
                    
                    {/* Enhanced Legend */}
                    <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-md border border-border/80 rounded-xl px-4 py-3 shadow-xl">
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded bg-gold border border-gold/50 shadow-sm shadow-gold/20" />
                          <span className="text-[11px] text-muted-foreground font-medium">Hover</span>
                        </div>
                        <div className="h-5 w-px bg-border" />
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded bg-emerald border border-emerald/50 shadow-sm shadow-emerald/20" />
                          <span className="text-[11px] text-foreground font-semibold">Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Country Panel - appears below map when selected */}
              {selectedCountryInfo && (
                <div className="mt-3">
                  <CountryPanel
                    countryCode={selectedCountryInfo.code}
                    countryName={selectedCountryInfo.name}
                    flagEmoji={selectedCountryInfo.flagEmoji}
                    startupCount={selectedCountryInfo.startupCount}
                    topSectors={selectedCountryInfo.topSectors}
                    trendingStartups={selectedCountryInfo.trendingStartups}
                    onClose={() => setSelectedCountry(null)}
                  />
                </div>
              )}

              {/* Prompt to interact - only show when no country selected */}
              {!selectedCountry && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-sm shadow-gold/30" />
                    <span className="font-medium">Click any country to explore</span>
                  </div>
                </div>
              )}
            </div>
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
      <section className="section-lg bg-primary">
        <div className="container-wide">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="h-10 w-10 text-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Get Full Access to African Startup Intelligence
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              Unlock advanced filters, company comparisons, data exports, and real-time alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
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
