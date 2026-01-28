import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * Standardized skeleton components for consistent loading states
 */

// Basic skeleton line
export const SkeletonLine = ({ className, width = 'full' }: { className?: string; width?: string | number }) => (
  <Skeleton className={cn('h-4', width === 'full' ? 'w-full' : typeof width === 'number' ? `w-${width}` : width, className)} />
);

// Skeleton block (for images, avatars, etc.)
export const SkeletonBlock = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  return <Skeleton className={cn('rounded-lg', sizeClasses[size], className)} />;
};

// Company/Startup card skeleton
export const CompanyCardSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <div className={cn('bg-card rounded-xl border border-border p-5', featured && 'p-6')}>
    <div className="flex items-start gap-4">
      <SkeletonBlock size={featured ? 'lg' : 'md'} />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <SkeletonLine width="w-32" />
          <SkeletonLine width="w-16" />
        </div>
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-3/4" />
        <div className="flex gap-2 mt-3">
          <SkeletonLine width="w-20" className="h-6 rounded-full" />
          <SkeletonLine width="w-24" className="h-6 rounded-full" />
        </div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-border/50">
      <SkeletonLine width="w-24" className="h-3 mb-1" />
      <SkeletonLine width="w-32" className="h-4" />
    </div>
  </div>
);

// Grid of company cards skeleton
export const CompanyGridSkeleton = ({ count = 6, featured = false }: { count?: number; featured?: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(count)].map((_, i) => (
      <CompanyCardSkeleton key={i} featured={featured && i === 0} />
    ))}
  </div>
);

// Investor card skeleton
export const InvestorCardSkeleton = () => (
  <div className="bg-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-4">
      <SkeletonBlock size="lg" className="rounded-full" />
      <div className="flex-1 space-y-2">
        <SkeletonLine width="w-40" />
        <SkeletonLine width="w-24" className="h-3" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-2/3" />
      </div>
    </div>
  </div>
);

// Page header skeleton
export const PageHeaderSkeleton = () => (
  <div className="space-y-4 mb-8">
    <SkeletonLine width="w-64" className="h-8" />
    <SkeletonLine width="w-96" className="h-4" />
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex gap-4 pb-2 border-b border-border">
      {[...Array(cols)].map((_, i) => (
        <SkeletonLine key={i} width="w-1/4" className="h-3" />
      ))}
    </div>
    {/* Rows */}
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 py-3 border-b border-border/50">
        {[...Array(cols)].map((_, j) => (
          <SkeletonLine key={j} width="w-1/4" />
        ))}
      </div>
    ))}
  </div>
);

// Profile header skeleton (for company/investor profiles)
export const ProfileHeaderSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-start gap-6">
      <SkeletonBlock size="xl" className="rounded-xl" />
      <div className="flex-1 space-y-3">
        <SkeletonLine width="w-64" className="h-8" />
        <SkeletonLine width="w-48" className="h-4" />
        <div className="flex gap-2">
          <SkeletonLine width="w-24" className="h-6 rounded-full" />
          <SkeletonLine width="w-32" className="h-6 rounded-full" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-1">
          <SkeletonLine width="w-20" className="h-3" />
          <SkeletonLine width="w-16" className="h-5" />
        </div>
      ))}
    </div>
  </div>
);

// Stats grid skeleton
export const StatsGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="bg-card rounded-xl border border-border p-4 space-y-2">
        <SkeletonLine width="w-24" className="h-3" />
        <SkeletonLine width="w-16" className="h-6" />
      </div>
    ))}
  </div>
);

export default {
  SkeletonLine,
  SkeletonBlock,
  CompanyCardSkeleton,
  CompanyGridSkeleton,
  InvestorCardSkeleton,
  PageHeaderSkeleton,
  TableSkeleton,
  ProfileHeaderSkeleton,
  StatsGridSkeleton,
};
