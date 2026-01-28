import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Users, Loader2, Layers } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSector } from '@/api/queries/useSectors';
import { useCompanies } from '@/api/queries/useCompanies';
import { useCountries } from '@/api/queries/useCountries';
import { useState, useMemo } from 'react';
import type { DirectoryFilters } from '@/types/domain';

// Funding stages (static - from our enum)
const FUNDING_STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Growth'];

const SectorPage = () => {
  const { slug } = useParams();
  const { data: sector, isLoading: sectorLoading, error: sectorError } = useSector(slug);
  const { data: countries = [] } = useCountries();
  
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trending');

  // Build filters for companies query
  const filters: DirectoryFilters = useMemo(() => ({
    sectors: slug ? [slug] : [],
    countries: selectedCountry !== 'all' ? [selectedCountry] : [],
    regions: [],
    stages: selectedStage !== 'all' ? [selectedStage] : [],
  }), [slug, selectedCountry, selectedStage]);

  const sortByField = useMemo(() => {
    switch (sortBy) {
      case 'most-funded': return 'total_funding_usd';
      case 'recently-added': return 'year_founded';
      default: return 'trending_score';
    }
  }, [sortBy]) as 'name' | 'trending_score' | 'total_funding_usd' | 'year_founded';

  const { 
    data: companiesData, 
    isLoading: companiesLoading 
  } = useCompanies({
    filters,
    pageSize: 50,
    sortBy: sortByField,
    sortOrder: sortBy === 'recently-added' ? 'desc' : 'desc',
    enabled: !!slug,
  });

  const sectorStartups = companiesData?.data || [];

  // Calculate sector stats
  const totalFunding = useMemo(() => {
    const total = sectorStartups.reduce((acc, s) => acc + (s.totalFundingUsd || 0), 0);
    const millions = total / 1000000;
    return millions >= 1000 ? `$${(millions / 1000).toFixed(1)}B` : `$${millions.toFixed(0)}M`;
  }, [sectorStartups]);

  const trendingCount = sectorStartups.filter(s => s.trendingScore > 50).length;
  const featuredStartups = sectorStartups.filter(s => s.trendingScore > 50).slice(0, 3);

  if (sectorLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }

  if (sectorError || !sector) {
    return (
      <AppLayout>
        <div className="container-wide py-20 text-center">
          <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">Sector Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The sector you're looking for doesn't exist or hasn't been added yet.
          </p>
          <Button asChild>
            <Link to="/sectors">Browse All Sectors</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border py-3">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/sectors" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Sectors
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{sector.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4 text-indigo" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo">
                {sector.icon} Sector Intelligence
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
              {sector.name}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              {sector.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-emerald" />
                </div>
                <span className="text-foreground">
                  <span className="font-bold text-lg text-emerald">{sectorStartups.length}</span>{' '}
                  <span className="text-muted-foreground text-sm">startups</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-terracotta" />
                </div>
                <span className="text-foreground">
                  <span className="font-bold text-lg text-terracotta">{trendingCount}</span>{' '}
                  <span className="text-muted-foreground text-sm">trending</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-gold" />
                </div>
                <span className="text-foreground">
                  <span className="font-bold text-lg text-gold">{totalFunding}</span>{' '}
                  <span className="text-muted-foreground text-sm">raised</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      {sector.marketOverview && (
        <section className="py-8 border-b border-border">
          <div className="container-wide">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo/10 border border-indigo/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-indigo" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{sector.marketOverview}</p>
            </div>
          </div>
        </section>
      )}

      {/* Featured Startups */}
      {featuredStartups.length > 0 && (
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-terracotta" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Featured {sector.name} Startups</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredStartups.map((company) => (
                <StartupCard key={company.id} company={company} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Startups */}
      <section className="section">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-6">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flagEmoji} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {FUNDING_STAGES.map((stage) => (
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
                <SelectItem value="recently-added">Recently Added</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground sm:ml-auto">
              Showing <span className="font-medium text-foreground">{sectorStartups.length}</span> startups
            </p>
          </div>

          {/* Results */}
          {companiesLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : sectorStartups.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sectorStartups.map((company) => (
                <StartupCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                {selectedCountry !== 'all' || selectedStage !== 'all' 
                  ? 'No startups match your filters.' 
                  : 'No startups in this sector yet.'}
              </p>
              {(selectedCountry !== 'all' || selectedStage !== 'all') && (
                <Button variant="outline" onClick={() => {
                  setSelectedCountry('all');
                  setSelectedStage('all');
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default SectorPage;
