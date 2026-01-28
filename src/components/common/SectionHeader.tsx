import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** Small uppercase text above the title */
  eyebrow?: string;
  /** Icon to display next to the eyebrow */
  eyebrowIcon?: LucideIcon;
  /** Accent color for the eyebrow (use token class names like 'text-gold', 'text-emerald', etc.) */
  eyebrowColor?: string;
  /** Main heading text */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Center align the header */
  centered?: boolean;
  /** Right side action (e.g., a "View All" button) */
  action?: ReactNode;
  /** Additional className */
  className?: string;
}

const SectionHeader = ({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  eyebrowColor = 'text-muted-foreground',
  title,
  subtitle,
  centered = false,
  action,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-10',
        centered ? 'text-center' : 'flex items-start justify-between gap-4',
        className
      )}
    >
      <div className={cn('space-y-2', centered && 'mx-auto max-w-2xl')}>
        {/* Eyebrow */}
        {eyebrow && (
          <div className={cn('flex items-center gap-2', centered && 'justify-center')}>
            {EyebrowIcon && <EyebrowIcon className={cn('h-4 w-4', eyebrowColor)} />}
            <span className={cn('text-xs font-semibold uppercase tracking-widest', eyebrowColor)}>
              {eyebrow}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          {title}
        </h2>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-muted-foreground max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action */}
      {action && !centered && <div className="flex-shrink-0">{action}</div>}
      {action && centered && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default SectionHeader;
