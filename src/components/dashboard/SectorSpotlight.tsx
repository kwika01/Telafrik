import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectorSpotlightProps {
  sector: {
    name: string;
    companies: number;
    totalFunding: string;
    growth: string;
    description: string;
  };
}

const SectorSpotlight = ({ sector }: SectorSpotlightProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-5 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/20 via-violet-500/10 to-transparent rounded-full blur-2xl" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground">Sector Spotlight</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              {sector.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{sector.description}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: sector.companies, label: 'Companies' },
              { value: sector.totalFunding, label: 'Funding' },
              { value: sector.growth, label: 'Growth', isGrowth: true },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className={`text-lg font-bold ${item.isGrowth ? 'text-emerald-500' : 'text-foreground'}`}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="w-full group" asChild>
            <Link to="/sectors/hr-tech">
              View Sector 
              <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SectorSpotlight;
