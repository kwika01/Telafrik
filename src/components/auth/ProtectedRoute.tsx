import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-xl shadow-primary/30">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-50 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </motion.div>
  </div>
);

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    // Redirect to auth page with return URL
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;
