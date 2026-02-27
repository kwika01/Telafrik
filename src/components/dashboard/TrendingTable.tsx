import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrendingCompany {
  name: string;
  slug?: string;
  sector: string;
  country: string;
  momentum: number;
  change: string;
}

interface TrendingTableProps {
  companies: TrendingCompany[];
}

const TrendingTable = ({ companies }: TrendingTableProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground text-base">Trending Companies</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground text-sm gap-1">
          <Link to="/directory">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="px-2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest w-8">#</th>
              <th className="text-left px-2 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Company</th>
              <th className="text-left px-2 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Sector</th>
              <th className="text-right px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Momentum</th>
              <th className="text-right px-4 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Change</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={company.name}
                className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors group"
              >
                {/* Rank */}
                <td className="px-4 py-4">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                </td>

                {/* Company name — large bold like live site */}
                <td className="px-2 py-4">
                  {company.slug ? (
                    <Link
                      to={`/startup/${company.slug}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors leading-tight"
                    >
                      {company.name}
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">{company.name}</span>
                  )}
                </td>

                {/* Sector — neutral rounded pill like live site */}
                <td className="px-2 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {company.sector}
                  </span>
                </td>

                {/* Momentum — blue bar + bold number, wider cell */}
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${company.momentum}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground w-8 tabular-nums text-right">
                      {company.momentum}
                    </span>
                  </div>
                </td>

                {/* Change — green with arrow, proper spacing */}
                <td className="px-4 py-4 text-right">
                  {company.change ? (
                    <span className="inline-flex items-center gap-0.5 text-sm font-bold text-emerald-500 dark:text-emerald-400 tabular-nums">
                      <MoveUpRight className="h-3.5 w-3.5 flex-shrink-0" />
                      +{company.change}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground/50">—</span>
                  )}
                </td>
              </tr>
            ))}

            {companies.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Loading trending companies…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendingTable;
