import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Building2,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Globe,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useCountriesWithStats } from '@/api/queries/useCountries';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const regions = ['All Regions', 'West Africa', 'East Africa', 'North Africa', 'Southern Africa', 'Central Africa'];

const Countries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const { data: countries = [], isLoading, error } = useCountriesWithStats();

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All Regions' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, selectedRegion]);

  const totalStats = useMemo(() => ({
    companies: filteredCountries.reduce((sum, c) => sum + c.companies, 0),
    funding: filteredCountries.reduce((sum, c) => {
      const raw = c.totalFunding.replace(/[$,KMB]/g, '');
      const num = parseFloat(raw);
      if (isNaN(num)) return sum;
      if (c.totalFunding.includes('B')) return sum + num * 1e9;
      if (c.totalFunding.includes('M')) return sum + num * 1e6;
      if (c.totalFunding.includes('K')) return sum + num * 1e3;
      return sum + num;
    }, 0),
    deals: filteredCountries.reduce((sum, c) => sum + c.recentDeals, 0),
  }), [filteredCountries]);

  const totalFundingFormatted = useMemo(() => {
    const s = totalStats.funding;
    if (s >= 1e9) return `$${(s / 1e9).toFixed(2)}B`;
    if (s >= 1e6) return `$${(s / 1e6).toFixed(1)}M`;
    return `$${s.toLocaleString()}`;
  }, [totalStats.funding]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="empty-state data-card py-12 m-6">
          <p className="text-destructive">Failed to load countries. Please try again later.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Countries & Markets</h1>
          <p className="text-muted-foreground mt-1">
            Explore African startup ecosystems by country
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-xs font-medium">Total Companies</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">{totalStats.companies.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Total Funding</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">{totalFundingFormatted}</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Recent Deals</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">{totalStats.deals}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((country) => (
            <Link
              key={country.slug}
              to={`/countries/${country.slug}`}
              className="data-card group hover:border-primary/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{country.region}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">Companies</div>
                  <div className="font-semibold text-foreground">{country.companies}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total Funding</div>
                  <div className="font-semibold text-foreground">{country.totalFunding}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Recent Deals</div>
                  <div className="font-semibold text-foreground">{country.recentDeals}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">YoY Growth</div>
                  <div className="font-semibold text-success">{country.growth}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-2">Top Sectors</div>
                <div className="flex flex-wrap gap-1">
                  {country.topSectors.map((sector) => (
                    <span key={sector} className="badge-sector text-xs">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="empty-state data-card py-12">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No countries found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Countries;
