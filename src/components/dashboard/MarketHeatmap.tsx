import { Link } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Market {
  country: string;
  activity: string;
  companies: number;
}

interface MarketHeatmapProps {
  markets: Market[];
}

function getDot(activity: string): { color: string; label: string } {
  switch (activity) {
    case 'very-high': return { color: 'bg-emerald-500', label: 'Very High' };
    case 'high':      return { color: 'bg-amber-500',   label: 'High'      };
    case 'medium':    return { color: 'bg-blue-400',    label: 'Medium'    };
    default:          return { color: 'bg-slate-300',   label: 'Low'       };
  }
}

const MarketHeatmap = ({ markets }: MarketHeatmapProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground text-base">Market Activity</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground text-sm gap-1">
          <Link to="/countries">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Market grid */}
      <div className="p-4 grid grid-cols-2 gap-2.5">
        {markets.length === 0 ? (
          <p className="col-span-2 text-center text-sm text-muted-foreground py-6">
            No market data available.
          </p>
        ) : (
          markets.map((market) => {
            const dot = getDot(market.activity);
            return (
              <div
                key={market.country}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-muted/30 border border-border hover:border-primary/30 hover:bg-white dark:hover:bg-muted/50 transition-colors cursor-pointer"
              >
                {/* Activity dot */}
                <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${dot.color}`} />

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {market.country}
                  </p>
                  <p className="text-[11px] text-muted-foreground tabular-nums">
                    {market.companies.toLocaleString()} companies
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 px-5 pb-4 pt-1">
        {(['very-high', 'high', 'medium', 'low'] as const).map((level) => {
          const dot = getDot(level);
          return (
            <div key={level} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${dot.color}`} />
              <span className="text-[10px] text-muted-foreground font-medium">{dot.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketHeatmap;
