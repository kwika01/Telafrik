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
import { useState } from 'react';

// Mock data for countries
const countries = [
  { 
    name: 'Nigeria', 
    flag: '🇳🇬', 
    slug: 'nigeria',
    region: 'West Africa',
    companies: 892, 
    startups: 456,
    totalFunding: '$2.1B',
    topSectors: ['Fintech', 'HR Tech', 'E-commerce'],
    recentDeals: 23,
    growth: '+18%',
  },
  { 
    name: 'Kenya', 
    flag: '🇰🇪', 
    slug: 'kenya',
    region: 'East Africa',
    companies: 456, 
    startups: 289,
    totalFunding: '$890M',
    topSectors: ['Fintech', 'Agritech', 'Logistics'],
    recentDeals: 15,
    growth: '+22%',
  },
  { 
    name: 'South Africa', 
    flag: '🇿🇦', 
    slug: 'south-africa',
    region: 'Southern Africa',
    companies: 398, 
    startups: 234,
    totalFunding: '$780M',
    topSectors: ['Fintech', 'Healthtech', 'Cleantech'],
    recentDeals: 12,
    growth: '+15%',
  },
  { 
    name: 'Egypt', 
    flag: '🇪🇬', 
    slug: 'egypt',
    region: 'North Africa',
    companies: 312, 
    startups: 198,
    totalFunding: '$650M',
    topSectors: ['Fintech', 'E-commerce', 'Logistics'],
    recentDeals: 18,
    growth: '+28%',
  },
  { 
    name: 'Ghana', 
    flag: '🇬🇭', 
    slug: 'ghana',
    region: 'West Africa',
    companies: 187, 
    startups: 112,
    totalFunding: '$220M',
    topSectors: ['Fintech', 'Agritech', 'Edtech'],
    recentDeals: 8,
    growth: '+12%',
  },
  { 
    name: 'Rwanda', 
    flag: '🇷🇼', 
    slug: 'rwanda',
    region: 'East Africa',
    companies: 134, 
    startups: 89,
    totalFunding: '$120M',
    topSectors: ['Fintech', 'Healthtech', 'Cleantech'],
    recentDeals: 5,
    growth: '+35%',
  },
  { 
    name: 'Tanzania', 
    flag: '🇹🇿', 
    slug: 'tanzania',
    region: 'East Africa',
    companies: 98, 
    startups: 67,
    totalFunding: '$85M',
    topSectors: ['Agritech', 'Fintech', 'Logistics'],
    recentDeals: 4,
    growth: '+20%',
  },
  { 
    name: 'Ethiopia', 
    flag: '🇪🇹', 
    slug: 'ethiopia',
    region: 'East Africa',
    companies: 76, 
    startups: 45,
    totalFunding: '$45M',
    topSectors: ['HR Tech', 'Agritech', 'Logistics'],
    recentDeals: 3,
    growth: '+42%',
  },
];

const regions = ['All Regions', 'West Africa', 'East Africa', 'North Africa', 'Southern Africa', 'Central Africa'];

const Countries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All Regions' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const totalStats = {
    companies: filteredCountries.reduce((sum, c) => sum + c.companies, 0),
    funding: '$4.9B',
    deals: filteredCountries.reduce((sum, c) => sum + c.recentDeals, 0),
  };

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
            <div className="text-2xl font-semibold text-foreground">{totalStats.funding}</div>
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
