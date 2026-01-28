import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrendingCompany {
  name: string;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="lg:col-span-2 rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-terracotta/10 border border-terracotta/20">
            <TrendingUp className="h-4 w-4 text-terracotta" />
          </div>
          <h2 className="font-semibold text-foreground">Trending Companies</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="group">
          <Link to="/signals" className="text-muted-foreground hover:text-foreground">
            View all 
            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
              <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Sector</th>
              <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Country</th>
              <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Momentum</th>
              <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <motion.tr
                key={company.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-muted/70 border border-border text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground group-hover:text-foreground transition-colors">
                      {company.name}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted/60 border border-border text-foreground">
                    {company.sector}
                  </span>
                </td>
                <td className="py-3 text-muted-foreground text-sm hidden sm:table-cell">{company.country}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${company.momentum}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-terracotta rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-8">{company.momentum}</span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center text-sm font-medium text-emerald">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {company.change}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TrendingTable;
