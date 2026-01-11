import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp, DollarSign } from 'lucide-react';
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

const SectorPage = () => {
  const { slug } = useParams();
  const sector = getSectorBySlug(slug || '');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trending');

  const sectorStartups = useMemo(() => {
    let filtered = startups.filter(s => s.sector.toLowerCase().replace(/\s+/g, '-') === slug || s.sector === sector?.name);
    
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

  if (!sector) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Sector Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The sector you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/directory">Browse Directory</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const featuredStartups = sectorStartups.filter(s => s.trending).slice(0, 3);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border py-3">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/directory" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Directory
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{sector.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary py-12">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-0">
              Sector Intelligence
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {sector.name}
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-6">
              {sector.description}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground">
                  <span className="font-bold">{sector.startupCount || sectorStartups.length}</span> startups
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground">
                  <span className="font-bold">{featuredStartups.length}</span> trending
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-8 border-b border-border">
        <div className="container-wide">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Market Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{sector.marketOverview}</p>
          </div>
        </div>
      </section>

      {/* Featured Startups */}
      {featuredStartups.length > 0 && (
        <section className="py-8 bg-secondary/30">
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold text-foreground">Featured {sector.name} Startups</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Startups */}
      <section className="py-10">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-40">
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
              <SelectTrigger className="w-40">
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
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="most-funded">Most Funded</SelectItem>
                <SelectItem value="valuation">Highest Valuation</SelectItem>
                <SelectItem value="recently-added">Recently Added</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground ml-auto">
              Showing <span className="font-medium text-foreground">{sectorStartups.length}</span> startups
            </p>
          </div>

          {/* Results */}
          {sectorStartups.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectorStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No startups match your filters.</p>
              <Button variant="outline" onClick={() => {
                setSelectedCountry('all');
                setSelectedStage('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SectorPage;
