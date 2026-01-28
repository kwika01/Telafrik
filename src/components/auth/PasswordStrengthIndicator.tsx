import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

interface PasswordRequirement {
  label: string;
  regex: RegExp;
  met: boolean;
}

const PasswordStrengthIndicator = ({ 
  password, 
  showRequirements = true 
}: PasswordStrengthIndicatorProps) => {
  const requirements: PasswordRequirement[] = useMemo(() => [
    { label: 'At least 8 characters', regex: /.{8,}/, met: /.{8,}/.test(password) },
    { label: 'One uppercase letter', regex: /[A-Z]/, met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', regex: /[a-z]/, met: /[a-z]/.test(password) },
    { label: 'One number', regex: /[0-9]/, met: /[0-9]/.test(password) },
    { label: 'One special character', regex: /[^A-Za-z0-9]/, met: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const strength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };
    
    const metCount = requirements.filter(r => r.met).length;
    
    if (metCount <= 1) return { score: 1, label: 'Weak', color: 'bg-destructive' };
    if (metCount === 2) return { score: 2, label: 'Fair', color: 'bg-orange' };
    if (metCount === 3) return { score: 3, label: 'Good', color: 'bg-warning' };
    if (metCount === 4) return { score: 4, label: 'Strong', color: 'bg-success' };
    return { score: 5, label: 'Excellent', color: 'bg-success' };
  }, [requirements, password]);

  const StrengthIcon = useMemo(() => {
    if (strength.score <= 2) return ShieldAlert;
    if (strength.score <= 3) return Shield;
    return ShieldCheck;
  }, [strength.score]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3"
    >
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StrengthIcon className={cn(
              "h-4 w-4 transition-colors duration-300",
              strength.score <= 2 ? "text-destructive" : 
              strength.score <= 3 ? "text-warning" : "text-success"
            )} />
            <span className="text-xs font-medium text-muted-foreground">
              Password Strength
            </span>
          </div>
          <motion.span
            key={strength.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "text-xs font-semibold",
              strength.score <= 2 ? "text-destructive" : 
              strength.score <= 3 ? "text-warning" : "text-success"
            )}
          >
            {strength.label}
          </motion.span>
        </div>
        
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <motion.div
              key={level}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                level <= strength.score ? strength.color : "bg-muted"
              )}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: level <= strength.score ? 1 : 0.3 }}
              transition={{ duration: 0.2, delay: level * 0.05 }}
            />
          ))}
        </div>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-1.5"
        >
          <AnimatePresence mode="popLayout">
            {requirements.map((req, index) => (
              <motion.div
                key={req.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 text-xs"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {req.met ? (
                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-success/20">
                      <Check className="h-2.5 w-2.5 text-success" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-muted">
                      <X className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
                <span className={cn(
                  "transition-colors duration-200",
                  req.met ? "text-success" : "text-muted-foreground"
                )}>
                  {req.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PasswordStrengthIndicator;
