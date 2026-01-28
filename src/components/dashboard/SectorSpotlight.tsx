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
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-gold/10 border border-gold/20">
          <Sparkles className="h-4 w-4 text-gold" />
        </div>
        <h2 className="font-semibold text-foreground">Sector Spotlight</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {sector.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{sector.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: sector.companies, label: 'Companies', accent: 'neutral' as const },
            { value: sector.totalFunding, label: 'Funding', accent: 'gold' as const },
            { value: sector.growth, label: 'Growth', accent: 'terracotta' as const },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center p-3 bg-muted/50 rounded-lg"
            >
              <div className={`text-lg font-bold ${
                item.accent === 'neutral' ? 'text-foreground' :
                item.accent === 'gold' ? 'text-gold' : 
                'text-terracotta'
              }`}>
                {item.value}
              </div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="w-full group" asChild>
          <Link to="/sectors/hr-tech">
            View Sector 
            <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default SectorSpotlight;
