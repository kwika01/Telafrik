import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import FilterPanel, { FilterState } from '@/components/filters/FilterPanel';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { startups } from '@/lib/mockData';

type ViewMode = 'grid' | 'list';
type SortOption = 'trending' | 'most-funded' | 'recently-added' | 'valuation';

const Directory = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [filters, setFilters] = useState<FilterState>({
    sectors: [],
    countries: [],
    stages: [],
    fundingMin: '',
    fundingMax: '',
  });

  const filteredStartups = useMemo(() => {
    let result = [...startups];

    // Apply filters
    if (filters.sectors.length > 0) {
      result = result.filter((s) => filters.sectors.includes(s.sector));
    }
    if (filters.countries.length > 0) {
      result = result.filter((s) => filters.countries.includes(s.hqCountry));
    }
    if (filters.stages.length > 0) {
      result = result.filter((s) => filters.stages.includes(s.stage));
    }

    // Apply sorting
    switch (sortBy) {
      case 'trending':
        result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'most-funded':
        // Simple sort by parsing funding amount
        result.sort((a, b) => {
          const aVal = parseFloat(a.totalFunding.replace(/[^0-9.]/g, ''));
          const bVal = parseFloat(b.totalFunding.replace(/[^0-9.]/g, ''));
          return bVal - aVal;
        });
        break;
      case 'valuation':
        result.sort((a, b) => b.valuation.confidenceScore - a.valuation.confidenceScore);
        break;
      case 'recently-added':
        result.sort((a, b) => b.yearFounded - a.yearFounded);
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Startup Directory
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Browse and discover Africa's most promising startups. Filter by sector, country, stage, and more.
          </p>
          <div className="max-w-xl">
            <GlobalSearch placeholder="Search startups, founders, sectors..." />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <FilterPanel onFilterChange={setFilters} />
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredStartups.length}</span> startups
                </p>
                
                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-44">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="most-funded">Most Funded</SelectItem>
                      <SelectItem value="valuation">Highest Valuation</SelectItem>
                      <SelectItem value="recently-added">Recently Added</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Grid/List */}
              {filteredStartups.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredStartups.map((startup) => (
                    <StartupCard key={startup.id} startup={startup} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-muted-foreground mb-4">
                    No startups match your filters.
                  </div>
                  <Button variant="outline" onClick={() => setFilters({
                    sectors: [],
                    countries: [],
                    stages: [],
                    fundingMin: '',
                    fundingMax: '',
                  })}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Directory;
