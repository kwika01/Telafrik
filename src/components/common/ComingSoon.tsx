import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ElementType;
  features?: string[];
  backPath?: string;
  backLabel?: string;
}

const ComingSoon = ({
  title,
  description,
  icon: Icon,
  features = [],
  backPath = '/dashboard',
  backLabel = 'Back to Dashboard',
}: ComingSoonProps) => {
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center px-6"
        >
          <div className="relative mx-auto mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <Icon className="h-10 w-10 text-primary" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg"
              style={{ left: 'calc(50% + 20px)' }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </motion.div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">{title}</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{description}</p>

          {features.length > 0 && (
            <div className="bg-muted/50 rounded-xl border border-border p-6 mb-8 text-left">
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">What's Coming</h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to={backPath}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/auth">
                <Bell className="h-4 w-4 mr-2" />
                Get Notified
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            We're building something great. Stay tuned for updates.
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ComingSoon;
