import { Link } from 'react-router-dom';
import { ArrowRight, Building2, TrendingUp, DollarSign, Loader2, Layers, Zap } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useSectors } from '@/api/queries/useSectors';
import { Button } from '@/components/ui/button';

const Sectors = () => {
  const { data: sectors = [], isLoading, error } = useSectors();

  // Calculate totals
  const totalStartups = sectors.reduce((acc, s) => acc + (s.startupCount || 0), 0);

  return (
    <AppLayout>
      {/* Header */}
      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4 text-indigo" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo">Sector Intelligence</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
              Explore by <span className="text-indigo">Sector</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore African startups across key industries driving innovation and economic growth across the continent.
            </p>
          </div>
          
          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo/10 border border-indigo/20 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-indigo" />
              </div>
              <span className="text-foreground">
                <span className="font-bold text-lg text-indigo">{sectors.length}</span>{' '}
                <span className="text-muted-foreground text-sm">sectors</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-emerald" />
              </div>
              <span className="text-foreground">
                <span className="font-bold text-lg text-emerald">{totalStartups}+</span>{' '}
                <span className="text-muted-foreground text-sm">startups tracked</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-gold" />
              </div>
              <span className="text-foreground">
                <span className="font-bold text-lg text-gold">$3B+</span>{' '}
                <span className="text-muted-foreground text-sm">total funding</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="section">
        <div className="container-wide">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-destructive">Failed to load sectors. Please try again.</p>
            </div>
          ) : sectors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No sectors available yet</h3>
              <p className="text-muted-foreground text-sm">Sector data is being populated. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sectors.map((sector) => (
                <Link
                  key={sector.id}
                  to={`/sectors/${sector.slug}`}
                  className="group block bg-card rounded-xl border border-border p-5 hover:border-indigo/40 hover:shadow-md transition-all duration-200 h-full relative overflow-hidden"
                >
                  {/* Subtle top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-indigo/10 border border-indigo/20 flex items-center justify-center text-xl">
                      {sector.icon || '🏢'}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo group-hover:translate-x-1 transition-all" />
                  </div>

                  <h2 className="text-lg font-semibold text-foreground group-hover:text-indigo transition-colors mb-2">
                    {sector.name}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {sector.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="flex items-center gap-1.5 bg-emerald/10 border border-emerald/20 px-2.5 py-1 rounded-full">
                      <Building2 className="h-3 w-3 text-emerald" />
                      <span className="font-semibold text-emerald">{sector.startupCount || 0}</span>
                      <span className="text-muted-foreground">startups</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Zap className="h-10 w-10 text-gold mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Browse our complete directory or use our AI-powered search to find specific startups, founders, or investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/directory">
                  <Building2 className="mr-2 h-4 w-4" />
                  Browse Directory
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                <Link to="/search">
                  Search Startups
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Sectors;
