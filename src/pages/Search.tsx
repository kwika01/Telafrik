import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Building2, Users, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { startups, investors } from '@/lib/mockData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Simple search logic
  const filteredStartups = startups.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.sector.toLowerCase().includes(query.toLowerCase()) ||
      s.hqCountry.toLowerCase().includes(query.toLowerCase()) ||
      s.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredInvestors = investors.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.sectorFocus.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredFounders = startups
    .flatMap((s) => s.founders.map((f) => ({ ...f, company: s.name, companySlug: s.slug })))
    .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  const totalResults = filteredStartups.length + filteredInvestors.length + filteredFounders.length;

  return (
    <Layout>
      {/* Search Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <GlobalSearch size="lg" />
          </div>
          {query && (
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
              <h2 className="text-xl font-semibold text-foreground mb-2">Search AfricaBase</h2>
              <p className="text-muted-foreground">
                Find startups, investors, founders, and more across the African ecosystem.
              </p>
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
                  Startups ({filteredStartups.length})
                </TabsTrigger>
                <TabsTrigger value="investors" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Investors ({filteredInvestors.length})
                </TabsTrigger>
                <TabsTrigger value="people" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  People ({filteredFounders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                {filteredStartups.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Startups</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredStartups.slice(0, 6).map((startup) => (
                        <StartupCard key={startup.id} startup={startup} />
                      ))}
                    </div>
                  </div>
                )}

                {filteredInvestors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Investors</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredInvestors.map((investor) => (
                        <div
                          key={investor.id}
                          className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
                        >
                          <img
                            src={investor.logo}
                            alt={investor.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{investor.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {investor.portfolioCount} investments
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredFounders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">People</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFounders.map((founder, index) => (
                        <Link
                          key={`${founder.id}-${index}`}
                          to={`/startup/${founder.companySlug}`}
                          className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{founder.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {founder.role} at {founder.company}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="startups">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStartups.map((startup) => (
                    <StartupCard key={startup.id} startup={startup} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="investors">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInvestors.map((investor) => (
                    <div
                      key={investor.id}
                      className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
                    >
                      <img
                        src={investor.logo}
                        alt={investor.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{investor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {investor.portfolioCount} investments
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="people">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFounders.map((founder, index) => (
                    <Link
                      key={`${founder.id}-${index}`}
                      to={`/startup/${founder.companySlug}`}
                      className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{founder.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {founder.role} at {founder.company}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
