import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Wallet, Users, Heart, Leaf, GraduationCap, Truck, ShoppingBag, Building, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { sectorsData } from '@/lib/sectorData';

const iconMap: Record<string, React.ReactNode> = {
  Wallet: <Wallet className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  Leaf: <Leaf className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Truck: <Truck className="h-8 w-8" />,
  ShoppingBag: <ShoppingBag className="h-8 w-8" />,
  Building: <Building className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
};

const Sectors = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Sector Intelligence
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl">
            Explore African startups across key industries driving innovation and economic growth across the continent.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectorsData.map((sector) => (
              <Link
                key={sector.id}
                to={`/sectors/${sector.slug}`}
                className="group bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {iconMap[sector.icon] || <Building2 className="h-8 w-8" />}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {sector.name}
                </h2>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {sector.description}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{sector.startupCount}</span> startups
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sectors;
