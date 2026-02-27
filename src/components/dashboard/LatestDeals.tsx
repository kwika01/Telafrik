import { Link } from 'react-router-dom';
import { DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Deal {
  company: string;
  amount: string;
  round: string;
  date: string;
}

interface LatestDealsProps {
  deals: Deal[];
}

function getInitial(name: string): string {
  return (name || '?').trim()[0].toUpperCase();
}

const LatestDeals = ({ deals }: LatestDealsProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground text-base">Latest Deals</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground text-sm gap-1">
          <Link to="/deals">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Deal list */}
      <div className="divide-y divide-border">
        {deals.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No deal data available.
          </div>
        ) : (
          deals.map((deal) => (
            <div
              key={`${deal.company}-${deal.date}`}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-white select-none">
                    {getInitial(deal.company)}
                  </span>
                </div>

                {/* Name + meta */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {deal.company}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {deal.round}
                    {deal.date && deal.date !== '—' ? <> &middot; {deal.date}</> : null}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <span className="flex-shrink-0 text-sm font-bold text-primary tabular-nums ml-3">
                {deal.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestDeals;
