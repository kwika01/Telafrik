import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, DollarSign, Building2, Users, Globe,
  Zap, Shield, Sparkles, ChevronRight, Star,
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';

import { useTrendingCompanies } from '@/api/queries/useCompanies';
import { useSectors } from '@/api/queries/useSectors';
import { useCountries } from '@/api/queries/useCountries';
import { useDashboardStats } from '@/api/queries/useDashboard';
import AfricaExplorerSection from '@/components/map/AfricaExplorerSection';

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Animated counter ─── */
function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="relative bg-card rounded-2xl border border-border p-6 flex flex-col items-center text-center gap-3 group overflow-hidden"
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(59,130,246,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center"
        animate={inView ? { scale: [0.8, 1.1, 1] } : { scale: 0.8 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Icon className="h-7 w-7 text-primary" />
      </motion.div>
      <div>
        <motion.div
          className="text-2xl md:text-3xl font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {value}
        </motion.div>
        <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      </div>
    </motion.div>
  );
}

const Index = () => {
  const [showAllCountries, setShowAllCountries] = useState(false);

  const { data: trendingCompanies = [], isLoading: trendingLoading } = useTrendingCompanies();
  const { data: sectors = [] } = useSectors();
  const { data: countries = [] } = useCountries();
  const { data: dashboardStats } = useDashboardStats();

  const trendingStartups = trendingCompanies.slice(0, 3);
  const recentlyFunded = trendingCompanies.slice(3, 7);
  const displaySectors = sectors.slice(0, 10);
  const displayCountries = showAllCountries ? countries : countries.slice(0, 10);
  void displayCountries;

  const formatFunding = (n: number) =>
    n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(0)}M` : `$${n.toLocaleString()}`;

  const stats = [
    { label: 'Startups Tracked', value: dashboardStats ? `${dashboardStats.totalCompanies.toLocaleString()}+` : '2,400+', icon: Building2 },
    { label: 'Total Funding', value: dashboardStats ? formatFunding(dashboardStats.totalFundingUsd) : '$8.2B', icon: DollarSign },
    { label: 'Investors', value: dashboardStats ? `${dashboardStats.totalInvestors.toLocaleString()}+` : '450+', icon: Users },
    { label: 'Countries', value: dashboardStats ? String(dashboardStats.countriesCovered) : '54', icon: Globe },
  ];

  /* hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-background">
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-[600px] h-[300px] -translate-x-1/2 rounded-full bg-primary/3 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-8 shadow-lg shadow-primary/25"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary-foreground/80"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Africa's Investment Intelligence Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.15] tracking-tight"
          >
            Discover Africa's Most{' '}
            <span className="text-primary relative inline-block">
              Promising Startups
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-primary/40 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            Track funding rounds, valuations, and growth metrics across{' '}
            <span className="font-semibold text-foreground">
              {dashboardStats ? `${dashboardStats.totalCompanies.toLocaleString()}+` : '2,400+'}
            </span>{' '}
            startups in{' '}
            <span className="font-semibold text-foreground">
              {dashboardStats ? dashboardStats.countriesCovered : 54} African countries.
            </span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mb-7 max-w-lg mx-auto"
          >
            <GlobalSearch size="lg" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap items-center justify-center gap-2 text-sm"
          >
            <span className="text-muted-foreground">Popular:</span>
            {['Fintech', 'Nigeria', 'Series A', 'Healthtech'].map((term, i) => (
              <motion.div
                key={term}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.07 }}
              >
                <Link
                  to={`/search?q=${term}`}
                  className="px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary hover:border-primary/30 text-foreground text-sm transition-all border border-border"
                >
                  {term}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-muted-foreground"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Mission Statement ── */}
      <Section className="py-8 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            <span className="font-bold text-foreground">TelAfrik</span>{' '}by{' '}
            <span className="font-bold text-foreground">Ennylytics</span>{' '}
            is the intelligence hub for the African startup ecosystem, connecting{' '}
            high-potential ventures with global investors.
          </motion.p>
        </div>
      </Section>

      {/* ── Stats ── */}
      <Section className="py-10 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Trending Now ── */}
      <Section className="py-10 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Trending Now</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Startups Gaining Momentum</h2>
            </div>
            <Button variant="outline" size="sm" asChild className="hidden md:inline-flex gap-1">
              <Link to="/trending">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </motion.div>

          {trendingLoading ? (
            <div className="grid md:grid-cols-3 gap-5">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : trendingStartups.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-3 gap-5"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {trendingStartups.map((company, i) => (
                <motion.div key={company.id} variants={fadeUp} custom={i}>
                  <StartupCard company={company} featured index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Trending startups will appear here once data is available.</p>
            </div>
          )}

          <div className="mt-5 md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link to="/trending">View All Trending <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Recently Funded ── */}
      {recentlyFunded.length > 0 && (
        <Section className="py-10 border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-6">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Fresh Capital</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Recently Funded Startups</h2>
              </div>
              <Button variant="outline" size="sm" asChild className="hidden md:inline-flex gap-1">
                <Link to="/directory?sort=recently-funded">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {recentlyFunded.map((company, i) => (
                <motion.div key={company.id} variants={fadeUp} custom={i}>
                  <StartupCard company={company} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>
      )}

      {/* ── Browse by Sector ── */}
      <Section className="py-10 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Browse by <span className="text-primary italic">Sector</span>
            </h2>
            <p className="text-muted-foreground text-sm">Explore African startups across key industries driving innovation.</p>
          </motion.div>

          {displaySectors.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-3"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {displaySectors.map((sector, i) => (
                <motion.div
                  key={sector.id}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="group block p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors text-center h-full"
                  >
                    <span className="text-2xl mb-2 block">{sector.icon}</span>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                      {sector.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">Sectors will appear here once data is available.</p>
            </div>
          )}
        </div>
      </Section>

      {/* ── Interactive Africa Map ── */}
      <AfricaExplorerSection />

      {/* ── Why TelAfrik ── */}
      <Section className="py-16 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Star className="h-3 w-3" /> Why TelAfrik
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              The Definitive African Startup Intelligence Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for investors, analysts, and founders who need real data to make real decisions.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              {
                icon: Building2, title: '1,247+ Startups',
                desc: 'Comprehensive profiles with funding history, valuations, team details, and sector tags across Africa.',
                color: 'text-blue-500', bg: 'bg-blue-500/10',
              },
              {
                icon: TrendingUp, title: 'Live Intelligence',
                desc: 'Real-time deal tracking, momentum scores, and market activity signals to identify opportunities early.',
                color: 'text-emerald-500', bg: 'bg-emerald-500/10',
              },
              {
                icon: Globe, title: 'Pan-African Coverage',
                desc: '20 countries tracked across West, East, Southern, and North Africa — the most complete dataset available.',
                color: 'text-amber-500', bg: 'bg-amber-500/10',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card border border-border rounded-2xl p-6 group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${item.color}`}>
                  Explore <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Regulatory Intelligence ── */}
      <Section className="py-10 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            className="bg-card rounded-2xl border border-border p-8 lg:p-10 relative overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-10 items-center relative">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
                  <Sparkles className="h-3 w-3" /> Coming Soon
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  Regulatory Intelligence{' '}
                  <span className="text-primary italic">for Africa</span>
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Navigate compliance requirements across 54 African countries and 10 tech sectors.
                  Know which licenses you need before expanding to new markets.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Fintech', 'Healthtech', 'InsurTech', 'E-commerce', 'Cleantech'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-border bg-secondary text-foreground text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full border border-border bg-secondary text-muted-foreground text-xs font-medium">+5 more</span>
                </div>
                <Button asChild className="gap-2">
                  <Link to="/regulatory-intel">
                    Explore Regulatory Data
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, value: '54', label: 'Countries Covered' },
                  { icon: Building2, value: '2,600+', label: 'Regulatory Bodies' },
                  { icon: Shield, value: '10', label: 'Tech Sectors' },
                  { icon: Zap, value: '8,000+', label: 'Data Points' },
                ].map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    custom={i}
                    className="bg-secondary/60 rounded-xl p-5 flex flex-col items-center text-center gap-3"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-foreground">{value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        </motion.div>

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <motion.div variants={fadeUp} custom={0}>
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 mb-6 mx-auto"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Zap className="h-7 w-7 text-primary" />
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Full Access to African Startup Intelligence
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Unlock advanced filters, company comparisons, data exports, and real-time alerts.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold shadow-xl shadow-primary/30" asChild>
                <Link to="/auth">Start Free Trial</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 font-semibold" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
};

export default Index;
