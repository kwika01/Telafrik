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
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Animated background orbs - more vibrant */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 80, 0], 
              y: [0, -50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -60, 0], 
              y: [0, 60, 0],
              scale: [1, 1.4, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/35 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -70, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-cyan-400/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-orange-500/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 30, -30, 0], 
              y: [0, -20, 20, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 right-1/4 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut'
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${60 + (i % 3) * 10}%`,
                background: `linear-gradient(135deg, ${['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#f97316'][i]} 0%, transparent 100%)`
              }}
            />
          ))}
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
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/60 via-background to-fuchsia-950/60" />
        <motion.div
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-violet-500/10 to-transparent blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-fuchsia-500/10 to-transparent blur-2xl"
        />
        <div className="container-wide relative">
          <motion.p 
            className="text-center text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="font-bold text-foreground"
              animate={{ color: ['hsl(270,70%,60%)', 'hsl(300,75%,55%)', 'hsl(270,70%,60%)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              TelAfrik
            </motion.span>{' '}by{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent font-bold animate-shimmer">Ennylytics</span>{' '}
            is the intelligence hub for the African startup ecosystem, utilizing deep data to identify high-potential ventures and connect them with global investors looking for the continent's most promising opportunities.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/20 to-background" />
        <div className="container-wide relative">
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
                whileHover={{ scale: 1.08, y: -8 }}
                className="text-center group relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color.includes('violet') ? 'rgba(139,92,246,0.15)' : stat.color.includes('emerald') ? 'rgba(16,185,129,0.15)' : stat.color.includes('orange') ? 'rgba(249,115,22,0.15)' : 'rgba(6,182,212,0.15)'} 0%, transparent 70%)`
                  }}
                />
                <motion.div 
                  className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${stat.color.includes('violet') ? 'rgba(139,92,246,0.3)' : stat.color.includes('emerald') ? 'rgba(16,185,129,0.3)' : stat.color.includes('orange') ? 'rgba(249,115,22,0.3)' : 'rgba(6,182,212,0.3)'}`,
                      `0 0 40px ${stat.color.includes('violet') ? 'rgba(139,92,246,0.5)' : stat.color.includes('emerald') ? 'rgba(16,185,129,0.5)' : stat.color.includes('orange') ? 'rgba(249,115,22,0.5)' : 'rgba(6,182,212,0.5)'}`,
                      `0 0 20px ${stat.color.includes('violet') ? 'rgba(139,92,246,0.3)' : stat.color.includes('emerald') ? 'rgba(16,185,129,0.3)' : stat.color.includes('orange') ? 'rgba(249,115,22,0.3)' : 'rgba(6,182,212,0.3)'}`
                    ]
                  }}
                >
                  <stat.icon className="h-8 w-8 text-white drop-shadow-lg" />
                </motion.div>
                <motion.div 
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color.includes('violet') ? '#8b5cf6, #d946ef' : stat.color.includes('emerald') ? '#10b981, #06b6d4' : stat.color.includes('orange') ? '#f97316, #fbbf24' : '#06b6d4, #3b82f6'})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/20 via-background to-amber-950/20" />
        <motion.div
          animate={{ x: [-50, 50, -50], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [50, -50, 50], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"
        />
        <div className="container-wide relative">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-orange-400/30 rounded-full blur-md"
                  />
                </motion.div>
                <span className="text-sm font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Trending Now
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Startups Gaining <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Momentum</span>
              </h2>
            </div>
            <motion.div whileHover={{ x: 5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild className="hidden md:inline-flex border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-400 transition-all">
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
                whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(251,191,36,0.2) 100%)`,
                    filter: 'blur(8px)'
                  }}
                />
                <StartupCard startup={startup} featured />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 md:hidden">
            <Button variant="outline" asChild className="w-full border-orange-500/30 hover:bg-orange-500/10">
              <Link to="/trending">
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recently Funded */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-950/30 via-background to-cyan-950/30" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <div className="container-wide relative">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [0, 360] }}
                  transition={{ y: { duration: 1.5, repeat: Infinity }, rotate: { duration: 3, repeat: Infinity } }}
                  className="relative"
                >
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md"
                  />
                </motion.div>
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider">
                  Fresh Capital
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Recently <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Funded</span> Startups
              </h2>
            </div>
            <motion.div whileHover={{ x: 5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild className="hidden md:inline-flex border-emerald-500/30 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-cyan-500/20 hover:border-emerald-400 transition-all">
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
                whileHover={{ y: -12, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <StartupCard startup={startup} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Browse by Sector */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-background to-fuchsia-950/30" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] border border-violet-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] border border-fuchsia-500/10 rounded-full"
        />
        <div className="container-wide relative">
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
            {sectors.map((sector, index) => {
              const colors = [
                'from-violet-500/20 to-fuchsia-500/20 hover:border-violet-400 hover:shadow-violet-500/20',
                'from-cyan-500/20 to-blue-500/20 hover:border-cyan-400 hover:shadow-cyan-500/20',
                'from-emerald-500/20 to-teal-500/20 hover:border-emerald-400 hover:shadow-emerald-500/20',
                'from-orange-500/20 to-amber-500/20 hover:border-orange-400 hover:shadow-orange-500/20',
                'from-pink-500/20 to-rose-500/20 hover:border-pink-400 hover:shadow-pink-500/20',
              ];
              return (
                <motion.div
                  key={sector}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/directory?sector=${encodeURIComponent(sector)}`}
                    className={`group block p-5 rounded-xl border border-border bg-gradient-to-br ${colors[index % 5]} transition-all text-center shadow-sm hover:shadow-xl`}
                  >
                    <span className="font-semibold text-foreground group-hover:text-white transition-colors">
                      {sector}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Browse by Country */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-950/30 via-background to-orange-950/30" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
        />
        <div className="container-wide relative">
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
            {countries.map((country, index) => {
              const colors = [
                'from-amber-500/20 to-orange-500/20 hover:border-amber-400 hover:shadow-amber-500/20',
                'from-rose-500/20 to-pink-500/20 hover:border-rose-400 hover:shadow-rose-500/20',
                'from-teal-500/20 to-emerald-500/20 hover:border-teal-400 hover:shadow-teal-500/20',
                'from-blue-500/20 to-indigo-500/20 hover:border-blue-400 hover:shadow-blue-500/20',
                'from-purple-500/20 to-violet-500/20 hover:border-purple-400 hover:shadow-purple-500/20',
              ];
              return (
                <motion.div
                  key={country.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -8, rotate: [-1, 1, 0] }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/directory?country=${encodeURIComponent(country.name)}`}
                    className={`group block p-5 rounded-xl border border-border bg-gradient-to-br ${colors[index % 5]} transition-all text-center shadow-sm hover:shadow-xl`}
                  >
                    <span className="text-2xl mb-1 block">{country.flag}</span>
                    <span className="font-semibold text-foreground group-hover:text-white transition-colors">
                      {country.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
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
