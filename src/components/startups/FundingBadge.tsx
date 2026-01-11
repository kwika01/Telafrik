import { DollarSign } from 'lucide-react';

interface FundingBadgeProps {
  amount: string;
  round?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FundingBadge = ({ amount, round, size = 'md' }: FundingBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success font-medium ${sizeClasses[size]}`}>
      <DollarSign className="h-3.5 w-3.5" />
      {amount}
      {round && <span className="text-success/70">• {round}</span>}
    </span>
  );
};

export default FundingBadge;
