import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Target, Globe, Linkedin, Loader2, Users } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInvestor, useInvestorPortfolio } from '@/api/queries/useInvestors';

const InvestorProfile = () => {
  const { slug } = useParams();
  const { data: investor, isLoading, error } = useInvestor(slug);
  const { data: portfolioCompanies = [] } = useInvestorPortfolio(investor?.id);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (error || !investor) {
    return (
      <AppLayout>
        <div className="container-wide py-20 text-center">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Investor Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The investor you're looking for doesn't exist or hasn't been added yet.
          </p>
          <Button asChild>
            <Link to="/investors">Browse Investors</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border py-3">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/investors" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Investors
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{investor.name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                {investor.logo_url ? (
                  <img src={investor.logo_url} alt={investor.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{investor.name}</h1>
                  <Badge variant="secondary">{investor.type}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium text-foreground">{portfolioCompanies.length}</span> portfolio companies
                  </div>
                  {investor.hq_country && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {investor.hq_country.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:ml-auto flex gap-3">
              {investor.website_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={investor.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {investor.linkedin_url && (
                <Button variant="outline" size="icon" asChild>
                  <a href={investor.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">About {investor.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {`${investor.name} is a ${(investor.type as string).toLowerCase()} investing in high-growth African startups.`
                    + (investor.stage_focus ? ` Stage focus: ${investor.stage_focus}.` : '')
                    + (investor.sector_focus ? ` Sector focus: ${investor.sector_focus}.` : '')
                    + (investor.regions ? ` Active regions: ${investor.regions}.` : '')}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Companies</h2>
                {portfolioCompanies.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioCompanies.slice(0, 12).map((company: any) => (
                      <div key={company.id} className="block p-4 rounded-lg border border-border bg-card">
                        <h3 className="font-medium text-foreground">{company.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {company.round && <p className="text-xs text-muted-foreground">{company.round}</p>}
                          {company.amount && <p className="text-xs font-semibold text-primary">{company.amount}</p>}
                          {company.year && <p className="text-xs text-muted-foreground">{company.year}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-secondary/30 rounded-xl border border-border p-8 text-center">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Portfolio information coming soon.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Investment Focus</h3>
                <dl className="space-y-3">
                  {investor.stage_focus && (
                    <div>
                      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Stage</dt>
                      <dd className="text-sm text-foreground">{investor.stage_focus}</dd>
                    </div>
                  )}
                  {investor.sector_focus && (
                    <div>
                      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Sectors</dt>
                      <dd className="text-sm text-foreground">{investor.sector_focus}</dd>
                    </div>
                  )}
                  {investor.regions && (
                    <div>
                      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Regions</dt>
                      <dd className="text-sm text-foreground">{investor.regions}</dd>
                    </div>
                  )}
                  {investor.check_size_usd && (
                    <div>
                      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Check Size</dt>
                      <dd className="text-sm font-semibold text-primary">{investor.check_size_usd}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Type</dt>
                    <dd className="text-sm font-medium text-foreground">{investor.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Deals Tracked</dt>
                    <dd className="text-sm font-medium text-foreground">{portfolioCompanies.length}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default InvestorProfile;
