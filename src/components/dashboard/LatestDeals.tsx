import { motion } from 'framer-motion';
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

const LatestDeals = ({ deals }: LatestDealsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gold/10 border border-gold/20">
            <DollarSign className="h-4 w-4 text-gold" />
          </div>
          <h2 className="font-bold text-foreground tracking-tight">Latest Deals</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="group">
          <Link to="/deals" className="text-muted-foreground hover:text-foreground">
            View all 
            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <div className="space-y-1">
        {deals.map((deal, index) => (
          <motion.div
            key={deal.company}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald">{deal.company.charAt(0)}</span>
              </div>
              <div>
                <div className="font-semibold text-foreground group-hover:text-emerald transition-colors">
                  {deal.company}
                </div>
                <div className="text-xs text-muted-foreground font-medium">{deal.round} • {deal.date}</div>
              </div>
            </div>
            <div className="text-lg font-extrabold text-gold tabular-nums">
              {deal.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LatestDeals;
