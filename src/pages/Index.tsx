import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, DollarSign, Building2, Users, Globe, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import BottomBanner from '@/components/ui/BottomBanner';
import { Button } from '@/components/ui/button';
import { startups, sectors, countries } from '@/lib/mockData';

const Index = () => {
  const trendingStartups = startups.filter((s) => s.trending).slice(0, 3);
  const recentlyFunded = startups.filter((s) => s.recentlyFunded).slice(0, 4);

  const stats = [
    { label: 'Startups Tracked', value: '2,400+', icon: Building2, color: 'from-violet-500 to-fuchsia-500' },
    { label: 'Total Funding', value: '$8.2B', icon: DollarSign, color: 'from-emerald-400 to-cyan-500' },
    { label: 'Investors', value: '450+', icon: Users, color: 'from-orange-400 to-amber-500' },
    { label: 'Countries', value: '54', icon: Globe, color: 'from-cyan-400 to-blue-500' },
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero-colorful py-20 md:py-28">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -20, 0], 
              y: [0, 20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container-wide relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 border border-violet-400/50 text-white text-sm font-medium mb-6 backdrop-blur-sm shadow-lg"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
              </motion.span>
              Africa's Investment Intelligence Platform
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Discover Africa's Most{' '}
              <span className="text-gradient-gold drop-shadow-md">Promising Startups</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-md"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
            >
              Track funding rounds, valuations, and growth metrics across 2,400+ startups in 54 African countries.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="max-w-2xl mx-auto mb-8"
            >
              <GlobalSearch size="lg" />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 text-sm text-white/80"
            >
              <span className="font-medium">Popular:</span>
              {['Fintech', 'Nigeria', 'Series A', 'Healthtech'].map((term, i) => (
                <motion.div
                  key={term}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/search?q=${term}`}
                    className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-gradient-to-r hover:from-violet-500/40 hover:to-fuchsia-500/40 border border-white/20 hover:border-violet-400/50 transition-all text-white font-medium backdrop-blur-sm"
                  >
                    {term}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-10 bg-gradient-to-r from-violet-950/50 via-background to-fuchsia-950/50 border-y border-border">
        <div className="container-wide">
          <motion.p 
            className="text-center text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-semibold text-foreground">TelAfrik</span> by{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-semibold">Ennylytics</span>{' '}
            is the intelligence hub for the African startup ecosystem, utilizing deep data to identify high-potential ventures and connect them with global investors looking for the continent's most promising opportunities.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border bg-background">
        <div className="container-wide">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="h-7 w-7 text-white" />
                </motion.div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                </motion.div>
                <span className="text-sm font-medium bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Trending Now
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Startups Gaining Momentum
              </h2>
            </div>
            <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild className="hidden md:inline-flex border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500">
                <Link to="/trending">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {trendingStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <StartupCard startup={startup} featured />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 md:hidden">
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
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </motion.div>
                <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Fresh Capital
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Recently Funded Startups
              </h2>
            </div>
            <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild className="hidden md:inline-flex border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500">
                <Link to="/directory?sort=recently-funded">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {recentlyFunded.map((startup, index) => (
              <motion.div
                key={startup.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <StartupCard startup={startup} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Browse by Sector */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Browse by <span className="text-gradient-rainbow">Sector</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore African startups across key industries driving innovation and growth.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {sectors.map((sector, index) => (
              <motion.div
                key={sector}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/directory?sector=${encodeURIComponent(sector)}`}
                  className="group block p-4 rounded-xl border border-border bg-card hover:border-violet-500/50 hover:bg-gradient-to-br hover:from-violet-500/10 hover:to-fuchsia-500/10 transition-all text-center shadow-sm hover:shadow-lg hover:shadow-violet-500/10"
                >
                  <span className="font-medium text-foreground group-hover:text-violet-400 transition-colors">
                    {sector}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Browse by Country */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Top Startup <span className="text-gradient-gold">Ecosystems</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the leading African countries for startup investment and innovation.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {countries.map((country, index) => (
              <motion.div
                key={country}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/directory?country=${encodeURIComponent(country)}`}
                  className="group block p-4 rounded-xl border border-border bg-card hover:border-amber-500/50 hover:bg-gradient-to-br hover:from-amber-500/10 hover:to-orange-500/10 transition-all text-center shadow-sm hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <span className="font-medium text-foreground group-hover:text-amber-400 transition-colors">
                    {country}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 opacity-90" />
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl"
        />
        
        <div className="container-wide relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="h-12 w-12 text-yellow-300 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Full Access to African Startup Intelligence
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Unlock advanced filters, company comparisons, data exports, and real-time alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-violet-700 hover:bg-white/90 shadow-xl" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Banner */}
      <BottomBanner />
    </Layout>
  );
};

export default Index;
