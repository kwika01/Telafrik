import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSectorBySlug } from '@/lib/sectorData';
import { startups, countries, stages } from '@/lib/mockData';
import { useState, useMemo } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SectorPage = () => {
  const { slug } = useParams();
  const sector = getSectorBySlug(slug || '');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trending');

  const sectorStartups = useMemo(() => {
    let filtered = startups.filter(s => 
      s.sector.toLowerCase().replace(/\s+/g, '-') === slug || 
      s.sector.toLowerCase() === sector?.name.toLowerCase()
    );
    
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(s => s.hqCountry === selectedCountry);
    }
    
    if (selectedStage !== 'all') {
      filtered = filtered.filter(s => s.stage === selectedStage);
    }

    // Sort
    switch (sortBy) {
      case 'most-funded':
        filtered.sort((a, b) => {
          const aVal = parseFloat(a.totalFunding.replace(/[^0-9.]/g, ''));
          const bVal = parseFloat(b.totalFunding.replace(/[^0-9.]/g, ''));
          return bVal - aVal;
        });
        break;
      case 'valuation':
        filtered.sort((a, b) => b.valuation.confidenceScore - a.valuation.confidenceScore);
        break;
      case 'recently-added':
        filtered.sort((a, b) => b.yearFounded - a.yearFounded);
        break;
      default:
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    }

    return filtered;
  }, [slug, sector, selectedCountry, selectedStage, sortBy]);

  // Calculate sector stats
  const totalFunding = useMemo(() => {
    let total = 0;
    sectorStartups.forEach(s => {
      const amount = parseFloat(s.totalFunding.replace(/[^0-9.]/g, ''));
      total += amount;
    });
    return total >= 1000 ? `$${(total / 1000).toFixed(1)}B` : `$${total.toFixed(0)}M`;
  }, [sectorStartups]);

  if (!sector) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-foreground mb-4">Sector Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The sector you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/sectors">Browse All Sectors</Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const featuredStartups = sectorStartups.filter(s => s.trending).slice(0, 3);
  const trendingCount = sectorStartups.filter(s => s.trending).length;
  const recentlyFundedCount = sectorStartups.filter(s => s.recentlyFunded).length;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border py-3">
        <div className="container-wide">
          <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/sectors" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Sectors
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{sector.name}</span>
          </motion.div>
        </div>
      </div>

      {/* Hero */}
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
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-0">
              Sector Intelligence
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              {sector.name}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-6">
              {sector.description}
            </p>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Building2 className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground">
                  <span className="font-bold">{sectorStartups.length}</span> startups
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground">
                  <span className="font-bold">{trendingCount}</span> trending
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground">
                  <span className="font-bold">{totalFunding}</span> raised
                </span>
              </div>
              {recentlyFundedCount > 0 && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-primary-foreground">
                    💰 <span className="font-bold">{recentlyFundedCount}</span> recently funded
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-8 border-b border-border">
        <div className="container-wide">
          <motion.div 
            className="bg-card rounded-xl border border-border p-6 md:p-8 hover:border-primary/20 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Market Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">{sector.marketOverview}</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Startups */}
      {featuredStartups.length > 0 && (
        <section className="py-8 md:py-10 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container-wide">
            <motion.div 
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TrendingUp className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold text-foreground">Featured {sector.name} Startups</h2>
            </motion.div>
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredStartups.map((startup) => (
                <motion.div key={startup.id} variants={itemVariants}>
                  <StartupCard startup={startup} featured />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Startups */}
      <section className="py-8 md:py-10">
        <div className="container-wide">
          {/* Filters */}
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="most-funded">Most Funded</SelectItem>
                <SelectItem value="valuation">Highest Valuation</SelectItem>
                <SelectItem value="recently-added">Recently Added</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground sm:ml-auto">
              Showing <span className="font-medium text-foreground">{sectorStartups.length}</span> startups
            </p>
          </motion.div>

          {/* Results */}
          {sectorStartups.length > 0 ? (
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sectorStartups.map((startup) => (
                <motion.div key={startup.id} variants={itemVariants}>
                  <StartupCard startup={startup} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-muted-foreground mb-4">No startups match your filters.</p>
              <Button variant="outline" onClick={() => {
                setSelectedCountry('all');
                setSelectedStage('all');
              }}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SectorPage;
