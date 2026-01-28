import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Building2, Users, Briefcase, Loader2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCompanySearch } from '@/api/queries/useCompanies';
import { useInvestorSearch } from '@/api/queries/useInvestors';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Use the search hooks
  const { 
    data: searchedCompanies = [], 
    isLoading: companiesLoading 
  } = useCompanySearch(query, 20);

  const { 
    data: searchedInvestors = [], 
    isLoading: investorsLoading 
  } = useInvestorSearch(query, 20);

  const isLoading = companiesLoading || investorsLoading;
  const totalResults = searchedCompanies.length + searchedInvestors.length;

  return (
    <AppLayout>
      {/* Search Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <GlobalSearch size="lg" />
          </div>
          {query && !isLoading && (
            <p className="text-center text-muted-foreground mt-4">
              {totalResults} results for "<span className="font-medium text-foreground">{query}</span>"
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-10">
        <div className="container-wide">
          {!query ? (
            <div className="text-center py-16">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Search TelAfrik</h2>
              <p className="text-muted-foreground">
                Find startups, investors, founders, and more across the African ecosystem.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-16">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse our directory.
              </p>
              <Link to="/directory" className="text-primary hover:underline font-medium">
                Browse all startups →
              </Link>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  All ({totalResults})
                </TabsTrigger>
                <TabsTrigger value="startups" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Startups ({searchedCompanies.length})
                </TabsTrigger>
                <TabsTrigger value="investors" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Investors ({searchedInvestors.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                {searchedCompanies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Startups</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchedCompanies.slice(0, 6).map((company) => (
                        <StartupCard key={company.id} company={company} />
                      ))}
                    </div>
                    {searchedCompanies.length > 6 && (
                      <div className="mt-4 text-center">
                        <Link to={`/directory?search=${encodeURIComponent(query)}`} className="text-primary hover:underline font-medium">
                          View all {searchedCompanies.length} startups →
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {searchedInvestors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Investors</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchedInvestors.map((investor) => (
                        <Link
                          key={investor.id}
                          to={`/investor/${investor.slug}`}
                          className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex items-center justify-center">
                            {investor.logoUrl ? (
                              <img
                                src={investor.logoUrl}
                                alt={investor.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{investor.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {investor.portfolioCount} investments
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="startups">
                {searchedCompanies.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchedCompanies.map((company) => (
                      <StartupCard key={company.id} company={company} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No startups found matching your search.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="investors">
                {searchedInvestors.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchedInvestors.map((investor) => (
                      <Link
                        key={investor.id}
                        to={`/investor/${investor.slug}`}
                        className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex items-center justify-center">
                          {investor.logoUrl ? (
                            <img
                              src={investor.logoUrl}
                              alt={investor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{investor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {investor.portfolioCount} investments
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No investors found matching your search.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Search;
