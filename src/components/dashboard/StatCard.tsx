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
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm p-5 transition-shadow hover:shadow-md"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Decorative background circle — matches live site */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/8 pointer-events-none" />
      <div className="absolute -top-10 -right-2 w-16 h-16 rounded-full bg-primary/5 pointer-events-none" />

      {/* Icon + label row */}
      <div className="flex items-center gap-2 mb-3 relative">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex-shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground font-medium leading-tight">{label}</span>
      </div>

      {/* Big bold value */}
      <div className="text-3xl font-bold text-foreground tracking-tight leading-none relative mb-1.5">
        {value}
      </div>

      {/* Subtitle / change */}
      <div className="text-xs text-muted-foreground font-medium relative">{change}</div>
    </div>
  );
};

export default StatCard;
