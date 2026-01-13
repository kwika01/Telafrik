import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Globe,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard = () => {
  // Mock data - will be replaced with real data
  const stats = [
    { label: 'Total Companies', value: '2,847', change: '+124 this month', icon: Building2 },
    { label: 'Startups Added (30d)', value: '89', change: '+12% vs last month', icon: TrendingUp },
    { label: 'Total Funding Tracked', value: '$4.2B', change: 'Across all rounds', icon: DollarSign },
    { label: 'Active Sectors', value: '12', change: 'With coverage', icon: Layers },
    { label: 'Countries Covered', value: '54', change: 'All of Africa', icon: Globe },
  ];

  const trendingCompanies = [
    { name: 'Flutterwave', sector: 'Fintech', country: 'Nigeria', momentum: 94, change: '+12' },
    { name: 'Andela', sector: 'HR Tech', country: 'Pan-Africa', momentum: 91, change: '+8' },
    { name: 'Moniepoint', sector: 'Fintech', country: 'Nigeria', momentum: 89, change: '+15' },
    { name: 'Paystack', sector: 'Fintech', country: 'Nigeria', momentum: 87, change: '+5' },
    { name: 'SeamlessHR', sector: 'HR Tech', country: 'Nigeria', momentum: 85, change: '+10' },
  ];

  const latestDeals = [
    { company: 'Moniepoint', amount: '$110M', round: 'Series C', date: 'Jan 2024' },
    { company: 'Flutterwave', amount: '$250M', round: 'Series D', date: 'Dec 2023' },
    { company: 'MNT-Halan', amount: '$400M', round: 'Series C', date: 'Nov 2023' },
    { company: 'OPay', amount: '$120M', round: 'Series C', date: 'Oct 2023' },
    { company: 'Wave', amount: '$200M', round: 'Series A', date: 'Sep 2023' },
  ];

  const sectorSpotlight = {
    name: 'HR Tech',
    companies: 45,
    totalFunding: '$180M',
    growth: '+34%',
    description: 'Payroll, HRIS, and workforce management solutions seeing strong growth across Africa.',
  };

  const marketHeatmap = [
    { country: 'Nigeria', activity: 'very-high', companies: 892 },
    { country: 'Kenya', activity: 'high', companies: 456 },
    { country: 'South Africa', activity: 'high', companies: 398 },
    { country: 'Egypt', activity: 'high', companies: 312 },
    { country: 'Ghana', activity: 'medium', companies: 187 },
    { country: 'Rwanda', activity: 'medium', companies: 134 },
    { country: 'Tanzania', activity: 'medium', companies: 98 },
    { country: 'Ethiopia', activity: 'medium', companies: 76 },
  ];

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'very-high': return 'bg-primary';
      case 'high': return 'bg-primary/70';
      case 'medium': return 'bg-primary/40';
      default: return 'bg-muted';
    }
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Illuminating Africa's companies, capital, and growth.
            </p>
          </div>
          <QuickActions />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trending Companies */}
          <div className="lg:col-span-2 data-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-foreground">Trending Companies</h2>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/signals" className="text-muted-foreground hover:text-foreground">
                  View all <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 table-header">Company</th>
                    <th className="text-left py-3 table-header">Sector</th>
                    <th className="text-left py-3 table-header">Country</th>
                    <th className="text-right py-3 table-header">Momentum</th>
                    <th className="text-right py-3 table-header">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {trendingCompanies.map((company, index) => (
                    <tr key={company.name} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground text-sm">{index + 1}</span>
                          <span className="font-medium text-foreground">{company.name}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="badge-sector">{company.sector}</span>
                      </td>
                      <td className="py-3 text-muted-foreground text-sm">{company.country}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${company.momentum}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-8">{company.momentum}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-sm text-success">{company.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sector Spotlight */}
          <div className="data-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground">Sector Spotlight</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{sectorSpotlight.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{sectorSpotlight.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{sectorSpotlight.companies}</div>
                  <div className="text-xs text-muted-foreground">Companies</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{sectorSpotlight.totalFunding}</div>
                  <div className="text-xs text-muted-foreground">Funding</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="text-lg font-semibold text-success">{sectorSpotlight.growth}</div>
                  <div className="text-xs text-muted-foreground">Growth</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/sectors/hr-tech">
                  View Sector <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Latest Deals */}
          <div className="data-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-foreground">Latest Deals</h2>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/deals" className="text-muted-foreground hover:text-foreground">
                  View all <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              {latestDeals.map((deal) => (
                <div key={deal.company} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="font-medium text-foreground">{deal.company}</div>
                    <div className="text-xs text-muted-foreground">{deal.round} • {deal.date}</div>
                  </div>
                  <div className="text-lg font-semibold text-primary">{deal.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Heatmap */}
          <div className="data-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-foreground">Market Activity</h2>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/countries" className="text-muted-foreground hover:text-foreground">
                  View all <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {marketHeatmap.map((market) => (
                <div 
                  key={market.country} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${getActivityColor(market.activity)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{market.country}</div>
                    <div className="text-xs text-muted-foreground">{market.companies} companies</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
