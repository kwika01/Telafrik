import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  index: number;
}

const StatCard = ({ label, value, change, icon: Icon, index }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
      <div className="relative">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-xs font-medium">{label}</span>
        </div>
        <div className="text-2xl font-bold text-foreground tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{change}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
