import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Building2, TrendingUp, DollarSign, Layers, Globe } from 'lucide-react';
import QuickActions from '@/components/dashboard/QuickActions';
import StatCard from '@/components/dashboard/StatCard';
import TrendingTable from '@/components/dashboard/TrendingTable';
import SectorSpotlight from '@/components/dashboard/SectorSpotlight';
import LatestDeals from '@/components/dashboard/LatestDeals';
import MarketHeatmap from '@/components/dashboard/MarketHeatmap';
import { useDashboardStats, useMarketHeatmap, useSectorSpotlight } from '@/api/queries/useDashboard';
import { useLatestDeals } from '@/api/queries/useFunding';
import { useTrendingCompanies } from '@/api/queries/useCompanies';
import { useAuth } from '@/contexts/AuthContext';

function formatFunding(amountUsd: number): string {
  if (amountUsd >= 1_000_000_000) return `$${(amountUsd / 1_000_000_000).toFixed(1)}B`;
  if (amountUsd >= 1_000_000) return `$${(amountUsd / 1_000_000).toFixed(1)}M`;
  if (amountUsd >= 1_000) return `$${(amountUsd / 1_000).toFixed(1)}K`;
  return `$${amountUsd.toLocaleString()}`;
}

const Dashboard = () => {
  const { isSuperAdmin } = useAuth();
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: trendingData } = useTrendingCompanies(5);
  const { data: latestDealsData } = useLatestDeals(5);
  const { data: sectorSpotlightData } = useSectorSpotlight();
  const { data: marketHeatmapData } = useMarketHeatmap(8);

  const stats = [
    {
      label: 'Startups Tracked',
      value: statsLoading ? '—' : (statsData?.totalCompanies ?? 0).toLocaleString(),
      change: 'Live from Supabase',
      icon: Building2,
    },
    {
      label: 'Startups Added (30d)',
      value: statsLoading ? '—' : String(statsData?.startupsAdded30d ?? 0),
      change: 'vs last month',
      icon: TrendingUp,
    },
    {
      label: 'Total Funding Tracked',
      value: statsLoading ? '—' : formatFunding(statsData?.totalFundingUsd ?? 0),
      change: 'Across all rounds',
      icon: DollarSign,
    },
    {
      label: 'Active Sectors',
      value: statsLoading ? '—' : String(statsData?.activeSectors ?? 0),
      change: 'With coverage',
      icon: Layers,
    },
    {
      label: 'Countries Covered',
      value: statsLoading ? '—' : String(statsData?.countriesCovered ?? 0),
      change: 'All of Africa',
      icon: Globe,
    },
  ];

  const trendingCompanies = (trendingData ?? []).map((c) => ({
    name: c.name,
    sector: c.sector?.name ?? '—',
    country: c.hqCountry?.name ?? '—',
    momentum: c.trendingScore ?? 0,
    change: '',
  }));

  const latestDeals = latestDealsData ?? [];

  const sectorSpotlight = sectorSpotlightData ?? {
    name: '—',
    slug: '',
    companies: 0,
    totalFunding: '—',
    growth: '—',
    description: 'No sector data yet.',
    topCompanies: [],
  };

  const marketHeatmap = (marketHeatmapData ?? []).map((m) => ({
    country: m.country,
    activity: m.activity,
    companies: m.companies,
    funding: m.funding,
    growth: m.growth,
  }));

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header - Enhanced Typography Authority */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1 font-medium">
              Illuminating Africa's companies, capital, and growth.
            </p>
          </div>
          {isSuperAdmin && <QuickActions />}
        </motion.div>

        {/* STATS CONTRAST BLOCK: Strong Surface Separation */}
        <div className="relative -mx-6 lg:-mx-8 px-6 lg:px-8 py-8 bg-surface-alt border-y border-border">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>

        {/* DATA SECTION: Hard Surface Block */}
        <div className="relative -mx-6 lg:-mx-8 px-6 lg:px-8 py-8 bg-surface border-y border-border">
          {/* Trending + Sector Spotlight */}
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            <div className="lg:col-span-2">
              <TrendingTable companies={trendingCompanies} />
            </div>
            <SectorSpotlight sector={sectorSpotlight} />
          </div>

          {/* Section Divider */}
          <div className="h-px bg-border my-8" />

          {/* Deals + Heatmap */}
          <div className="grid lg:grid-cols-2 gap-5">
            <LatestDeals deals={latestDeals} />
            <MarketHeatmap markets={marketHeatmap} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
