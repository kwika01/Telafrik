import { Link } from 'react-router-dom';
import { Building2, MapPin, Target } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import { Badge } from '@/components/ui/badge';
import { investors } from '@/lib/mockData';

const Investors = () => {
  return (
    <Layout>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investors.map((investor) => (
              <Link
                key={investor.id}
                to={`/investor/${investor.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
                    <img
                      src={investor.logo}
                      alt={investor.name}
                      className="w-full h-full object-cover"
                    />
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
                  
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      {investor.geographyFocus.slice(0, 3).join(', ')}
                      {investor.geographyFocus.length > 3 && ` +${investor.geographyFocus.length - 3}`}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <Target className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {investor.sectorFocus.slice(0, 3).map((sector) => (
                        <span
                          key={sector}
                          className="px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state / CTA */}
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
        </div>
      </section>
    </Layout>
  );
};

export default Investors;
