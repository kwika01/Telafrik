import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, DollarSign, Building2, Users, Globe, Zap } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import GlobalSearch from '@/components/search/GlobalSearch';
import StartupCard from '@/components/startups/StartupCard';
import { Button } from '@/components/ui/button';
import { startups, sectors, countries } from '@/lib/mockData';

const Index = () => {
  const trendingStartups = startups.filter((s) => s.trending).slice(0, 3);
  const recentlyFunded = startups.filter((s) => s.recentlyFunded).slice(0, 4);

  const stats = [
    { label: 'Startups Tracked', value: '2,400+', icon: Building2 },
    { label: 'Total Funding', value: '$8.2B', icon: DollarSign },
    { label: 'Investors', value: '450+', icon: Users },
    { label: 'Countries', value: '54', icon: Globe },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success rounded-full blur-3xl" />
        </div>
        
        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm mb-6 animate-fade-in">
              <Zap className="h-4 w-4" />
              Africa's Investment Intelligence Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Discover Africa's Most{' '}
              <span className="text-gradient-gold">Promising Startups</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Track funding rounds, valuations, and growth metrics across 2,400+ startups in 54 African countries.
            </p>

            <div className="max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <GlobalSearch size="lg" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm text-primary-foreground/60 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <span>Popular:</span>
              {['Fintech', 'Nigeria', 'Series A', 'Healthtech'].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${term}`}
                  className="px-3 py-1 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-3">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                  Trending Now
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Startups Gaining Momentum
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link to="/trending">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trendingStartups.map((startup, index) => (
              <div
                key={startup.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StartupCard startup={startup} featured />
              </div>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link to="/trending">
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recently Funded */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-success uppercase tracking-wider">
                  Fresh Capital
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Recently Funded Startups
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link to="/directory?sort=recently-funded">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyFunded.map((startup, index) => (
              <div
                key={startup.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Sector */}
      <section className="py-16">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Browse by Sector
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore African startups across key industries driving innovation and growth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sectors.map((sector, index) => (
              <Link
                key={sector}
                to={`/directory?sector=${encodeURIComponent(sector)}`}
                className="group p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {sector}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Country */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Top Startup Ecosystems
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the leading African countries for startup investment and innovation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {countries.map((country, index) => (
              <Link
                key={country}
                to={`/directory?country=${encodeURIComponent(country)}`}
                className="group p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all text-center"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {country}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Get Full Access to African Startup Intelligence
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8">
              Unlock advanced filters, company comparisons, data exports, and real-time alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
