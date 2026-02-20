import { motion } from 'framer-motion';
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

const MarketHeatmap = ({ markets }: MarketHeatmapProps) => {
  const getActivityStyles = (activity: string) => {
    switch (activity) {
      case 'very-high':
        return {
          bg: 'bg-emerald',
          ring: 'ring-emerald/30',
          label: 'Very High',
        };
      case 'high':
        return {
          bg: 'bg-gold',
          ring: 'ring-gold/30',
          label: 'High',
        };
      case 'medium':
        return {
          bg: 'bg-indigo',
          ring: 'ring-indigo/30',
          label: 'Medium',
        };
      default:
        return {
          bg: 'bg-muted',
          ring: 'ring-muted/10',
          label: 'Low',
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo/10 border border-indigo/20">
            <Globe className="h-4 w-4 text-indigo" />
          </div>
          <h2 className="font-bold text-foreground tracking-tight">Market Activity</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="group">
          <Link to="/countries" className="text-muted-foreground hover:text-foreground">
            View all 
            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {markets.map((market, index) => {
          const styles = getActivityStyles(market.activity);
          return (
            <motion.div
              key={market.country}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
            >
              <div className={`w-3 h-3 rounded-full ${styles.bg} ring-4 ${styles.ring}`} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground truncate group-hover:text-emerald transition-colors">
                  {market.country}
                </div>
                <div className="text-xs text-muted-foreground font-medium tabular-nums">{market.companies.toLocaleString()} companies</div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        {['very-high', 'high', 'medium'].map((level) => {
          const styles = getActivityStyles(level);
          return (
            <div key={level} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${styles.bg}`} />
              <span>{styles.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MarketHeatmap;
