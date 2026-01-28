import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'branded' | 'minimal';
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const containerSizes = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-5',
};

export const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'default',
  text,
  className 
}: LoadingSpinnerProps) => {
  if (variant === 'branded') {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className={cn(
            "rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-xl shadow-primary/30",
            sizeClasses[size],
            containerSizes[size]
          )}>
            <Sparkles className={cn("text-primary-foreground", 
              size === 'sm' ? 'w-3 h-3' :
              size === 'md' ? 'w-4 h-4' :
              size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'
            )} />
          </div>
          <motion.div
            className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-xl",
              size === 'sm' ? 'opacity-30' : 'opacity-40'
            )}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        {text && (
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Loader2 className={cn("animate-spin text-muted-foreground", sizeClasses[size])} />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className="relative">
        <motion.div
          className={cn(
            "rounded-full border-2 border-muted",
            sizeClasses[size]
          )}
        />
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-transparent border-t-primary",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {text && (
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Full page loading overlay
interface LoadingOverlayProps {
  isVisible: boolean;
  text?: string;
}

export const LoadingOverlay = ({ isVisible, text = 'Loading...' }: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <LoadingSpinner variant="branded" size="lg" text={text} />
    </motion.div>
  );
};

// Skeleton loading components
export const SkeletonLine = ({ className }: { className?: string }) => (
  <div className={cn("h-4 bg-muted animate-pulse rounded", className)} />
);

export const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn("bg-muted animate-pulse rounded-lg", className)} />
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("bg-card border border-border rounded-xl p-5 space-y-4", className)}>
    <div className="flex items-center gap-3">
      <SkeletonBlock className="w-10 h-10 rounded-lg" />
      <div className="flex-1 space-y-2">
        <SkeletonLine className="w-1/3" />
        <SkeletonLine className="w-1/2 h-3" />
      </div>
    </div>
    <div className="space-y-2">
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-5/6" />
      <SkeletonLine className="w-4/6" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    <div className="flex gap-4 pb-2 border-b border-border">
      <SkeletonLine className="w-1/4 h-3" />
      <SkeletonLine className="w-1/4 h-3" />
      <SkeletonLine className="w-1/4 h-3" />
      <SkeletonLine className="w-1/4 h-3" />
    </div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 py-3 border-b border-border/50">
        <SkeletonLine className="w-1/4" />
        <SkeletonLine className="w-1/4" />
        <SkeletonLine className="w-1/4" />
        <SkeletonLine className="w-1/4" />
      </div>
    ))}
  </div>
);

export default LoadingSpinner;
