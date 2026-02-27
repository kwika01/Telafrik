import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectorSpotlightProps {
  sector: {
    name: string;
    slug?: string;
    companies: number;
    totalFunding: string;
    growth: string;
    description: string;
  };
}

const SectorSpotlight = ({ sector }: SectorSpotlightProps) => {
  const isPositiveGrowth = typeof sector.growth === 'string' && sector.growth.startsWith('+');

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <h2 className="font-semibold text-foreground text-base">Sector Spotlight</h2>
      </div>

      {/* Sector name + description */}
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">
          {sector.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{sector.description}</p>
      </div>

      {/* Stats row — 3 boxes */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {/* Companies */}
        <div className="text-center p-3 bg-slate-50 dark:bg-muted/40 rounded-xl border border-border">
          <div className="text-xl font-bold text-foreground tabular-nums">{sector.companies}</div>
          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mt-0.5">Companies</div>
        </div>

        {/* Funding */}
        <div className="text-center p-3 bg-slate-50 dark:bg-muted/40 rounded-xl border border-border">
          <div className="text-xl font-bold text-foreground tabular-nums">{sector.totalFunding}</div>
          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mt-0.5">Funding</div>
        </div>

        {/* Growth — green */}
        <div className="text-center p-3 bg-slate-50 dark:bg-muted/40 rounded-xl border border-border">
          <div className={`text-xl font-bold tabular-nums ${isPositiveGrowth ? 'text-emerald-500 dark:text-emerald-400' : 'text-foreground'}`}>
            {sector.growth}
          </div>
          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mt-0.5">Growth</div>
        </div>
      </div>

      {/* View sector button — full width outline like live site */}
      <Button variant="outline" size="sm" className="w-full mt-auto font-semibold gap-1.5" asChild>
        <Link to={sector.slug ? `/sectors/${sector.slug}` : '/sectors'}>
          View Sector
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
};

export default SectorSpotlight;
