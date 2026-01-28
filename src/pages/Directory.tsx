import { useState, useCallback } from 'react';
import { LayoutGrid, List, ArrowUpDown, Loader2, AlertCircle, RefreshCw, Building2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import GlobalSearch from '@/components/search/GlobalSearch';
import FilterPanel, { FilterState } from '@/components/filters/FilterPanel';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useCompanies } from '@/api/queries/useCompanies';
import type { DirectoryFilters } from '@/types/domain';

type ViewMode = 'grid' | 'list';
type SortOption = 'trending' | 'most-funded' | 'recently-added' | 'name';

const PAGE_SIZE = 20;

import { CompanyCardSkeleton } from '@/components/common/Skeletons';

const Directory = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    sectors: [],
    countries: [],
    stages: [],
    fundingMin: '',
    fundingMax: '',
  });

  // Map UI sort options to API sort options
  const getSortParams = useCallback(() => {
    switch (sortBy) {
      case 'trending':
        return { sortBy: 'trending_score' as const, sortOrder: 'desc' as const };
      case 'most-funded':
        return { sortBy: 'total_funding_usd' as const, sortOrder: 'desc' as const };
      case 'recently-added':
        return { sortBy: 'year_founded' as const, sortOrder: 'desc' as const };
      case 'name':
        return { sortBy: 'name' as const, sortOrder: 'asc' as const };
      default:
        return { sortBy: 'trending_score' as const, sortOrder: 'desc' as const };
    }
  }, [sortBy]);

  // Convert FilterState to DirectoryFilters
  const apiFilters: DirectoryFilters = {
    sectors: filters.sectors,
    countries: filters.countries,
    regions: [],
    stages: filters.stages,
    fundingMin: filters.fundingMin ? parseInt(filters.fundingMin) * 1_000_000 : undefined,
    fundingMax: filters.fundingMax ? parseInt(filters.fundingMax) * 1_000_000 : undefined,
  };

  const { sortBy: apiSortBy, sortOrder } = getSortParams();

  const { 
    data, 
    isLoading, 
    isError, 
    error,
    refetch,
    isFetching,
  } = useCompanies({
    filters: apiFilters,
    page,
    pageSize: PAGE_SIZE,
    sortBy: apiSortBy,
    sortOrder,
  });

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    setPage(1); // Reset to first page when sort changes
  }, []);

  return (
    <AppLayout>
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
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {isLoading ? (
                      'Loading...'
                    ) : data ? (
                      data.totalCount === 0 ? (
                        'No startups'
                      ) : (
                        <>
                          Showing{' '}
                          <span className="font-medium text-foreground">
                            {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, data.totalCount)}
                          </span>{' '}
                          of{' '}
                          <span className="font-medium text-foreground">{data.totalCount}</span>{' '}
                          startups
                        </>
                      )
                    ) : (
                      'No data'
                    )}
                  </p>
                  {isFetching && !isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={(v) => handleSortChange(v as SortOption)}>
                    <SelectTrigger className="w-44">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="most-funded">Most Funded</SelectItem>
                      <SelectItem value="recently-added">Recently Founded</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
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

              {/* Loading State */}
              {isLoading && (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CompanyCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Failed to load startups</h3>
                  <p className="text-muted-foreground mb-4">
                    {error instanceof Error ? error.message : 'An unexpected error occurred'}
                  </p>
                  <Button onClick={() => refetch()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}

              {/* Results Grid/List */}
              {!isLoading && !isError && data && data.data.length > 0 && (
                <>
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {data.data.map((company) => (
                      <StartupCard key={company.id} company={company} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {data.totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setPage(p => Math.max(1, p - 1))}
                              className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                            let pageNum: number;
                            if (data.totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (page <= 3) {
                              pageNum = i + 1;
                            } else if (page >= data.totalPages - 2) {
                              pageNum = data.totalPages - 4 + i;
                            } else {
                              pageNum = page - 2 + i;
                            }
                            
                            return (
                              <PaginationItem key={pageNum}>
                                <PaginationLink
                                  onClick={() => setPage(pageNum)}
                                  isActive={page === pageNum}
                                  className="cursor-pointer"
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                              className={page === data.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!isLoading && !isError && data && data.data.length === 0 && (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No startups found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {filters.sectors.length > 0 || filters.countries.length > 0 || filters.stages.length > 0 || filters.fundingMin || filters.fundingMax
                      ? 'No startups match your current filters. Try adjusting or clearing them.'
                      : 'No startups in the directory yet. Check back later.'}
                  </p>
                  {(filters.sectors.length > 0 || filters.countries.length > 0 || filters.stages.length > 0 || filters.fundingMin || filters.fundingMax) && (
                    <Button
                      variant="outline"
                      onClick={() => handleFilterChange({
                        sectors: [],
                        countries: [],
                        stages: [],
                        fundingMin: '',
                        fundingMax: '',
                      })}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Directory;
