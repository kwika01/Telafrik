import { Link } from 'react-router-dom';
import { Building2, MapPin, Loader2, Users } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import GlobalSearch from '@/components/search/GlobalSearch';
import { Badge } from '@/components/ui/badge';
import { useInvestors } from '@/api/queries/useInvestors';

const Investors = () => {
  const { data: investorsData, isLoading, error } = useInvestors({ pageSize: 50 });
  const investors = investorsData?.data || [];

  return (
    <AppLayout>
      {/* Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Investors & Accelerators
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Discover VCs, accelerators, and angel investors backing African innovation.
          </p>
          <div className="max-w-xl">
            <GlobalSearch placeholder="Search investors, accelerators..." />
          </div>
        </div>
      </section>

      {/* Investors Grid */}
      <section className="py-10">
        <div className="container-wide">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">Failed to load investors. Please try again.</p>
            </div>
          ) : investors.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No investors yet</h3>
              <p className="text-muted-foreground mb-4">
                Investor data is being populated. Check back soon!
              </p>
              <Link
                to="/contact"
                className="text-primary hover:underline font-medium"
              >
                Suggest an investor →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investors.map((investor) => (
                  <Link
                    key={investor.id}
                    to={`/investor/${investor.slug}`}
                    className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {investor.logoUrl ? (
                          <img
                            src={investor.logoUrl}
                            alt={investor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {investor.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                          {investor.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">{investor.portfolioCount}</span> portfolio companies
                        </span>
                      </div>
                      
                      {investor.hqCountry && (
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            HQ: {investor.hqCountry.name}
                          </span>
                        </div>
                      )}

                      {investor.totalInvestments > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">
                            💰 <span className="font-medium text-foreground">${(investor.totalInvestments / 1000000).toFixed(0)}M</span> invested
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 text-center py-12 bg-secondary/30 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  More Investors Coming Soon
                </h3>
                <p className="text-muted-foreground mb-4">
                  We're continuously expanding our investor database.
                </p>
                <Link
                  to="/contact"
                  className="text-primary hover:underline font-medium"
                >
                  Suggest an investor →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Investors;
