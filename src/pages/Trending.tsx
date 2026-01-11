import { TrendingUp, Flame, ArrowUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StartupCard from '@/components/startups/StartupCard';
import { startups } from '@/lib/mockData';

const Trending = () => {
  const trendingStartups = startups.filter((s) => s.trending);
  const hotStartups = startups.slice(0, 3);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-foreground/10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Trending Startups
            </h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            Discover the African startups generating the most buzz, based on funding activity, press coverage, and market momentum.
          </p>
        </div>
      </section>

      {/* Hot Right Now */}
      <section className="py-10">
        <div className="container-wide">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-bold text-foreground">Hot Right Now</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {hotStartups.map((startup, index) => (
              <div key={startup.id} className="relative">
                <div className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                  #{index + 1}
                </div>
                <StartupCard startup={startup} featured />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Trending */}
      <section className="py-10 bg-secondary/30">
        <div className="container-wide">
          <div className="flex items-center gap-2 mb-6">
            <ArrowUp className="h-5 w-5 text-success" />
            <h2 className="text-xl font-bold text-foreground">Rising Momentum</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>

          {trendingStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No trending startups at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-10">
        <div className="container-wide">
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
            <h3 className="font-semibold text-foreground mb-3">How We Calculate Trends</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our trending algorithm considers multiple signals including recent funding announcements,
              press mentions, website traffic changes, social media engagement, and user interest on
              AfricaBase. Startups are ranked based on momentum over the past 7-30 days relative to
              their baseline activity.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trending;
