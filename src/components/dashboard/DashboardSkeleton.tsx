import { motion } from 'framer-motion';

const DashboardSkeleton = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-72 bg-muted rounded" />
        </div>
        <div className="h-10 w-32 bg-muted rounded-lg" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="stat-card"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded" />
              <div className="h-3 w-20 bg-muted rounded" />
            </div>
            <div className="h-7 w-16 bg-muted rounded mt-2" />
            <div className="h-3 w-24 bg-muted rounded mt-1" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trending Companies Skeleton */}
        <div className="lg:col-span-2 data-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded" />
              <div className="h-5 w-40 bg-muted rounded" />
            </div>
            <div className="h-8 w-20 bg-muted rounded" />
          </div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-12 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Sector Spotlight Skeleton */}
        <div className="data-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 bg-muted rounded" />
            <div className="h-5 w-32 bg-muted rounded" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="h-6 w-24 bg-muted rounded mb-2" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/4 bg-muted rounded mt-1" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="h-5 w-8 bg-muted rounded mx-auto" />
                  <div className="h-3 w-12 bg-muted rounded mx-auto mt-2" />
                </div>
              ))}
            </div>
            <div className="h-9 w-full bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Bottom Row Skeleton */}
      <div className="grid lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="data-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted rounded" />
                <div className="h-5 w-28 bg-muted rounded" />
              </div>
              <div className="h-8 w-20 bg-muted rounded" />
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex items-center justify-between py-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-4 w-16 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
