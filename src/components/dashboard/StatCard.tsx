import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  index: number;
}

const accentColors = [
  { bg: 'bg-emerald/10', border: 'border-emerald/20', text: 'text-emerald' },
  { bg: 'bg-gold/10', border: 'border-gold/20', text: 'text-gold' },
  { bg: 'bg-indigo/10', border: 'border-indigo/20', text: 'text-indigo' },
  { bg: 'bg-terracotta/10', border: 'border-terracotta/20', text: 'text-terracotta' },
  { bg: 'bg-emerald/10', border: 'border-emerald/20', text: 'text-emerald' },
];

const StatCard = ({ label, value, change, icon: Icon, index }: StatCardProps) => {
  const accent = accentColors[index % accentColors.length];
  // Emphasize the most important KPIs without changing layout:
  // - Total Companies (index 0)
  // - Total Funding Tracked (index 2)
  const isPrimaryKpi = index === 0 || index === 2;
  const iconBadgeClasses = isPrimaryKpi
    ? `${accent.bg} ${accent.border}`
    : 'bg-muted/60 border-border';
  const iconClasses = isPrimaryKpi ? accent.text : 'text-muted-foreground';
  const valueClasses = isPrimaryKpi ? accent.text : 'text-foreground';
  const topAccentClasses = isPrimaryKpi ? accent.text : 'text-border';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-4 hover:shadow-md transition-all duration-200"
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${topAccentClasses} bg-current`} />
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <div className={`p-1.5 rounded-lg border ${iconBadgeClasses}`}>
          <Icon className={`h-3.5 w-3.5 ${iconClasses}`} />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className={`text-2xl font-bold tracking-tight ${valueClasses}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{change}</div>
    </motion.div>
  );
};

export default StatCard;
