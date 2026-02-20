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
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useDeals } from '@/api/queries/useFunding';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const roundTypes = ['All Rounds', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+'];
const sectors = ['All Sectors', 'Fintech', 'HR Tech', 'Healthtech', 'Agritech', 'E-commerce', 'Edtech', 'Logistics', 'Cleantech'];

const Deals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRound, setSelectedRound] = useState('All Rounds');
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  const { data: deals = [], isLoading, error } = useDeals();

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch = deal.company.toLowerCase().includes(searchQuery.toLowerCase());
      const roundMatch = selectedRound === 'All Rounds' || deal.round === selectedRound;
      const matchesSector = selectedSector === 'All Sectors' || deal.sector === selectedSector;
      return matchesSearch && roundMatch && matchesSector;
    });
  }, [deals, searchQuery, selectedRound, selectedSector]);

  const totalFunding = useMemo(() => {
    const sum = deals.reduce((acc, d) => acc + (d.amountUsd ?? 0), 0);
    if (sum >= 1e9) return `$${(sum / 1e9).toFixed(2)}B`;
    if (sum >= 1e6) return `$${(sum / 1e6).toFixed(1)}M`;
    if (sum >= 1e3) return `$${(sum / 1e3).toFixed(1)}K`;
    return `$${sum.toLocaleString()}`;
  }, [deals]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="empty-state data-card py-12 m-6">
          <p className="text-destructive">Failed to load deals. Please try again later.</p>
        </div>
      </AppLayout>
    );
  }

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
