import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Building2, TrendingUp, DollarSign, Layers, Globe } from 'lucide-react';
import QuickActions from '@/components/dashboard/QuickActions';
import StatCard from '@/components/dashboard/StatCard';
import TrendingTable from '@/components/dashboard/TrendingTable';
import SectorSpotlight from '@/components/dashboard/SectorSpotlight';
import LatestDeals from '@/components/dashboard/LatestDeals';
import MarketHeatmap from '@/components/dashboard/MarketHeatmap';

const Dashboard = () => {
  const stats = [
    { label: 'Total Companies', value: '2,847', change: '+124 this month', icon: Building2 },
    { label: 'Startups Added (30d)', value: '89', change: '+12% vs last month', icon: TrendingUp },
    { label: 'Total Funding Tracked', value: '$4.2B', change: 'Across all rounds', icon: DollarSign },
    { label: 'Active Sectors', value: '12', change: 'With coverage', icon: Layers },
    { label: 'Countries Covered', value: '54', change: 'All of Africa', icon: Globe },
  ];

  const trendingCompanies = [
    { name: 'Flutterwave', sector: 'Fintech', country: 'Nigeria', momentum: 94, change: '+12', verified: true },
    { name: 'Andela', sector: 'HR Tech', country: 'Pan-Africa', momentum: 91, change: '+8', verified: true },
    { name: 'Moniepoint', sector: 'Fintech', country: 'Nigeria', momentum: 89, change: '+15', verified: true },
    { name: 'Paystack', sector: 'Fintech', country: 'Nigeria', momentum: 87, change: '+5', verified: true },
    { name: 'SeamlessHR', sector: 'HR Tech', country: 'Nigeria', momentum: 85, change: '+10', verified: false },
  ];

  const latestDeals = [
    { company: 'Moniepoint', amount: '$110M', round: 'Series C', date: 'Jan 2024', sector: 'Fintech' },
    { company: 'Flutterwave', amount: '$250M', round: 'Series D', date: 'Dec 2023', sector: 'Fintech' },
    { company: 'MNT-Halan', amount: '$400M', round: 'Series C', date: 'Nov 2023', sector: 'Fintech' },
    { company: 'OPay', amount: '$120M', round: 'Series C', date: 'Oct 2023', sector: 'Fintech' },
    { company: 'Wave', amount: '$200M', round: 'Series A', date: 'Sep 2023', sector: 'Fintech' },
  ];

  const sectorSpotlight = {
    name: 'HR Tech',
    companies: 45,
    totalFunding: '$180M',
    growth: '+34%',
    description: 'Payroll, HRIS, and workforce management solutions seeing strong growth across Africa.',
    topCompanies: ['SeamlessHR', 'Workpay', 'Bento'],
  };

  const marketHeatmap = [
    { country: 'Nigeria', activity: 'very-high', companies: 892, funding: '$2.1B', growth: '+18%' },
    { country: 'Kenya', activity: 'high', companies: 456, funding: '$890M', growth: '+22%' },
    { country: 'South Africa', activity: 'high', companies: 398, funding: '$650M', growth: '+15%' },
    { country: 'Egypt', activity: 'high', companies: 312, funding: '$540M', growth: '+28%' },
    { country: 'Ghana', activity: 'medium', companies: 187, funding: '$210M', growth: '+12%' },
    { country: 'Rwanda', activity: 'medium', companies: 134, funding: '$95M', growth: '+35%' },
    { country: 'Tanzania', activity: 'medium', companies: 98, funding: '$78M', growth: '+20%' },
    { country: 'Ethiopia', activity: 'medium', companies: 76, funding: '$45M', growth: '+45%' },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Illuminating Africa's companies, capital, and growth.
            </p>
          </div>
          <QuickActions />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Trending + Sector Spotlight */}
        <div className="grid lg:grid-cols-3 gap-4">
          <TrendingTable companies={trendingCompanies} />
          <SectorSpotlight sector={sectorSpotlight} />
        </div>

        {/* Deals + Heatmap */}
        <div className="grid lg:grid-cols-2 gap-4">
          <LatestDeals deals={latestDeals} />
          <MarketHeatmap markets={marketHeatmap} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
