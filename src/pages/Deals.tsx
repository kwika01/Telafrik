import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  DollarSign,
  Building2,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Filter,
} from 'lucide-react';
import { useState } from 'react';

// Mock deals data
const deals = [
  {
    id: '1',
    company: 'Moniepoint',
    companySlug: 'moniepoint',
    amount: '$110M',
    round: 'Series C',
    date: 'Jan 2024',
    investors: ['QED Investors', 'Development Partners International'],
    sector: 'Fintech',
    country: 'Nigeria',
    valuation: '$1B+ (Est)',
  },
  {
    id: '2',
    company: 'Flutterwave',
    companySlug: 'flutterwave',
    amount: '$250M',
    round: 'Series D',
    date: 'Dec 2023',
    investors: ['Tiger Global', 'Avenir Growth'],
    sector: 'Fintech',
    country: 'Nigeria',
    valuation: '$3B',
  },
  {
    id: '3',
    company: 'MNT-Halan',
    companySlug: 'mnt-halan',
    amount: '$400M',
    round: 'Series C',
    date: 'Nov 2023',
    investors: ['Apis Partners', 'Lorax Capital'],
    sector: 'Fintech',
    country: 'Egypt',
    valuation: '$1.5B',
  },
  {
    id: '4',
    company: 'OPay',
    companySlug: 'opay',
    amount: '$120M',
    round: 'Series C',
    date: 'Oct 2023',
    investors: ['Softbank Vision Fund'],
    sector: 'Fintech',
    country: 'Nigeria',
    valuation: '$2B',
  },
  {
    id: '5',
    company: 'Wave',
    companySlug: 'wave',
    amount: '$200M',
    round: 'Series A',
    date: 'Sep 2023',
    investors: ['Stripe', 'Sequoia', 'Founders Fund'],
    sector: 'Fintech',
    country: 'Senegal',
    valuation: '$1.7B',
  },
  {
    id: '6',
    company: 'SeamlessHR',
    companySlug: 'seamlesshr',
    amount: '$10M',
    round: 'Series A',
    date: 'Aug 2023',
    investors: ['Tencent', 'Ventures Platform'],
    sector: 'HR Tech',
    country: 'Nigeria',
    valuation: '$50M (Est)',
  },
  {
    id: '7',
    company: 'Andela',
    companySlug: 'andela',
    amount: '$200M',
    round: 'Series E',
    date: 'Jul 2023',
    investors: ['Softbank Vision Fund 2', 'Google Ventures'],
    sector: 'HR Tech',
    country: 'Pan-Africa',
    valuation: '$1.5B',
  },
];

const roundTypes = ['All Rounds', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+'];
const sectors = ['All Sectors', 'Fintech', 'HR Tech', 'Healthtech', 'Agritech', 'E-commerce'];

const Deals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRound, setSelectedRound] = useState('All Rounds');
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch = deal.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRound = selectedRound === 'All Rounds' || deal.round.includes(selectedRound.replace('Series ', ''));
    const matchesSector = selectedSector === 'All Sectors' || deal.sector === selectedSector;
    return matchesSearch && matchesRound && matchesSector;
  });

  const totalFunding = '$1.29B';

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Funding & Deals</h1>
            <p className="text-muted-foreground mt-1">
              Track the latest funding rounds across Africa
            </p>
          </div>
          <div className="stat-card">
            <div className="text-xs text-muted-foreground">Total Tracked (2023-24)</div>
            <div className="text-xl font-semibold text-primary">{totalFunding}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm"
            >
              {roundTypes.map((round) => (
                <option key={round} value={round}>{round}</option>
              ))}
            </select>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Deals Table */}
        <div className="data-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 table-header">Company</th>
                <th className="text-left py-3 px-4 table-header">Amount</th>
                <th className="text-left py-3 px-4 table-header">Round</th>
                <th className="text-left py-3 px-4 table-header">Date</th>
                <th className="text-left py-3 px-4 table-header">Investors</th>
                <th className="text-left py-3 px-4 table-header">Valuation</th>
                <th className="text-right py-3 px-4 table-header"></th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{deal.company}</div>
                        <div className="text-xs text-muted-foreground">
                          {deal.sector} • {deal.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-semibold text-primary">{deal.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge-sector">{deal.round}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {deal.date}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {deal.investors.join(', ')}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">
                    {deal.valuation}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/startup/${deal.companySlug}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeals.length === 0 && (
          <div className="empty-state data-card py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No deals found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Deals;
