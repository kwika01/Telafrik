import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ConfidenceIndicatorProps {
  score: number;
  source: 'Verified' | 'Reported' | 'Estimated';
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

const ConfidenceIndicator = ({ score, source, size = 'sm', showScore = false }: ConfidenceIndicatorProps) => {
  const getSourceConfig = (source: string) => {
    switch (source) {
      case 'Verified':
        return {
          icon: CheckCircle2,
          className: 'badge-verified',
          color: 'text-success',
          bgColor: 'bg-success',
        };
      case 'Reported':
        return {
          icon: AlertCircle,
          className: 'badge-reported',
          color: 'text-accent',
          bgColor: 'bg-accent',
        };
      default:
        return {
          icon: HelpCircle,
          className: 'badge-estimated',
          color: 'text-warning',
          bgColor: 'bg-warning',
        };
    }
  };

  const config = getSourceConfig(source);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`inline-flex items-center gap-1 cursor-help ${config.className}`}>
          <Icon className={sizeClasses[size]} />
          {showScore && (
            <span className="text-xs font-medium">{score}%</span>
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{source}</span>
            <span className="text-muted-foreground">• {score}% confidence</span>
          </div>
          <div className="confidence-bar">
            <div
              className={`confidence-fill ${config.bgColor}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {source === 'Verified' && 'Confirmed by official sources or founder verification.'}
            {source === 'Reported' && 'Based on press releases or public announcements.'}
            {source === 'Estimated' && 'Calculated using proprietary models and market data.'}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ConfidenceIndicator;
