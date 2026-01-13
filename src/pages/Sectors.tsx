import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Wallet, Users, Heart, Leaf, GraduationCap, Truck, ShoppingBag, Building, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { sectorsData } from '@/lib/sectorData';
import { startups } from '@/lib/mockData';

const iconMap: Record<string, React.ReactNode> = {
  Wallet: <Wallet className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  Leaf: <Leaf className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Truck: <Truck className="h-8 w-8" />,
  ShoppingBag: <ShoppingBag className="h-8 w-8" />,
  Building: <Building className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Sectors = () => {
  // Calculate real startup counts per sector
  const sectorCounts = sectorsData.map(sector => {
    const count = startups.filter(s => 
      s.sector.toLowerCase() === sector.name.toLowerCase() ||
      s.sector.toLowerCase().replace(/\s+/g, '-') === sector.slug
    ).length;
    return { ...sector, realCount: count };
  });

  // Get trending count for each sector
  const getTrendingCount = (sectorName: string) => {
    return startups.filter(s => 
      (s.sector.toLowerCase() === sectorName.toLowerCase()) && s.trending
    ).length;
  };

  // Get total funding for each sector
  const getSectorFunding = (sectorName: string) => {
    const sectorStartups = startups.filter(s => 
      s.sector.toLowerCase() === sectorName.toLowerCase()
    );
    let total = 0;
    sectorStartups.forEach(s => {
      const amount = parseFloat(s.totalFunding.replace(/[^0-9.]/g, ''));
      total += amount;
    });
    return total >= 1000 ? `$${(total / 1000).toFixed(1)}B` : `$${total.toFixed(0)}M`;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary to-violet-600 py-12 md:py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Sector Intelligence
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
              Explore African startups across key industries driving innovation and economic growth across the continent.
            </p>
          </motion.div>
          
          {/* Stats row */}
          <motion.div 
            className="mt-8 flex flex-wrap gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">
                <span className="font-bold text-xl">{sectorsData.length}</span> sectors
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">
                <span className="font-bold text-xl">{startups.length}+</span> startups tracked
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">
                <span className="font-bold text-xl">$3B+</span> total funding
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-wide">
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sectorCounts.map((sector, index) => (
              <motion.div key={sector.id} variants={itemVariants}>
                <Link
                  to={`/sectors/${sector.slug}`}
                  className="group block bg-card rounded-xl border border-border p-5 md:p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="p-3 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 text-primary group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        {iconMap[sector.icon] || <Building2 className="h-8 w-8" />}
                      </motion.div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {sector.name}
                    </h2>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-foreground/70 transition-colors">
                      {sector.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-full">
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                        <span className="font-semibold text-foreground">{sector.realCount || sector.startupCount}</span>
                        <span className="text-muted-foreground">startups</span>
                      </span>
                      {getTrendingCount(sector.name) > 0 && (
                        <span className="flex items-center gap-1.5 bg-gradient-to-r from-accent/10 to-orange-500/10 px-2.5 py-1 rounded-full">
                          <TrendingUp className="h-3.5 w-3.5 text-accent" />
                          <span className="font-semibold text-accent">{getTrendingCount(sector.name)}</span>
                          <span className="text-muted-foreground">trending</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <motion.div 
            className="bg-gradient-to-r from-primary via-violet-600 to-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated orbs */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Browse our complete directory or use our AI-powered search to find specific startups, founders, or investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/directory"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
                >
                  <Building2 className="h-5 w-5" />
                  Browse Directory
                </Link>
                <Link 
                  to="/search"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-primary-foreground font-semibold px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Search Startups
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sectors;
