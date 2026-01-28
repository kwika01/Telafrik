import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const BottomBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ x: [0, -80, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-10 right-1/4 w-60 h-60 bg-yellow-300/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-0 right-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl"
            />
          </div>

          <div className="relative container-wide py-3 md:py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
              <div className="flex items-center gap-3 text-white">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </motion.div>
                <p className="text-sm md:text-base font-medium">
                  <span className="hidden md:inline">🚀 </span>
                  <strong>New:</strong> Get early access to Lumora Pro with 50% off for the first 3 months!
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-violet-700 hover:bg-white/90 font-semibold shadow-lg group"
                >
                  <Link to="/pricing">
                    Claim Offer
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BottomBanner;
