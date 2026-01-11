import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Target, Globe, Linkedin, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { investors, startups } from '@/lib/mockData';

const InvestorProfile = () => {
  const { slug } = useParams();
  const investor = investors.find(i => i.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!investor) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Investor Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The investor you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/investors">Browse Investors</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get portfolio companies (mock - filter by sector match)
  const portfolioCompanies = startups.filter(s => 
    investor.sectorFocus.includes(s.sector)
  ).slice(0, 6);

  return (
    <Layout>
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
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0">
                <img
                  src={investor.logo}
                  alt={investor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {investor.name}
                  </h1>
                  <Badge variant="secondary">{investor.type}</Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium text-foreground">{investor.portfolioCount}</span> portfolio companies
                  </div>
                </div>
              </div>
            </div>

            <div className="md:ml-auto flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">About {investor.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {investor.name} is a leading {investor.type.toLowerCase()} focused on investing in high-growth African startups. 
                  With a portfolio of {investor.portfolioCount}+ companies, they have been instrumental in building 
                  Africa's technology ecosystem.
                </p>
              </div>

              {/* Portfolio Companies */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Companies</h2>
                {portfolioCompanies.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioCompanies.map((startup) => (
                      <StartupCard key={startup.id} startup={startup} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-secondary/30 rounded-xl border border-border p-8 text-center">
                    <p className="text-muted-foreground">Portfolio information coming soon.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Investment Focus */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Investment Focus</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4" />
                      Sectors
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {investor.sectorFocus.map((sector) => (
                        <Badge key={sector} variant="secondary">{sector}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Geography
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {investor.geographyFocus.slice(0, 5).map((geo) => (
                        <Badge key={geo} variant="outline">{geo}</Badge>
                      ))}
                      {investor.geographyFocus.length > 5 && (
                        <Badge variant="outline">+{investor.geographyFocus.length - 5} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Type</dt>
                    <dd className="text-sm font-medium text-foreground">{investor.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Portfolio Size</dt>
                    <dd className="text-sm font-medium text-foreground">{investor.portfolioCount}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InvestorProfile;
